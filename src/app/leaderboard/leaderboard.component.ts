import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserTime {
  _id: { $oid: string};
  username: string;
  gametime: string;
};

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  // LeaderboardOpen = false;

  constructor(private http: HttpClient) {
    // this.LeaderboardOpen = true;
  }

  players_list: UserTime[] = [];


  GetLeaderboard(){
    this.http.get<UserTime[]>("http://localhost:4200/leaderboard-data") 
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

  deleteEntry(entryId: string) {
    this.http.delete(`/leaderboard-data/${entryId}`).subscribe(() => {
      this.GetLeaderboard();
    });
  }

  ngOnInit() {
    // console.log("leaderboard")
    this.GetLeaderboard();
  }

}
