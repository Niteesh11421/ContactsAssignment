import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientAppService } from '../client-app.service';
import { Contacts } from '../contacts.model';

@Component({
  selector: 'app-add-edit-contacts',
  templateUrl: './add-edit-contacts.component.html',
  styleUrls: ['./add-edit-contacts.component.css']
})
export class AddEditContactsComponent {
  formContact: any;
  Id: any;

  constructor(private clientappservice: ClientAppService, private router: Router) {
    this.buildForm();
    this.fetchContactDetails();
  }

  ngOnInit() {

  }

  buildForm() {
    this.formContact = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      State: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      PostalCode: new FormControl('', [Validators.required]),
    });
  }

  fetchContactDetails() {
    if (this.clientappservice.contactsServiceDetails) {
      this.Id = this.clientappservice.contactsServiceDetails.Id;
      this.formContact.get('FirstName').setValue(this.clientappservice.contactsServiceDetails.FirstName);
      this.formContact.get('LastName').setValue(this.clientappservice.contactsServiceDetails.LastName);
      this.formContact.get('Email').setValue(this.clientappservice.contactsServiceDetails.Email);
      this.formContact.get('PhoneNumber').setValue(this.clientappservice.contactsServiceDetails.PhoneNumber);
      this.formContact.get('Address').setValue(this.clientappservice.contactsServiceDetails.Address);
      this.formContact.get('City').setValue(this.clientappservice.contactsServiceDetails.City);
      this.formContact.get('State').setValue(this.clientappservice.contactsServiceDetails.State);
      this.formContact.get('Country').setValue(this.clientappservice.contactsServiceDetails.Country);
      this.formContact.get('PostalCode').setValue(this.clientappservice.contactsServiceDetails.PostalCode);
    }
  }

  addOrEditContact() {
    let contactValues: Contacts = this.formContact.value;
    if (this.clientappservice.contactsServiceDetails && this.clientappservice.contactsServiceDetails.Id) {
      contactValues.Id = this.clientappservice.contactsServiceDetails.Id;
    } else {
      contactValues.Id = 0;
    }
    this.clientappservice.addOrUpdateContacts(contactValues).subscribe((result: any) => {
      this.router.navigate(['/contactslist']);
    });
  }
}
