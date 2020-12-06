import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Component, Input, EventEmitter, Output } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  @Output() resp: EventEmitter<any> = new EventEmitter<any>();

  loginUser(user: User) {
    return this.http.post("http://localhost:8081/rewrite/api/v1/validate-user", user);
  } 
  resetPassword(user : User) {
    return this.http.put("http://localhost:8081/rewrite/api/v1/password-reset",user);
  } 

  addUser(user: User) {
   
    return this.http.post("http://localhost:8081/rewrite/api/v1/add-user",user);
  } 

  getAllUser() {
    return this.http.get("http://localhost:8081/rewrite/api/v1/get-all-user");
  } 
  getUser(userId) {
    return this.http.get("http://localhost:8081/rewrite/api/v1/get-user/"+userId);
  } 

  addVolunteer(user: User) {
    return this.http.post("http://localhost:8081/rewrite/api/v1/add-volunteer", user);
  } 

  updateUser(user: User) {
    return this.http.put('http://localhost:8081/rewrite/api/v1/update-user', user);
  }
  /*
      delete(id: number) {
          return this.http.delete('/users/' + id);
      } */
}
