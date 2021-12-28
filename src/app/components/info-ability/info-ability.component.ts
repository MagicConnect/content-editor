import { Component, Input, OnInit } from '@angular/core';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-info-ability',
  templateUrl: './info-ability.component.html',
  styleUrls: ['./info-ability.component.scss']
})
export class InfoAbilityComponent implements OnInit {

  @Input() id = '';

  public name = '';
  public desc = '';

  constructor(private mod: ModManagerService) { }

  ngOnInit(): void {
    this.name = this.mod.chooseableAbilities.find(x => x.id === this.id)?.name ?? 'UNKNOWN';
    this.desc = this.mod.getAbilityDescription(this.id);
  }

}
