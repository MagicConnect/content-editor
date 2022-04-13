import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { NgSelectModule } from '@ng-select/ng-select';
import { HotToastModule } from '@ngneat/hot-toast';

import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClipboardModule } from 'ngx-clipboard';

import { ModManagerService } from './services/mod-manager.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { CharacterComponent } from './components/character/character.component';
import { EnemyComponent } from './components/enemy/enemy.component';
import { WeaponComponent } from './components/weapon/weapon.component';
import { BannerComponent } from './components/banner/banner.component';
import { ShopComponent } from './components/shop/shop.component';
import { AccessoryComponent } from './components/accessory/accessory.component';
import { AbilityFormComponent } from './components/ability-form/ability-form.component';
import { AbilityEffectFormComponent } from './components/ability-effect-form/ability-effect-form.component';
import { AbilityConditionFormComponent } from './components/ability-condition-form/ability-condition-form.component';
import { StatsFormComponent } from './components/stats-form/stats-form.component';
import { AccessoryListComponent } from './components/accessory-list/accessory-list.component';
import { WeaponListComponent } from './components/weapon-list/weapon-list.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { SkillFormComponent } from './components/skill-form/skill-form.component';
import { SkillActionFormComponent } from './components/skill-action-form/skill-action-form.component';
import { SkillActionEffectFormComponent } from './components/skill-action-effect-form/skill-action-effect-form.component';

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
import { AbilityListComponent } from './components/ability-list/ability-list.component';
import { PickerModalComponent } from './components/picker-modal/picker-modal.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { BattleDropFormComponent } from './components/battle-drop-form/battle-drop-form.component';
import { BetterSelectComponent } from './components/_shared/better-select/better-select.component';
import { BackgroundImageComponent } from './components/_shared/background-image/background-image.component';
import { AbilityContentFormComponent } from './components/ability-content-form/ability-content-form.component';
import { InfoAbilityComponent } from './components/info-ability/info-ability.component';
import { InfoSkillComponent } from './components/info-skill/info-skill.component';
import { InfoItemComponent } from './components/info-item/info-item.component';
import { InfoEnemyComponent } from './components/info-enemy/info-enemy.component';
import { ElementQuantityFormComponent } from './components/element-quantity-form/element-quantity-form.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { AchievementListComponent } from './components/achievement-list/achievement-list.component';
import { AchievementRewardEntryFormComponent } from './components/achievement-reward-entry-form/achievement-reward-entry-form.component';
import { SpritesheetUnitFormComponent } from './components/spritesheet-unit-form/spritesheet-unit-form.component';
import { SpritesheetAnimationComponent } from './components/_shared/spritesheet-animation/spritesheet-animation.component';
import { SpritesheetAnimationGroupComponent } from './components/_shared/spritesheet-animation-group/spritesheet-animation-group.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    EnemyComponent,
    WeaponComponent,
    BannerComponent,
    ShopComponent,
    AccessoryComponent,
    AbilityFormComponent,
    AbilityEffectFormComponent,
    AbilityConditionFormComponent,
    StatsFormComponent,
    AccessoryListComponent,
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
    PickerModalComponent,
    SkillListComponent,
    BattleDropFormComponent,
    BetterSelectComponent,
    BackgroundImageComponent,
    AbilityContentFormComponent,
    InfoAbilityComponent,
    InfoSkillComponent,
    InfoItemComponent,
    InfoEnemyComponent,
    ElementQuantityFormComponent,
    AchievementComponent,
    AchievementListComponent,
    AchievementRewardEntryFormComponent,
    SpritesheetUnitFormComponent,
    SpritesheetAnimationComponent,
    SpritesheetAnimationGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgSelectModule,
    FormlySelectModule,
    FormlyModule.forRoot({
      types: [{
        name: 'better-select',
        component: BetterSelectComponent,
        wrappers: ['form-field']
      }],
      extras: { lazyRender: true }
    }),
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
    TooltipModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ClipboardModule,
    HotToastModule.forRoot()
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
