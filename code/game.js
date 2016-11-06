//Austin Royall
//austin.royall@knights.ucf.edu

//just a heads up this code is very messy and some parts are unnecessary
//because I had no idea what I was doing

// Map each class of actor to a character
var actorChars = {
  "m": Move,
  "@": Player,
  "o": Coin, // A coin will wobble up and down
  "8": BounceMove,
  "=": Lava, "|": Lava, "v": Lava, "<": Lava  
};


function Level(plan) {
  // Use the length of a single row to set the width of the level
  this.width = plan[0].length;
  // Use the number of rows to set the height

  this.height = plan.length;

  // Store the individual tiles in our own, separate array
  this.grid = [];
  this.actors = [];

  // Loop through each row in the plan, creating an array in our grid
  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];

    // Loop through each array element in the inner array for the type of the tile
    for (var x = 0; x < this.width; x++) {
      // Get the type from that character in the string. It can be 'x', '!' or ' '
      // If the character is ' ', assign null.

      var ch = line[x], fieldType = null;
      // Use if and else to handle the three cases
	  var Actor = actorChars[ch];
	  if (Actor)
		this.actors.push(new Actor(new Vector(x,y), ch));
      else if (ch == "x")
        fieldType = "wall";
      // Because there is a third case (space ' '), use an "else if" instead of "else"
      else if (ch == "!")
        fieldType = "lava";
	  else if (ch == "B")
		  fieldType = "bounce";

      // "Push" the fieldType, which is a string, onto the gridLine array (at the end).
      gridLine.push(fieldType);
    }
    // Push the entire row onto the array of rows.
    this.grid.push(gridLine);
  }
  // Find and assign the player character and assign to Level.player
  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
}

// Check if level is finished
Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

function Vector(x, y) {
  this.x = x; this.y = y;
}

// Vector arithmetic: v_1 + v_2 = <a,b>+<c,d> = <a+c,b+d>
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

// Vector arithmetic: v_1 * factor = <a,b>*factor = <a*factor,b*factor>
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};

// A Player has a size, speed and position.
//this image is the universal character image.
var charImage = document.createElement('img');

//just the starting path
charImage.src = 'code/PunchRightImages/PunchRColor (1).png';
charImage.className = 'shrinkflipped colorwhite';
charImage.id = "charImage";

//current color number tells the code which color to tint the character in the css
var currentcolornum = 0;
function Player(pos) {
  this.pos = pos.plus(new Vector(0, -4));
  this.size = new Vector(2, 3.2);
  this.speed = new Vector(0, 0);
  
  //haslost is just a boolean that tells me when the level has started over
  haslost = false;
}
Player.prototype.type = "player";

// Add a new actor type as a class

//reboundnum is the time it takes before the coin can be damaged again
var reboundNum = 4;
function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(3, 3);
  //health is how many times it can be damaged
  this.health = 6;
  this.rebound = reboundNum;
  // Make it go back and forth in a sine wave.

}
Coin.prototype.type = "coin";

// Add a new actor type as a class
//Move is actually just moving lava
function Move(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(4, 1);
  this.speed = 2;
}
Move.prototype.type = "lava";

// Add a new actor type as a class
//same as the bounce block but moves
function BounceMove(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(1, 1);
  this.speed = 2;
}
BounceMove.prototype.type = "movebounce";

