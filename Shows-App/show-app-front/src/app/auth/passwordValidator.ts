import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? {
      passwordStrength: {
        hasUpperCase: true,
        hasLowerCase: true,
        hasNumeric: false
      }
    } : null;
  }
}


export function createPasswordStrengthValidatorCONFIRM(controlName, matchingControlName): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    // if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
    //   return;
    // }

    console.log(control, matchingControl);

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
      return { passwordConfirm: "password wont match" };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  }
}


export function checkPasswords(controlName: string, matchingControlName: string): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    const control = group.controls[controlName].value;
    const matchingControl = group.controls[matchingControlName].value;

    let pass = control;// group.get('password').value;
    let confirmPass = matchingControl;//group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
