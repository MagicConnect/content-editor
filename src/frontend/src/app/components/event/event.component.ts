import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {

  @Output() save = new EventEmitter();

  constructor() { }

}
