function showMessage(answer) {
    document.getElementById('response').textContent = `You clicked: ${answer}`;
    const scene = document.getElementById('scene');
    if (answer === 'Yes') {
        // Sad scene
        scene.innerHTML = `
            <span class="scene-emoji">😢🌧️</span>
            <div class="scene-text">A sad rain falls as you ponder your answer...</div>
        `;
    } else if (answer === 'No') {
        // Angry scene with image
        scene.innerHTML = `
            <img src="images/angry.png" alt="Angry" class="scene-image" />
            <div class="scene-text">An angry storm brews in the distance!</div>
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