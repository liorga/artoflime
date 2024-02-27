import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form group with form controls
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      // Handle the form submission. For example, you might send the form data to your backend server.
      console.log('Form data', this.contactForm.value);
    }
  }
}
