import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
