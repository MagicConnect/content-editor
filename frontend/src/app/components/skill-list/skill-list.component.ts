import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newSkill } from '../../../../../shared/initializers';
import { ICharacter, IEnemy, ISkill } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

  private allSkills: ISkill[] = [];

  public skills: ISkill[] = [];
  public characters: ICharacter[] = [];
  public enemies: IEnemy[] = [];

  public currentSkill?: ISkill;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentSkill(): boolean {
    if(!this.currentSkill) return false;

    return this.currentSkill.name?.length >= 2
        && !this.isCurrentSkillDuplicateName
        && this.currentSkill.actions.length > 0;
  }

  public get isCurrentSkillDuplicateName(): boolean {
    if(!this.currentSkill) return false;
    return !!this.skills.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentSkill?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.skills$.subscribe(skills => this.skills = this.allSkills = [...skills]);
    this.mod.characters$.subscribe(characters => this.characters = [...characters]);
    this.mod.enemies$.subscribe(enemies => this.enemies = [...enemies]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewSkill(template: TemplateRef<any>) {
    this.currentSkill = newSkill();

    this.openEditModal(template);
  }

  editSkill(template: TemplateRef<any>, skill: ISkill) {
    this.currentSkill = cloneDeep(skill);
    this.openEditModal(template);
    this.editIndex = this.allSkills.findIndex(i => i.name === skill.name);
  }

  confirmSkillEdit() {
    if(!this.currentSkill || !this.currentSkill.name) return;

    if(this.editIndex === -1) {
      this.mod.addSkill(this.currentSkill);
    } else {
      this.mod.editSkill(this.currentSkill, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteSkill(skill: ISkill) {
    if(!confirm('Are you sure you want to delete this skill?')) return;

    this.mod.deleteSkill(skill);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentSkill = undefined;
    this.editIndex = -1;
  }

  isSkillCurrentlyInUse(skill: ISkill): boolean {
    return this.skillCurrentlyUsedIn(skill).length > 0;
  }

  skillCurrentlyUsedIn(skill: ISkill): string[] {
    const characters = this.characters.filter(c => c.skills.includes(skill.name)).map(b => `Character: ${b.name}`);

    const enemies = this.enemies.filter(c => c.skills.includes(skill.name)).map(b => `Enemy: ${b.name}`);

    return [...characters, ...enemies];
  }

}
