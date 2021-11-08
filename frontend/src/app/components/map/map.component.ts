import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import * as d3 from 'd3';


import { newMap } from '../../../../../shared/initializers';
import { IMap } from '../../../../../shared/interfaces';
import { D3MapCreator } from './d3-map';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

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
          key: 'unlocksMap',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Unlocks Map',
            placeholder: 'Enter map name here...',
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
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
    const d3SVG = d3.select('.map-editor').append('svg')
      .attr('width', 800)
      .attr('height', 500)
      .attr('class', 'd3map')
      .attr('style', 'border: 1px solid #000');

    const addNode = (node: any) => {
      console.log('add', node);

      // node.title = '1';
    };

    const removeNode = (node: any) => {
      console.log('remove', node);
    };

    const addLink = (link: any) => {
      console.log('add', link);
    };

    const removeLink = (link: any) => {
      console.log('remove', link);
    };

    this.map = new D3MapCreator(d3SVG, [], [], { addNode, removeNode, addLink, removeLink });
  }

}
