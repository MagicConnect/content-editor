import { Component, Input, OnInit } from '@angular/core';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss']
})
export class InfoItemComponent implements OnInit {

  @Input() id = '';

  public name = '';

  constructor(private mod: ModManagerService) { }

  ngOnInit(): void {
    this.name = this.mod.filteredItems.find(x => x.id === this.id)?.name ?? 'UNKNOWN';
  }

}
