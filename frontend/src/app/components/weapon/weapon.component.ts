import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent {

  @Output() save = new EventEmitter();

  constructor() { }

}
