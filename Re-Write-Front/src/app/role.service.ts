import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http : HttpClient) { }

  getAllRoles() {
    return this.http.get('http://localhost:8081/rewrite/api/v1/roles')
  }
}
