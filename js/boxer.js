/* * * * * * * * * * * * * * * *
 * BOXER GAME                  *
 * Created by  John Hearn      *
 *             Max Jacobsen    *
 *             Doug Popadince  *
 * CF201       Fall 2015       *
 * * * * * * * * * * * * * * * */

// We want our coordinates to be 4-digit strings, so
// we need to pad single digits with a leading zero.
var pad = function (num, size) {
    var s = num+"";
  //  while (s.length < size) s = "0" + s;
    return s;
}

function GameBoard(){
    this.element = document.createElement( "section" );
    this.element.setAttribute( "id", "container" );
    for ( var ii = 0; ii < 10; ii++ ) {
	for ( var jj = 0; jj < 10; jj++ ) {
	    var coordinate = pad(ii, 2) + pad(jj, 2);
	    console.log(coordinate);
	    var cell = document.createElement( "div" );
	    cell.setAttribute( "data-coord", coordinate );
      if (level1[ii][jj] == 0){
        var tile = document.createElement("img");
        tile.className = "redBrick";
        tile.src = "img/RedBrick.png";
        cell.appendChild( tile );
        this.element.appendChild( cell );
      }
      else if (level1[ii][jj] == 1){
        var tile = document.createElement("img");
        tile.className = "floorTile";
        tile.src = "img/FloorTile2.png";
        cell.appendChild( tile );
        this.element.appendChild( cell );
      } else if (level1[ii][jj] == 2){
          var tile = document.createElement("img");
          tile.className = "woodenCrate";
          tile.src = "img/WoodenCrate.png";
          cell.appendChild( tile );
          this.element.appendChild( cell );
        } else if (level1[ii][jj] == 3){
            var tile = document.createElement("img");
            tile.className = "winningSpot";
            tile.src = "img/winningSpot.png";
            cell.appendChild( tile );
            this.element.appendChild( cell );
          } else if (level1[ii][jj] == 4){
              var tile = document.createElement("img");
              tile.className = "sprite";
              tile.src = "img/sprite.png";
              cell.appendChild( tile );
              this.element.appendChild( cell );
            } else {
              console.log("error");
            }

	}
    }
}


var level1 = [[0,0,0,0,0,0,0,0,0,0],
              [0,3,3,1,1,1,1,1,1,0],
              [0,3,3,2,1,1,0,1,1,0],
              [0,1,1,0,2,0,0,1,0,0],
              [0,1,2,1,1,1,1,1,0,0],
              [0,0,0,0,0,1,0,1,0,0],
              [0,0,0,1,2,1,4,1,0,0],
              [0,0,0,1,1,1,1,1,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0]];


var BOXER_GAME_MODULE = (function() {

    var my = {};
    my.anchorNode = document.getElementById( "gameBoard" );
    my.game = new GameBoard();
    my.anchorNode.appendChild( my.game.element );

    //var $crate = $('div').find(el+[data-coord=+current+]);
    return my;
})();
