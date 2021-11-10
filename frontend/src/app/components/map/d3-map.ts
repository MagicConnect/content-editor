
import * as d3 from 'd3';
import { maxBy } from 'lodash';
import { newMapBattle } from '../../../../../shared/initializers';
import { IMapCombatGrid, IMapNode } from '../../../../../shared/interfaces';

class GraphConstants {
  public static selectedClass = 'selected';
  public static connectClass = 'connect-node';
  public static circleGClass = 'conceptG';
  public static graphClass = 'graph';
  public static activeEditId = 'active-editing';
  public static BACKSPACE_KEY = 8;
  public static DELETE_KEY = 46;
  public static ENTER_KEY = 13;
  public static nodeRadius = 50;
}

class GraphState {
  public selectedNode: IMapNode | null = null;
  public selectedEdge = null;
  public mouseDownNode = null;
  public mouseEnterNode = null;
  public mouseDownLink = null;
  public justDragged = false;
  public justScaleTransGraph = false;
  public lastKeyDown = -1;
  public shiftNodeDrag = false;
  public selectedText = false;
  public graphMouseDown = false;
}

export interface IEdge {
  source: IMapNode;
  target: IMapNode;
}

interface GraphCallbacks {
  addNode: (node: any) => void;
  editNode: (node: any) => void;
  removeNode: (node: any) => void;
  addLink: (node: any) => void;
  removeLink: (node: any) => void;
}

export class D3MapCreator {

  private idct = 0;
  private state: GraphState = new GraphState();

  private svgG: any;
  private dragLine: any;
  private paths: any;
  private circles: any;

  private drag: any;

  constructor(
    private svg: any,
    private nodes: IMapNode[] = [],
    private edges: IEdge[] = [],
    private callbacks: GraphCallbacks = { addNode: () => {}, editNode: () => {}, removeNode: () => {}, addLink: () => {}, removeLink: () => {} }
  ) {
    this.init();
  }

  private init() {
    this.restoreIDCT();
    this.initDefs();
    this.initG();
    this.initKeybinds();
    this.initDrag();
    this.updateGraph();
  }

  private restoreIDCT() {
    this.idct = (maxBy(this.nodes, 'id')?.id ?? 0) + 1;
  }

