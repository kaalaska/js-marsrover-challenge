// === Board Array ===
var board = [ 
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']
];
// === Rover Objects ===
const roverOne = {
  name: "r1",
  direction: "W",
  x: 4,
  y: 0,
  travelLog: [{direction: "W", x:4, y:0}],
  pos: board[0][4] = "r1"  
}
const roverTwo = {
  name: "r2",
  direction: "W",
  x: 5,
  y: 0,
  travelLog: [{direction: "W", x:5, y:0}],
  pos: board[0][5] = "r2"  
}
// === Obstacle Array ===
const obstacles = [
  {item: "o1",
   pos: board[1][2] = "o1"},
  {item: "o2",
   pos: board[1][1] = "o2"},
  {item: "o3",
   pos: board[2][0] = "o3"},
]
console.log(board.join('\n') + '\n');

// === Instructions variable ===
//let instructions = "rffrfflfrff" // positive cases
//let instructions = "f" // negavive case outside grid
//let instructions = "ffrfflfrff" // negavive cases outside grid
//let instructions = "b"
//let instructions = "zrffzzz"

// === Function Turn Left ===
function turnLeft(rover){
  switch(rover.direction){
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break; 
  }    
  printAction("printTurnL");
  printPosition(rover);
  regPosHist(rover);
}
// === Function Turn Right ===
function turnRight(rover){
  switch(rover.direction){
    case "N":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "S";
      break; 
  }    
  printAction("printTurnR");
  printPosition(rover);
  regPosHist(rover);
}
// === Function Move Forward with Boundaries===
function moveForward(rover){    
  board[rover.y][rover.x] = " ";
  switch(true){
    case (rover.direction === "N" && rover.y > 0): 
      rover.y--;      
      printAction("printMoveF");
      printPosition(rover);      
      break;      
    case (rover.direction === "S" && rover.y < 9):
      rover.y++;            
      printAction("printMoveF");
      printPosition(rover);
      break;          
    case (rover.direction === "W" && rover.x > 0):
      //board[rover.y][rover.x] = " ";
      rover.x--;            
      printAction("printMoveF");
      printPosition(rover);
      //board[rover.y][rover.x] = "r1";
      break;      
    case (rover.direction === "E" && rover.x < 9):
      rover.x++;            
      printAction("printMoveF");
      printPosition(rover);
      break;    
    default:            
      printAction("printNoMoveF");
      break;    
  }  
  board[rover.y][rover.x] = rover.name;
  regPosHist(rover);  
}
// === Function Move Backward with Boundaries===
function moveBackward(rover){    
  //turnRight(rover);
  //turnRight(rover);
  board[rover.y][rover.x] = " ";
  oppDirection(rover);
  switch(true){
    case (rover.direction === "N" && rover.y > 0): 
      rover.y--;      
      printAction("printMoveB");
      printPosition(rover);
      break;      
    case (rover.direction === "S" && rover.y < 9):
      rover.y++;            
      printAction("printMoveB");
      printPosition(rover);
      break;          
    case (rover.direction === "W" && rover.x > 0):
      rover.x--;            
      printAction("printMoveB");
      printPosition(rover);
      break;      
    case (rover.direction === "E" && rover.x < 9):
      rover.x++;            
      printAction("printMoveB");
      printPosition(rover);
      break;    
    default:            
      printAction("printNoMoveB");
      break;    
  }  
  board[rover.y][rover.x] = rover.name;
  regPosHist(rover);  
}
// === Function Opposite direction ===
function oppDirection(rover){
  switch(rover.direction){
    case "N":
      rover.direction = "S";
      break;
    case "W":
      rover.direction = "E";
      break;
    case "S":
      rover.direction = "N";
      break;
    case "E":
      rover.direction = "W";
      break; 
  }
}
// === Function Command Handover ===
function commandHandOver(rover, command, board){    
  for(i=0; i<command.length; i++ ){
    let instruct = command[i];    
    switch(instruct){
      case "f":
        let collisionF = collCheckMoveF(rover, board);
        if(collisionF === false){
          moveForward(rover);          
        }else{
          printAction("obstacleFound");     
          i = command.length;
          regPosHist(rover);
        }        
        break;
      case "b":
        let collisionB = collCheckMoveB(rover, board);
        if(collisionB === false){
          moveBackward(rover);          
        }else{
          printAction("obstacleFound");     
          i = command.length;
          regPosHist(rover);
        }        
        break;        
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      //default:
        //console.log("Input false! Please enter only letters r, l, f or b")
    }        
  }
  console.log("Position history of rover:");
  for(i=0; i< rover.travelLog.length; i++){      
    console.log(`On command ${i} => direction:${rover.travelLog[i].direction}, x:${rover.travelLog[i].x}, y:${rover.travelLog[i].y}`);
  }  
}
// === Print Functions===
function printAction(printCommand){
  if(printCommand === "printMoveF"){    
    console.log("moveForward was called!");
  }else if(printCommand === "printMoveB"){
    console.log("turnBackward was called!");
  }else if(printCommand === "printTurnL"){    
    console.log("turnLeft was called!");
  }else if(printCommand === "printTurnR"){    
    console.log("turnRight was called!");
  }else if(printCommand === "printNoMoveF"){
    console.log("moveForward was called! It´s not allowed to move outside the grid. Movement is skipped");
  }else if(printCommand === "printNoMoveB"){
    console.log("moveBackward was called! It´s not allowed to move outside the grid. Movement is skipped");
  }else if(printCommand === "obstacleFound"){
    console.log("Rover stopped and cannot be moved to desired place. Another object in front.");
  }    
}
function printPosition(rover){
  console.log(`New rover position - direction:${rover.direction}, x=${rover.x}, y=${rover.y}`)
}
// === Function Registration of Position History ===
function regPosHist(rover){
  let positionHistory = {direction:rover.direction, x:rover.x, y:rover.y};
  rover.travelLog.push(positionHistory);
}
// === Function for Input===
function commandsInput(){  
  var letterExp = /^[rlfb]*$/; //If you declare all the variables with let code does not work!Find out why???
  var entry = prompt("Please enter the command/s for the rover");
    while(true){
      if(!entry.match(letterExp)){
        alert("Input false! Please enter only letters r, l, f or b without space");
      }else if(entry === ""){
        alert("No Input! Please enter the command/s for the rover");
      }else{
        break;
      }
      var entry = prompt("Please enter the command/s for the rover");
    }
  //console.log(instructions);
  return entry;
}
// === Function for Collision Handling ===
function collCheckMoveF(rover, board){
  switch(true){
      case (rover.direction === "N"): 
        rover.y--;
        if(rover.y < 0){
          var coll = false;
        }else{
          bPlace = board[rover.y][rover.x];        
          if(bPlace === ' '){
            var coll = false;
          }/*else{
            var coll = true;            
          }*/        
        }
        rover.y++;
        break;
      case (rover.direction === "S"): 
        rover.y++;
        if(rover.y > 9){
          var coll = false;
        }else{
          bPlace = board[rover.y][rover.x];        
          if(bPlace === ' '){
            var coll = false;
          }/*else{
            var coll = true;            
          }*/       
        }
        rover.y--;
        break;
      case (rover.direction === "W"): 
        rover.x--;
        if(rover.x < 0){
          var coll = false;
        }else{
          bPlace = board[rover.y][rover.x];        
          if(bPlace === ' '){
            var coll = false;
          }/*else{
            var coll = true;            
          }*/        
        }
        rover.x++;
        break;
      case (rover.direction === "E"): 
        rover.x++;
        if(rover.x > 9){
          var coll = false;
        }else{
          bPlace = board[rover.y][rover.x];        
          if(bPlace === ' '){
            var coll = false;
          }/*else{
            var coll = true;            
          }*/        
        }
        rover.x--;
        break;      
  }  
  return coll;
}
function collCheckMoveB(rover, board){
  oppDirection(rover);
  switch(true){
      case (rover.direction === "N"): 
        rover.y--;
        if(rover.y < 0){
          var coll = false;
        }else{
          bPlace = board[rover.y][rover.x];        
          if(bPlace === ' '){
            var coll = false;
          }/*else{
            var coll = true;            
          }*/        
        }
        rover.y++;
        break;
      case (rover.direction === "S"): 
        rover.y++;
        if(rover.y > 9){
          var coll = false;
        }else{
          bPlace = board[rover.y][rover.x];        
          if(bPlace === ' '){
            var coll = false;
          }/*else{
            var coll = true;            
          }*/       
        }
        rover.y--;
        break;
      case (rover.direction === "W"): 
        rover.x--;
        if(rover.x < 0){
          var coll = false;
        }else{
          bPlace = board[rover.y][rover.x];        
          if(bPlace === ' '){
            var coll = false;
          }/*else{
            var coll = true;            
          }*/        
        }
        rover.x++;
        break;
      case (rover.direction === "E"): 
        rover.x++;
        if(rover.x > 9){
          var coll = false;
        }else{
          bPlace = board[rover.y][rover.x];        
          if(bPlace === ' '){
            var coll = false;
          }/*else{
            var coll = true;            
          }*/        
        }
        rover.x--;
        break;      
  }  
  oppDirection(rover);
  return coll;
}
// === Funktion MoveRoverObjects
function moveRoverObjects(rover){
  var instructions = commandsInput();
  console.log(instructions);
  commandHandOver(rover, instructions, board);
  console.log(board.join('\n') + '\n');
  return;
}
// === Invoking function moveRoverObjects ===
moveRoverObjects(roverOne);
moveRoverObjects(roverTwo);
// === Invoking function CommandsInput & Command Handover with printout of board status ===
//let instructions = "fffffbflblff"


// RoverOne
//var instructions = commandsInput();
//let instructions = commandsInput(); Does not work with let - find out why?/What was the difference between var & let?
//console.log(instructions);
//commandHandOver(roverOne, instructions, board);
//console.log(board.join('\n') + '\n');

//RoverTwo
//var instructions = commandsInput();
//let instructions = commandsInput(); Does not work with let - find out why?/What was the difference between var & let?
//console.log(instructions);
//commandHandOver(roverTwo, instructions, board);
//console.log(board.join('\n') + '\n');