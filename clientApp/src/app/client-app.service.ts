import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contacts } from './contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ClientAppService {
  readonly baseUri = "https://localhost:44390/api";
  contsub: BehaviorSubject<any> = new BehaviorSubject(false);
  public contactsServiceDetails!: Contacts;
  constructor(private http: HttpClient) { }

  getContactList() {
    return this.http.get<Contacts[]>(this.baseUri + '/Angular');
  }

  addOrUpdateContacts(cont: Contacts) {
    return this.http.post(this.baseUri + '/Angular', cont)
  }
}
