import { Component, EventEmitter, Output } from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface UserTime {
  username: string;
  gametime: string;
};

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  constructor(private http: HttpClient, private LeaderboardService: LeaderboardService, private router: Router) {}

  players_list: UserTime[] = [];



  ngOnInit() {
    // console.log("leaderboard")
    this.http.get<UserTime[]>("http://localhost:4200/leaderboard") 
    .subscribe(
      
      res => {
          // var res = JSON.parse(res1)
          // console.log(res, "res", res[0])
          // this.players_list = res.json();
          this.players_list = res
        },
      error => {
          console.log(error);
        }
    );
  }

  // closeLeaderboard() {
  //   this.LeaderboardService.toggleLeaderboard();
  // }

  closeLeaderboard() {
    this.router.navigate(['/']);
    // this.LeaderboardService.isLeaderboardOpen = !this.LeaderboardService.isLeaderboardOpen
  }
}
