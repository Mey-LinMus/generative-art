let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

function mouseMoved() {
  particles.push(new Particle(mouseX, mouseY));
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.color = color(random(255), random(255), random(255), 150);
    this.size = random(10, 30);
  }

  update() {
    this.position.add(this.velocity);

    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
