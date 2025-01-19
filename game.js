const player = document.getElementById("player");
const train = document.getElementById("train");
const jumpButton = document.getElementById("jump-button");
const gameOverScreen = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const quitButton = document.getElementById("quit-button");
const finalScore = document.getElementById("final-score");

let isJumping = false;
let isGameOver = false;
let score = 0;

// Event listener for jump
jumpButton.addEventListener("click", () => {
  if (!isJumping && !isGameOver) {
    jump();
  }
});

// Restart the game
restartButton.addEventListener("click", restartGame);
quitButton.addEventListener("click", quitGame);

function jump() {
  isJumping = true;
  player.style.bottom = "100px"; // Jump height
  setTimeout(() => {
    player.style.bottom = "0px"; // Reset to ground
    isJumping = false;
  }, 500); // Jump duration
}

function detectCollision() {
  const playerRect = player.getBoundingClientRect();
  const trainRect = train.getBoundingClientRect();

  // Condition for collision
  const isColliding =
    playerRect.right > trainRect.left && // Player's right side crosses train's left side
    playerRect.left < trainRect.right && // Player's left side is still behind train's right side
    playerRect.bottom > trainRect.top && // Player is on the ground or touching the train
    !isJumping; // Player is not jumping

  // Condition for safely passing the train
  const hasPassedTrain = playerRect.left > trainRect.right;

  if (isColliding) {
    triggerGameOver();
  } else if (hasPassedTrain) {
    // Player safely crosses the train; keep playing
    score += 10; // Increment score for passing the train
  }
}

function triggerGameOver() {
  isGameOver = true;
  finalScore.textContent = score;
  gameOverScreen.style.display = "block"; // Show Game Over screen
}

function restartGame() {
  location.reload(); // Reload the game to restart
}

function quitGame() {
  alert("Thanks for playing!");
  window.location.reload();
}

function updateGame() {
  if (isGameOver) return;

  // Check for collisions
  detectCollision();

  requestAnimationFrame(updateGame);
}
function jump() {
    if (!player.classList.contains("jump")) {
        player.classList.add("jump");
        player.style.transition = "bottom 0.5s ease"; // Increase the duration of the jump
        player.style.bottom = "150px"; // Make the jump higher

        setTimeout(() => {
            player.style.bottom = "0"; // Bring the player back down
        }, 500); // Match the duration to the transition
    }
}
function jump() {
    if (!player.classList.contains("jump")) {
        player.classList.add("jump");
        player.style.transition = "bottom 0.2s ease"; // Faster jump (shorter duration)
        player.style.bottom = "200px"; // Higher jump

        setTimeout(() => {
            player.style.bottom = "0"; // Bring the player back down
        }, 200); // Match the duration to the transition
    }
}
function jump() {
    if (!player.classList.contains("jump")) {
        player.classList.add("jump");
        player.style.transition = "bottom 0.7s ease-out"; // Smooth, slow ascent and descent
        player.style.bottom = "200px"; // High jump

        setTimeout(() => {
            player.style.transition = "bottom 1s ease-in"; // Simulate slow gravity (descent)
            player.style.bottom = "0"; // Bring the player back down
        }, 700); // Match the ascent duration
    }
}
let jumpCount = 0; // Track the number of jumps
const maxJumps = 2; // Allow up to 2 jumps

function jump() {
    if (jumpCount < maxJumps) {
        jumpCount++; // Increment the jump count
        player.style.transition = "bottom 0.5s ease"; // Smooth jump transition
        const currentBottom = parseInt(player.style.bottom || 0); // Current position
        player.style.bottom = `${currentBottom + 150}px`; // Jump higher
        setTimeout(() => {
            if (jumpCount >= maxJumps) {
                // Optional: Reset bottom to simulate falling back after the second jump
                player.style.transition = "bottom 0.5s ease-in";
                player.style.bottom = "0"; // Land back
            }
        }, 500); // Match the jump duration
    }
}

// Reset jump count when the player lands
function resetJumpCount() {
    if (parseInt(player.style.bottom) === 0) {
        jumpCount = 0; // Reset when the player is on the ground
    }
}

// Add jump button functionality
document.getElementById("jump-button").addEventListener("click", () => {
    jump();
});

// Monitor landing to reset jump count
setInterval(resetJumpCount, 50); // Check every 50ms


// Start the game loop
updateGame();
