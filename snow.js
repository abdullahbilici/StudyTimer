const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];
const staticSnow = [];
let waveOffset = 0; // Controls slow movement

// Snowflake class (for falling snow)
class Snowflake {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.speed = (this.radius - 1) / 3 + 0.2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = Math.random() * -canvas.height;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

// Create falling snowflakes
for (let i = 0; i < 100; i++) {
  snowflakes.push(new Snowflake());
}

// Generate base static snow points using sine wave
function generateStaticSnow() {
  staticSnow.length = 0; // Clear previous data on resize
  const snowHeight = 50;
  for (let i = 0; i < canvas.width + 20; i += 5) { // Smaller step for smoother waves
    let waveHeight = Math.sin(i * 0.02) * 5; // Smooth sine wave effect
    staticSnow.push({ x: i, baseY: canvas.height - snowHeight + waveHeight });
  }
}

// Draw animated static snow with slow wave motion
function drawStaticSnow() {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);

  staticSnow.forEach((point, index) => {
    let y = point.baseY + Math.sin((index * 0.1) + waveOffset) * 3; // Slow movement
    ctx.lineTo(point.x, y);
  });

  ctx.lineTo(canvas.width, canvas.height);
  ctx.closePath();
  ctx.fill();
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach((snowflake) => snowflake.update());

  drawStaticSnow();

  waveOffset += 0.02; // Controls wave speed (lower = slower)

  requestAnimationFrame(animate);
}

// Generate snow and start animation
generateStaticSnow();
animate();

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generateStaticSnow();
});
