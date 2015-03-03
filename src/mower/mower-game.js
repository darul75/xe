 /*
 * Module dependencies.
 */

// Dependencies
var model = require('./model.js');
var readline = require('./utils.js');  

// Const
var Cardinals = model.Cardinals;
var CARDINALS_STR = model.CARDINALS_STR;

// Variables
var world = undefined; // game world
var mowers = []; // mowers objects
var World = model.World;
var Vector = model.Vector;
var Mower = model.Mower;

/**
 * Extractor.
 * @namespace
 */
var Extractor = {
  /**  
  * @memberof Extractor
  * @function extractWorld
  * @desc extract world boundary.
  * @param {string} line line  
  * @returns {World} game world boundary.  
  */
  extractWorld : function(line) {
    var worldCoords = line.split(' ');
    var x = parseInt(worldCoords[0], 10);
    var y = parseInt(worldCoords[1], 10);          
    return new World(new Vector(x,y));
  },
  /**  
  * @memberof Extractor
  * @function extractMower
  * @desc extract mower position and direction.
  * @param {string} line line
  * @param {number} line line index
  */
  extractMower : function(line, world) {
    var mowerCoords = line.split(' ');
    var x = parseInt(mowerCoords[0], 10);
    var y = parseInt(mowerCoords[1], 10);
    return new Mower(new Vector(x, y), mowerCoords[2], world);
  },
  /**  
  * @memberof Extractor
  * @function handleLine
  * @desc extract mower position and direction.
  * @param {string} line line
  * @param {number} line line index
  */
  handleLine : function(line, index) {
    if (index === 1) {
      world = Extractor.extractWorld(line);
    }
    else if (index % 2 == 0) {
      mowers.push(Extractor.extractMower(line, world));
    }
    else {
      mowers[mowers.length-1].handleCommand(line);
    }
  },
  /**
   * @function loadDataFile
   *
   * @param {string} s input data as string   
   * @returns {string} output string of mowers
   * @param {Extractor~onEnd} cb - The callback that handles the result string.
   * @private
   */
  loadDataFile : function(filepath, cb) {
    world = undefined;
    mowers = [];
    var i = 1;    
    rl = readline(filepath);        
    rl.on('line', function(line) {                    
      Extractor.handleLine(line, i);
      i++;
    })
    .on('error', function(e) {
       // TODO throw error      
    })
    .on('end', function() {      
      process.nextTick(function() {        
        cb(computeOutput(mowers));
      });
    });
  },
  /**
   * @function loadData
   *
   * @param {string} s input data as string   
   * @returns {string} output string of mowers
   * @private
   */
  loadData : function(s) {
    world = undefined;
    mowers = [];
    var lines = s.split('\n');
    lines.forEach(function(line, i) {      
      i+= 1;      
      Extractor.handleLine(line, i);
    });    
    return computeOutput(mowers);
  }
};

var computeOutput = function(mowers) {
  output = '';
  mowers.forEach(function(mower) {
    output += mower.position.x + ' ' + mower.position.y + ' ' + mower.direction + '\n';        
  });
  return output;
}

/**
 * MowerGame.
 * @module mowerGame
 */
MowerGame = {    
  /**  
  * @memberof module:mowerGame
  * @function play
  * @desc play with string input data
  * @param {string} data string input data
  * @returns {string} output mowers position.  
  */
  play: function(data) {
    return Extractor.loadData(data);
  },
  /**  
  * @memberof module:mowerGame
  * @function playFile
  * @desc play with file input data
  * @param {string} filepath input filepath
  * @param {MowerGame~onEnd} cb - The callback that handles the result string.
  * @returns {string} output mowers position.  
  */
  playFile: function(filepath, cb) {        
    Extractor.loadDataFile(filepath, cb);        
  }
}

module.exports = MowerGame;
