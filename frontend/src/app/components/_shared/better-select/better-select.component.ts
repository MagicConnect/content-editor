import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-better-select',
  templateUrl: './better-select.component.html',
  styleUrls: ['./better-select.component.scss']
})
export class BetterSelectComponent extends FieldType {
  formControl!: FormControl;
}
