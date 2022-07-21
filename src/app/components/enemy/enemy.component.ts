import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { newEnemy } from '../../initializers';
import { Stat } from '@magicconnect/content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';
import { PickerModalComponent } from '../picker-modal/picker-modal.component';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent {

  @Input() model = newEnemy();

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
            description: 'This determines the splash art for the enemy.',
            required: true,
            options: this.mod.allArtData.enemies.map(art => ({ value: art, label: art })),
          },
        },

        {
          key: 'spritesheet',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Base Spritesheet',
            placeholder: 'Choose base spritesheet...',
            description: 'This determines the combat art for the enemy.',
            required: true,
            options: this.mod.allArtData.enemysheets.map(art => ({ value: art, label: art })),
          },
        },
      ]
    },
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

}
