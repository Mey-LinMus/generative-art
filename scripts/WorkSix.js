document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const numParticles = 100;

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }

  Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
  };

  Particle.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  };

  function createParticles(event) {
    let xPos, yPos;

    if (event.x && event.y) {
      xPos = event.x;
      yPos = event.y;
    } else {
      xPos =
        event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      yPos =
        event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(xPos, yPos));
    }
  }

  function handleMouseMove(event) {
    createParticles(event);
  }

  function handleKeyPress(event) {
    if (event.key === "c" || event.key === "C") {
      particles.length = 0;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].size <= 0.2) {
        particles.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("keypress", handleKeyPress);

  animate();
});
