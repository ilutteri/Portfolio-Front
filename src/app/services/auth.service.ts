import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../login/jwt-dto';
import { LoginUsuario } from '../login/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';


  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<any>(this.authURL + 'login', loginUsuario)
  }
}
