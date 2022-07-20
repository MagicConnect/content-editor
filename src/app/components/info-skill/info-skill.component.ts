import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-info-skill',
  templateUrl: './info-skill.component.html',
  styleUrls: ['./info-skill.component.scss']
})
export class InfoSkillComponent implements OnInit, OnChanges {

  @Input() id = '';

  public name = '';
  public desc = '';

  constructor(private mod: ModManagerService) { }

  ngOnInit(): void {
    this.setupNameAndDesc();
  }

  ngOnChanges(changes: any) {
    if(!changes.id) return;

    this.setupNameAndDesc();
  }

  private setupNameAndDesc() {
    this.name = this.mod.chooseableSkills.find(x => x.id === this.id)?.name ?? 'UNKNOWN';
    this.desc = this.mod.getSkillDescription(this.id);
  }

}