  private initDefs() {
    const defs = this.svg.append('svg:defs');

    // arrows
    defs.append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', '32')
      .attr('markerWidth', 3.5)
      .attr('markerHeight', 3.5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    // define arrow markers for leading arrow
    defs.append('svg:marker')
      .attr('id', 'mark-end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 7)
      .attr('markerWidth', 3.5)
      .attr('markerHeight', 3.5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

  }

  private initG() {
    this.svgG = this.svg.append('g')
      .classed(GraphConstants.graphClass, true);

    this.dragLine = this.svgG.append('svg:path')
      .attr('class', 'link dragline hidden')
      .attr('d', 'M0,0L0,0');

    this.paths = this.svgG.append('g').selectAll('g');
    this.circles = this.svgG.append('g').selectAll('g');
  }

  private initDrag() {
    this.drag = d3.drag()
      .subject((d) => ({ x: d.x, y: d.y }))
      .on('drag', (event, d) => {
        this.state.justDragged = true;
        this.dragMove(event, d);
      })
      .on('end', (event ) => {
        if (!this.state.shiftNodeDrag) return;

        this.dragEnd(d3.select(event.currentTarget), this.state.mouseEnterNode);
      });
  }

  private initKeybinds() {
    d3.select(window)
      .on('keydown', (event) => {
        this.svgKeyDown(event);
      })
      .on('keyup', (event) => {
        this.svgKeyUp(event);
      });

    this.svg
      .on('click', (e: any) => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if(el?.tagName !== 'svg') return;

        this.removeSelectFromEdge();
        this.removeSelectFromNode();
      })
      .on('mousedown', (event: any) => {
        this.svgMouseDown();
        if (event.shiftKey) {
          event.stopImmediatePropagation();
        }
      })
      .on('mouseup', (event: any) => {
        this.svgMouseUp(event);
      });

    const dragSvg = d3.zoom()
      .on('zoom', (event) => {
        if (event.sourceEvent.shiftKey) return false;

        this.zoomed(event);
        return true;
      })
      .on('start', (event) => {
        const ael = d3.select(`#${GraphConstants.activeEditId}`).node();
        if (ael) {
          (ael as any).blur();
        }

        if (!event.sourceEvent.shiftKey) {
          d3.select('body').style('cursor', 'move');
        }
      })
      .on('end', () => {
        d3.select('body').style('cursor', 'auto');
      });

    this.svg.call(dragSvg).on('dblclick.zoom', null);

      // listen for resize
    window.onresize = () => {
      this.updateWindow();
    };
  }

  private dragMove(event: any, d: any) {
    if (this.state.shiftNodeDrag) {
      const [x, y] = d3.pointer(event, this.svgG.node());
      this.dragLine.attr('d', `M${d.x},${d.y}L${x},${y}`);

    } else {
      d.x += event.dx;
      d.y += event.dy;
      this.updateGraph();
    }
  }

  private insertTitleLinebreaks(gEl: any, title = '', subtitle = '') {

    // battle name
    const el = gEl.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', (d: any) => {
        const len = d.name.substring(0, GraphConstants.nodeRadius / 3).length;
        let size = GraphConstants.nodeRadius / 3;
        size *= 7 / len;
        size += 1;

        return Math.round(size) + 'px';
      });

    const tspan1 = el.append('tspan').text(title);
    tspan1.attr('x', 0).attr('dy', '-20');

    // battle level / stamina cost
    const el2 = gEl.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', (d: any) => {
        const len = d.name.substring(0, GraphConstants.nodeRadius / 3).length;
        let size = GraphConstants.nodeRadius / 3;
        size *= 6 / len;
        size += 1;

        return Math.round(size) + 'px';
      });

    const tspan2 = el2.append('tspan').text(subtitle);
    tspan2.attr('x', 0).attr('dy', '15');
  }

  private spliceLinksForNode(node: any) {
    const toSplice = this.edges.filter((l) => {
      return (l.source === node || l.target === node);
    });

    toSplice.forEach((l) => {
      this.callbacks.removeLink(l);
      this.edges.splice(this.edges.indexOf(l), 1);
    });
  }

  private replaceSelectEdge(d3Path: any, edgeData: any) {
    d3Path.classed(GraphConstants.selectedClass, true);
    if (this.state.selectedEdge) {
      this.removeSelectFromEdge();
    }
    this.state.selectedEdge = edgeData;
    this.removeSelectFromNode();
  }

  private removeSelectFromEdge() {
    this.paths
      .filter((cd: any) => cd === this.state.selectedEdge)
      .classed(GraphConstants.selectedClass, false);
    this.state.selectedEdge = null;
  }

  private replaceSelectNode(d3Node: any, nodeData: IMapNode) {
    d3Node.classed(GraphConstants.selectedClass, true);
    if (this.state.selectedNode) {
      this.removeSelectFromNode();
    }

    this.state.selectedNode = nodeData;
    this.removeSelectFromEdge();
  }

  private removeSelectFromNode() {
    this.circles
      .filter((cd: any) => cd.id === this.state.selectedNode?.id)
      .classed(GraphConstants.selectedClass, false);

    this.state.selectedNode = null;
  }

  private dragEnd(d3node: any, d: any) {

    // reset the states
    this.state.shiftNodeDrag = false;
    d3node.classed(GraphConstants.connectClass, false);

    const mouseDownNode = this.state.mouseDownNode;
    const mouseEnterNode = this.state.mouseEnterNode;

    if (this.state.justDragged) {
      // dragged, not clicked
      this.state.justDragged = false;
    }

    this.dragLine.classed('hidden', true);

    if (!mouseDownNode || !mouseEnterNode) { return; }

    if (mouseDownNode !== d) {
      // we're in a different node: create new edge for mousedown edge and add to graph
      const newEdge = { source: mouseDownNode, target: d };
      const filtRes = this.paths.filter((dd: any) => {
        if (dd.source === newEdge.target && dd.target === newEdge.source) {
          this.edges.splice(this.edges.indexOf(dd), 1);
        }

        return d.source === newEdge.source && d.target === newEdge.target;
      });

      if (!filtRes || !filtRes[0] || !filtRes[0].length) {
        this.edges.push(newEdge);
        this.callbacks.addLink(newEdge);
        this.updateGraph();
      }
    }

    this.state.mouseDownNode = null;
    this.state.mouseEnterNode = null;
  }

  private pathMouseDown(event: any, d3path: any, d: any) {
    event.stopPropagation();

    if(!event.ctrlKey) return;

    this.state.mouseDownLink = d;

    if (this.state.selectedNode) {
      this.removeSelectFromNode();
    }

    const prevEdge = this.state.selectedEdge;
    if (!prevEdge || prevEdge !== d) {
      this.replaceSelectEdge(d3path, d);
    } else {
      this.removeSelectFromEdge();
    }
  }

  private circleMouseDown(event: any, d3node: any, d: any) {
    event.stopPropagation();

    this.state.mouseDownNode = d;
    if (event.shiftKey) {
      this.state.shiftNodeDrag = event.shiftKey;

      // reposition dragged directed edge
      this.dragLine.classed('hidden', false)
        .attr('d', `M${d.x},${d.y}L${d.x},${d.y}`);
    }
  }

  private circleMouseUp(event: any, d3node: any, d: any) {
    event.stopPropagation();

    // reset the states
    this.state.shiftNodeDrag = false;
    d3node.classed(GraphConstants.connectClass, false);

    if (!event.shiftKey && this.state.selectedEdge) {
      this.removeSelectFromEdge();
    }

    const prevNode = this.state.selectedNode;
    if (event.ctrlKey && (!prevNode || prevNode.id !== d.id)) {
      this.replaceSelectNode(d3node, d);
    } else {
      this.removeSelectFromNode();
    }
  }

  private circleCtxMenu(event: any, d3node: any, d: any) {
    event.stopPropagation();
    event.preventDefault();

    this.callbacks.editNode(d);
  }

  private svgMouseDown() {
    this.state.graphMouseDown = true;
  }

  private svgMouseUp(event: any) {
    event.stopPropagation();

    if (this.state.justScaleTransGraph) {
      // dragged not clicked
      this.state.justScaleTransGraph = false;

    } else if (this.state.graphMouseDown && event.shiftKey) {
      // clicked not dragged from svg
      const xycoords = d3.pointer(event, this.svgG.node());
      const d: IMapNode = newMapBattle();
      d.id = this.idct++;
      d.x = xycoords[0];
      d.y = xycoords[1];

      this.nodes.push(d);
      this.callbacks.addNode(d);
      this.updateGraph();

    } else if (this.state.shiftNodeDrag) {
      // dragged from node
      this.state.shiftNodeDrag = false;
      this.dragLine.classed('hidden', true);
    }

    this.state.graphMouseDown = false;
  }

  private svgKeyDown(event: any) {
    if (this.state.lastKeyDown !== -1 || event.target.tagName !== 'MODAL-CONTAINER') { return; }

    this.state.lastKeyDown = event.keyCode;
    const selectedNode = this.state.selectedNode;
    const selectedEdge = this.state.selectedEdge;

    switch (event.keyCode) {
      case GraphConstants.BACKSPACE_KEY:
      case GraphConstants.DELETE_KEY:
        event.preventDefault();

        if (selectedNode) {
          this.nodes.splice(this.nodes.indexOf(selectedNode), 1);
          this.spliceLinksForNode(selectedNode);
          this.callbacks.removeNode(selectedNode);
          this.updateGraph();

        } else if (selectedEdge) {
          this.edges.splice(this.edges.indexOf(selectedEdge), 1);
          this.callbacks.removeLink(selectedEdge);
          this.updateGraph();
        }

        this.state.selectedNode = null;
        this.state.selectedEdge = null;

        break;
    }
  }

  private svgKeyUp(event: any) {
    this.state.lastKeyDown = -1;
  }

  private zoomed(event: any) {
    this.state.justScaleTransGraph = true;
    d3.select('.' + GraphConstants.graphClass)
      .attr('transform', event.transform);
  }

  private updateWindow() {
    const docEl = document.documentElement;
    const bodyEl = document.getElementsByTagName('body')[0];
    const x = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth;
    const y = window.innerHeight || docEl.clientHeight || bodyEl.clientHeight;
    this.svg.attr('width', x).attr('height', y);
  }

  public updateGraph() {

    const paths = this.paths.data(this.edges, (d: any) => `${d.source.id}+${d.target.id}`);

    // update existing paths
    paths
      .classed(GraphConstants.selectedClass, (d: any) => d === this.state.selectedEdge)
      .attr('d', (d: any) => `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`);

    // remove old links
    paths.exit().remove();

    // add new paths
    const newPaths = paths
      .enter()
      .append('path')
      .classed('link', true)
      .attr('d', (d: any) => `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`)
      .merge(paths)
      .on('mousedown', (event: any, d: any) => {
        this.pathMouseDown(event, d3.select(event.currentTarget), d);
      });

    this.paths = newPaths;

    // update existing nodes
    const circles = this.circles.data(this.nodes, (d: any) => d.id);

    // remove old nodes
    this.svg.selectAll(`.${GraphConstants.circleGClass} circle`).remove();
    this.svg.selectAll(`.${GraphConstants.circleGClass} text`).remove();
    this.svg.selectAll(`.${GraphConstants.circleGClass} image`).remove();

    // add new nodes
    const newGs = circles
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
      .enter()
      .append('g')
      .merge(circles);

    newGs
      .classed(GraphConstants.circleGClass, true)
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
      .on('mouseover', (event: any, d: any) => {
        this.state.mouseEnterNode = d;
        if (this.state.shiftNodeDrag) {
          d3.select(event.currentTarget).classed(GraphConstants.connectClass, true);
        }
      })
      .on('mouseout', (event: any) => {
        this.state.mouseEnterNode = null;
        d3.select(event.currentTarget).classed(GraphConstants.connectClass, false);
      })
      .on('mousedown', (event: any, d: any) => {
        this.circleMouseDown(event, d3.select(event.currentTarget), d);
      })
      .on('contextmenu', (event: any, d: any) => {
        this.circleCtxMenu(event, d3.select(event.currentTarget), d);
      })
      .call(this.drag)
      .on('click', (event: any, d: any) => {
        this.circleMouseUp(event, d3.select(event.currentTarget), d);
      })
      .each((d: any, i: number, nodes: any[]) => {
        const node = d3.select(nodes[i]);
        node
          .append('circle')
          .attr('r', String(GraphConstants.nodeRadius));

        this.insertTitleLinebreaks(d3.select(nodes[i]), d.name, this.getNodeSubtitle(d));
      });

    this.circles = newGs;
  }

  private nodeLevel(node: IMapNode): number {
    const enemyNodes = node.combat.grid.flat().filter(Boolean) ?? [];

    return enemyNodes.reduce((prev: number, cur: IMapCombatGrid) => {
      return prev + (cur?.enemy?.level ?? 0);
    }, 0) / (enemyNodes.length || 1);
  }

  private getNodeSubtitle(node: IMapNode): string {
    return `St. ${node.staminaCost} / Lv. ${this.nodeLevel(node)}`;
  }

}
