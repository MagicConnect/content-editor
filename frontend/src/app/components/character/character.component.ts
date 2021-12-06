import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, } from '@ngx-formly/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { newCharacter } from '../../../../../shared/initializers';
import { Stat } from '../../../../../shared/interfaces';
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
            options: [
              { value: 'Attacker',  label: 'Attacker' },
              { value: 'Caster',    label: 'Caster'  },
              { value: 'Defender',  label: 'Defender' },
              { value: 'Healer',    label: 'Healer'  },
              { value: 'Ranger',    label: 'Ranger' }
            ],
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
              { value: 'Axe',             label: 'Axe' },
              { value: 'Bow',             label: 'Bow' },
              { value: 'Dagger',          label: 'Dagger' },
              { value: 'Greatsword',      label: 'Greatsword' },
              { value: 'Knuckles',        label: 'Knuckles' },
              { value: 'Staff',           label: 'Staff' },
              { value: 'SwordAndShield',  label: 'Sword & Shield' },
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

  constructor(private modal: BsModalService, public mod: ModManagerService) { }

  addSkill() {
    const modalRef = this.modal.show(PickerModalComponent, {
      class: 'modal-lg',
      initialState: { type: 'Skill', entries: this.mod.chooseableSkills, disabledEntries: this.model.skills }
    });

    modalRef.content?.choose.subscribe(choice => {
      this.model.skills.push(choice.name);
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
      this.model.specialSkill = choice.name;
    });
  }

  addAbility() {
    const modalRef = this.modal.show(PickerModalComponent, {
      class: 'modal-lg',
      initialState: { type: 'Ability', entries: this.mod.chooseableAbilities, disabledEntries: this.model.abilities }
    });

    modalRef.content?.choose.subscribe(choice => {
      this.model.abilities.push(choice.name);
    });
  }

  removeAbility(index: number) {
    this.model.abilities.splice(index, 1);
  }

}
