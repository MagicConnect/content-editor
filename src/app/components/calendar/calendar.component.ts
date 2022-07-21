import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CalendarBonusRepeat, ICalendarBonus } from '@magicconnect/content-interfaces';
import { newCalendarBonus } from 'src/app/initializers';
import { ModManagerService } from 'src/app/services/mod-manager.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @Input() model: ICalendarBonus = newCalendarBonus();

  form = new FormGroup({});

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          className: 'col-4',
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
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description here...',
            description: 'It should be less than 500 characters.',
            maxLength: 500,
          },
        },
        {
          key: 'calendarBonusRepeat',
          className: 'col-4',
          type: 'better-select',
          templateOptions: {
            label: 'Calendar Bonus Repeat',
            placeholder: 'Choose calendar bonus repeat period...',
            description: 'Most event login calendars don\'t repeat.',
            required: true,
            options: Object.values(CalendarBonusRepeat).filter(Boolean).map(x => ({ label: x, value: x }))
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

  constructor(private mod: ModManagerService) { }

  add() {
    this.model.rewardItems.push({ day: this.model.rewardItems.length + 1, itemId: '', quantity: -1 });
  }

  remove(index: number) {
    this.model.rewardItems.splice(index, 1);
  }

}
