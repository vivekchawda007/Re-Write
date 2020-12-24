import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Component, Input, EventEmitter, Output } from "@angular/core";


import { User } from "../models/user";
import { environment } from '../../environments/environment'

const baseUrl = `${environment.apiUrl}/rewrite/api/v1`;
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  loginUser(user: User) {
    return this.http.post(baseUrl+"/validate-user", user);
  } 
  resetPassword(user : User) {
    return this.http.put(baseUrl+"/password-reset",user);
  } 

  addUser(user: User) { 
    return this.http.post(baseUrl+"/add-user",user);
  } 

  getAllUser() {
    return this.http.get(baseUrl+"/get-all-user");
  } 
  getUser(userId) {
    return this.http.get(baseUrl+"/get-user/"+userId);
  } 

  updateUser(user: User) {
    return this.http.put(baseUrl+"/update-user", user);
  }

  updatePassword(user: User) {
    return this.http.put(baseUrl+"/update-password", user);
  }

  blockUser(user: User) {
    return this.http.put(baseUrl+"/block-user", user);
  }

  deleteUser(user: User) {
    return this.http.put(baseUrl+"/delete-user", user);
  }
}