// Lava is initialized based on the character, but otherwise has a
// size and position
function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "=") {
    // Horizontal lava
    this.speed = new Vector(2, 0);
  } else if (ch == "|") {
    // Vertical lava
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    // Drip lava. Repeat back to this pos.
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
  else if (ch == "<") {
    // Drip lava. Repeat back to this pos.
    this.speed = new Vector(-3, 0);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";

// Helper function to easily create an element of a type provided 
// and assign it a class.
function elt(name, className) {
  var elt = document.createElement(name);
  if (className)
	  if (className == 'actor player' && charImage.parent == null){
		  //not sure if this section of the code is the best place to do this
		  //but the image had to be appended somewhere and this was the only place I could
		  //reach the actual html element of the player
		  elt.appendChild(charImage);
	  }
  if (className) elt.className = className;
  return elt;
  
}

//pretty straight forward
//check the images folders in the root for clarity
var punchRframes = 45;
var punchRimages = [];
var punchRtitles = 'PunchRColor (';

var runRframes = 12;
var runRimages = [];
var runRtitles = 'RunRColor (';

var standsource = 'code/MiscFrames/StandRImage.png';
var jumpsource = 'code/MiscFrames/JumpRImage.png';
// Main display class. We keep track of the scroll window using it.
function DOMDisplay(parent, level) {

//just meant to load the punching frames
for (var i = 1; i<=punchRframes; i++){
	var imageObject = new Image();
	imageObject.src = 'code/PunchRightImages/' + punchRtitles + i + ').png';
	punchRimages[i] = imageObject;
}

//loading the running frames
for (var i = 1; i<=runRframes; i++){
	var imageObject = new Image();
	imageObject.src = 'code/RunRightImages/' + runRtitles + i + ').png';
	runRimages[i] = imageObject;
}
// this.wrap corresponds to a div created with class of "game"
  this.wrap = parent.appendChild(elt("div", "game"));
  this.level = level;

  // In this version, we only have a static background.
  this.wrap.appendChild(this.drawBackground());

  // Keep track of actors
  this.actorLayer = null;

  // Update the world based on player position
  this.drawFrame();
}

var scale = 40;
//not sure if I needed backgroundholder but this was created so I could dynamically change the background class
var backgroundholder;
DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  backgroundholder = table;
  table.style.width = this.level.width * scale + "px";

  // Assign a class to new row element directly from the string from
  // each tile in grid
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

// Draw the player agent
DOMDisplay.prototype.drawActors = function() {
  // Create a new container div for actor dom elements
  var wrap = elt("div");

  this.level.actors.forEach(function(actor) {
	var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
	rect.style.width = actor.size.x * scale + "px";
	rect.style.height = actor.size.y * scale + "px";
	rect.style.left = actor.pos.x * scale + "px";
	rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
	  	if (currentlevel >= 4){
		if (wincolorchange <= 0){
			wincolorchange = wincolorchangetime;
			currentcolornum += 1;
			checkCharColor();
			if (currentcolornum > 6){
				currentcolornum = 0;
			}
		}
		else{
			wincolorchange -= 1;
		}
	}
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  // Update the status each time with this.level.status"
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;

  // We want to keep player at least 1/3 away from side of screen
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var player = this.level.player;
  // Change coordinates from the source to our scaled.
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

// Remove the wrap element when clearing the display
// This will be garbage collected
DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

// Return the first obstacle found given a size and position.
Level.prototype.obstacleAt = function(pos, size) {
  // Find the "coordinate" of the tile representing left bound
  var xStart = Math.floor(pos.x);
  // right bound
  var xEnd = Math.ceil(pos.x + size.x);
  // top bound
  var yStart = Math.floor(pos.y);
  // Bottom bound
  var yEnd = Math.ceil(pos.y + size.y);

  // Consider the sides and top and bottom of the level as walls
  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "lava";

  // Check each grid position starting at yStart, xStart
  // for a possible obstacle (non null value)
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if (fieldType) return fieldType;
    }
  }
};

// Collision detection for actors is handled separately from 
// tiles. 
Level.prototype.actorAt = function(actor) {
  // Loop over each actor in our actors list and compare the 
  // boundary boxes for overlaps.
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    // if the other actor isn't the acting actor
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      // check if the boundaries overlap by comparing all sides for
      // overlap and return the other actor if found
      return other;
  }
};

// Update simulation each step based on keys & step size
Level.prototype.animate = function(step, keys) {
  // Have game continue past point of win or loss
  if (this.status != null)
    this.finishDelay -= step;

  // Ensure each is maximum 100 milliseconds 
  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      // Allow each actor to act on their surroundings
      actor.act(thisStep, this, keys);
    }, this);
   // Do this by looping across the step size, subtracing either the
   // step itself or 100 milliseconds
    step -= thisStep;
  }
};

Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

