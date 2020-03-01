import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() label: string;
  @Input() form: FormControl;
  @Input() errors: {};

  constructor() { }

  public updateValue(value: any) {
    this.form.markAsTouched();
    this.form.patchValue(value);
  }

}
