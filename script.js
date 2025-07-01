function showMessage(answer) {
    document.getElementById('response').textContent = `You clicked: ${answer}`;
}

function addFlower() {
    const flowers = ['🌸', '🌼', '🌻', '🌷', '💐', '🌺'];
    const flower = document.createElement('span');
    flower.className = 'flower';
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.onclick = () => flower.remove(); // Click to remove flower
    document.getElementById('garden').appendChild(flower);
}