function rotate2D(v, theta) {
  return createVector(
    v.x * cos(theta) - v.y * sin(theta),
    v.x * sin(theta) + v.y * cos(theta)
  );
}

function WrapValue(n, mod) {
  return (n + mod) % mod;
}

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.dir = p5.Vector.random2D().setMag(1);
    this.angle = PI / 4;
    this.size = 1;
  }

  Update() {
    let found = this.Smell();
    this.Move();
  }

  Smell() {
    let i; // index of pixel 'smell' position
    let F, FL, FR;

    // Front direction, left and right offset by distance
    let offsetDirection = this.dir.copy().setMag(offsetLength);
    const leftVector = rotate2D(offsetDirection, -PI * 0.25);
    const rightVector = rotate2D(offsetDirection, PI * 0.25);
    const Fdir = createVector(
      WrapValue(this.pos.x + offsetDirection.x, width),
      WrapValue(this.pos.y + offsetDirection.y, height)
    );
    const FLdir = createVector(
      WrapValue(this.pos.x + leftVector.x, width),
      WrapValue(this.pos.y + leftVector.y, height)
    );
    const FRdir = createVector(
      WrapValue(this.pos.x + rightVector.x, width),
      WrapValue(this.pos.y + rightVector.y, height)
    );

    // get pixel values from the texture
    // uses the pixel density offsets to get the values
    i = 4 * d * (floor(Fdir.y) * d * width + floor(Fdir.x));
    F = pixels[i];

    i = 4 * d * (floor(FLdir.y) * d * width + floor(FLdir.x));
    FL = pixels[i];

    i = 4 * d * (floor(FRdir.y) * d * width + floor(FRdir.x));
    FR = pixels[i];

    // This is directly from the paper
    if (F > FL && F > FR) {
      return true;
    } else if (F < FL && F < FR) {
      if (random() < 0.5) {
        this.TurnLeft();
        return true;
      } else {
        this.TurnRight();
        return true;
      }
    } else if (FL < FR) {
      this.TurnRight();
      return true;
    } else if (FR < FL) {
      this.TurnLeft();
      return true;
    } else {
      return false;
    }
  }

  TurnLeft() {
    this.dir.rotate(-this.angle);
  }

  TurnRight() {
    this.dir.rotate(this.angle);
  }

  Move() {
    this.pos.x = (this.pos.x + this.dir.x + width) % width;
    this.pos.y = (this.pos.y + this.dir.y + height) % height;
  }
}

let c = [];
let d;

let offsetLength;
let rectSize;

function setup() {
  d = pixelDensity();
  var cnv = createCanvas(500, 500);
  var x = (windowWidth - width) / 2;
  cnv.position(x);

  background(0);

  for (let i = 0; i < 2000; i++) {
    c.push(new Cell(random(width), random(height)));
  }

  offsetSlider = createSlider(0, 50, 5);
  rectSize = createSlider(0, width, 0);
}

function draw() {
  loadPixels();
  offsetLength = offsetSlider.value();

  for (let i = 0; i < c.length; i++) {
    c[i].Update();
  }

  drawCells(c);

  if (mouseIsPressed) {
    push();
    fill(255, 192, 255);
    circle(mouseX, mouseY, 80);
    pop();
  }

  push();
  rectMode(CENTER);
  fill(0, 200);
  translate(width * 0.5, height * 0.5);
  rotate(frameCount * 0.005);
  rect(0, 0, rectSize.value());
  pop();
}

function drawCells(cells) {
  fill(255, 255, 250);
  noStroke();
  for (let i = 0; i < cells.length; i++) {
    circle(c[i].pos.x, c[i].pos.y, c[i].size + 0.5);
  }
}
