import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newAbility } from '../../../../../shared/initializers';
import { IAbility, ICharacter, IChip, IEnemy, IWeapon } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-ability-list',
  templateUrl: './ability-list.component.html',
  styleUrls: ['./ability-list.component.scss']
})
export class AbilityListComponent implements OnInit {

  public searchText = '';
  public searchResults: IAbility[] = [];

  private allAbilities: IAbility[] = [];

  public abilities: IAbility[] = [];
  public characters: ICharacter[] = [];
  public chips: IChip[] = [];
  public enemies: IEnemy[] = [];
  public weapons: IWeapon[] = [];

  public currentAbility?: IAbility;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentAbility(): boolean {
    if(!this.currentAbility) return false;

    return this.currentAbility.name?.length >= 2
        && !this.isCurrentAbilityDuplicateName
        && this.currentAbility.effects.length > 0
        && this.currentAbility.effects.every(e => e.value && e.target)
        && this.currentAbility.conditions.every(e => e.value)
        && Object.values(this.currentAbility.lbChanges).every(lb => {
          if(lb.shouldHide) return true;

          return lb.effects.length > 0
              && lb.effects.every(e => e.value && e.target)
              && lb.conditions.every(e => e.value);
        });
  }

  public get isCurrentAbilityDuplicateName(): boolean {
    if(!this.currentAbility) return false;
    return !!this.abilities.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentAbility?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.abilities$.subscribe(abilities => {
      this.abilities = this.allAbilities = [...abilities];
      this.filter();
    });

    this.mod.characters$.subscribe(characters => this.characters = [...characters]);
    this.mod.chips$.subscribe(chips => this.chips = [...chips]);
    this.mod.enemies$.subscribe(enemies => this.enemies = [...enemies]);
    this.mod.weapons$.subscribe(weapons => this.weapons = [...weapons]);
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allAbilities.slice(0);
      return;
    }

    this.searchResults = this.allAbilities.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.description.toLowerCase().includes(this.searchText.toLowerCase())
          || this.abilityCurrentlyUsedIn(a).join(', ').toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewAbility(template: TemplateRef<any>) {
    this.currentAbility = newAbility();

    this.openEditModal(template);
  }

  editAbility(template: TemplateRef<any>, ability: IAbility) {
    this.currentAbility = cloneDeep(ability);
    this.openEditModal(template);
    this.editIndex = this.allAbilities.findIndex(i => i.name === ability.name);
  }

  confirmAbilityEdit() {
    if(!this.currentAbility || !this.currentAbility.name) return;

    if(this.editIndex === -1) {
      this.mod.addAbility(this.currentAbility);
    } else {
      this.mod.editAbility(this.currentAbility, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteAbility(ability: IAbility) {
    if(!confirm('Are you sure you want to delete this ability?')) return;

    this.mod.deleteAbility(ability);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentAbility = undefined;
    this.editIndex = -1;
  }

  isAbilityCurrentlyInUse(ability: IAbility): boolean {
    return this.abilityCurrentlyUsedIn(ability).length > 0;
  }

  abilityCurrentlyUsedIn(ability: IAbility): string[] {
    const characters = this.characters.filter(c => c.abilities.includes(ability.name)).map(b => `Character: ${b.name}`);

    const chips = this.chips.filter(c => c.abilities.includes(ability.name)).map(b => `Chip: ${b.name}`);

    const enemies = this.enemies.filter(c => c.abilities.includes(ability.name)).map(b => `Enemy: ${b.name}`);

    const weapons = this.weapons.filter(c => c.abilities.includes(ability.name)).map(b => `Weapon: ${b.name}`);

    return [...characters, ...chips, ...enemies, ...weapons];
  }

}
