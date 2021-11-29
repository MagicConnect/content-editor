import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IBanner, ICharacter, IShop } from '../../../../../shared/interfaces';
import { newCharacter } from '../../../../../shared/initializers';
import { ModManagerService } from '../../services/mod-manager.service';

import { cloneDeep, sum } from 'lodash';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  private allCharacters: ICharacter[] = [];

  public characters: ICharacter[] = [];
  public banners: IBanner[] = [];
  public shops: IShop[] = [];

  public currentCharacter?: ICharacter;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentCharacter(): boolean {
    if(!this.currentCharacter) return false;
    return this.currentCharacter.name?.length >= 2
        && !this.isCurrentCharacterDuplicateName
        && this.currentCharacter.primaryStat
        && this.currentCharacter.weapon
        && this.currentCharacter.archetype
        && this.currentCharacter.stars >= 3
        && this.currentCharacter.skills.length >= 1
        && this.currentCharacter.specialSkill.name.length >= 2
        && sum(Object.values(this.currentCharacter.basePoints)) > 0
        && sum(Object.values(this.currentCharacter.levelPoints)) > 0
        && sum(Object.values(this.currentCharacter.lbPoints)) > 0;
  }

  public get isCurrentCharacterDuplicateName(): boolean {
    if(!this.currentCharacter) return false;
    return !!this.characters.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentCharacter?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.characters$.subscribe(characters => this.characters = this.allCharacters = [...characters]);
    this.mod.banners$.subscribe(banners => this.banners = [...banners]);
    this.mod.shops$.subscribe(shops => this.shops = [...shops]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewCharacter(template: TemplateRef<any>) {
    this.currentCharacter = newCharacter();

    this.openEditModal(template);
  }

  editCharacter(template: TemplateRef<any>, character: ICharacter) {
    this.currentCharacter = cloneDeep(character);
    this.openEditModal(template);
    this.editIndex = this.allCharacters.findIndex(i => i.name === character.name);
  }

  confirmCharacterEdit() {
    if(!this.currentCharacter || !this.currentCharacter.name) return;

    if(this.editIndex === -1) {
      this.mod.addCharacter(this.currentCharacter);
    } else {
      this.mod.editCharacter(this.currentCharacter, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteCharacter(character: ICharacter) {
    if(!confirm('Are you sure you want to delete this character?')) return;

    this.mod.deleteCharacter(character);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentCharacter = undefined;
    this.editIndex = -1;
  }

  characterCurrentlyUsedIn(character: ICharacter): string[] {
    const banners = this.banners.filter(banner => banner.characters.find(c => c.name === character.name)).map(b => `Banner: ${b.name}`);

    const shops = this.shops.filter(shop => shop.characters.find(c => c.name === character.name)).map(s => `Shop: ${s.name}`);

    return [...banners, ...shops];
  }

  isCharacterCurrentlyInUse(character: ICharacter): boolean {
    return this.characterCurrentlyUsedIn(character).length > 0;
  }

}
