let electricOrGrowth;

function setup() {
  var cnv = createCanvas(500, 500);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  frameRate(30);

  if (random() < 0.5) {
    electricOrGrowth = "growth";
  } else {
    electricOrGrowth = "electric";
  }
  if (electricOrGrowth === "growth") {
    // Gradient background for growth
    setGradient("#BCB498", "#594F4F");
  } else {
    background("#000000");
  }
}

function draw() {
  if (electricOrGrowth === "electric") {
    // Background fade for electric
    background(0, 0, 0, 5);
  }
  if (random() < 0.05) {
    const count = random(1, 10);
    for (let i = 0; i < count; i++) {
      const length = map(frameCount, 0, 1000, 0, 70, true);
      const electric = createThunder(0, length);
      colorMode(HSB);
      if (electricOrGrowth === "electric") {
        stroke(random(0, 255), 100, 100); // Vibrant electric colors
      } else {
        stroke(random(200, 255), random(50, 100), random(10, 30)); // Dynamic growth colors
      }
      drawVecs(electric, random(width), 0, random(1, 5)); // Varying stroke weight
    }
  }
  if (electricOrGrowth === "growth" && frameCount > 1000) noLoop();
}

function setGradient(color1, color2) {
  // Function to set gradient background
  noFill();
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(color1), color(color2), inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function createThunder(_x, _y) {
  return [...electricGrowth(createVector(_x, _y))];
}

function drawVecs(_vecArray, _x, _y, _strokeWeight) {
  let x = _x;
  let y = _y;
  for (let vec of _vecArray) {
    if (Array.isArray(vec)) {
      drawVecs(vec, x, y, _strokeWeight);
    } else {
      strokeWeight(_strokeWeight);
      line(x, y, x + vec.x, y + vec.y);
      x += vec.x;
      y += vec.y;
      _strokeWeight *= 0.9;
    }
  }
}

function electricGrowth(_vec) {
  const nextVec = _vec.copy().rotate(random(-0.5, 0.5)).mult(random(0.9, 1));
  if (nextVec.mag() < 5 || (random() < 0.05 && nextVec.mag() > 10)) return [];
  if (random() < 0.1) {
    return [nextVec, electricGrowth(nextVec), ...electricGrowth(nextVec)];
  }
  return [nextVec, ...electricGrowth(nextVec)];
}
