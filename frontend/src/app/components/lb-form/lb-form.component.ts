import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Archetype, IAbility, ILimitBreak, PrimaryStat, SecondaryStat, Stat } from '../../../../../shared/interfaces';

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
      [PrimaryStat.Attack]: 0,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 0,
      [PrimaryStat.Special]: 0,

      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.HP]: 0,
      [SecondaryStat.MP]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
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
