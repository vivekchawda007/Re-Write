import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

const baseUrl = `${environment.apiUrl}/rewrite/api/v1`;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  getStats() {
    return this.http.get(baseUrl+"/get-stats");
  }
}
