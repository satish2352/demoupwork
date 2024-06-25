
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/contact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filterList:any;
  addContactForm!: FormGroup;
  constructor(
    private serviceContact: ContactService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.serviceContact.getAllContact().subscribe({
      next: (response: any) => {
        this.filterList = response
        this.router.navigate(['/admin','list']);
      },
      error: (error: any) => {
        console.log(error.status);
        if (error.status === 400) {
          alert('Error');
        } else {
          alert('An error occurred. Please try again.');
        }
      }
    });
  }

  // daleteContact

  
}
