import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, } from '@ngx-formly/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorage } from 'ngx-webstorage';
import { newCharacter } from '../../initializers';
import { Archetype, Stat, StatAllocationMatrix, Weapon } from 'content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';
import { PickerModalComponent } from '../picker-modal/picker-modal.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

  @Input() model = newCharacter();

  form = new FormGroup({});

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter name here...',
            description: 'It should be less than 30 characters.',
            required: true,
            maxLength: 30,
          },
        },
        {
          key: 'archetype',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Archetype',
            placeholder: 'Choose archetype...',
            description: 'Archetype gives them a rough outline for stat gain.',
            required: true,
            options: Object.values(Archetype).filter(Boolean).map(x => ({ value: x, label: x }))
          },
        },
        {
          key: 'weapon',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Weapon',
            placeholder: 'Choose weapon...',
            description: 'This is their only weapon choice.',
            required: true,
            options: [
              { value: Weapon.Axe,             label: 'Axe' },
              { value: Weapon.Bow,             label: 'Bow' },
              { value: Weapon.Dagger,          label: 'Dagger' },
              { value: Weapon.Greatsword,      label: 'Greatsword' },
              { value: Weapon.Knuckles,        label: 'Knuckles' },
              { value: Weapon.Staff,           label: 'Staff' },
              { value: Weapon.SwordAndShield,  label: 'Sword & Shield' },
            ],
          },
        },
        {
          key: 'stars',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Star Rating',
            placeholder: 'Choose star rating...',
            description: 'This determines caps (level, LB, stats).',
            required: true,
            options: [
              { value: 3, label: '★★★' },
              { value: 4, label: '★★★★' },
              { value: 5, label: '★★★★★' },
            ],
          },
        },
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'primaryStat',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Primary Stat',
            placeholder: 'Choose primary stat...',
            description: 'Primary stat is the stat used for basic attacks.',
            required: true,
            options: [
              { value: Stat.Attack,  label: 'Attack' },
              { value: Stat.Defense, label: 'Defense' },
              { value: Stat.Magic,   label: 'Magic' },
              { value: Stat.Special, label: 'Special'  },
            ],
          },
        },

        {
          key: 'art',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Base Art',
            placeholder: 'Choose base art...',
            description: 'This determines the splash art for the character.',
            required: true,
            options: this.mod.allArtData.characters.map(art => ({ value: art, label: art })),
          },
        },

        {
          key: 'spritesheet',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Base Spritesheet',
            placeholder: 'Choose base spritesheet...',
            description: 'This determines the combat art for the character.',
            required: true,
            options: this.mod.allArtData.charactersheets.map(art => ({ value: art, label: art })),
          },
        },
      ]
    },
  ];

  @LocalStorage() showStatTable!: boolean;

  public readonly statTableIncrements = [
    { level: 1,  lb: 0  },
    { level: 1,  lb: 1  },
    { level: 1,  lb: 5  },
    { level: 1,  lb: 10 },
    { level: 10, lb: 0  },
    { level: 10, lb: 1  },
    { level: 10, lb: 5  },
    { level: 10, lb: 10 },
    { level: 30, lb: 0  },
    { level: 30, lb: 1  },
    { level: 30, lb: 5  },
    { level: 30, lb: 10 },
    { level: 50, lb: 0  },
    { level: 50, lb: 1  },
    { level: 50, lb: 5  },
    { level: 50, lb: 10 },
    { level: 60, lb: 0  },
    { level: 60, lb: 1  },
    { level: 60, lb: 5  },
    { level: 60, lb: 10 },
    { level: 70, lb: 0  },
    { level: 70, lb: 1  },
    { level: 70, lb: 5  },
    { level: 70, lb: 10 },
  ];

  constructor(private modal: BsModalService, public mod: ModManagerService) { }

  addSkill() {
    const modalRef = this.modal.show(PickerModalComponent, {
      class: 'modal-lg',
      initialState: { type: 'Skill', entries: this.mod.chooseableSkills, disabledEntries: this.model.skills }
    });

    modalRef.content?.choose.subscribe(choice => {
      this.model.skills.push(choice.id);
    });
  }

  removeSkill(index: number) {
    this.model.skills.splice(index, 1);
  }

  chooseSpecialSkill() {
    const modalRef = this.modal.show(PickerModalComponent, {
      class: 'modal-lg',
      initialState: { type: 'Skill', entries: this.mod.chooseableSkills, disabledEntries: this.model.skills }
    });

    modalRef.content?.choose.subscribe(choice => {
      this.model.specialSkill = choice.id;
    });
  }

  addAbilityGroup() {
    this.model.abilities.push({ name: 'New Ability', abilities: [] });
  }

  removeAbilityGroup(index: number) {
    this.model.abilities.splice(index, 1);
  }

  addAbility(i: number) {
    const modalRef = this.modal.show(PickerModalComponent, {
      class: 'modal-lg',
      initialState: { type: 'Ability', entries: this.mod.chooseableAbilities, disabledEntries: this.model.abilities.map(x => x.abilities).flat() }
    });

    modalRef.content?.choose.subscribe(choice => {
      this.model.abilities[i].abilities.push(choice.name);
    });
  }

  renameAbility(index: number): void {
    const newName = prompt('Enter new name for ability group:');
    if(!newName || !newName.trim()) return;

    this.model.abilities[index].name = newName;
  }

  removeAbility(index: number, childIndex: number) {
    this.model.abilities[index].abilities.splice(childIndex, 1);
  }

  public calculatedStats(level: number, lb: number): Record<Stat, number> {

    const stats = {
      [Stat.Attack]: 0,
      [Stat.Defense]: 0,
      [Stat.Magic]: 0,
      [Stat.Special]: 0,

      [Stat.HP]: 0,
      [Stat.MP]: 0,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    };

    const applyToStats = (modelKey: 'basePoints'|'lbPoints'|'levelPoints', matrix: 'baseStatPoints'|'levelupPoints'|'limitBreakPoints', times = 1) => {

      const model = this.model[modelKey];

      Object.keys(model).forEach(archetype => {
        Object.keys(StatAllocationMatrix[archetype as Archetype][matrix]).forEach(stat => {
          stats[stat as Stat] += model[archetype as Archetype] * StatAllocationMatrix[archetype as Archetype][matrix][stat as Stat] * times;
        });
      });
    };

    applyToStats('basePoints', 'baseStatPoints', 1);

    if(level > 1) {
      applyToStats('levelPoints', 'levelupPoints', level - 1);
    }

    if(lb > 0) {
      applyToStats('lbPoints', 'limitBreakPoints', lb);
    }

    return stats;
  }

}
