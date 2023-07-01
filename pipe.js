class Pipe {
  constructor() {
    this.spacing = random(128, height / 2);
    this.centerY = random(this.spacing, height - this.spacing);

    this.top = this.centerY - this.spacing / 2;
    this.bottom = height - (this.centerY + this.spacing / 2);
    this.x = width;
    this.w = 50;
    this.speed = 2;
    this.highlight = false;
  }

  hits(bird) {
    const birdTop = bird.y - bird.size / 2;
    const birdBottom = bird.y + bird.size / 2;

    if (birdTop < this.top || birdBottom > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }

    this.highlight = false;
    return false;
  }

  show() {
    fill(100);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offScreen() {
    return this.x < -this.w;
  }
}
