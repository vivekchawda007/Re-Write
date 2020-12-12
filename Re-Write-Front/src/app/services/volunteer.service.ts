import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Volunteer } from '../models/volunteer';
const baseUrl = `${environment.apiUrl}/rewrite/api/v1`;
@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  constructor(private http: HttpClient) { }

  addVolunteer(volunteer: Volunteer) {
    return this.http.post(baseUrl+"/add-volunteer", volunteer);
  }
  updateVolunteer(volunteer: Volunteer) {
    return this.http.put(baseUrl+"/update-volunteer", volunteer);
  }

  deleteVolunteer(volunteer: Volunteer) {
    return this.http.put(baseUrl+"/delete-volunteer", volunteer);
  }
  getVolunteers() {
    return this.http.get(baseUrl+"/get-all-volunteer");
  }

  getVolunteer(volunteerId) {
    return this.http.get(baseUrl+"/get-volunteer/"+volunteerId);
  }

}
