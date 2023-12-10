let colors, colorIndex;
let ripples = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colors = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255),
    color(255, 255, 0),
    color(255, 0, 255),
    color(0, 255, 255),
  ];
  colorIndex = 0;
}

function draw() {
  let bgColor = map(mouseX, 0, width, 0, 255);
  background(bgColor);

  let strokeColor = map(mouseY, 0, height, 0, 255);
  stroke(strokeColor);

  push();
  translate(0, 0, -200);
  rotateX(60);
  noFill();

  for (let i = 0; i < 50; i++) {
    beginShape();
    for (let j = 0; j < 360; j += 10) {
      let rad = i * 3;
      let x = rad * cos(j);
      let y = rad * sin(j);
      let z = sin(frameCount * 2 + i * 5) * 50;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }

  pop();

  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].display();
    if (ripples[i].isFinished()) {
      ripples.splice(i, 1);
    }
  }
}

function mousePressed() {
  colorIndex = (colorIndex + 1) % colors.length;
  stroke(colors[colorIndex]);

  let newRipple = new Ripple(mouseX, mouseY);
  ripples.push(newRipple);
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = random(50, 150);
  }

  update() {
    this.radius += 5;
  }

  display() {
    noFill();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  isFinished() {
    return this.radius >= this.maxRadius;
  }
}
