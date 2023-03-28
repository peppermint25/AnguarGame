// import { Component } from '@angular/core';

import { Component} from '@angular/core';
import { interval, Subscription } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-my-game',
  templateUrl: './my-game.component.html',
  styleUrls: ['./my-game.component.css']
})
export class MyGameComponent {
  name = 'My Game';

  // variables for intializing the game and the borders
  game_launch_token : boolean = false;;
  game_end_token: boolean = false;
  game_win_token: boolean = false;
  game_lose_token: boolean = false;
  generate_properties : boolean = false;
  game_start_token : boolean = false;
  airport_height = 0;
  airport_width = 0;
  plane_height = 0;
  plane_width = 0;

  //Variables for the plane element

  PlaneX: number = 0.3*this.airport_width;
  PlaneY: number = 0.8*this.airport_height;
  maxPlaneX = 0;
  maxPlaneY = 0;
  SpeedX = 0;
  SpeedY = 0;
  lastDirection: string = 'right';

  // map creation and processing

  map = this.create_maps();
  map_actual = this.map();
  GameMap:string[] = this.map_actual.selectedMap;
  Map_number: number = this.map_actual.mapnumber;


  map_units_height = 1/ this.GameMap.length;
  map_units_width = 1/this.GameMap[0].length;

  // ring count

  ring_count : number = 0;
  collected_rings : number = 0;

  // variables for the game map for displaying
  
  // time units
  starttime : Date = new Date();
  newtime : Date = new Date();
  miliseconds_to_display: number = 0;
  milliseconds: number = 0;
  seconds : number = 0;
  minutes : number = 0;
  stopwatchSubscription: Subscription = new Subscription();
  time_string : string = "";	

  // key press detection and getting the direction

  keysPressed: {[key: number]: boolean} = {};
  rightPress: boolean = false;
  leftPress: boolean = false;

  // for set interval in gameplay_movement 

  gamecode : any;


  public generate_coins_and_enemies (){
    this.generate_properties = !this.generate_properties;
  }

  constructor(){
    this.launch_game();
  }


  launch_game(){  
    this.game_launch_token = true;
    document.addEventListener("DOMContentLoaded", () => {
      if (this.game_launch_token) {
        this.itialize_game();
        this.ring_count = this.countRings(this.GameMap)
      }
    });
  }

  itialize_game(){


    setInterval(() => {
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
    }, 30)

    this.PlaneX = 0.3*this.airport_width;
    this.PlaneY = 0.8*this.airport_height


  }

  // onKeyPress (event: any){
  //   console.log("keypress")
  
  // }
  
 // start game button function
  StartGame() {
    this.generate_coins_and_enemies();
    this.game_start_token = true;
    this.starttime = new Date();
    this.game_time();
    this.gameplay_movement();
    this.PlaneX = 0.3*this.airport_width;
    this.PlaneY = 0.8*this.airport_height
  }


  // stopwatch for the game

  game_time() {
    if (this.game_start_token) {
      this.starttime = new Date();
      this.stopwatchSubscription = interval(10).subscribe(() => {
        const newTime = new Date();
        const timeDiff = newTime.getTime() - this.starttime.getTime();
        this.milliseconds = Math.floor((timeDiff % 1000) / 10);
        this.seconds = Math.floor((timeDiff % 60000) / 1000);
        this.minutes = Math.floor(timeDiff / 60000);
        // stopping the stopwatch
        if(this.ring_count == this.collected_rings){
          this.stopwatchSubscription.unsubscribe();
          if(this.minutes >= 1){
            this.time_string = `${this.minutes.toString()}.${this.seconds.toString()}.${this.milliseconds.toString()}`;
          }else if(this.minutes == 0){
            this.time_string = `${this.seconds.toString()}.${this.milliseconds.toString()}`;
          }
        }
        if(this.game_lose_token){
          this.stopwatchSubscription.unsubscribe();
          if(this.minutes >= 1){
            this.time_string = `${this.minutes.toString()}.${this.seconds.toString()}.${this.milliseconds.toString()}`;
          }else if(this.minutes == 0){
            this.time_string = `${this.seconds.toString()}.${this.milliseconds.toString()}`;
          }
        }
      });
    }
  }


