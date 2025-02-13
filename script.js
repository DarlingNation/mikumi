let particleInterval;
let particleCount = 10; // Initial number of bursts per interval
let stopTimeout;

const mikuButton = document.getElementById('mikumiku-button');
const stopButton = document.getElementById('stop-button');
const mikuImage = document.querySelector('.miku-image');
const mikuMusic = document.getElementById('miku-music');

mikuButton.addEventListener('click', () => {
    startMiku();
    setTimeout(() => createRandomBurst(50), 5000); // Random burst at 5 seconds with 50 particles
    setTimeout(() => createRandomBurst(75), 6000); // Random burst at 6 seconds with 75 particles
    setTimeout(() => createRandomBurst(100), 7000); // Random burst at 7 seconds with 100 particles
    setTimeout(() => {
        startParticles();
        increaseShaking();
    }, 10000); // Delay of 10 seconds before starting particles and increasing shaking
    stopTimeout = setTimeout(stopAll, 17000); // Stop everything after 17 seconds
    mikuMusic.addEventListener('ended', stopAll); // Stop everything when music ends
});

stopButton.addEventListener('click', stopAll);

function startMiku() {
    mikuImage.classList.add('shake');
    mikuMusic.play();
    mikuButton.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        mikuButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
        stopButton.classList.remove('opacity-0', 'pointer-events-none');
    }, 300);
}

function createParticles() {
    const container = document.querySelector('.particle-zone');
    const mikuRect = mikuImage.getBoundingClientRect();
    const shapes = ['particle', 'particle square', 'particle triangle'];
    for (let j = 0; j < particleCount; j++) {
        const burstX = Math.random() * mikuRect.width;
        const burstY = Math.random() * mikuRect.height;
        for (let i = 0; i < 10; i++) { // Number of particles per burst
            const particle = document.createElement('div');
            particle.className = shapes[Math.floor(Math.random() * shapes.length)];
            particle.style.setProperty('--x', Math.random() * 2 - 1);
            particle.style.setProperty('--y', Math.random() * 2 - 1);
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            particle.style.left = `${burstX}px`;
            particle.style.top = `${burstY}px`;
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }
    particleCount = Math.min(particleCount * 1.1, 100); // Exponentially increase particle count, capped at 100
}

function createRandomBurst(particleAmount) {
    const container = document.querySelector('.particle-zone');
    const mikuRect = mikuImage.getBoundingClientRect();
    const shapes = ['particle', 'particle square', 'particle triangle'];
    const burstX = Math.random() * mikuRect.width;
    const burstY = Math.random() * mikuRect.height;
    for (let i = 0; i < particleAmount; i++) { // Number of particles per burst
        const particle = document.createElement('div');
        particle.className = shapes[Math.floor(Math.random() * shapes.length)];
        particle.style.setProperty('--x', Math.random() * 2 - 1);
        particle.style.setProperty('--y', Math.random() * 2 - 1);
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.left = `${burstX}px`;
        particle.style.top = `${burstY}px`;
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function startParticles() {
    particleInterval = setInterval(createParticles, 200); // Create particles every 200ms
}

function stopParticles() {
    clearInterval(particleInterval);
    particleCount = 10; // Reset particle count
}

function increaseShaking() {
    mikuImage.style.animationDuration = '0.25s'; // Increase shaking speed
}

function stopAll() {
    mikuImage.classList.remove('shake');
    mikuMusic.pause();
    mikuMusic.currentTime = 0;
    stopButton.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        stopButton.style.display = 'none';
        mikuButton.style.display = 'inline-block';
        mikuButton.classList.remove('opacity-0', 'pointer-events-none');
    }, 300);
    stopParticles();
    clearTimeout(stopTimeout);
    mikuMusic.removeEventListener('ended', stopAll); // Remove event listener to avoid multiple bindings
}
