import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  addContactForm!: FormGroup;
  constructor(
    private serviceContact: ContactService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addContactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  addContact() {
    if (this.addContactForm.invalid) {
      alert('Please enter all the required fields');
      return;
    }

    this.serviceContact.addContact(this.addContactForm.value).subscribe({
      next: (response: any) => {
        alert('Success');
        this.router.navigate(['/admin', 'list']);
      },
      error: (error: any) => {
        console.log(error.status);
        if (error.status === 400) {
          alert('Error');
        } else {
          alert('An error occurred. Please try again.');
        }
      },
    });
  }
}
