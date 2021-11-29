import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Archetype, IAbility, ILimitBreak, Stat } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-lb-form',
  templateUrl: './lb-form.component.html',
  styleUrls: ['./lb-form.component.scss']
})
export class LbFormComponent {

  @Input() model: ILimitBreak = {
    skills: {}
  };

  @Input() allowAbilities = true;
  @Input() allowStats = false;
  @Input() allowSkills = false;

  @Input() existingAbilities: IAbility[] = [];

  @Output() addAbility = new EventEmitter();

  public activeLB = 0;

  constructor() { }

}
