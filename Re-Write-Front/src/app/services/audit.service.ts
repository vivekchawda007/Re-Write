import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

const baseUrl = `${environment.apiUrl}/rewrite/api/v1`;

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http : HttpClient) { }

  getAudits() {
    return this.http.get(baseUrl+"/get-all-audit");
  }
}
