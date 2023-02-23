import { Component } from '@angular/core';

@Component({
  selector: 'app-my-game',
  templateUrl: './my-game.component.html',
  styleUrls: ['./my-game.component.css']
})
export class MyGameComponent {
  name = 'My Game';
  a =4;
  PlaneX = 300;
  PlaneY = 600;
  SpeedX = 0;
  SpeedY = 0;

  plane = document.getElementById('plane')?.getBoundingClientRect;
  airport = document.getElementById('airport');




  gameplay = false;

  // if(leftPress =  true) {
  //   )


  onKeyPress (event: any){
    // console.log(event.target.value);
    // console.log(this.name, "name")
    // // this.name = ;
    // this.a =10;
    console.log("keypress")
  
  }

  

  starttime = new Date();


  playgame() {
    while(this.gameplay == true){
      var newtime = new Date();
      var time = newtime.getTime() - this.starttime.getTime();
      console.log(time);
      setTimeout(() => {}, 1000)
    }
    
  }


  
  StartGame() {
    this.gameplay = true;
    this.playgame();
    var result = this.create_maps();
    var map = result.selectedMap;
    var mapnumbered = result.mapnumber;
    console.log(mapnumbered);
  }


  // time = new Date();


  create_maps()  {
    var mapselector = Math.random();
    var mapnumber = 3;
    var selectedMap = [
      ".$..#.#..........$.#",
      "............$.....#.",
      "...$....$.........#.",
      "..#..........$......",
      "......$........#..$.",
      "..$...#..#...#......",
      "................$...",
      "#..................#",
    ];
    if (mapselector < 0.33){
        selectedMap = [
          ".$....#..........#..",
          "........$....$......",
          ".$...........#......",
          ".....#..$......$..#.",
          "...$.......#........",
          ".#....#......$...#..",
          "..........$.........",
          ".$.............#....",
        ];
        mapnumber = 1;
    }  
    else if (mapselector < 0.66){
        selectedMap = [
          "....#..$...$....#...",
          "#..$................",
          "........#.....$..#..",
          "....#...............",
          ".$.......$...#..$..#",
          ".....#..............",
          "...........$......#.",
          ".$.............$....",
        ];
        mapnumber = 2;
    }        
    return {selectedMap:selectedMap, mapnumber:mapnumber};
  };

keys1(){
  window.addEventListener("keydown", this.keysPressed);
  window.addEventListener("keyup", this.keysReleased);

}




keys: boolean[] = [];
speedX  = 0;
speedY = 0;
rightPress = false;
leftPress = false;

keysPressed(e: KeyboardEvent): void{
  this.keys[e.keyCode] = true;
  if (this.keys[38]) {
    this.speedY += 10;
    console.log(this.speedY);
  }
  if (this.keys[39]) {
    this.rightPress = true;
    this.speedX += 6;
    console.log("rightPress");
  }
  if (this.keys[37]) {
    this.leftPress = true;
    this.speedX -= 6;
    console.log("leftPress");
  }
  e.preventDefault();
}

keysReleased(e: KeyboardEvent): void {
  if (this.keys[39]) {
    this.rightPress = false;
  }
  if (this.keys[37]) {
    this.leftPress = false;
  }
  this.keys[e.keyCode] = false;
}

}
