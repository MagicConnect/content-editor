import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
