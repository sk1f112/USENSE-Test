import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  password: string = '';
  
  @Input() passwordStrength: 'small' | 'empty' | 'weak' | 'medium' | 'strong' = 'empty';

  constructor() {}

  private propagateChange: any = () => {};

  writeValue(value: string): void {
    if (value !== undefined) {
      this.password = value;
      this.checkPasswordStrength(value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  onInputChange(value: string): void {
    this.password = value;
    this.checkPasswordStrength(value);
    this.propagateChange(value);
  }

  checkPasswordStrength(password: string): void {
    if (password.length < 8) {
      this.passwordStrength = 'small';
    } else {
      const hasLatinLetters = /[a-zA-Z]/.test(password);
      const hasCyrillicLetters = /[а-яА-ЯёЁ]/.test(password);
      const hasDigits = /[0-9]/.test(password);
      const hasSymbols = /[!@#$%^&*]/.test(password);
  
      if ((hasLatinLetters || hasCyrillicLetters) && hasDigits && hasSymbols) {
        this.passwordStrength = 'strong';
      } else if ((hasLatinLetters || hasCyrillicLetters) && (hasSymbols || hasDigits) || hasDigits && hasSymbols) {
        this.passwordStrength = 'medium';
      } else {
        this.passwordStrength = 'weak';
      }
    }
  
    console.log(`Password Strength: ${this.passwordStrength}`);
  }
}
