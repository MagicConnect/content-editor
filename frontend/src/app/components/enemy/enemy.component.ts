import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent {

  @Output() save = new EventEmitter();

  constructor() { }

}
