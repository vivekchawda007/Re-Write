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
  /*     getAll() {
        return this.http.get<User[]>('/users');
    }

    getById(id: number) {
        return this.http.get('/users/' + id);
    } */

   
  
 /* else {
      // else return 400 bad request
      return throwError({ error: { message: 'Username or password is incorrect' } });
    }
    return this.http.post("http://localhost:8081/vms/addUser", user); */

  /*  loginUser(user: User) {
    this.resp = {
      id: user.id,
      username: "vjcworld",
      firstName: "Vivek",
      lastName: "Chawda",
      token: "fake-jwt-token"
    };

    new Observable(observer => {
      // Get the next and error callbacks. These will be passed in when
      // the consumer subscribes.
      return new HttpResponse({ status: 200, body: this.resp });
      //return this.http.post("http://localhost:8081/vms/login", user);
    });
  } */

 /*  public loginUser(user: User): Observable<any> {
    let resp = {
      id: "",
      username: "vjcworld",
      firstName: "Vivek",
      lastName: "Chawda",
      token: "fake-jwt-token"
    };

    return this.resp;
  } */

  loginUser(user: User) {
    return this.http.post("http://localhost:8080/rewrite/api/v1/validate-user", user);
  } 

  addUser(user: User) {
    return this.http.post("http://localhost:8080/rewrite/api/v1/add-user", user);
  } 

  updateUser(user: User) {
    return this.http.put('http://localhost:8081/vms/updateUser', user);
  }
  /*
      delete(id: number) {
          return this.http.delete('/users/' + id);
      } */
}
