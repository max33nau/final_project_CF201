/* * * * * * * * * * * * * * * *
 * BOXER GAME                  *
 * Created by  John Hearn      *
 *             Max Jacobson    *
 *             Doug Popadince  *
 * CF201       Fall 2015       *
 * * * * * * * * * * * * * * * */

// all level data: this will eventually be moved to a JSON file
var levelData = [ { floor: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 01, 02 ],
			     [ 02, 02 ], [ 03, 02 ], [ 01, 03 ], [ 02, 03 ],
			     [ 03, 03 ], [ 07, 03 ], [ 03, 04 ], [ 07, 04 ],
			     [ 03, 05 ], [ 04, 05 ], [ 05, 05 ], [ 06, 05 ],
			     [ 07, 05 ], [ 02, 06 ], [ 03, 06 ], [ 04, 06 ],
			     [ 06, 06 ], [ 07, 06 ], [ 02, 07 ], [ 03, 07 ],
			     [ 04, 07 ] ],
		    sprite: [[ 01, 01 ]],
		    crate: [ [ 02, 02 ], [ 03, 02 ], [ 02, 03 ] ],
		    dots:  [ [ 07, 03 ], [ 07, 04 ], [ 07, 05 ] ]
		  } ]

var wallURL = "img/RedBrick.png";
var floorURL = "img/FloorTile.png";
var crateURL = "img/WoodenCrate.png";
var dotsURL  = "img/DotTile.png";
var spriteURL = "img/sprite.png"
var spriteLocation = levelData[0].sprite[0];


