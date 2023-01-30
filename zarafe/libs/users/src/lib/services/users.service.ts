import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  apiURLUsers = environment.apiURL + 'user';

constructor(private http: HttpClient) {
  //apiURLUsers= environment.apiURL+'users';

}

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.apiURLUsers);
}

getUser(userId: string): Observable<User> {
  return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
}

createUser(user: User): Observable<User> {
  return this.http.post<User>(this.apiURLUsers, user);
}

updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
}

deleteUser(userId: string): Observable<any> {
  return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
}
}
