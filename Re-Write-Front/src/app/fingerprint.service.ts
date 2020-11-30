import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FingerprintService {

  constructor(private http : HttpClient) { }

  getFingerPrint() {
    return this.http.get("http://localhost:8081/rewrite/api/v1/get-fingerprint");
  } 

}