// We want our coordinates to be 4-digit strings, so
// we need to pad single digits with a leading zero.
var pad = function (num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function Coord(tileType, tileURL) {
    this.$div = $( '<div></div>' );
  //  this.$img = $( '<img></img>' );
    this.tile = tileType;
  //  this.$img.attr( 'src', tileURL );
  //  this.$div.append( this.$img );
		this.$div.css( "background-image","url(img/RedBrick.png)" );
}

function GameBoard() {
    this.coordinates = [ ];
    this.$element = $('<section></section>').attr( 'id', "container" );
    for ( var ii = 0; ii < 20; ii++ ) {
	for ( var jj = 0; jj < 20; jj++ ) {
	    this.coordinates.push( [ ] );
	    this.coordinates[jj].push( new Coord( "wall", wallURL ) );
	    this.$element.append( this.coordinates[jj][ii].$div );
	}

    }
}

var BOXER_GAME_MODULE = (function() {

    var my = {};
    my.$anchor = $( "#gameBoard" );
    my.game = new GameBoard();
    my.$anchor.append( my.game.$element );

    my.updateCell = function( [x, y], tileType, tileURL) {
	my.game.coordinates[x][y].tile = tileType;
	my.game.coordinates[x][y].$div.css( 'background-image', "url("+tileURL+")" );
    }

		my.addCrates = function( [x, y], tileType, tileURL) {
			my.game.coordinates[x][y].tile = tileType;
			$img = $( '<img src='+tileURL+'> </img>' );
			my.game.coordinates[x][y].$div.append( $img );
		}

		my.addSprite = function( [x, y], tileType, tileURL) {
			my.game.coordinates[x][y].tile = tileType;
			$img = $( '<img src='+tileURL+'> </img>' );
			my.game.coordinates[x][y].$div.append( $img );
		}

    my.loadLevel = function( levelObject ) {
	// update floor tiles
	for ( var ii = 0; ii < levelObject.floor.length; ii++ ) {
	    my.updateCell(levelObject.floor[ii], "floor", floorURL );
	}
	// update dot tiles
	for ( var ii = 0; ii < levelObject.dots.length; ii++ ) {
	    my.updateCell(levelObject.dots[ii], "dots", dotsURL );
	}

	// update crate tiles
	for ( var ii = 0; ii < levelObject.crate.length; ii++ ) {
	    my.addCrates(levelObject.crate[ii], "crate", crateURL );
	}

	my.addSprite(levelObject.sprite[0],"sprite",spriteURL);

    }

	my.goLeft = function() {
		if (my.game.coordinates[currentLocationX-1][currentLocationY].tile == "wall") {
			return;
		} else if (my.game.coordinates[currentLocationX-1][currentLocationY].tile == "floor") {
			spriteLocation[0]-=1;
			my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
			my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
			my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
		} else if (my.game.coordinates[currentLocationX-1][currentLocationY].tile == "crate") {
				crateLocationX = currentLocationX-1;
				crateLocationY = currentLocationY;
				if (my.game.coordinates[currentLocationX-2][currentLocationY].tile == "floor") {
					spriteLocation[0]-=1;
					crateLocationX-=1;
					my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
					my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
					my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
					my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
					my.game.coordinates[currentLocationX-1][currentLocationY].$div.find('img').first().remove();
				} else if (my.game.coordinates[currentLocationX-2][currentLocationY].tile == "dots") {
					spriteLocation[0]-=1;
					crateLocationX-=1;
					my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
					my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
					my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
					my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
					my.game.coordinates[currentLocationX-1][currentLocationY].$div.find('img').first().remove();
				} else if (my.game.coordinates[currentLocationX-1][currentLocationY].tile == "dots") {
					spriteLocation[0]-=1;
					crateLocationX-=1;
					my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
					my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
					my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
					my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
					my.game.coordinates[currentLocationX-1][currentLocationY].$div.find('img').first().remove();
				} else {
					return;
				}
			} else {
				return;
			}
		}

		my.goRight = function() {
			if (my.game.coordinates[currentLocationX+1][currentLocationY].tile == "wall") {
				return;
			} else if (my.game.coordinates[currentLocationX+1][currentLocationY].tile == "floor") {
				spriteLocation[0]+=1;
				my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
				my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
				my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
			} else if (my.game.coordinates[currentLocationX+1][currentLocationY].tile == "crate") {
					crateLocationX = currentLocationX+1;
					crateLocationY = currentLocationY;
					if (my.game.coordinates[currentLocationX+2][currentLocationY].tile == "floor") {
						spriteLocation[0]+=1;
						crateLocationX+=1;
						my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
						my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
						my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
						my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
						my.game.coordinates[currentLocationX+1][currentLocationY].$div.find('img').first().remove();
					} else if (my.game.coordinates[currentLocationX+2][currentLocationY].tile == "dots") {
						spriteLocation[0]+=1;
						crateLocationX+=1;
						my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
						my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
						my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
						my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
						my.game.coordinates[currentLocationX+1][currentLocationY].$div.find('img').first().remove();
					} else if (my.game.coordinates[currentLocationX+1][currentLocationY].tile == "dots") {
						spriteLocation[0]+=1;
						crateLocationX+=1;
						my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
						my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
						my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
						my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
						my.game.coordinates[currentLocationX+1][currentLocationY].$div.find('img').first().remove();
					} else {
						return;
					}
				} else {
					return;
				}
			}

			my.goDown = function() {
				if (my.game.coordinates[currentLocationX][currentLocationY+1].tile == "wall") {
					return;
				} else if (my.game.coordinates[currentLocationX][currentLocationY+1].tile == "floor") {
					spriteLocation[1]+=1;
					my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
					my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
					my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
				} else if (my.game.coordinates[currentLocationX][currentLocationY+1].tile == "crate") {
						crateLocationX = currentLocationX;
						crateLocationY = currentLocationY+1;
						if (my.game.coordinates[currentLocationX][currentLocationY+2].tile == "floor") {
							spriteLocation[1]+=1;
							crateLocationY+=1;
							my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
							my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
							my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
							my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
							my.game.coordinates[currentLocationX][currentLocationY+1].$div.find('img').first().remove();
						} else if (my.game.coordinates[currentLocationX][currentLocationY+2].tile == "dots") {
							spriteLocation[1]+=1;
							crateLocationY+=1;
							my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
							my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
							my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
							my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
							my.game.coordinates[currentLocationX][currentLocationY+1].$div.find('img').first().remove();
						} else if (my.game.coordinates[currentLocationX][currentLocationY+1].tile == "dots") {
							spriteLocation[1]+=1;
							crateLocationY+=1;
							my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
							my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
							my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
							my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
							my.game.coordinates[currentLocationX][currentLocationY+1].$div.find('img').first().remove();
						} else {
							return;
						}
					} else {
						return;
					}
				}

				my.goUp = function() {
					if (my.game.coordinates[currentLocationX][currentLocationY-1].tile == "wall") {
						return;
					} else if (my.game.coordinates[currentLocationX][currentLocationY-1].tile == "floor") {
						spriteLocation[1]-=1;
						my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
						my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
						my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
					} else if (my.game.coordinates[currentLocationX][currentLocationY-1].tile == "crate") {
							crateLocationX = currentLocationX;
							crateLocationY = currentLocationY-1;
							if (my.game.coordinates[currentLocationX][currentLocationY-2].tile == "floor") {
								spriteLocation[1]-=1;
								crateLocationY-=1;
								my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
								my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
								my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
								my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
								my.game.coordinates[currentLocationX][currentLocationY-1].$div.find('img').first().remove();
							} else if (my.game.coordinates[currentLocationX][currentLocationY-2].tile == "dots") {
								spriteLocation[1]-=1;
								crateLocationY-=1;
								my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
								my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
								my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
								my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
								my.game.coordinates[currentLocationX][currentLocationY-1].$div.find('img').first().remove();
							} else if (my.game.coordinates[currentLocationX][currentLocationY-1].tile == "dots") {
								spriteLocation[1]-=1;
								crateLocationY-=1;
								my.addSprite([spriteLocation[0],spriteLocation[1]],"sprite",spriteURL);
								my.game.coordinates[currentLocationX][currentLocationY].$div.find('img').remove();
								my.game.coordinates[currentLocationX][currentLocationY].tile = "floor";
								my.addCrates([crateLocationX, crateLocationY],"crate",crateURL);
								my.game.coordinates[currentLocationX][currentLocationY-1].$div.find('img').first().remove();
							} else {
								return;
							}
						} else {
							return;
						}
					}


		my.changelocation= function(key) {
		  var keyvalue = key.keyCode;
			currentLocationX = spriteLocation[0];
			currentLocationY = spriteLocation[1];
			if (keyvalue == 37) {
					console.log("left");
				 	my.goLeft();
			} else if (keyvalue == 38) {
					console.log("up");
					my.goUp();
			} else if (keyvalue == 39) {
					console.log("right");
					my.goRight();
			} else if (keyvalue == 40) {
 					console.log("down");
 					my.goDown();
			} else {
				return;
			}
		}

    my.loadLevel( levelData[0] );


		my.eventListener= function() {
	 window.addEventListener("keydown", my.changelocation, false);
	 }
	 my.eventListener();





    return my;
})();
