import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Volunteer } from './models/volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  constructor(private http: HttpClient) { }

  addVolunteer(volunteer: Volunteer) {
    return this.http.post("http://localhost:8081/rewrite/api/v1/add-volunteer", volunteer);
  }
  updateVolunteer(volunteer: Volunteer) {
    return this.http.put("http://localhost:8081/rewrite/api/v1/update-volunteer", volunteer);
  }

  deleteVolunteer(volunteer: Volunteer) {
    return this.http.put("http://localhost:8081/rewrite/api/v1/delete-volunteer", volunteer);
  }
  getVolunteers() {
    return this.http.get("http://localhost:8081/rewrite/api/v1/get-all-volunteer");
  }

  getVolunteer(volunteerId) {
    return this.http.get("http://localhost:8081/rewrite/api/v1/get-volunteer/"+volunteerId);
  }

}
