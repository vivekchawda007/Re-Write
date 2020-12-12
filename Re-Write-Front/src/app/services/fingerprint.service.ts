import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FingerprintService {

  constructor(private http : HttpClient) { }

  getFingerPrint(body) {
    return this.http.post("https://localhost:8443/SGIFPCapture",body);
  } 

  matchFingerPrint(body) {
    return this.http.post("http://localhost:8081/rewrite/api/v1/match-fingerprint",body);
  } 

}
