import { Component, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-picker-modal',
  templateUrl: './picker-modal.component.html',
  styleUrls: ['./picker-modal.component.scss']
})
export class PickerModalComponent implements OnInit {

  @Input() type = 'Thing';
  @Input() entries: Array<{ name: string, description: string }> = [];
  @Input() disabledEntries: string[] = [];
  @Output() choose: Subject<{ name: string, description: string }> = new Subject();

  public visibleEntries: Array<{ name: string, description: string }> = [];

  public filter = '';
  public choice!: { name: string, description: string };

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.filterEntries();
  }

  chooseEntry(entry: { name: string, description: string }) {
    if(this.disabledEntries.includes(entry.name)) return;

    this.choice = entry;
  }

  confirmChoice(entry: { name: string, description: string }) {
    this.choose.next(entry);
    this.bsModalRef.hide();
  }

  filterEntries() {
    if(!this.filter) {
      this.visibleEntries = this.entries.slice(0);
      return;
    }

    this.visibleEntries = this.entries.filter(entry => {
      return entry.name.toLowerCase().includes(this.filter.toLowerCase())
          || entry.description.toLowerCase().includes(this.filter.toLowerCase());
    });
  }

}
