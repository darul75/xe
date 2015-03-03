// Model

var Cardinals = {
  'N': {x:0, y:1},
  'E': {x:1, y:0},
  'W': {x:-1, y:0},
  'S': {x:0, y:-1}
};
var CARDINALS_STR = ['N','E','S','W'];

/**
 * Vector constructor
 * @class
 * @description Provides vector instances.
 *
 * @property {number} x horizontal position 
 * @property {number} y vertical position
 */
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * World constructor
 * @class
 * @description Provides a world instance, used to project mowers. 
 * @property {Vector} vector Vector object
 */
function World(vector) {
  this.v = vector;  
}

/**
 * World constructor
 * @class
 * @description Provides mower instances.
 * @property {Vector} Vector object
 * @property {string} direction direction as a String 'N', 'E'...
 * @property {World} world container
 */
function Mower(vector, direction, world) {
  this.position = vector;
  this.direction = direction;
  this.directionVector = Cardinals[direction];
  this.world = world;
}

/**
 * @description handle a command.
 * @param {string} instructions list of instructions in a string
 * @example
 * // "GAGAGAGAA"
 */
Mower.prototype.handleCommand = function(instructions) {
  instructions.split('').forEach(function(flag) {
    switch (flag) {
      case 'G':
      case 'D':
        var currentPos = this.direction;
        this.prevDirection = CARDINALS_STR.indexOf(currentPos);
        var newIdx = this.prevDirection - 1 >= 0 ? this.prevDirection - 1 : CARDINALS_STR.length -1;
        if (flag === 'D'){
          newIdx = this.prevDirection + 1 > 3 ?  0 : this.prevDirection + 1;
        }
        this.direction = CARDINALS_STR[newIdx];
      break;    
      default:
        this.move();
      break;     
    }     
  }, this);  

  return {
    x:this.position.x,
    y:this.position.y,
    direction: this.direction
  }  
};

/**
 * @description move current mower according to current direction 
 */
Mower.prototype.move = function() { 
  var CARD_RULE = Cardinals[this.direction];
  var limitX = (this.position.x + CARD_RULE.x * 1 <= this.world.v.x) && (this.position.x + CARD_RULE.x * 1 >= 0);
  var limitY = (this.position.y + CARD_RULE.y * 1 <= this.world.v.y) && (this.position.y + CARD_RULE.y * 1 >= 0);
  var newX = limitX ? this.position.x + CARD_RULE.x * 1 : this.position.x;
  var newY = limitY ? this.position.y + CARD_RULE.y * 1 : this.position.y;

  // reach limit
  if (!limitX || !limitY) {
    this.direction = CARDINALS_STR[this.prevDirection];      
  }
  else { // ok store position
    this.prevDirection = CARDINALS_STR.indexOf(this.direction);
  }

  this.position.x = newX;
  this.position.y = newY;  
};   

module.exports = {
  Cardinals : Cardinals,
  CARDINALS_STR : CARDINALS_STR,
  Vector : Vector,
  World : World,
  Mower : Mower
};