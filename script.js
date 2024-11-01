const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Set Canvas to Full Screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize Canvas when window resizes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Arrays to store rockets, sparkles, and additional glowing particles
let fireRocketsArray = [];
let fireRocketsSparklesArray = [];
let glowingParticlesArray = [];

// Fireworks Class
function FireRockets(x, y) {
    this.x = x || Math.floor(Math.random() * window.innerWidth); // Random x if no click position
    this.y = y || window.innerHeight; // Start from bottom or clicked position
    this.color = `hsl(${Math.floor(Math.random() * 360)},70%,50%)`;
    this.size = Math.floor(Math.random() * 5 + 5);
    this.speedY = Math.random() * 5 + 5;
    this.crackRocketY = y ? y - 50 : Math.floor(window.innerHeight - ((Math.random() * window.innerHeight) + 100)); // Burst height

    this.update = () => {
        this.y -= this.speedY;
    }

    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

// Sparkles Class
function FireRocketsSparkles(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.floor(Math.random() * 3 + 6);
    this.speedY = Math.random() * 2 - 2;
    this.speedX = Math.round((Math.random() - 0.5) * 10);
    this.velocity = Math.random() / 5;

    this.update = () => {
        if (this.size > .2) {
            this.size -= .1;
        }
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedY += this.velocity;
    }

    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

// Glowing Particles Class
function GlowingParticles() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.color = `hsla(${Math.random() * 360}, 100%, 80%, 0.8)`;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;

    this.update = () => {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

// Render functions for each array
function renderFireRockets() {
    for (let i = 0; i < fireRocketsArray.length; i++) {
        fireRocketsArray[i].draw();
        fireRocketsArray[i].update();
        if (fireRocketsArray[i].y <= fireRocketsArray[i].crackRocketY) {
            for (let j = 0; j < 20; j++) {
                fireRocketsSparklesArray.push(new FireRocketsSparkles(fireRocketsArray[i].x, fireRocketsArray[i].y, fireRocketsArray[i].color));
            }
            fireRocketsArray.splice(i, 1);
            i--;
        }
    }
}

function renderFireRocketsSparkles() {
    for (let i = 0; i < fireRocketsSparklesArray.length; i++) {
        fireRocketsSparklesArray[i].draw();
        fireRocketsSparklesArray[i].update();
        if (fireRocketsSparklesArray[i].size <= .2) {
            fireRocketsSparklesArray.splice(i, 1);
            i--;
        }
    }
}

function renderGlowingParticles() {
    for (let i = 0; i < glowingParticlesArray.length; i++) {
        glowingParticlesArray[i].draw();
        glowingParticlesArray[i].update();
    }
}

// Animation Loop
function animate() {
    context.fillStyle = `rgba(24,28,31,0.2)`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    renderFireRockets();
    renderFireRocketsSparkles();
    renderGlowingParticles();
    requestAnimationFrame(animate);
}

// Initialize glowing particles
for (let i = 0; i < 150; i++) {
    glowingParticlesArray.push(new GlowingParticles());
}

// Launch rockets periodically
setInterval(() => {
    for (let i = 0; i < 4; i++) {
        fireRocketsArray.push(new FireRockets());
    }
}, 600);

// Add event listener for clicks to create fireworks at clicked position
canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    fireRocketsArray.push(new FireRockets(mouseX, mouseY));
});

animate();
