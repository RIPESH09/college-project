const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake = [{ x: 2 * scale, y: 2 * scale }];
let food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
let dx = scale;
let dy = 0;
let score = 0;

document.addEventListener('keydown', changeDirection);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(part => ctx.fillRect(part.x, part.y, scale, scale));

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function update() {
    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
    } else {
        snake.pop();
    }

    // Check for collision with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }

    // Check for collision with self
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -scale;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = scale;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -scale;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = scale;
                dy = 0;
            }
            break;
    }
}

function resetGame() {
    snake = [{ x: 2 * scale, y: 2 * scale }];
    food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
    dx = scale;
    dy = 0;
    score = 0;
}

function gameLoop() {
    draw();
    update();
    setTimeout(gameLoop, 100); // 10 frames per second
}

gameLoop();
