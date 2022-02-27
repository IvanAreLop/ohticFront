import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_BASE_PATH: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.API_BASE_PATH + "signup", user);
  }

  login(username: string, password: string): Observable<any> {
    const login = new User(username, password);
    return this.http.post(this.API_BASE_PATH + "signin", login);
  }

  vote(userName: string, vote: number, token: string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders ({
        'Authorization': token
      }), 
    };
    return this.http.get(this.API_BASE_PATH + "vote?userName="+userName+"&vote="+vote, requestOptions);
  }

  getAllVotes(token: string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders ({
        'Authorization': token
      }), 
    };
    return this.http.get(this.API_BASE_PATH + "votes", requestOptions);
  }
}
