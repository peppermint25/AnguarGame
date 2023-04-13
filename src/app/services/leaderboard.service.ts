import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  isLeaderboardOpen = false;

  toggleLeaderboard() {
    this.isLeaderboardOpen = !this.isLeaderboardOpen;
  }
}
