import { Injectable } from '@angular/core';
import { Login } from './login';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  public login(userInfo:Login):Observable<any>
  {
    localStorage.setItem('ACCESS_TOKEN',"access_token");
    return this.http.get(environment.baseUrl+'/logins?user=' +userInfo.email+ '&pass=' +userInfo.password)
  }
public isLoggedIn()
{
  return localStorage.getItem('ACCESS_TOKEN')!==null;
}
public logout()
{
  localStorage.removeItem('ACCESS_TOKEN');
}
}
