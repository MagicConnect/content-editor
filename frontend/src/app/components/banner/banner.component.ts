import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { BannerType, IBanner } from '../../../../../shared/interfaces';
import { newBanner } from '../../../../../shared/initializers';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  @Input() model: IBanner = newBanner();

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
          className: 'col-6',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description here...',
            description: 'It should be less than 100 characters.',
            required: true,
            maxLength: 100,
          },
        },
        {
          key: 'type',
          className: 'col-3',
          type: 'select',
          templateOptions: {
            label: 'Banner Type',
            placeholder: 'Choose banner type here...',
            description: 'Banner type determines what can come out of the banner.',
            required: true,
            options: ['characters', 'chips', 'items', 'weapons'].sort().map(x => ({ label: x, value: x })),
            change: (field, $event) => {
              const type = $event.target.value.split(' ')[1];

              (['characters', 'chips', 'items', 'weapons'] as BannerType[]).forEach(bannerType => {
                if(type === bannerType) return;

                this.model[bannerType] = [];
              });
            },
          },
        },
        {
          key: 'activeStarts',
          className: 'col-4',
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
          className: 'col-4',
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

  add(type: BannerType) {
    this.model[type].push({ name: '', weight: 1 });
  }

  remove(type: BannerType, index: number) {
    this.model[type].splice(index, 1);
  }

}
