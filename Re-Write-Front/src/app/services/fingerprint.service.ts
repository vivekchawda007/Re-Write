import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const baseUrl = `${environment.apiUrl}/rewrite/api/v1`;
const secugen = `${environment.secugenUrl}`;
@Injectable({
  providedIn: 'root'
})
export class FingerprintService {

  constructor(private http : HttpClient) { }

  getFingerPrint(body) {
    return this.http.post(secugen,body);
  } 

  matchFingerPrint(body) {
    return this.http.post(baseUrl+"/match-fingerprint",body);
  } 

}
