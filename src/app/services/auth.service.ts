import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

private url='https://identitytoolkit.googleapis.com/v1';
private apikey ='AIzaSyDnvjEjHqnKElYrdRE3r0r0KgWeMPuC64Y';

userToken: string;

  //Crear nuevo Usuario:
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//Login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor ( private http:HttpClient ) {
    this.leerToken();
   }

  logout(){

  localStorage.removeItem('token');

  }

  login( usuario:UsuarioModel ){

    const authData={
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }/accounts:signInWithPassword?key=${ this.apikey }`,authData).pipe(map(data=>{
      console.log('entro al map');
      
      this.guardarToken(data['idToken']);
      return data;
    })
   );
  
  }

  nuevoUsuario( usuario:UsuarioModel ){

  const authData={
    ...usuario,
    returnSecureToken: true
  };

  return this.http.post(`${ this.url }/accounts:signUp?key=${ this.apikey }`,authData).pipe(map(data=>{
    console.log('entro al map');
    
    this.guardarToken(data['idToken']);
    return data;
  })
 );
  
}

private guardarToken( idToken:string ){
  this.userToken = idToken;
  localStorage.setItem('token', idToken);
}

leerToken(){

  if(localStorage.getItem('token')){
    this.userToken = localStorage.getItem('token');
  }else{
    this.userToken='';
  }

  return this.userToken;

}

estaAutenticado(): boolean{
  return this.userToken.length > 2;
}

}