//kind of archaic now that I look at this
//but this moves the lava I created
var MoveUp = 0;
//change this one to change how high it moves
var MaxMove = -10;
//this changes how fast it moves
var MoveIncriment = 0.01;
var MovingUp = true;
Move.prototype.act = function(step){
	this.pos = this.basePos.plus(new Vector(0, MoveUp));
	if (MovingUp){
		MoveUp -= MoveIncriment;
	} else {
		MoveUp += MoveIncriment;
	}
	
	if (MoveUp <= MaxMove){
		MovingUp = false;
	} else if (MoveUp > 0){
		MovingUp = true;
	}
	
};

//same as the lava moving
var BounceMoveUp = 0;
var BounceMaxMove = -10;
var BounceMoveIncriment = 0.03;
var BounceMovingUp = true;
BounceMove.prototype.act = function(step){
	this.pos = this.basePos.plus(new Vector(0, BounceMoveUp));
	if (BounceMovingUp){
		BounceMoveUp -= BounceMoveIncriment;
	} else {
		BounceMoveUp += BounceMoveIncriment;
	}
	
	if (BounceMoveUp <= BounceMaxMove){
		BounceMovingUp = false;
	} else if (BounceMoveUp > 0){
		BounceMovingUp = true;
	}
	
};

//I deleted the wobbling function but left some of the code just in case
var wobbleSpeed = 8;
var wobbleDist = 0.07;
Coin.prototype.act = function(step){
	//rebound to see if it can be damaged
	if (this.rebound < reboundNum){
		this.rebound += 1;
	}
};
var maxStep = 0.05;
var playerXSpeed = 10;
//pretty straight foreward booleanse
//this one is used to assign the proper class in the css to change how it faces
var facingRight = true;
//this one stops the player from punching if they are walking
var isWalking = false;
//this tells if the player has lost so I can assign the losing class in the css
var haslost = false;

//this code is only used on the winning level
//change this variable to change the speed of the color
var wincolorchangetime = 50;
var wincolorchange = wincolorchangetime;

function checkCharColor(){
	//changes the background to fit the current color number, check the css for clarity
	backgroundholder.className = "backgroundcolor" + currentcolornum + " background";
	//must check if lost so the death color remains
	if (haslost == false){
		//white
		if (currentcolornum == 0){
			if (facingRight)
				charImage.className = "shrink colorwhite";
			else
				charImage.className = "shrinkflipped colorwhite";
		}
		//red
		else if (currentcolornum == 1){
			if (facingRight)
				charImage.className = "shrink";
			else
				charImage.className = "shrinkflipped";
		}
		//orange
		else if (currentcolornum == 2){
			if (facingRight)
				charImage.className = "shrink colororange"; 
			else
				charImage.className = "shrinkflipped colororange";
		}
		//yellow
		else if (currentcolornum == 3){
			if (facingRight)
				charImage.className = "shrink coloryellow";
			else
				charImage.className = "shrinkflipped coloryellow";
		}
		//green
		else if (currentcolornum == 4){
			if (facingRight)
				charImage.className = "shrink colorgreen";
			else
				charImage.className = "shrinkflipped colorgreen";
		}
		//blue
		else if (currentcolornum == 5){
			if (facingRight)
				charImage.className = "shrink colorblue";
			else
				charImage.className = "shrinkflipped colorblue";
		}
		else if (currentcolornum == 6){
			if (facingRight)
				charImage.className = "shrink colorpurple";
			else
				charImage.className = "shrinkflipped colorpurple";
		}
	}
}

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left && holdingSpace == false){
  this.speed.x -= playerXSpeed;
  //tells which way it is facing and the calls a function the changes the css to fit that
  facingRight = false;
  isWalking = true;
  checkCharColor();
  }
  if (keys.right && holdingSpace == false){
  this.speed.x += playerXSpeed;
  //tells which way it is facing and the calls a function the changes the css to fit that
  facingRight = true;
  isWalking = true;
  checkCharColor();
  }
  
  if (!keys.left && !keys.right){
	  //is walking is made false to allow the player to punch
	  isWalking = false;
  }

  var motion = new Vector(this.speed.x * step, 0);
  // Find out where the player character will be in this frame
  var newPos = this.pos.plus(motion);
  // Find if there's an obstacle there
  var obstacle = level.obstacleAt(newPos, this.size);
  // Handle lava by calling playerTouched
  if (obstacle)
    level.playerTouched(obstacle);
  else
    // Move if there's not an obstacle there.
    this.pos = newPos;
  //var motion = new Vector(this.speed.x * step, 0);
  //var newPos = this.pos.plus(motion);
  //var obstacle = level.obstacleAt(newPos, this.size);
  //if (obstacle != 'wall' && obstacle != 'bounce'){
	//this.pos = newPos;
  //}
};

