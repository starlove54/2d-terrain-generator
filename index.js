let cols, rows; // number of columns and rows in the grid
let scl = 20; // scale of the grid
let w = 1000; // width of the terrain
let h = 800; // height of the terrain
let terrain = []; // 2D array to store the terrain data
let flying = 0; // variable to control the speed of the terrain generation

function setup() {
 
    createCanvas(800, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
 
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
    //     if (frameCount === 1) {
    //     capturer.start();
    //   }
  flying -= 0.025; // increment the flying variable to control the speed of the terrain generation
  let yoff = flying; // use the flying variable as the y offset for the perlin noise
  for (let y = 0; y < rows; y++) {
    let xoff = 0; // reset the x offset for each row
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100); // generate the terrain data using perlin noise and map it to a range of -100 to 100
      xoff += 0.2; // increment the x offset
    }
    yoff += 0.2; // increment the y offset

//       if(frameCount < 5){
//     capturer.capture(canvas);
//   }
  
//   else if (frameCount === 5) {
//     capturer.save();
//     capturer.stop();
//   }
  }
  
  background(255, 192, 203);
  rotateX(PI/3);
  translate(-w/2, -h/2);
  for (let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    stroke(255, 204, 0);
    strokeWeight(1);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    fill(42,42,52);
    endShape();
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas(gd.timestamp(), 'png');
}
