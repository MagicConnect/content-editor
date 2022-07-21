import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { AchievementCategory, AchievementStat, IAchievement } from '@magicconnect/content-interfaces';
import { newAchievement } from '../../initializers';
import { ModManagerService } from '../../services/mod-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent {

  private sub$!: Subscription;

  @Input() model: IAchievement = newAchievement();

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
          key: 'description',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description here...',
            description: 'It should be less than 500 characters.',
            maxLength: 500,
          },
        },
        {
          key: 'lockedBy',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Locked By',
            placeholder: 'Choose achievement...',
            description: 'If set, previous achievement must be unlocked before this one can be unlocked.',
            options: this.mod.filteredAchievements.map(x => ({ label: x.name, value: x.id })),
          },
        },
        {
          key: 'category',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Category',
            placeholder: 'Choose category...',
            description: 'The category determines where the achievement can be found.',
            options: Object.values(AchievementCategory).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'requirements.stat',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Tracked Stat',
            placeholder: 'Choose stat...',
            description: 'The stat determines what is used to track earning this achievement.',
            options: Object.values(AchievementStat).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'requirements.statValue',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Stat Value',
            placeholder: 'Enter stat value here...',
            description: 'The required stat value.',
            required: false,
            min: 0
          },
        },
        {
          key: 'requirements.mapName',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Completed Map',
            placeholder: 'Choose map to complete...',
            description: 'If specified, this map is required to be completed entirely for this achievement.',
            options: this.mod.filteredMaps.map(map => ({ value: map.id, label: map.name }))
          },
        },
        {
          key: 'requirements.mapNodeId',
          className: 'col-3',
          type: 'better-select',
          hideExpression: () => !this.model.requirements.mapName,
          templateOptions: {
            label: 'Completed Map Node',
            placeholder: 'Choose map node to complete...',
            description: 'If specified, this map node is required to be completed for this achievement.',
            options: []
          },
          hooks: {
            onInit: (field) => {
              if(!field || !field.templateOptions) return;

              const mapControl = field?.form?.get('requirements.mapName');
              if(!mapControl) return;

              field.templateOptions.options = (this.mod.filteredMaps.find(x => x.id === mapControl.value)?.nodes ?? []).map(node => ({ value: node.id, label: node.name }));

              this.sub$ = mapControl.valueChanges.subscribe(mapId => {
                if(!field || !field.templateOptions) return;

                if(!mapId) {
                  field.formControl?.setValue('');
                }

                field.templateOptions.options = (this.mod.filteredMaps.find(x => x.id === mapControl.value)?.nodes ?? []).map(node => ({ value: node.id, label: node.name }));
              });
            },

            onDestroy: () => {
              if(this.sub$) this.sub$.unsubscribe();
            }
          }
        },
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'isRepeatable',
          className: 'col-3',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: 'Is Repeatable',
            description: 'Whether or not the achievement should reset progress upon completion / reward claim.',
          },
        },
        {
          key: 'art',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Base Art',
            placeholder: 'Choose base art...',
            description: 'This determines the splash art for the item.',
            required: true,
            options: this.mod.allArtData.achievements.map(art => ({ value: art, label: art })),
          },
        },
      ]
    }
  ];

  constructor(public mod: ModManagerService) {}

  add(type: 'characters' | 'accessories' | 'items' | 'weapons') {
    this.model.rewards[type].push({ name: '', quantity: 1 });
  }

  remove(type: 'characters' | 'accessories' | 'items' | 'weapons', index: number) {
    this.model.rewards[type].splice(index, 1);
  }
}
