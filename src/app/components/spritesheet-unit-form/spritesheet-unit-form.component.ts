import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IUnitSpritesheetData } from '@magicconnect/content-interfaces';

@Component({
  selector: 'app-spritesheet-unit-form',
  templateUrl: './spritesheet-unit-form.component.html',
  styleUrls: ['./spritesheet-unit-form.component.scss']
})
export class SpritesheetUnitFormComponent {

  form = new FormGroup({});

  @Input() disabled = false;

  @Input() model: IUnitSpritesheetData = {
    attackFrames: 0,
    castFrames: 0,
    deadFrames: 0,
    idleFrames: 0,
    moveFrames: 0,
    moveEndFrames: 0,
    onDeathFrames: 0,
    onHitFrames: 0
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: ['idle', 'move', 'moveEnd', 'cast', 'attack', 'onHit', 'onDeath', 'dead'].map(key => ({
        key: `${key}Frames`,
        className: 'col-1',
        type: 'input',
        templateOptions: {
          label: key,
          placeholder: 'Frames#'
        },
      }))
    }
  ];

}
