import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = '';
  submitted: boolean = false;
  adminLoginForm!: FormGroup;
  isLoggedIn: boolean = false;
  showPassword: boolean = false;
  formSubmitted = false;
  loading: boolean = false;
  constructor(
    private authService: HelperService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.adminLoginForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]], // Mobile number should be 10 digits
      password: ['', Validators.required]
    });
  }

  // get f() { return this.adminLoginForm.controls; }

  onSubmit() {
    this.router.navigate(['/admin','list']);
    this.submitted = true;

    if (this.adminLoginForm.invalid) {
      this.formSubmitted = true;
      return;
    }

    this.authService.login(this.adminLoginForm.value).subscribe({
      next: (response: any) => {
        if (response && response.token) {
          console.log('Login successful', response);
          this.authService.saveToken(response.token, response.data.user_type, response.data.id);
          console.log("Token saved successfully");
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.error('Token missing in response');
          this.error = 'Authentication failed. Please try again.';
        }
      },
      error: (error) => {
        console.log('Login error', error);
        if (error && error.error && error.error.result === false) {
          console.log('Invalid credentials');
          this.error = 'Mobile or password is incorrect';
        } else {
          console.error('Unexpected error occurred during login', error);
          this.error = 'An unexpected error occurred. Please try again later.';
        }
      }
    })

  }


  // logout() {
  //   this.authService.logout();
  //   this.isLoggedIn = false;
  //   this.router.navigate(['/login']);
  // }

  navigateToPage() {
    this.router.navigate(['/reset-password']);
  }

  resetpass() {
    alert('Change Password');
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

