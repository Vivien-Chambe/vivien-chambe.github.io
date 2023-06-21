const pandaContainer = document.getElementById('panda-container');
const loupContainer = document.getElementById('loup-container');
const easterEggButton = document.getElementById('easter-egg-button');
const keysPressed = new Set();

document.addEventListener('keydown', function(event) {
  const key = event.key.toLowerCase();
    keysPressed.add(key);

  // Ajoute ici les touches pour déclencher la chute des pandas
  if (keysPressed.has('p') && keysPressed.has('a') && keysPressed.has('n') && keysPressed.has('d') ) {
    const panda = document.createElement('img');
    panda.src = 'Assets/Images/panda.png'; // Chemin vers l'image du panda
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

  

document.addEventListener('keydown', function(event) {
  const key = event.key.toLowerCase();
    keysPressed.add(key);

  if (keysPressed.has('w') && keysPressed.has('o') && keysPressed.has('l') ) {
    const loup = document.createElement('img');
    loup.src = 'Assets/Images/wolf.png'; 
    loup.classList.add('falling-wolf');
  
    // Génère une position aléatoire pour le panda
    const randomLeft = Math.random();
  
    loup.style.setProperty('--random-left', randomLeft);
  
    loupContainer.appendChild(loup);
  
    setTimeout(() => {
      loupContainer.removeChild(loup);
    }, 5000);
  } 
});


  document.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase();
    keysPressed.delete(key);
});

easterEggButton.addEventListener('mousedown', function() {
    intervalId = setInterval(() => {
        const panda = document.createElement('img');
        panda.src = 'Assets/Images/panda.png';
        panda.classList.add('falling-panda');
    
        // Génère une position aléatoire pour le panda
        const randomLeft = Math.random();
    
        panda.style.setProperty('--random-left', randomLeft);
    
        pandaContainer.appendChild(panda);
    
        setTimeout(() => {
          pandaContainer.removeChild(panda);
        }, 5000);
      }, 100);
  });

    easterEggButton.addEventListener('mouseup', function() {
        clearInterval(intervalId);
    }
    );

// Fonction pour faire défiler jusqu'en haut de la page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Pour un défilement fluide
  });
}

// Gère l'affichage du bouton en fonction de la position de défilement
window.addEventListener('scroll', toggleScrollToTop);

function toggleScrollToTop() {
  const btnScrollToTop = document.querySelector('.btn-scroll-to-top');
  if (window.pageYOffset > 200) {
    btnScrollToTop.classList.add('show');
  } else {
    btnScrollToTop.classList.remove('show');
  }
}
