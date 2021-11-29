import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, } from '@ngx-formly/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { newAbility, newCharacter } from '../../../../../shared/initializers';
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
          type: 'select',
          templateOptions: {
            label: 'Archetype',
            placeholder: 'Choose archetype...',
            description: 'Archetype gives them a rough outline for stat gain.',
            required: true,
            options: [
              { value: 'Archer',    label: 'Archer' },
              { value: 'Attacker',  label: 'Attacker' },
              { value: 'Caster',    label: 'Caster'  },
              { value: 'Defender',  label: 'Defender' },
              { value: 'Healer',    label: 'Healer'  },
            ],
          },
        },
        {
          key: 'weapon',
          className: 'col-3',
          type: 'select',
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
          type: 'select',
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
          type: 'select',
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
      ]
    },
  ];

  constructor(private modal: BsModalService, public mod: ModManagerService) { }

  addSkill() {
    this.model.skills.push({
      name: '',
      description: '',
      actions: [],
      cooldown: 0,
      hpCost: 0,
      mpCost: 0,
      spcCost: 0
    });
  }

  removeSkill(index: number) {
    this.model.skills.splice(index, 1);
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
