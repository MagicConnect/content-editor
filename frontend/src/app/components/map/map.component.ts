import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import * as d3 from 'd3';
import { cloneDeep, extend } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { newMap } from '../../../../../shared/initializers';
import { IMap, IMapNode } from 'content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';
import { D3MapCreator } from './d3-map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('battleEditor') battleEditor!: TemplateRef<any>;
  public currentBattleRef?: IMapNode;
  public currentBattle?: IMapNode;
  private modalRef!: BsModalRef;

  @Input() model: IMap = newMap();

  public map!: D3MapCreator;

  form = new FormGroup({});

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter name here...',
            description: 'It should be less than 30 characters.',
            required: true,
            maxLength: 30,
          },
        },
        {
          key: 'activeStarts',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Start Date/Time',
            placeholder: 'Enter start date/time here...',
            description: 'YYYY/MM/DD HH:MM, -1 for permanent',
            required: true,
            maxLength: 16,
          },
        },
        {
          key: 'activeEnds',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'End Date/Time',
            placeholder: 'Enter end date/time here...',
            description: 'YYYY/MM/DD HH:MM, -1 for permanent',
            required: true,
            maxLength: 16,
          },
        },

        {
          key: 'art',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Base Art',
            placeholder: 'Choose base art...',
            description: 'This determines the background art for the map.',
            required: true,
            options: this.mod.allArtData.maps.map(art => ({ value: art, label: art })),
          },
        },
      ]
    }
  ];

  constructor(private modalService: BsModalService, private mod: ModManagerService) { }

  ngOnInit() {
    const d3SVG = d3.select('.map-editor').append('svg')
      .attr('width', 800)
      .attr('height', 500)
      .attr('class', 'd3map')
      .attr('style', 'border: 1px solid #000');

    const addNode = (node: IMapNode) => {
       this.model.nodes.push(node);
       this.model.nodeConnections[node.id] = [];
    };

    const editNode = (node: IMapNode) => {
      this.currentBattleRef = node;
      this.currentBattle = cloneDeep(node);
      this.modalRef = this.modalService.show(this.battleEditor, { keyboard: false, backdrop: 'static', class: 'big-modal' });
    };

    const removeNode = (node: IMapNode) => {
      this.model.nodes = this.model.nodes.filter(x => x !== node);
      delete this.model.nodeConnections[node.id];
    };

    const addLink = (link: { source: IMapNode, target: IMapNode }) => {
      if(link.source.id === link.target.id) return;
      this.model.nodeConnections[link.source.id].push(link.target.id);
    };

    const removeLink = (link: { source: IMapNode, target: IMapNode }) => {
      this.model.nodeConnections[link.source.id] = this.model.nodeConnections[link.source.id].filter(x => x !== link.target.id);
    };

    this.map = new D3MapCreator(d3SVG, this.model.nodes.slice(), this.reformatModelNodeConnections(), { addNode, editNode, removeNode, addLink, removeLink });
  }

  private reformatModelNodeConnections(): Array<{ source: IMapNode, target: IMapNode }> {
    return Object.keys(this.model.nodeConnections).map(source => {
      return this.model.nodeConnections[+source].map(target => ({
        source: this.model.nodes.find(x => x.id === +source) as IMapNode,
        target: this.model.nodes.find(x => x.id === target) as IMapNode
      }));
    }).flat();
  }

  confirmBattleEdit() {
    if(!this.currentBattle || !this.currentBattle.name) return;

    extend(this.currentBattleRef, this.currentBattle);

    this.map.updateGraph();

    this.cancelEdit();
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentBattleRef = undefined;
    this.currentBattle = undefined;
  }

}
