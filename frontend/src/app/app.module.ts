import { NgModule } from '@angular/core';
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
    StatsFormComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