  gameplay_movement(){
    if(this.game_start_token) {
      if(!this.game_end_token){
        this.gamecode = setInterval(() => {
          // this.plane = document.querySelector("#plane") as HTMLElement;
          this.PlaneY -= this.SpeedY;
          this.PlaneX += this.SpeedX;
          
          this.SpeedY += -0.003*this.airport_height;
    
          this.SpeedY = Math.min(this.SpeedY, 0.025*this.airport_height);
          this.SpeedY = Math.max(this.SpeedY, -0.01*this.airport_height);
          this.SpeedX = Math.min(this.SpeedX, 0.05*this.airport_width);
          this.SpeedX = Math.max(this.SpeedX, -0.05*this.airport_width);
          
          this.PlaneX = Math.min(this.PlaneX, this.maxPlaneX);
          this.PlaneX = Math.max(this.PlaneX, 0);
          this.PlaneY = Math.max(this.PlaneY, 0);
          this.PlaneY = Math.min(this.PlaneY, this.maxPlaneY);
    
            // Rebound from the borders
    
          if(this.PlaneX + this.plane_width == this.airport_width){
            this.SpeedX = -0.01*this.airport_width;
          }else if(this.PlaneX == 0){
            this.SpeedX = 0.01*this.airport_width;
          }
    
          if(this.PlaneY >= this.maxPlaneY){
            this.SpeedY = 0.;
          }else if(this.PlaneY <= 0){
            this.SpeedY = -0.01*this.maxPlaneY;
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
          this.ring_check_delete();
          this.enemies_game_end();
        }, 30) 
      }
    }
  }

  ring_check_delete(){
    let self = this;
    let rings = document.querySelectorAll('.ring');
    rings.forEach((ring: any) => {
      var x = ring.offsetLeft;
      var y = ring.offsetTop;
      var width = ring.width;
      var height = ring.height;
  
      if (self.PlaneX > x - self.plane_width && self.PlaneX < x + width &&
          self.PlaneY > y - self.plane_height && self.PlaneY < y + height) {
        self.collected_rings++;
        let row = Number(ring.getAttribute("data-row"));
        let column = Number(ring.getAttribute("data-column"));
        self.GameMap[row] = this.GameMap[row].substring(0, column) + '.' + this.GameMap[row].substring(column + 1);
        ring.src = "assets/img/replacement-image.png";
        if(this.collected_rings == this.ring_count){
          this.game_end_token = true;
          this.game_win_token = true;
          self.SpeedX = 0;
          self.SpeedY =+ 0.02*this.airport_height
          clearInterval(this.gamecode);
        }
      }
    });
  }

  enemies_game_end() {
    let self = this;
    let enemies = document.querySelectorAll('.enemy-area');
    enemies.forEach((enemy: any) => {
      var x = enemy.offsetLeft;
      var y = enemy.offsetTop;
      if (self.PlaneX > x - self.plane_width && self.PlaneX < x +  42&&
        self.PlaneY > y - self.plane_height + 5 && self.PlaneY < y + 23) {
          self.game_end_token = true;
          self.game_lose_token = true;
          self.SpeedX = 0;
          self.SpeedY = 0;
          clearInterval(this.gamecode);
        }
    });
  }

  // count the original amount of rings

  countRings(selectedMap: string[]): number {
    let ringCount = 0;
    for (let row of selectedMap) {
      for (let char of row) {
        if (char === '$') {
          ringCount++;
        }
      }
    }
    return ringCount;
  }

  // Direction of the plane image

  Plane_direction() {
    if (this.SpeedX > 0) {
      this.lastDirection = 'right';
    } else if (this.SpeedX < 0) {
      this.lastDirection = 'left';
    }

    return `plane-${this.lastDirection}`;
  }

  // choses one of the 3 maps at random

  create_maps() {
    let cachedResult: {selectedMap: string[], mapnumber: number} | null = null;
  
    return function() {
      if (!cachedResult) {
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
        cachedResult = { selectedMap: selectedMap, mapnumber: mapnumber };
      }
      return cachedResult;
    };
  }
  
  // all movemnt and key detection functions

  ngOnInit(): void {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft") {
      this.leftPress = true;
      this.SpeedX += -0.02*this.airport_width;;
    } else if (event.key === "ArrowUp") {
      this.SpeedY = 0.02*this.airport_height;
    } else if (event.key === "ArrowRight") {
      this.SpeedX += 0.02*this.airport_width;
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

  refresh() :void{
  location.reload();
  }

}
