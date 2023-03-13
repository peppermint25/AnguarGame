import { Component } from '@angular/core';

@Component({
  selector: 'app-my-game',
  templateUrl: './my-game.component.html',
  styleUrls: ['./my-game.component.css']
})
export class MyGameComponent {
  name = 'My Game';

  airport_height = 0;
  airport_width = 0;
  plane_height = 0;
  plane_width = 0;
  maxPlaneY = 0;
  maxPlaneX = 0;
  gamelaunchtoken : number;

  constructor(){
    this.gamelaunchtoken = 1;
    document.addEventListener("DOMContentLoaded", () => {
      if (this.gamelaunchtoken == 1) {
        this.startgame();
      }
    });
  }

  PlaneX = 0.3*this.airport_width;
  PlaneY = 0.8*this.airport_height;
  SpeedX = 0;
  SpeedY = 0;

  startgame(){
    var plane = document.getElementById('plane') as HTMLElement;
    var airport = document.getElementById('airport') as HTMLElement;
    // var plane_area = document.getElementById('plane_area') as HTMLElement;
    if(!plane || !airport){
      console.error('Can not find plane or airport');
      return;
    }

    var plane_size = plane.getBoundingClientRect();
    var airport_size = airport.getBoundingClientRect();
    console.log("airport", airport_size, "plane", plane_size);

    

    this.airport_height  = airport_size.height;
    this.airport_width = airport_size.width;
    this.plane_height = plane_size.height;
    this.plane_width = plane_size.width;
    this.maxPlaneX = this.airport_width - this.plane_width;
    this.maxPlaneY = this.airport_height - this.plane_height;
    // console.log("Plane" , plane_size, plane, plane.style)
    console.log("maxPlaneX: " + this.maxPlaneX, "Plane width: ", this.plane_width, "Airport width: ", this.airport_width);
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
        // console.log(time, "laiks");
        // console.log(this.PlaneY, this.maxPlaneY)
        // console.log(this.PlaneX, this.maxPlaneX, this.plane_width, this.PlaneX+this.plane_width)
      }, 50)
      }
    
  };


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
      
      
      this.SpeedY = -1;



      if(this.PlaneY >= this.maxPlaneY){
        this.SpeedY =+ 1.5;
      }else if(this.PlaneY <= 0){
        this.SpeedY = -0.1*this.maxPlaneY;
      }

      if(this.leftPress == true){
        console.log("i changed left press");
        this.changeImage;
      }

      if(this.rightPress == true){
        console.log("i changed right press");
        this.changeImage1;
      }

      this.SpeedX = Math.min(this.SpeedX, 30);
      this.SpeedX = Math.max(this.SpeedX, -30);
      // this.SpeedY = Math.max(this.SpeedY, 30);
      // console.log("airport width", this.airport_width, "airport height", this.airport_height);
      this.PlaneX = Math.min(this.PlaneX, this.maxPlaneX);
      this.PlaneX = Math.max(this.PlaneX, 0);
      this.PlaneY = Math.max(this.PlaneY, 0);
      this.PlaneY = Math.min(this.PlaneY, this.maxPlaneY);

    }, 30)
    
  }

  drawEnemy(x : number, y : number){

  }



  changeImage(): void {
  const planeImage = document.getElementById("plane") as HTMLImageElement;

  const backgroundImageURL = getComputedStyle(planeImage).backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

    if (backgroundImageURL.endsWith("plane-right.png")) {
      planeImage.style.backgroundImage = "url('plane-left.png')";
    } else {
      planeImage.style.backgroundImage = "url('plane-right.png')";
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
    } else if (event.keyCode === 38) {
      this.SpeedY += 15;
    } else if (event.keyCode === 39) {
      this.SpeedX += 15;
      this.rightPress = true;
    }
    event.preventDefault();
  }

  onKeyUp(event: KeyboardEvent): void {
    delete this.keysPressed[event.keyCode];
    if (event.keyCode === 37) {   
      this.leftPress = false;
    } else if (event.keyCode === 38) {
    } else if (event.keyCode === 39) {
      this.rightPress = false;
    }
  }

}