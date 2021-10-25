import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CharacterComponent } from './components/character/character.component';
import { EnemyComponent } from './components/enemy/enemy.component';
import { WeaponComponent } from './components/weapon/weapon.component';
import { BannerComponent } from './components/banner/banner.component';
import { EventComponent } from './components/event/event.component';
import { ChipComponent } from './components/chip/chip.component';
import { AbilityFormComponent } from './components/ability-form/ability-form.component';
import { AbilityEffectFormComponent } from './components/ability-effect-form/ability-effect-form.component';
import { AbilityConditionFormComponent } from './components/ability-condition-form/ability-condition-form.component';
import { LbFormComponent } from './components/lb-form/lb-form.component';
import { StatsFormComponent } from './components/stats-form/stats-form.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModManagerService } from './services/mod-manager.service';
import { WeaponListComponent } from './components/weapon-list/weapon-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    EnemyComponent,
    WeaponComponent,
    BannerComponent,
    EventComponent,
    ChipComponent,
    AbilityFormComponent,
    AbilityEffectFormComponent,
    AbilityConditionFormComponent,
    LbFormComponent,
    StatsFormComponent,
    ChipListComponent,
    WeaponListComponent
  ],
  imports: [
    BrowserModule,
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
    BsDropdownModule.forRoot()
  ],
  providers: [
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
