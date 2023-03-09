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

  // if(airport){
  //   var airport_size = document.getElementById('airport')?.getBoundingClientRect;
  // }
  // airport_size = document.getElementById('airport')?.getBoundingClientRect;

  airport_height = 0;
  airport_width = 0;
  plane_height = 0;
  plane_width = 0;


  gamelaunchtoken = 1;

  // if(this.gamelaunchtoken == 1){

  // }

  startgame(){
    var plane = document.getElementById('plane') as HTMLElement;
    var airport = document.getElementById('airport') as HTMLElement;
    var plane_size = plane.getBoundingClientRect();
    var airport_size = airport.getBoundingClientRect();
    this.airport_height  = airport_size.height;
    this.airport_width = airport_size.width;
    this.plane_height = plane_size.height;
    this.plane_width = plane_size.width;

  }

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
    this.gameplay_movement();
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
        console.log(this.leftPress, "leftPress", this.rightPress, "rightPress")
      }, 50)
      }
    
  };


  plane = document.querySelector("#plane") as HTMLElement;

  gameplay_movement(){
    setInterval(() => {
      console.log("gameplay_movement");
      this.plane = document.querySelector("#plane") as HTMLElement;
      this.plane.style.top = `${this.PlaneY}px`;
      this.plane.style.left = `${this.PlaneX}px`;

      this.PlaneY -= this.SpeedY;
      this.PlaneX += this.SpeedX;

      this.plane.style.top = `${this.PlaneY}px`;
      this.plane.style.left = `${this.PlaneX}px`;
      
      
      this.SpeedY = -1;

      this.SpeedX = Math.min(this.SpeedX, 30);
      this.SpeedX = Math.max(this.SpeedX, -30);
      // this.SpeedY = Math.max(this.SpeedY, 30);
      
    }, 50)
    
  }

  



  changeImage(): void {
  const planeImage = document.getElementById("plane") as HTMLImageElement;
    if (planeImage.src.endsWith("plane-right.png")) {
      planeImage.src = "plane-left.png";
    } else {
      planeImage.src = "plane-right.png";
    }
  }
  
  changeImage1(): void {
    const planeImage = document.getElementById("plane") as HTMLImageElement;
    if (planeImage.src.endsWith("plane-left.png")) {
      planeImage.src = "plane-right.png";
    } else {
      planeImage.src = "plane-left.png";
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

  // all movemnt and key detection functions + image change functions

  ngOnInit(): void {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  keysPressed: {[key: number]: boolean} = {};
  rightPress: boolean = false;
  leftPress: boolean = false;


  onKeyDown(event: KeyboardEvent): void {
    this.keysPressed[event.keyCode] = true;
    if (event.keyCode === 37) {
      this.leftPress = true;
      this.SpeedX += -15;
      this.changeImage;
      console.log("Left arrow key pressed");
    } else if (event.keyCode === 38) {
      this.SpeedY += 15;
      console.log("Up arrow key pressed");
    } else if (event.keyCode === 39) {
      this.SpeedX += 15;
      this.rightPress = true;
      console.log("Right arrow key pressed");
    }
    event.preventDefault();
  }

  onKeyUp(event: KeyboardEvent): void {
    delete this.keysPressed[event.keyCode];
    if (event.keyCode === 37) {
      console.log("Left arrow key released");
      this.leftPress = false;
    } else if (event.keyCode === 38) {
      console.log("Up arrow key released");
    } else if (event.keyCode === 39) {
      this.rightPress = false;
      console.log("Right arrow key released");
    }
  }

}
