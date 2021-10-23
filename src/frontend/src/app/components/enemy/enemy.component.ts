import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent implements OnInit {

  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
