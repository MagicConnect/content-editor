import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Element } from '@magicconnect/content-interfaces';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-element-quantity-form',
  templateUrl: './element-quantity-form.component.html',
  styleUrls: ['./element-quantity-form.component.scss']
})
export class ElementQuantityFormComponent implements OnInit, OnChanges, OnDestroy {

  private watcher$!: Subscription;

  form = new FormGroup({});

  @Input() disabled = false;

  @Input() model: Record<Element, number> = {
    [Element.Dark]: 0,
    [Element.Earth]: 0,
    [Element.Fire]: 0,
    [Element.Ice]: 0,
    [Element.Light]: 0,
    [Element.Thunder]: 0,
    [Element.Neutral]: 0,
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [Element.Dark, Element.Earth, Element.Fire, Element.Ice, Element.Light, Element.Thunder].map(element => ({
        key: element,
        className: 'col-2',
        type: 'input',
        templateOptions: {
          label: element,
          placeholder: `Choose ${element} value...`
        },
      }))
    }
  ];

  constructor() {}

  ngOnInit() {
    this.watcher$ = interval(1000).subscribe(() => {
      Object.keys(this.model).forEach(element => {
        this.form.get(element)?.setValue(this.model[element as Element] ?? 0);
      });
    });

    setTimeout(() => {
      this.setFieldsEnableOrDisable(this.disabled);
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    const isDisabled = !!changes.disabled?.currentValue;
    this.setFieldsEnableOrDisable(isDisabled);
  }

  ngOnDestroy() {
    if(this.watcher$) this.watcher$.unsubscribe();
  }

  private setFieldsEnableOrDisable(isDisabled: boolean) {
    this.fields.forEach(field => {
      if(!field.formControl) return;

      if(isDisabled) {
        field.formControl.disable();
        return;
      }

      field.formControl.enable();
    });
  }

}
