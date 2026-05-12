// ==================== Dark Mode Toggle ====================
const darkModeBtn = document.getElementById('darkModeBtn');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const body = document.body;
const modal = document.getElementById('gameModal');
const closeBtn = document.querySelector('.close-btn');
const gameContainer = document.getElementById('gameContainer');

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    darkModeBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ==================== Sound Toggle ====================
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';

soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    soundToggleBtn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
});

soundToggleBtn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

// ==================== Navigation Menu ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== Sound Effects ====================
function playSound(type) {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 600;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'success':
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'error':
            oscillator.frequency.value = 400;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
    }
}

// ==================== Modal Management ====================
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    gameContainer.innerHTML = '';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        gameContainer.innerHTML = '';
    }
});

// ==================== Game Navigation ====================
function navigateToGame(gameName) {
    playSound('click');
    modal.classList.add('show');
    
    switch(gameName) {
        case 'tictactoe':
            initTicTacToe();
            break;
        case 'snake':
            initSnake();
            break;
        case 'memory':
            initMemory();
            break;
    }
}

// ==================== Leaderboard Management ====================
function getLeaderboard(gameName) {
    const key = `leaderboard_${gameName}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function saveToLeaderboard(gameName, player, score) {
    const leaderboard = getLeaderboard(gameName);
    leaderboard.push({ player, score, date: new Date().toLocaleDateString() });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.splice(10); // Keep top 10
    localStorage.setItem(`leaderboard_${gameName}`, JSON.stringify(leaderboard));
    updateLeaderboardDisplay();
}

function updateLeaderboardDisplay() {
    // Snake Leaderboard
    const snakeLeaderboard = document.getElementById('snakeLeaderboard');
    const snakeScores = getLeaderboard('snake');
    snakeLeaderboard.innerHTML = snakeScores.map((entry, index) => `
        <li class="leaderboard-item">
            <span class="leaderboard-rank ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}">#${index + 1}</span>
            <span class="leaderboard-name">${entry.player}</span>
            <span class="leaderboard-score">${entry.score}</span>
        </li>
    `).join('');

    // Memory Leaderboard
    const memoryLeaderboard = document.getElementById('memoryLeaderboard');
    const memoryScores = getLeaderboard('memory');
    memoryLeaderboard.innerHTML = memoryScores.map((entry, index) => `
        <li class="leaderboard-item">
            <span class="leaderboard-rank ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}">#${index + 1}</span>
            <span class="leaderboard-name">${entry.player}</span>
            <span class="leaderboard-score">${entry.score}s</span>
        </li>
    `).join('');

    // Tic Tac Toe Leaderboard
    const tictactoeLeaderboard = document.getElementById('tictactoeLeaderboard');
    const tictactoeScores = getLeaderboard('tictactoe');
    tictactoeLeaderboard.innerHTML = tictactoeScores.map((entry, index) => `
        <li class="leaderboard-item">
            <span class="leaderboard-rank ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}">#${index + 1}</span>
            <span class="leaderboard-name">${entry.player}</span>
            <span class="leaderboard-score">${entry.score}</span>
        </li>
    `).join('');
}

// ==================== Games Data ====================
const allGames = [
    // Puzzle Games
    { name: '2048', icon: '🎮', category: 'puzzle' },
    { name: 'Sudoku', icon: '🔢', category: 'puzzle' },
    { name: 'Crossword', icon: '⬜', category: 'puzzle' },
    { name: 'Word Search', icon: '🔤', category: 'puzzle' },
    { name: 'Jigsaw', icon: '🧩', category: 'puzzle' },
    { name: 'Tiles', icon: '⬛', category: 'puzzle' },
    { name: 'Blocks', icon: '🧱', category: 'puzzle' },
    { name: 'Pipes', icon: '🔧', category: 'puzzle' },
    { name: 'Sokoban', icon: '📦', category: 'puzzle' },
    { name: 'Tetris', icon: '▶️', category: 'puzzle' },
    
    // Action Games
    { name: 'Space Invaders', icon: '👾', category: 'action' },
    { name: 'Asteroid', icon: '🪨', category: 'action' },
    { name: 'Flappy Bird', icon: '🐦', category: 'action' },
    { name: 'Breakout', icon: '🎯', category: 'action' },
    { name: 'Pong', icon: '🏓', category: 'action' },
    { name: 'Pacman', icon: '👻', category: 'action' },
    { name: 'Dodge', icon: '🎪', category: 'action' },
    { name: 'Run', icon: '🏃', category: 'action' },
    { name: 'Jump', icon: '⬆️', category: 'action' },
    { name: 'Collect', icon: '⭐', category: 'action' },
    
    // Strategy Games
    { name: 'Chess', icon: '♟️', category: 'strategy' },
    { name: 'Checkers', icon: '🔴', category: 'strategy' },
    { name: 'Go', icon: '⚪', category: 'strategy' },
    { name: 'Reversi', icon: '🔄', category: 'strategy' },
    { name: 'Connect4', icon: '🔵', category: 'strategy' },
    { name: 'Risk', icon: '🗺️', category: 'strategy' },
    { name: 'Tower Defense', icon: '🛡️', category: 'strategy' },
    { name: 'Civilization', icon: '🏰', category: 'strategy' },
    { name: 'Strategy RPG', icon: '⚔️', category: 'strategy' },
    { name: 'Tactics', icon: '📍', category: 'strategy' },
    
    // Classic Games
    { name: 'Tic Tac Toe', icon: '⭕', category: 'classic' },
    { name: 'Snake', icon: '🐍', category: 'classic' },
    { name: 'Memory Match', icon: '🧠', category: 'classic' },
    { name: 'Card Match', icon: '🎴', category: 'classic' },
    { name: 'Solitaire', icon: '🎰', category: 'classic' },
    { name: 'Blackjack', icon: '🃏', category: 'classic' },
    { name: 'Poker', icon: '♠️', category: 'classic' },
    { name: 'Slots', icon: '🎲', category: 'classic' },
    { name: 'Bingo', icon: '🎟️', category: 'classic' },
    { name: 'Hangman', icon: '🎭', category: 'classic' },
    
    // Arcade Games
    { name: 'Arcade Racing', icon: '🏎️', category: 'arcade' },
    { name: 'Arcade Boxing', icon: '🥊', category: 'arcade' },
    { name: 'Arcade Shooting', icon: '🔫', category: 'arcade' },
    { name: 'Arcade Ball', icon: '⚽', category: 'arcade' },
    { name: 'Arcade Maze', icon: '🌀', category: 'arcade' },
    { name: 'Arcade Jump', icon: '🦘', category: 'arcade' },
    { name: 'Arcade Swing', icon: '🎪', category: 'arcade' },
    { name: 'Arcade Flip', icon: '🎰', category: 'arcade' },
    { name: 'Arcade Match', icon: '✨', category: 'arcade' },
    { name: 'Arcade Speed', icon: '⚡', category: 'arcade' },
];

// Add more games to reach 500+
for (let i = 0; i < 450; i++) {
    const categories = ['puzzle', 'action', 'strategy', 'classic', 'arcade', 'brain'];
    const icons = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧', '🎸'];
    const gameNames = ['Game', 'Quest', 'Challenge', 'Adventure', 'Battle', 'Race', 'Dive', 'Jump', 'Fly', 'Rush'];
    
    const category = categories[Math.floor(Math.random() * categories.length)];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const gameName = gameNames[Math.floor(Math.random() * gameNames.length)] + ' ' + (i + 51);
    
    allGames.push({ name: gameName, icon, category });
}

// ==================== Games Container Population ====================
function populateGames(games = allGames) {
    const container = document.getElementById('gamesContainer');
    container.innerHTML = games.map(game => `
        <div class="game-item" onclick="playSound('click')">
            <div class="game-item-icon">${game.icon}</div>
            <div class="game-item-name">${game.name}</div>
            <div class="game-item-category">${game.category}</div>
        </div>
    `).join('');
}

// ==================== Search & Filter ====================
const gameSearch = document.getElementById('gameSearch');
const categoryFilter = document.getElementById('categoryFilter');

gameSearch.addEventListener('input', filterGames);
categoryFilter.addEventListener('change', filterGames);

function filterGames() {
    const searchTerm = gameSearch.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const filtered = allGames.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    populateGames(filtered);
}

// ==================== Initialize on Load ====================
document.addEventListener('DOMContentLoaded', () => {
    populateGames();
    updateLeaderboardDisplay();
});

// ==================== Tic Tac Toe Game ====================
let tictactoeBoard = ['', '', '', '', '', '', '', '', ''];
let tictactoeCurrentPlayer = 'X';
let tictactoeGameOver = false;

function initTicTacToe() {
    tictactoeBoard = ['', '', '', '', '', '', '', '', ''];
    tictactoeCurrentPlayer = 'X';
    tictactoeGameOver = false;
    
    gameContainer.innerHTML = `
        <div class="game-container">
            <h2 class="game-title">Tic Tac Toe</h2>
            <div class="game-info">
                <div class="info-item">
                    <div class="info-label">Current Player</div>
                    <div class="info-value" id="currentPlayer">X</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Status</div>
                    <div class="info-value" id="gameStatus">Playing</div>
                </div>
            </div>
            <div class="tictactoe-board" id="tictactoeBoard">
                ${Array(9).fill(0).map((_, i) => `<div class="tictactoe-cell" onclick="tictactoeMakeMove(${i})"></div>`).join('')}
            </div>
            <div class="game-info" style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="initTicTacToe()">New Game</button>
                <button class="btn btn-danger" onclick="resetTicTacToe()">Reset All</button>
            </div>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">Play against AI</p>
        </div>
    `;
    
    renderTictactoeBoard();
}

function renderTictactoeBoard() {
    const cells = document.querySelectorAll('.tictactoe-cell');
    cells.forEach((cell, index) => {
        cell.textContent = tictactoeBoard[index];
        cell.className = 'tictactoe-cell';
        if (tictactoeBoard[index] === 'X') cell.classList.add('x');
        if (tictactoeBoard[index] === 'O') cell.classList.add('o');
    });
    
    document.getElementById('currentPlayer').textContent = tictactoeCurrentPlayer;
}

function tictactoeMakeMove(index) {
    if (tictactoeBoard[index] === '' && !tictactoeGameOver && tictactoeCurrentPlayer === 'X') {
        playSound('click');
        tictactoeBoard[index] = 'X';
        
        if (checkTictactoeWinner()) {
            tictactoeGameOver = true;
            document.getElementById('gameStatus').textContent = 'You Win!';
            saveToLeaderboard('tictactoe', 'Player', 1);
        } else if (tictactoeBoard.every(cell => cell !== '')) {
            tictactoeGameOver = true;
            document.getElementById('gameStatus').textContent = 'Draw!';
        } else {
            tictactoeCurrentPlayer = 'O';
            renderTictactoeBoard();
            setTimeout(tictactoeAIMove, 500);
        }
        
        renderTictactoeBoard();
    }
}

function tictactoeAIMove() {
    const availableMoves = tictactoeBoard.map((cell, index) => cell === '' ? index : null).filter(i => i !== null);
    
    if (availableMoves.length === 0) return;
    
    const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    tictactoeBoard[randomIndex] = 'O';
    
    if (checkTictactoeWinner()) {
        tictactoeGameOver = true;
        document.getElementById('gameStatus').textContent = 'AI Wins!';
    } else if (tictactoeBoard.every(cell => cell !== '')) {
        tictactoeGameOver = true;
        document.getElementById('gameStatus').textContent = 'Draw!';
    } else {
        tictactoeCurrentPlayer = 'X';
    }
    
    renderTictactoeBoard();
}

function checkTictactoeWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winConditions.some(condition => {
        return tictactoeBoard[condition[0]] !== '' &&
               tictactoeBoard[condition[0]] === tictactoeBoard[condition[1]] &&
               tictactoeBoard[condition[0]] === tictactoeBoard[condition[2]];
    });
}

function resetTicTacToe() {
    if (confirm('Are you sure? This will reset the game.')) {
        initTicTacToe();
    }
}

// ==================== Snake Game ====================
let snakeGame = null;

function initSnake() {
    gameContainer.innerHTML = `
        <div class="game-container">
            <h2 class="game-title">Snake</h2>
            <div class="game-info">
                <div class="info-item">
                    <div class="info-label">Score</div>
                    <div class="info-value" id="snakeScore">0</div>
                </div>
                <div class="info-item">
                    <div class="info-label">High Score</div>
                    <div class="info-value" id="snakeHighScore">0</div>
                </div>
            </div>
            <div class="snake-container">
                <canvas id="snakeCanvas" width="400" height="400"></canvas>
            </div>
            <div class="snake-controls">
                <button class="btn btn-primary" id="snakePlayBtn" onclick="snakeToggleGame()">Start Game</button>
                <button class="btn btn-secondary" onclick="snakeResetGame()">Reset</button>
            </div>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">Use Arrow Keys to control the snake</p>
        </div>
    `;
    
    snakeGame = new SnakeGame();
    snakeGame.draw();
}

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.gridCount = this.canvas.width / this.gridSize;
        this.reset();
    }
    
    reset() {
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.isRunning = false;
        this.gameOver = false;
        document.getElementById('snakeScore').textContent = this.score;
        this.updateHighScore();
    }
    
    generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.gridCount),
                y: Math.floor(Math.random() * this.gridCount)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        return food;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--light-bg').trim();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        this.snake.forEach((segment, index) => {
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        // Draw food
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
        this.ctx.fillRect(
            this.food.x * this.gridSize + 1,
            this.food.y * this.gridSize + 1,
            this.gridSize - 2,
            this.gridSize - 2
        );
    }
    
    update() {
        if (!this.isRunning || this.gameOver) return;
        
        this.direction = this.nextDirection;
        
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Check collisions
        if (head.x < 0 || head.x >= this.gridCount || head.y < 0 || head.y >= this.gridCount) {
            this.endGame();
            return;
        }
        
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.endGame();
            return;
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            playSound('success');
            this.score += 10;
            document.getElementById('snakeScore').textContent = this.score;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }
    
    endGame() {
        playSound('error');
        this.gameOver = true;
        this.isRunning = false;
        document.getElementById('snakePlayBtn').textContent = 'Game Over! Play Again';
        saveToLeaderboard('snake', 'Player', this.score);
        this.updateHighScore();
    }
    
    updateHighScore() {
        const leaderboard = getLeaderboard('snake');
        const highScore = leaderboard.length > 0 ? leaderboard[0].score : 0;
        document.getElementById('snakeHighScore').textContent = highScore;
    }
}

function snakeToggleGame() {
    if (!snakeGame) return;
    
    snakeGame.isRunning = !snakeGame.isRunning;
    document.getElementById('snakePlayBtn').textContent = snakeGame.isRunning ? 'Pause' : 'Resume';
    
    if (snakeGame.isRunning) {
        snakeGame.gameLoop = setInterval(() => snakeGame.update(), 100);
    } else {
        clearInterval(snakeGame.gameLoop);
    }
}

function snakeResetGame() {
    if (snakeGame) {
        clearInterval(snakeGame.gameLoop);
        snakeGame.reset();
        snakeGame.draw();
        document.getElementById('snakePlayBtn').textContent = 'Start Game';
    }
}

// Snake keyboard controls
document.addEventListener('keydown', (e) => {
    if (!snakeGame) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (snakeGame.direction.y === 0) snakeGame.nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (snakeGame.direction.y === 0) snakeGame.nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (snakeGame.direction.x === 0) snakeGame.nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (snakeGame.direction.x === 0) snakeGame.nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
    }
});

// ==================== Memory Matching Game ====================
let memoryGame = null;

function initMemory() {
    const emojis = ['🍎', '🍌', '🍊', '🍋', '🍌', '🍉', '🍓', '🫐'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    gameContainer.innerHTML = `
        <div class="game-container">
            <h2 class="game-title">Memory Match</h2>
            <div class="game-info">
                <div class="info-item">
                    <div class="info-label">Moves</div>
                    <div class="info-value" id="memoryMoves">0</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Matches</div>
                    <div class="info-value" id="memoryMatches">0/8</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Best Time</div>
                    <div class="info-value" id="memoryBestTime">-</div>
                </div>
            </div>
            <div class="memory-board" id="memoryBoard">
                ${cards.map((emoji, index) => `<button class="memory-card" onclick="memoryGame.flip(${index})" data-emoji="${emoji}"></button>`).join('')}
            </div>
            <div class="game-info" style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="initMemory()">New Game</button>
                <button class="btn btn-danger" onclick="memoryResetGame()">Reset All</button>
            </div>
        </div>
    `;
    
    memoryGame = new MemoryGame(cards);
    updateMemoryBestTime();
}

class MemoryGame {
    constructor(cards) {
        this.cards = cards;
        this.flipped = [];
        this.matched = [];
        this.moves = 0;
        this.startTime = Date.now();
    }
    
    flip(index) {
        if (this.flipped.length >= 2 || this.flipped.includes(index) || this.matched.includes(index)) return;
        
        playSound('click');
        this.flipped.push(index);
        const card = document.querySelectorAll('.memory-card')[index];
        card.classList.add('flipped');
        card.textContent = this.cards[index];
        
        if (this.flipped.length === 2) {
            this.moves++;
            document.getElementById('memoryMoves').textContent = this.moves;
            
            if (this.cards[this.flipped[0]] === this.cards[this.flipped[1]]) {
                playSound('success');
                this.matched.push(...this.flipped);
                document.getElementById('memoryMatches').textContent = `${this.matched.length / 2}/8`;
                
                if (this.matched.length === this.cards.length) {
                    this.endGame();
                }
                
                this.flipped = [];
            } else {
                playSound('error');
                setTimeout(() => this.resetFlipped(), 600);
            }
        }
    }
    
    resetFlipped() {
        this.flipped.forEach(index => {
            const card = document.querySelectorAll('.memory-card')[index];
            card.classList.remove('flipped');
            card.textContent = '';
        });
        this.flipped = [];
    }
    
    endGame() {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - this.startTime) / 1000);
        saveToLeaderboard('memory', 'Player', timeTaken);
        setTimeout(() => alert(`Game Complete! Time: ${timeTaken}s, Moves: ${this.moves}`), 300);
    }
}

function memoryResetGame() {
    if (confirm('Are you sure? This will reset the game.')) {
        initMemory();
    }
}

function updateMemoryBestTime() {
    const leaderboard = getLeaderboard('memory');
    if (leaderboard.length > 0) {
        document.getElementById('memoryBestTime').textContent = leaderboard[0].score + 's';
    }
}
