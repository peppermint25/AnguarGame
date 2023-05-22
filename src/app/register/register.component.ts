import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string ="";
  password: string ="";

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.username, this.password)
      .subscribe(
        (response) => {
          console.log(response.message); // Display success message
          // Optionally, you can perform further actions upon successful registration
        },
        (error) => {
          console.log(error.message); // Display error message
          // Optionally, you can handle the error or display appropriate feedback to the user
        }
      );
  }

}
