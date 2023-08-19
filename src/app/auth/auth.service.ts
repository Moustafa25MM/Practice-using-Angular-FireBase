import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";


export interface AuthResponseData {
  idToken	:string,
  email	: string,
  refreshToken : string,
  expiresIn : string,
  localId:string,
  registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email:string , password:string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcfANOGrDmlHIPSdKVvDdXQrej_oU4DMI',{
        email:email,
        password:password,
        returnSecureToken:true
      }).pipe(catchError( errorRes => {
        let errorMessage = 'An unknown error Occurred';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }
        console.log(errorRes);
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS' : errorMessage ='This Email is already exists'
        }
        return throwError(errorMessage);
      }))
    }

    login(email:string, password:string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcfANOGrDmlHIPSdKVvDdXQrej_oU4DMI',{
        email:email,
        password:password,
        returnSecureToken:true
      }).pipe(catchError( errorRes => {
        let errorMessage = 'An unknown error Occurred';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }
        console.log(errorRes);
        switch(errorRes.error.error.message){
          case 'INVALID_PASSWORD' : errorMessage ='invalid Password'
          break
          case 'EMAIL_NOT_FOUND': errorMessage = 'Email not found'
        }
        return throwError(errorMessage);
      }))
    }
}
