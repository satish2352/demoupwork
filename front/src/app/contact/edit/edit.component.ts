import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  addContactForm!: FormGroup;
  editdata: any;
  constructor(
    private serviceContact: ContactService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addContactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });

    this.serviceContact.editContact(this.editdata).subscribe({
      next: (response: any) => {
        this.addContactForm.patchValue({
          name: response.name,
          email: response.email,
          phone: response.phone,
        });
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

  updateContact() {
    if (this.addContactForm.invalid) {
      alert('Please enter all the required fields');
      return;
    }

    var data = {
      name: this.addContactForm.value.name,
      email: this.addContactForm.value.email,
      phone: this.addContactForm.value.phone,
      id: this.editdata,
    };

    this.serviceContact.updateContact(data).subscribe({
      next: (response: any) => {
        alert('Contact Details Updated');
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
