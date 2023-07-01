const totalPopulation = 500;
let activeBirds = [];
let allBirds = [];
let pipes = [];
let counter = 0;

let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;
let generationSpan;

let highScore = 0;
let runBest = false;
let runBestButton;
let generation = 1;

function setup() {
  const canvas = createCanvas(400, 600);
  canvas.parent('canvascontainer');

  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  runBestButton = select('#best');
  runBestButton.mousePressed(toggleState);
  generationSpan = select('#gen');

  for (let i = 0; i < totalPopulation; i++) {
    const bird = new Bird();
    activeBirds.push(bird);
    allBirds.push(bird);
  }
}

function toggleState() {
  runBest = !runBest;

  if (runBest) {
    resetGame();
    runBestButton.html('Continue Training');
  } else {
    nextGeneration();
    runBestButton.html('Run Best');
  }
}

function draw() {
  background(22);

  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      fill(50);
      ellipse(x, y, 5, 5);
    }
  }

  const cycles = speedSlider.value();
  speedSpan.html(cycles);

  for (let n = 0; n < cycles; n++) {
    for (let i = pipes.length - 1; i >= 0; i--) {
      const pipe = pipes[i];
      pipe.update();
      if (pipe.offScreen()) {
        pipes.splice(i, 1);
      }
    }

    if (runBest) {
      bestBird.think(pipes);
      bestBird.update();

      for (let j = 0; j < pipes.length; j++) {
        if (pipes[j].hits(bestBird)) {
          resetGame();
          break;
        }
      }
    } else {
      for (let i = activeBirds.length - 1; i >= 0; i--) {
        const bird = activeBirds[i];
        bird.think(pipes);
        bird.update();

        for (let j = 0; j < pipes.length; j++) {
          if (pipes[j].hits(bird)) {
            activeBirds.splice(i, 1);
            break;
          }
        }
      }
    }

    if (counter % 100 === 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  let tempHighScore = 0;

  if (!runBest) {
    let tempBestBird = null;
    for (let i = 0; i < activeBirds.length; i++) {
      const bird = activeBirds[i];
      const s = bird.score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestBird = bird;
      }
    }

    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestBird = tempBestBird;
    }
  } else {
    tempHighScore = bestBird.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  highScoreSpan.html(tempHighScore);
  allTimeHighScoreSpan.html(highScore);

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }

  if (runBest) {
    bestBird.show();
  } else {
    for (let i = 0; i < activeBirds.length; i++) {
      activeBirds[i].show();
    }

    if (activeBirds.length === 0) {
      nextGeneration();
      generation++;
      generationSpan.html(generation);
    }
  }
}
