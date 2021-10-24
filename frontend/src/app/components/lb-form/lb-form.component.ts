import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILimitBreak, Stat } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-lb-form',
  templateUrl: './lb-form.component.html',
  styleUrls: ['./lb-form.component.scss']
})
export class LbFormComponent {

  @Input() model: ILimitBreak = {
    abilities: {},
    stats: {},
    skills: {}
  };

  @Input() allowAbilities = true;
  @Input() allowStats = false;
  @Input() allowSkills = false;

  @Output() addAbility = new EventEmitter();

  public activeLB = 0;

  constructor() { }

  hasStatsGT0(): boolean {
    const stats: Record<Stat, number> = this.model.stats || {};
    if(!stats) return false;
    return (Object.values(stats) as number[]).some(val => val > 0);
  }

  removeLBAbility(index: number) {
    if(this.model.abilities[this.activeLB]) return;

    this.model.abilities[this.activeLB].splice(index, 1);
  }

}
