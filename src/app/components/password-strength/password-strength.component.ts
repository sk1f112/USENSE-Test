import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent {
  @Input() passwordStrength: 'small' | 'empty' | 'weak' | 'medium' | 'strong' = 'empty';
}