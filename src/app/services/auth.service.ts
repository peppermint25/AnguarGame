import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly testUsername = 'username';
  private readonly testPassword = 'password';
  isAuthenticated = false;
  loggedInUsername: string = "";

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<any> {
    // Simulate a delay for authentication
    return new Observable(observer => {
        if (username === this.testUsername && password === this.testPassword) {
          this.isAuthenticated = true;
          observer.next({ success: true, message: 'Login successful' });
          // localStorage.setItem('token', 'your_auth_token');
          sessionStorage.setItem('username', username);
          this.loggedInUsername = username;          observer.complete();
          this.router.navigate(['/']);
        } else {
          this.isAuthenticated = false;
          observer.next({ success: false, message: 'Invalid username or password' });
          observer.complete();
        }
    });
  }

  register(username: string, password: string): Observable<any> {
    // Simulate a delay for registration
    return new Observable(observer => {
        // Perform registration logic here, such as calling an API to register the user
        // For this example, we'll assume the registration is successful
        this.isAuthenticated = true;
        observer.next({ success: true, message: 'Registration successful' });
        observer.complete();
    });
  }

  logout(): void {
    this.isAuthenticated = false;
    // localStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.isAuthenticated = false;
    // this.userService.clearUsername();
    this.loggedInUsername = '';
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUsername(): string {
    // console.log(this.loggedInUsername)
    return sessionStorage.getItem('username') as string;
    // this.userService.getUsername();
  }

}
