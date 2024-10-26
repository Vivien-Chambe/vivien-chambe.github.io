const searchParams = new URLSearchParams(window.location.search);

    // Récupère 'wt' et 'bt' de l'URL, ou définit des valeurs par défaut si elles ne sont pas présentes
    const wt = parseInt(searchParams.get('wt')) || 1; // Valeur par défaut est 25
    const bt = parseInt(searchParams.get('bt')) || 5;  // Valeur par défaut est 5

let workTime = 10; // 25 minutes in seconds
let breakTime = bt * 60; // 5 minutes in seconds
let isWorking = true;
let timer;
const liquid = document.getElementById('liquid');
const mug = document.getElementById('mug');




function startTimer() {
    let timeLeft = isWorking ? workTime : breakTime;

    timer = setInterval(() => {
        
        timeLeft--;

        if (isWorking) {
            liquid.style.height = `${(timeLeft / workTime) * 97}%`;
        } else {
            liquid.style.height = `${((breakTime - timeLeft) / breakTime) * 97}%`;
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            setTimeout(() => {  // Ajout d'une pause de 1 seconde avant de changer la couleur et de redémarrer
                isWorking = !isWorking;
                document.body.style.backgroundColor = isWorking ? "black" : "white";
                if (!isWorking){
                    alert('Profitez de votre pause !');
                }
                
                startTimer();
            }, 1000);

        }
    }, 1000);
}

// Start the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    window.focus();
});