var gravity = 40;
var jumpSpeed = 20;
var playerYSpeed = 9;
var bounceSpeed = 30;

Player.prototype.moveY = function(step, level, keys) {

this.speed.y += step * gravity;
var motion = new Vector(0, this.speed.y * step);
var newPos = this.pos.plus(motion);
var obstacle = level.obstacleAt(newPos, this.size);
if(obstacle){
	    level.playerTouched(obstacle);
    if (keys.up && !holdingSpace && this.speed.y > 0)
      this.speed.y = -jumpSpeed;
    else if (obstacle == 'bounce'){
		this.speed.y = -bounceSpeed; //for the bounce object
	}
	else{
      this.speed.y = 0;
	}
  } else {
    this.pos = newPos;
  }
};

//these determine the animation stuff, which i didnt do perfect
//untilnext is the next time a frame is available
var untilNext = 0;
//this changes how fast it changes
var untilNextInc = 0.1;
//this is the max number incrimineted by untilNextInc
var untilNextMax = 0.2;
//the current frame
var currentPunchRFrame = 1;
//the max frame numbers
var maxPunchRFrame = punchRframes;

//if a frame becomes visible where the player is punching
var isPunching = false;
//if holding the space bar
var holdingSpace = false;
//forcebounce is used to tell the player to bounce when it hits a moving bounce object
var forcebounce = false;

//see the punching frames above
var currentRunRFrame = 1;
var maxRunRFrame = runRframes;

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);
  //my weird formula to try to determine if there is an object below
  var newPos = new Vector(this.pos.x + (this.size.x/2), this.pos.y + 1);
  var obstacle = level.obstacleAt(newPos, new Vector(this.size.x,this.size.y));
  //grounded just determines if they are on the ground
  var grounded = false;
  if (forcebounce){
	  this.speed.y = -(bounceSpeed/2);
	  forcebounce = false;
  }
  if(obstacle){
	  grounded = true; //sets it to grounded
  }
  if (keys.space && !isWalking && grounded){ //player can only punch if not walking, grounded, and holding space
	  holdingSpace = true;
	  if (currentPunchRFrame == 5 || currentPunchRFrame == 19 || currentPunchRFrame == 27 || currentPunchRFrame == 30 || currentPunchRFrame == 33 || currentPunchRFrame == 39)
	  {
		  //pre determined frames to tell when the player is punching
		  isPunching = true;
	  } else {
		  isPunching = false;
	  }
	  if (untilNext > untilNextMax && currentPunchRFrame != (maxPunchRFrame)){ //updates the frames
		  charImage.src = punchRimages[currentPunchRFrame].src;
		  currentPunchRFrame +=1;
		  untilNext = 0;
	  }
	  else{
		  untilNext += untilNextInc; //updates the holding variable by the incriminet
	  }
  }
  if(!keys.space){ //resets the variables if not holding space
	  holdingSpace = false;
	  currentPunchRFrame = 1;
	  isPunching = false;
  }
  
  if (isWalking && grounded){ //the run animation stuff
	  if (untilNext > untilNextMax && currentRunRFrame != (maxRunRFrame)){
		  charImage.src = runRimages[currentRunRFrame].src;
		  currentRunRFrame +=1;
		  untilNext = 0;
	  }
	  else if(currentRunRFrame == maxRunRFrame){
		  currentRunRFrame = 1;
	  }
	  else{
		  untilNext += untilNextInc;
	  }
	  
  }
  
  if (!isWalking && !keys.space){
	  	  untilNext = 0; //resets the variable if not walking or holding space
  }

  if (!grounded){ //this wasnt good so I commented it out
	  if (charImage.src != jumpsource){
		  //charImage.src = jumpsource;
	  }
  }
  
  if (!holdingSpace && !isWalking && grounded){ //if doing nothing basically make him stand
	  if (charImage.src != standsource){
		  charImage.src = standsource;
	  }
  }
  
    var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Losing animation
  if (level.status == "lost") {
	haslost = true;
    this.pos.y += step;
    this.size.y -= step;
	this.size.x -= step;
  }
};

