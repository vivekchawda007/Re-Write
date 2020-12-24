import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

const baseUrl = `${environment.apiUrl}/rewrite/api/v1`;

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  currentUser;
  who;
  constructor(private http: HttpClient) { }

  getAllAudits() {


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.who = this.currentUser.currentUser.id;
    const headerDict = {
      'who': this.who
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(baseUrl + "/get-all-audit", requestOptions);
  }

  getAllRegistrarAudits() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.who = this.currentUser.currentUser.id;
    const headerDict = {
      'who': this.who
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(baseUrl + "/get-all-registrar-audit", requestOptions);
  }
  getPdf(audits) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.who = this.currentUser.currentUser.id;
    const headerDict = {
      'who': this.who
    }

    const requestOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post<Blob>(baseUrl + "/generate-pdf", audits, requestOptions);
  }
}
