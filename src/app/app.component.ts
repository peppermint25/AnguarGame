import { Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularGame';

  navbar_height = 0;
  window_height = 0;
  username = this.getUsername();

  ngOnInit(){
    this.get_navbar_size();
  }

  constructor(private authService: AuthService){
    
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  logout() : void{
    this.authService.logout();
  }

  getUsername() : string{
    return sessionStorage.getItem('username') as string;
  }

  get_navbar_size(){
    setInterval(() => {
      let navbar = document.getElementById('navbar') as HTMLElement;
      let navbar_size = navbar.getBoundingClientRect();
      this.window_height = window.innerHeight 
      this.navbar_height = navbar_size.height;
      const background = document.getElementById('airport');
      if (background) {
        background.style.height = (this.window_height - this.navbar_height) + 'px';
      }
    }, 1000)

  }
}
