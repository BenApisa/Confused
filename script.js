function showMessage(answer) {
    document.getElementById('response').textContent = `You clicked: ${answer}`;
    const scene = document.getElementById('scene');

    if (answer === 'Yes') {
        scene.innerHTML = `
            <img src="images/jarjar.jpg" alt="Jar Jar" class="scene-image" onerror="this.style.display='none'" />
            <div class="scene-text">A sad rain falls as you ponder your answer...</div>
        `;
        // new: congratulate and start confetti
        document.getElementById('response').textContent = 'CORRECT — that was the correct answer';
        startConfetti();
        // stop other effects
        stopLightshow();
        stopRain();
    } else if (answer === 'No') {
        scene.innerHTML = `
            <img src="images/angry.png" alt="Angry" class="scene-image" />
            <div class="scene-text">An angry storm brews in the distance!</div>
        `;
        stopLightshow();
        startRain();
    } else if (answer === 'Maybe') {
        const videoId = 'y5nROc-bN5w';
        scene.innerHTML = `
            <div class="video-wrap">
                <iframe
                    id="ytplayer"
                    class="scene-video"
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1"
                    frameborder="0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
            <button id="stop-light" class="stop-light">Stop</button>
        `;

        // ensure DOM updated, then start lightshow and attach controls
        requestAnimationFrame(() => {
            document.body.classList.add('lightshow');
            const stopBtn = document.getElementById('stop-light');
            if (stopBtn) stopBtn.addEventListener('click', stopLightshow);
            document.addEventListener('keydown', escListener);
        });

        // make sure rain is stopped when lightshow starts
        stopRain();
    } else {
        scene.innerHTML = '';
        stopLightshow();
        stopRain();
    }
}

// new confetti functions
function startConfetti() {
    if (document.getElementById('confetti')) return; // already running
    const colors = ['#ff4d6d','#ffd166','#06d6a0','#4d96ff','#a66cff','#ff9fb1'];
    const confetti = document.createElement('div');
    confetti.id = 'confetti';
    confetti.className = 'confetti';
    const pieces = 70;
    for (let i = 0; i < pieces; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        const left = Math.random() * 100;
        const size = 6 + Math.random() * 14; // px
        p.style.left = left + '%';
        p.style.width = size + 'px';
        p.style.height = (size * (0.6 + Math.random() * 0.8)) + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.opacity = 0.9;
        p.style.transform = `rotate(${Math.random()*360}deg)`;
        p.style.animationDelay = (Math.random() * 0.8) + 's';
        p.style.animationDuration = (2.2 + Math.random() * 1.4) + 's';
        confetti.appendChild(p);
    }
    document.body.appendChild(confetti);
    // remove after a while
    setTimeout(stopConfetti, 4500);
}

function stopConfetti() {
    const conf = document.getElementById('confetti');
    if (!conf) return;
    conf.classList.add('confetti-fade');
    // allow fade animation then remove
    setTimeout(() => { conf.remove(); }, 600);
}

// add rain control functions (fixed logic)
function startRain() {
    // avoid duplicates
    if (document.getElementById('rain')) return;

    document.body.classList.add('dark-rain');

    const rain = document.createElement('div');
    rain.id = 'rain';
    rain.className = 'rain';

    const drops = 40;
    for (let i = 0; i < drops; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        const left = Math.random() * 100;
        const delay = -Math.random() * 5; // negative to start at random positions
        const duration = 0.9 + Math.random() * 1.4;
        drop.style.left = `${left}%`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.animationDuration = `${duration}s`;
        rain.appendChild(drop);
    }

    document.body.appendChild(rain);
    document.addEventListener('keydown', escListener);
}

function stopRain() {
    document.body.classList.remove('dark-rain');
    const rain = document.getElementById('rain');
    if (rain) rain.remove();
    document.removeEventListener('keydown', escListener);
}

// ensure esc stops confetti as well
function escListener(e) {
    if (e.key === 'Escape') {
        stopLightshow();
        stopRain();
        stopConfetti();
    }
}

function addFlower() {
    const flowerEmojis = ['🌸','🌼','🌻','🌷','💐','🌺','🌹','🥀'];
    const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

    const el = document.createElement('div');
    el.className = 'big-flower';
    el.textContent = emoji;

    // random size 60..180 px
    const size = 60 + Math.floor(Math.random() * 120);
    el.style.fontSize = size + 'px';

    // random rotation using CSS variable
    const rot = Math.floor(Math.random() * 60 - 30); // -30..30deg
    el.style.setProperty('--rot', `rotate(${rot}deg)`);

    // position within viewport with small margin
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const maxLeft = Math.max(vw - size - 24, 24);
    const maxTop = Math.max(vh - size - 24, 24);
    const left = 12 + Math.random() * maxLeft;
    const top = 12 + Math.random() * maxTop;
    el.style.left = Math.round(left) + 'px';
    el.style.top = Math.round(top) + 'px';

    // initial pop scale
    el.style.transform = `var(--rot) scale(0.6)`;

    // click to remove with fade
    el.addEventListener('click', () => {
        el.style.opacity = '0';
        el.style.transform = `var(--rot) scale(0.5)`;
        setTimeout(() => el.remove(), 360);
    });

    document.body.appendChild(el);

    // trigger pop-in and float animation after insertion
    requestAnimationFrame(() => {
        el.classList.add('popped', 'animate');
        el.style.opacity = '1';
        el.style.transform = `var(--rot) scale(1)`;
    });
}

function stopLightshow() {
    // remove visual class
    if (document.body.classList.contains('lightshow')) {
        document.body.classList.remove('lightshow');
    }

    // remove stop button if present
    const stopBtn = document.getElementById('stop-light');
    if (stopBtn) {
        stopBtn.removeEventListener('click', stopLightshow);
        stopBtn.remove();
    }

    // stop/cleanup YouTube iframe if present
    const yt = document.getElementById('ytplayer');
    if (yt) {
        // clear src to stop playback
        yt.src = '';
    }
}