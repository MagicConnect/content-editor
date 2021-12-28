import { Component, Input } from '@angular/core';
import { IAbility } from 'content-interfaces';
import { newAbility } from '../../initializers';

@Component({
  selector: 'app-ability-form',
  templateUrl: './ability-form.component.html',
  styleUrls: ['./ability-form.component.scss']
})
export class AbilityFormComponent {

  @Input() model: IAbility = newAbility();

  public activeLB = 0;


}