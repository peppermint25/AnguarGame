import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string= "";
  password: string = "";

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          console.log(response.message); // Display success message
          // Optionally, you can perform further actions upon successful login
        },
        (error) => {
          console.log(error.error); // Display error message
          // Optionally, you can handle the error or display appropriate feedback to the user
        }
      );
  }
}
