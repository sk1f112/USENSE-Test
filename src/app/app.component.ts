import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent {
  password: string = '';
  passwordStrength: 'small' | 'empty' | 'weak' | 'medium' | 'strong' = 'empty';

  checkPasswordStrength() {
     if (this.password.length < 8) {
      this.passwordStrength = 'small';
    } else {
      const hasLetters = /[a-zA-Z]/.test(this.password);
      const hasDigits = /[0-9]/.test(this.password);
      const hasSymbols = /[!@#$%^&*]/.test(this.password);

      if (hasLetters && hasDigits && hasSymbols) {
        this.passwordStrength = 'strong';

      } else if (hasLetters && (hasSymbols || hasDigits) || hasDigits && hasSymbols) {
        this.passwordStrength = 'medium';
      } else {
        this.passwordStrength = 'weak';
      }
    }
  }
}
