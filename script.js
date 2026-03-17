function showMessage(answer) {
    document.getElementById('response').textContent = `You clicked: ${answer}`;
    const scene = document.getElementById('scene');
    if (answer === 'Yes') {
        // Sad scene with uploaded JPEG
        scene.innerHTML = `
            <img src="images/jarjar.jpg" alt="Jar Jar" class="scene-image" onerror="this.style.display='none'" />
            <div class="scene-text">A sad rain falls as you ponder your answer...</div>
        `;
    } else if (answer === 'No') {
        // Angry scene with image
        scene.innerHTML = `
            <img src="images/angry.png" alt="Angry" class="scene-image" />
            <div class="scene-text">An angry storm brews in the distance!</div>
        `;
    } else if (answer === 'Maybe') {
        // Play YouTube video immediately (muted to improve autoplay reliability)
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
        `;
    } else {
        // Clear scene
        scene.innerHTML = '';
    }
}

function addFlower() {
    const flowers = ['🌸', '🌼', '🌻', '🌷', '💐', '🌺'];
    const flower = document.createElement('span');
    flower.className = 'flower';
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.onclick = () => flower.remove(); // Click to remove flower
    document.getElementById('garden').appendChild(flower);
}