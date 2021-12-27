import { Component, Input, OnInit } from '@angular/core';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-info-skill',
  templateUrl: './info-skill.component.html',
  styleUrls: ['./info-skill.component.scss']
})
export class InfoSkillComponent implements OnInit {

  @Input() id = '';

  public name = '';
  public desc = '';

  constructor(private mod: ModManagerService) { }

  ngOnInit(): void {
    this.name = this.id; // this.mod.chooseableSkills.find(x => x.id === this.id)?.name ?? 'UNKNOWN';
    this.desc = this.mod.getSkillDescription(this.id);
  }

}
