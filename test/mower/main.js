// test/main.js
var moverGame = require('../src/mower/mower-game.js');
var assert = require("assert");

describe('moover game', function() {
  describe('play', function() {
    it('return positions from file', function(done) {           

      moverGame.playFile(__dirname+'/mower.txt', function(data) {
        assert.equal(data, '1 3 N\n5 1 E\n');
        done();
      });

    });
    it('return positions from string', function(done) {           

      var data = moverGame.play('5 5\n1 2 N\nGAGAGAGAA\n3 3 E\nAADAADADDA');
      assert.equal(data, '1 3 N\n5 1 E\n');
      done();      

    });
  });
  describe('play width boundaries', function() {    
    it('return positions from string', function(done) {
      var data = moverGame.play('5 5\n1 2 N\nGAAAAAAAAA');      
      assert.equal(data, '0 2 W\n');
      done();
    });
    it('return positions from string', function(done) {
      var data = moverGame.play('5 5\n0 0 N\nAAAAAAAAA');      
      assert.equal(data, '0 5 N\n');
      done();
    });
  });
});