Level.prototype.playerTouched = function(type, actor) {

  if (type == "movebounce"){
	  forcebounce = true; //just makes the character bounce for the moving bounce object
  }
  else{
	  forcebounce = false;
  }
  // if the player touches lava and the player hasn't won
  // Player loses
  if (type == "lava" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
  } else if (type == "coin" && actor.health === 0) {
	  currentcolornum += 1; //update the color tint
	  checkCharColor();
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
    // If there aren't any coins left, player wins
    if (!this.actors.some(function(actor) {
           return actor.type == "coin";
         })) {
      this.status = "won";
      this.finishDelay = 1;
    }
  } else if (type == "coin" && actor.health !== 0 && isPunching == true && actor.rebound >= reboundNum){
	  actor.health -=1 ; //lower the health of the coin, reset the rebound, and update the size
	  actor.rebound = 0;
	  actor.size.y = (actor.health/2);
	  actor.size.x = (actor.health/2);
	  actor.pos = actor.pos.plus(new Vector((actor.size.x/6),0));
  }
};

// Arrow key codes for readibility
var arrowCodes = {37: "left", 38: "up", 39: "right", 40: "down", 32: "space"};

// Translate the codes pressed from a key event
function trackKeys(codes) {
  var pressed = Object.create(null);

  // alters the current "pressed" array which is returned from this function. 
  // The "pressed" variable persists even after this function terminates
  // That is why we needed to assign it using "Object.create()" as 
  // otherwise it would be garbage collected

  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      // If the event is keydown, set down to true. Else set to false.
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      // We don't want the key press to scroll the browser window, 
      // This stops the event from continuing to be processed
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

// frameFunc is a function called each frame with the parameter "step"
// step is the amount of time since the last call used for animation
function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      // Set a maximum frame step of 100 milliseconds to prevent
      // having big jumps
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// This assigns the array that will be updated anytime the player
// presses an arrow key. We can access it from anywhere.
var arrows = trackKeys(arrowCodes);

// Organize a single level and begin animation
// Organize a single level and begin animation
function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);

  runAnimation(function(step) {
    // Allow the viewer to scroll the level
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
		  		currentcolornum = 0; //reset the color tint
		checkCharColor();
        andThen(level.status);
      return false;
    }
  });
}
var currentlevel = 0; //just a holding variable to determine later on if they are on the last level

function runGame(plans, Display) {
  function startLevel(n) {
    // Create a new level using the nth element of array plans
    // Pass in a reference to Display function, DOMDisplay (in index.html).
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost")
        startLevel(n);
      else if (n < plans.length - 1){
		currentcolornum = 0;
		checkCharColor();
		currentlevel = n + 1;
		console.log(currentlevel);
	  startLevel(n + 1);}
      else
        console.log("You win!");
    });
  }
  startLevel(currentlevel);
}
