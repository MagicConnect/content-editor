import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModManagerService } from 'src/app/services/mod-manager.service';
import { newCalendarBonus } from '../../initializers';


@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {

  public searchText = '';
  public searchResults: ICalendarBonus[] = [];

  private allCalendarBonuses: ICalendarBonus[] = [];

  public calendarBonuses: ICalendarBonus[] = [];

  public currentCalendarBonus?: ICalendarBonus;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentCalendarBonus(): boolean {
    if(!this.currentCalendarBonus) return false;
    return this.currentCalendarBonus.name?.length >= 2
        && !this.isCurrentCalendarBonusDuplicateName
        && this.currentCalendarBonus.rewardItems.length > 0
        && this.currentCalendarBonus.rewardItems.every(c => !!c.itemType && c.quantity > 0);
  }

  public get isCurrentCalendarBonusClone(): boolean {
    if(!this.currentCalendarBonus) return false;
    return this.currentCalendarBonus.name.includes('(Clone)');
  }

  public get isCurrentCalendarBonusDuplicateName(): boolean {
    if(!this.currentCalendarBonus) return false;
    return !!this.calendarBonuses.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentShop?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.calendarBonuses$.subscribe(calendarBonuses => {
      this.calendarBonuses = this.allCalendarBonuses = [...calendarBonuses];
      this.filter();
    });
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allCalendarBonuses.slice(0);
      return;
    }

    this.searchResults = this.allCalendarBonuses.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.description.toLowerCase().includes(this.searchText.toLowerCase())
          || a.rewardItems.some(b => b.itemType.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewCalendarBonus(template: TemplateRef<any>) {
    this.currentCalendarBonus = newCalendarBonus();

    this.openEditModal(template);
  }

  cloneCalendarBonus(template: TemplateRef<any>, calendarBonus: ICalendarBonus) {
    this.currentCalendarBonus = cloneDeep(calendarBonus);
    this.currentCalendarBonus.name = `${this.currentCalendarBonus.name} (Clone)`;
    this.mod.rerollID(this.currentCalendarBonus);
    this.openEditModal(template);
  }

  editCalendarBonus(template: TemplateRef<any>, calendarBonus: ICalendarBonus) {
    this.currentCalendarBonus = cloneDeep(calendarBonus);
    this.openEditModal(template);
    this.editIndex = this.allCalendarBonuses.findIndex(i => i.name === calendarBonus.name);
  }

  confirmCalendarBonusEdit() {
    if(!this.currentCalendarBonus || !this.currentCalendarBonus.name) return;

    if(this.editIndex === -1) {
      this.mod.addCalendarBonus(this.currentCalendarBonus);
    } else {
      this.mod.editCalendarBonus(this.currentCalendarBonus, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteCalendarBonus(calendarBonus: ICalendarBonus) {
    if(!confirm('Are you sure you want to delete this calendar bonus?')) return;

    this.mod.deleteCalendarBonus(calendarBonus);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentCalendarBonus = undefined;
    this.editIndex = -1;
  }

}
