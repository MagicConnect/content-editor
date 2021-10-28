import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Archetype, IAbility, ILimitBreak, Stat } from '../../../../../shared/interfaces';

import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-lb-form',
  templateUrl: './lb-form.component.html',
  styleUrls: ['./lb-form.component.scss']
})
export class LbFormComponent {

  @Input() model: ILimitBreak = {
    abilities: {},
    statPoints: {
      [Archetype.Archer]: 0,
      [Archetype.Attacker]: 0,
      [Archetype.Caster]: 0,
      [Archetype.Defender]: 0,
      [Archetype.Healer]: 0,
    },
    stats: {
      [Stat.Attack]: 0,
      [Stat.Defense]: 0,
      [Stat.Magic]: 0,
      [Stat.Special]: 0,

      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.HP]: 0,
      [Stat.MP]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },
    skills: {}
  };

  @Input() allowAbilities = true;
  @Input() allowStats = false;
  @Input() allowSkills = false;

  @Input() existingAbilities: IAbility[] = [];

  @Output() addAbility = new EventEmitter();

  public activeLB = 0;

  constructor() { }

  removeLBAbility(index: number) {
    if(!this.model.abilities[this.activeLB]) return;

    this.model.abilities[this.activeLB].splice(index, 1);
  }

  copyAbilityToLB(ability: IAbility) {
    const abilities = this.model.abilities[this.activeLB] || [];
    this.model.abilities[this.activeLB] = abilities;

    abilities.push(cloneDeep(ability));
  }

}
