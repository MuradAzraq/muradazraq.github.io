const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// create Ball class
class Ball extends Shape {
  constructor(x, y, velX, velY, size, color) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 3 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // create collision detection func
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists && this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// create EvilCircle class
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 15, 20);
    this.color = "white";
    this.size = 15;
  }

  // create draw func
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.x -= this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.y -= this.velY;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          updateBallCount();
        }
      }
    }
  }
}

// create random number generator func
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// create random color generator func
function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

// create some balls and store in an array
const balls = [];

while (balls.length < 25) {
  let size = random(15, 20);

  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    size,
    randomRGB()
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

const evilCircle = new EvilCircle(width / 3, height / 4);

const checkScore = document.createElement("p");
checkScore.style.position = "absolute";
checkScore.style.margin = "0";
checkScore.style.top = "10px";
checkScore.style.right = "10px";
checkScore.style.color = "#aaa";
document.body.appendChild(checkScore);

// initial ball count
updateBallCount();

// call the loop func once to start
loop();

// function to update the ball count
function updateBallCount() {
  const totalBalls = balls.filter((ball) => ball.exists).length;
  checkScore.textContent = `Ball count= ${totalBalls}`;
}
