var canvas_width = window.innerWidth;
var canvas_height = window.innerHeight;
var w;
var columns;
var rows;

// matrices
var board;
var next;
var heatmap;

var heatmap_colours = 
  [[16,255,0], 
  [144,255,0],
  [255,176,0]
  [192,255,0], 
  [255,255,0], 
  [255,144,0],
  [255,0,0]];

function setup() {

  frameRate(10);

  createCanvas(canvas_width, canvas_height);
  w = 20;

  // max number of rows I can fit in there
  columns = floor(canvas_width/w);
  rows = floor(canvas_height/w);

  // make 2d array
  board = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  } 
  
  // need another array to track state
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }

  // third one for heatmap
  heatmap = new Array(columns);
  for (i = 0; i < columns; i++) {
    heatmap[i] = new Array(rows);
  }

  init();
}

function draw() {
  background(255);
  generate();

  for ( var i = 0; i < columns;i++) {
    for ( var j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) { 

        var gen = heatmap[i][j];
        if(gen > 5) gen = 5;

        var gen_colour_r = heatmap_colours[gen][0];
        var gen_colour_g = heatmap_colours[gen][1];
        var gen_colour_b = heatmap_colours[gen][2];

        // live cell
        //fill(206,201,254);
        fill(gen_colour_r,gen_colour_g,gen_colour_b);
      }
      else {
        // dead cell
        fill(255); 
      } 

      // cell border
      stroke(40,130,80);
      rect(i*w, j*w, w+1, w+1);
    }
  }
}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

// Fill board randomly
function init() {
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) {
        board[i][j] = 0;
        heatmap[i][j] = 0;
      } else {
       var val = floor(random(2));
       board[i][j] = val;
       heatmap[i][j] = val;
     }

      next[i][j] = 0;
    }
  }
}

// Calculate next generation matrix
function generate() {

  //return;

  // Loop through and check for neighbours
  for (var x = 1; x < columns - 1; x++) {
    for (var y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid - this will add the state of current cell as well
      // but it's easier to subtract the current state later than to make exceptions for it now
      var neighbors = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // Subtract the current cell state from sum
      // as it was added above
      neighbors -= board[x][y];

      // Rules of Life BITCHES
      // ---------------------------

      // Die of Loneliness
      if ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;
      // Die of over population
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           
      // Reproduction
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;
      // No change, Carry on my wayward son...
      else next[x][y] = board[x][y]; 

      // Heatmap
      // ---------------------------

      // Reset heatmap if current state is 0
      if (board[x][y] == 0) heatmap[x][y] = 0;
      // increment if not
      else heatmap[x][y] = heatmap[x][y] + 1;

    }
  }

  // (swap! current next-board)
  var temp = board;
  board = next;
  next = temp;
}

