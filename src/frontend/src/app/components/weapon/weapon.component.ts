import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent implements OnInit {

  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
