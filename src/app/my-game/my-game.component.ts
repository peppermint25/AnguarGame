// import { Component } from '@angular/core';

import { Component} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-game',
  templateUrl: './my-game.component.html',
  styleUrls: ['./my-game.component.css']
})
export class MyGameComponent {
  name = 'My Game';

  // variables for starting the game
  gamelaunchtoken : number;
  generate_properties : boolean = false;
  airport_height = 0;
  airport_width = 0;
  plane_height = 0;
  plane_width = 0;


  PlaneX = 0.3*this.airport_width;
  PlaneY = 0.8*this.airport_height;
  maxPlaneY = 0;
  maxPlaneX = 0;
  SpeedX = 0;
  SpeedY = 0;
  map = this.create_maps();
  private lastDirection: string = 'right';
  
  mapheight = 1/ this.map.selectedMap.length;

  // time units
  starttime = new Date();
  newtime = new Date();
  miliseconds = 0;
  seconds = 0;
  minutes = 0;
  stopwatchSubscription: Subscription = new Subscription();
  



  public generate_coins_and_enemies (){
    this.generate_properties = !this.generate_properties;
  }


  constructor(){
    this.gamelaunchtoken = 1;
    document.addEventListener("DOMContentLoaded", () => {
      if (this.gamelaunchtoken == 1) {
        this.startgame();
      }
    });
  }
  startgame(){
    // console.log(this.mapheight);

    let plane = document.getElementById('plane') as HTMLElement;
    let airport = document.getElementById('airport') as HTMLElement;

    let plane_size = plane.getBoundingClientRect();
    let airport_size = airport.getBoundingClientRect();

    this.airport_height  = airport_size.height;
    this.airport_width = airport_size.width;
    this.plane_height = plane_size.height;
    this.plane_width = plane_size.width;
    this.maxPlaneX = this.airport_width - this.plane_width;
    this.maxPlaneY = this.airport_height - this.plane_height;
  }

  gameplay = false;

  onKeyPress (event: any){
    // console.log(event.target.value);
    // console.log(this.name, "name")
    // // this.name = ;
    // this.a =10;
    console.log("keypress")
  
  }

  
 // start game button function
  StartGame() {
    this.generate_coins_and_enemies();
    this.gameplay = true;
    this.starttime = new Date();
    this.playGame();
    this.gameplay_movement();
    var result = this.create_maps();
    var map = result.selectedMap;
    var mapnumbered = result.mapnumber;
    console.log(mapnumbered);
  }

  // playgame() {
  //   if(this.gameplay == true){
  //     setInterval(() => {
  //       this.newtime = new Date();
  //       this.seconds = (this.newtime.getTime() - this.starttime.getTime())/1000;
  //       if (this.seconds >= 60){
  //         this.seconds = 0;
  //         this. minutes =+ 1;
  //       }
  //       // this.time = this.newtime-this.starttime;
  //     }, 50)
  //     }
    
  // };
  playGame() {
    if (this.gameplay) {
      this.starttime = new Date();
      this.stopwatchSubscription = interval(50).subscribe(() => {
        const newTime = new Date();
        const timeDiff = newTime.getTime() - this.starttime.getTime();
        this.miliseconds = Math.floor(timeDiff % 1000);
        this.seconds = Math.floor(timeDiff / 1000 % 60);
        this.minutes = Math.floor(timeDiff / 1000 / 60);
      });
    }
  }

  plane = document.querySelector("#plane") as HTMLElement;

  gameplay_movement(){
    setInterval(() => {
      this.plane = document.querySelector("#plane") as HTMLElement;
      this.plane.style.top = `${this.PlaneY}px`;
      this.plane.style.left = `${this.PlaneX}px`;

      this.PlaneY -= this.SpeedY;
      this.PlaneX += this.SpeedX;

      this.plane.style.top = `${this.PlaneY}px`;
      this.plane.style.left = `${this.PlaneX}px`;
      
      this.SpeedY = -0.0025*this.airport_height;

      this.SpeedY = Math.min(this.SpeedY, 0.1*this.airport_height)
      this.SpeedX = Math.min(this.SpeedX, 0.05*this.airport_width);
      this.SpeedX = Math.max(this.SpeedX, -0.05*this.airport_width);
      
      this.PlaneX = Math.min(this.PlaneX, this.maxPlaneX);
      this.PlaneX = Math.max(this.PlaneX, 0);
      this.PlaneY = Math.max(this.PlaneY, 0);
      this.PlaneY = Math.min(this.PlaneY, this.maxPlaneY);

      // Rebound from the borders

      if(this.PlaneX + this.plane_width == this.airport_width){
        this.SpeedX = -0.05*this.airport_width;
      }else if(this.PlaneX == 0){
        this.SpeedX = 0.05*this.airport_width;
      }

      if(this.PlaneY >= this.maxPlaneY){
        this.SpeedY = 0;
      }else if(this.PlaneY <= 0){
        this.SpeedY = -0.05*this.maxPlaneY;
      }

      //lose speed when on ground

      if(this.PlaneY  == this.maxPlaneY){
        let slowdown = this.SpeedX/10;
        if(this.SpeedX > 0){
          this.SpeedX -= slowdown;
        }else if(this.SpeedX < 0){
          this.SpeedX -= slowdown;
        }
      }

    }, 30)
    
  }

  getPlaneDirectionClass() {
    if (this.SpeedX > 0) {
      this.lastDirection = 'right';
    } else if (this.SpeedX < 0) {
      this.lastDirection = 'left';
    }

    return `plane-${this.lastDirection}`;
  }

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

  // all movemnt and key detection functions

  ngOnInit(): void {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  keysPressed: {[key: number]: boolean} = {};
  rightPress: boolean = false;
  leftPress: boolean = false;


  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft") {
      this.leftPress = true;
      this.SpeedX += -15;
    } else if (event.key === "ArrowUp") {
      this.SpeedY = 0.01*this.airport_height;
    } else if (event.key === "ArrowRight") {
      this.SpeedX += 15;
      this.rightPress = true;
    }
    // event.preventDefault();
  }

  onKeyUp(event: KeyboardEvent): void {
    delete this.keysPressed[event.keyCode];
    if (event.key === "ArrowLeft") {   
      this.leftPress = false;
    } else if (event.key === "ArrowUp") {
    } else if (event.key === "ArrowRight") {
      this.rightPress = false;
    }
  }

}