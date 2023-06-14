const pandaContainer = document.getElementById('panda-container');
const keysPressed = new Set();

document.addEventListener('keydown', function(event) {
  const key = event.key.toLowerCase();
    keysPressed.add(key);

  // Ajoute ici les touches pour déclencher la chute des pandas
  if (keysPressed.has('p') && keysPressed.has('a') && keysPressed.has('n') && keysPressed.has('d') ) {
    const panda = document.createElement('img');
    panda.src = 'Assets/images/panda.png'; // Chemin vers l'image du panda
    panda.classList.add('falling-panda');

    // Génère une position aléatoire pour le panda
    const randomLeft = Math.random();

    panda.style.setProperty('--random-left', randomLeft);

    pandaContainer.appendChild(panda);

    setTimeout(() => {
      pandaContainer.removeChild(panda);
    }, 5000);
  }
});
  document.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase();
    keysPressed.delete(key);
});