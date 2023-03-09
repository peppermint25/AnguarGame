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
  
  StartGame() {
    this.gameplay = true;
    this.starttime = new Date();
    console.log("starttime");
    this.playgame();
    var result = this.create_maps();
    var map = result.selectedMap;
    var mapnumbered = result.mapnumber;
    console.log(mapnumbered);
  }

  playgame() {
    if(this.gameplay == true){
      setInterval(() => {
        var newtime = new Date();
        var time = (newtime.getTime() - this.starttime.getTime())/1000;
        console.log(time, "laiks");
      }, 50)
      }
    
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

  ngOnInit(): void {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }




  keysPressed: {[key: number]: boolean} = {};
  rightPress = false;
  leftPress = false;


onKeyDown(event: KeyboardEvent): void {
  this.keysPressed[event.keyCode] = true;
  if (event.keyCode === 37) {
    console.log("Left arrow key pressed");
  } else if (event.keyCode === 38) {
    console.log("Up arrow key pressed");
  } else if (event.keyCode === 39) {
    console.log("Right arrow key pressed");
  }
  event.preventDefault();
}

onKeyUp(event: KeyboardEvent): void {
  delete this.keysPressed[event.keyCode];
  if (event.keyCode === 37) {
    console.log("Left arrow key released");
  } else if (event.keyCode === 38) {
    console.log("Up arrow key released");
  } else if (event.keyCode === 39) {
    console.log("Right arrow key released");
  }
}

}
