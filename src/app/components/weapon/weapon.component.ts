import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { newWeapon } from '../../initializers';
import { IWeapon, Stat, Weapon } from 'content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';
import { PickerModalComponent } from '../picker-modal/picker-modal.component';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent {

  @Input() model: IWeapon = newWeapon();

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
          key: 'description',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description here...',
            description: 'It should be less than 500 characters.',
            maxLength: 500,
          },
        },
        {
          key: 'weaponType',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Type',
            placeholder: 'Choose type...',
            description: 'The type of weapon, to be equipped by characters who can use it.',
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
              { value: 1, label: '★' },
              { value: 2, label: '★★' },
              { value: 3, label: '★★★' },
              { value: 4, label: '★★★★' },
              { value: 5, label: '★★★★★' },
              { value: 6, label: '★★★★★★ (Banner Weapon)' },
            ],
            change: (field, $event) => {
              const value = +$event.target.value.split(' ')[1];
              this.model.sellValue = value * value * 100;
            },
          },
        },
      ],
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
            description: 'Primary stat is the only stat boosted by accessories.',
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
          key: 'secondaryStat',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Secondary Stat',
            placeholder: 'Choose secondary stat...',
            description: 'Secondary stat has separate and lesser growth from the main stat.',
            options: [
              { value: '',           label: 'None' },
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
            description: 'This determines the splash art for the weapon.',
            required: true,
            options: this.mod.allArtData.weapons.map(art => ({ value: art, label: art })),
          },
        },
      ]
    }
  ];

  constructor(private modal: BsModalService, public mod: ModManagerService) { }

  addAbility() {
    const modalRef = this.modal.show(PickerModalComponent, {
      class: 'modal-lg',
      initialState: { type: 'Ability', entries: this.mod.chooseableAbilities, disabledEntries: this.model.abilities }
    });

    modalRef.content?.choose.subscribe(choice => {
      this.model.abilities.push(choice.id);
    });
  }

  removeAbility(index: number) {
    this.model.abilities.splice(index, 1);
  }

}
