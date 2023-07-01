class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;
    this.size = 32;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
    this.airResistance = 0.9;
    this.score = 0;
    this.fitness = 0;

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  copy() {
    return new Bird(this.brain);
  }

  show() {
    fill(255, 100);
    ellipse(this.x, this.y, this.size, this.size);
  }

  up() {
    this.velocity += this.lift;
  }

  mutate() {
    // Mutate the bird's brain
    this.brain.mutate(() => randomGaussian() * 0.1);
  }

  think(pipes) {
    // Find the closest pipe
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    if (closest != null) {
      // Create inputs for the neural network
      let inputs = [
        map(closest.x, this.x, width, 0, 1), // x position of closest pipe
        map(closest.top, 0, height, 0, 1), // top of closest pipe opening
        map(closest.bottom, 0, height, 0, 1), // bottom of closest pipe opening
        map(this.y, 0, height, 0, 1), // bird's y position
        map(this.velocity, -5, 5, 0, 1), // bird's y velocity
      ];

      // Get the outputs from the network
      let [jump, noJump] = this.brain.predict(inputs);

      // Decide to jump or not
      if (jump > noJump) {
        this.up();
      }
    }
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.velocity *= this.airResistance;
    this.y += this.velocity;

    // Keep the bird within the screen bounds
    if (this.y > height - this.size / 2) {
      this.y = height - this.size / 2;
      this.velocity = 0;
    }

    if (this.y < 0 + this.size / 2) {
      this.y = 0 + this.size / 2;
      this.velocity = 0;
    }
  }
}

function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}
