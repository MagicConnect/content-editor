import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterComponent } from './components/character/character.component';
import { EnemyComponent } from './components/enemy/enemy.component';
import { WeaponComponent } from './components/weapon/weapon.component';
import { BannerComponent } from './components/banner/banner.component';
import { EventComponent } from './components/event/event.component';
import { ChipComponent } from './components/chip/chip.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AbilityFormComponent } from './components/ability-form/ability-form.component';
import { AbilityEffectFormComponent } from './components/ability-effect-form/ability-effect-form.component';
import { AbilityConditionFormComponent } from './components/ability-condition-form/ability-condition-form.component';

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
    AbilityConditionFormComponent
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
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
