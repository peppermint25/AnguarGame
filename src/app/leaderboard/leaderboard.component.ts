import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $: any;

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
  active_player_id: string = this.setDefaultVariable();
  active_player_name: string = this.setDefaultVariable();
  active_player_time: string = this.setDefaultVariable();

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

  deleteEntry() {
    this.http.delete(`/leaderboard-data/${this.active_player_id}`).subscribe(() => {
      this.GetLeaderboard();
      this.closeDeleteForm();

    });
  }

  editEntry(){

    const updatedValues = {
      username: this.active_player_name,
      gametime: this.active_player_time
    }


    this.http.put(`/leaderboard-data/${this.active_player_id}/update`, updatedValues)
    .subscribe(
      response => {
        console.log('Game time updated successfully:', response);
        // Handle the response from the backend
      },
      error => {
        console.error('Error occurred while updating game time:', error);
        // Handle the error
      }
    );
    this.GetLeaderboard();
    this.closeEditForm();
  }

  setDefaultVariable(){
    return '';
  }

  resetVariable(){
    this.active_player_id = this.setDefaultVariable();
    this.active_player_name = this.setDefaultVariable();
    this.active_player_time = this.setDefaultVariable();
  
  }

  openDeleteForm(entryId: string){
    this.active_player_id = entryId;
    $("#DeleteForm").modal('show');
  }

  closeDeleteForm(){
    this.resetVariable();
    $("#DeleteForm").modal('hide');
  }

  openEditForm(entry_id: string ,player: UserTime){
    this.active_player_id = entry_id;
    this.active_player_name = player.username;
    this.active_player_time = player.gametime;
    $("#EditForm").modal('show');
  }

  closeEditForm(){
    $("#EditForm").modal('hide');

  }
  
  
  ngOnInit() {
    // console.log("leaderboard")
    this.GetLeaderboard();
  }

}
