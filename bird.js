function Bird() {
  this.y = height / 2;
  this.x = 64;
  this.size = 32;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  this.airResistance = 0.9;

  this.show = function () {
    fill(255, 100);
    ellipse(this.x, this.y, this.size, this.size);
  };

  this.up = function () {
    this.velocity += this.lift;
  };

  this.update = function () {
    this.velocity += this.gravity;
    this.velocity *= this.airResistance;
    this.y += this.velocity;

    if (this.y > height - this.size / 2) {
      this.y = height - this.size / 2;
      this.velocity = 0;
    }

    if (this.y < 0 + this.size / 2) {
      this.y = 0 + this.size / 2;
      this.velocity = 0;
    }
  };
}
