import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario:Usuario):Observable<any>{

    console.log('ESTOY JODIDO1');

    const urlEndpoint = '/api/security/oauth/token';  //url del microservicio
    const credenciales = btoa('frontendapp' + ':' + '12345');  //btoa para encriptar en base 64

    
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales      
    });

    console.log('ESTOY JODIDO2');
    let params = new URLSearchParams();
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    params.set('grant_type', 'password');        
    console.log(params.toString());
        
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders});
  }
}
