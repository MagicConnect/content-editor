import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CharacterComponent } from './components/character/character.component';
import { EnemyComponent } from './components/enemy/enemy.component';
import { WeaponComponent } from './components/weapon/weapon.component';
import { BannerComponent } from './components/banner/banner.component';
import { ShopComponent } from './components/shop/shop.component';
import { ChipComponent } from './components/chip/chip.component';
import { AbilityFormComponent } from './components/ability-form/ability-form.component';
import { AbilityEffectFormComponent } from './components/ability-effect-form/ability-effect-form.component';
import { AbilityConditionFormComponent } from './components/ability-condition-form/ability-condition-form.component';
import { LbFormComponent } from './components/lb-form/lb-form.component';
import { StatsFormComponent } from './components/stats-form/stats-form.component';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { WeaponListComponent } from './components/weapon-list/weapon-list.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { SkillFormComponent } from './components/skill-form/skill-form.component';
import { SkillActionFormComponent } from './components/skill-action-form/skill-action-form.component';
import { SkillActionEffectFormComponent } from './components/skill-action-effect-form/skill-action-effect-form.component';

import { ModManagerService } from './services/mod-manager.service';
import { WeightedEntryFormComponent } from './components/weighted-entry-form/weighted-entry-form.component';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { EnemyListComponent } from './components/enemy-list/enemy-list.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ItemComponent } from './components/item/item.component';
import { ShopEntryFormComponent } from './components/shop-entry-form/shop-entry-form.component';
import { MapComponent } from './components/map/map.component';
import { BattleComponent } from './components/battle/battle.component';
import { MapListComponent } from './components/map-list/map-list.component';
import { TokenInterceptorService } from './providers/token-interceptor.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AbilityListComponent } from './components/ability-list/ability-list.component';
import { PickerModalComponent } from './components/picker-modal/picker-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    EnemyComponent,
    WeaponComponent,
    BannerComponent,
    ShopComponent,
    ChipComponent,
    AbilityFormComponent,
    AbilityEffectFormComponent,
    AbilityConditionFormComponent,
    LbFormComponent,
    StatsFormComponent,
    ChipListComponent,
    WeaponListComponent,
    CharacterListComponent,
    SkillFormComponent,
    SkillActionFormComponent,
    SkillActionEffectFormComponent,
    WeightedEntryFormComponent,
    BannerListComponent,
    ItemListComponent,
    EnemyListComponent,
    ShopListComponent,
    ItemComponent,
    ShopEntryFormComponent,
    MapComponent,
    BattleComponent,
    MapListComponent,
    AbilityListComponent,
    PickerModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display',
        totalMessage: 'total',
        selectedMessage: 'selected'
      }
    }),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (mod: ModManagerService) => () => {
        mod.init();
        return mod;
      },
      deps: [ModManagerService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
