import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Volunteer } from '../models/volunteer';
const baseUrl = `${environment.apiUrl}/rewrite/api/v1`;
@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  currentUser;
  who;
  requestOptions;
  constructor(private http: HttpClient) {

    
   }

  addVolunteer(volunteer: Volunteer) {
    return this.http.post(baseUrl+"/add-volunteer", volunteer);
  }
  updateVolunteer(volunteer: Volunteer) {
    return this.http.put(baseUrl+"/update-volunteer", volunteer);
  }

  blockVolunteer(volunteer: Volunteer) {
    return this.http.put(baseUrl+"/block-volunteer", volunteer);
  }

  deleteVolunteer(volunteer: Volunteer) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.who = this.currentUser.currentUser.id;
    const headerDict = {
      'who':this.who
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.put(baseUrl+"/delete-volunteer", volunteer,requestOptions);
  }
  getVolunteers() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.who = this.currentUser.currentUser.id;
    const headerDict = {
      'who':this.who
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(baseUrl+"/get-all-volunteer",requestOptions);
  }

  getVolunteer(volunteerId) {
    
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.who = this.currentUser.currentUser.id;
    const headerDict = {
      'who':this.who
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(baseUrl+"/get-volunteer/"+volunteerId,requestOptions);
  }

}
