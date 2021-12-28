import { Component, Input, OnInit } from '@angular/core';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-info-enemy',
  templateUrl: './info-enemy.component.html',
  styleUrls: ['./info-enemy.component.scss']
})
export class InfoEnemyComponent implements OnInit {

  @Input() id = '';
  @Input() level = -1;

  public name = '';

  constructor(private mod: ModManagerService) { }

  ngOnInit(): void {
    this.name = this.mod.filteredEnemies.find(x => x.id === this.id)?.name ?? 'UNKNOWN';
  }

}
