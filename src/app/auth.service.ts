import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationSate = new BehaviorSubject(false);
  private _connexionUrl = "http://127.0.0.1:8000/api/login"

  constructor(private http:HttpClient) { }

  loginUser(user:any) {
    return this.http.post<any>(this._connexionUrl, user)
  }
  getToken(){
    return localStorage.getItem('token')
  }

  isAuthenticated(){
    return this.authenticationSate.value;
  }

}
