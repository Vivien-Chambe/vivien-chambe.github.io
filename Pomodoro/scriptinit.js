document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour détecter si l'utilisateur est sur un mobile
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        // Sur mobile, rediriger vers la page
        window.location.href = 'https://vivien-chambe.github.io/Pomodoro/pomodoro.html';
    } else {
        // Sur desktop, ouvrir une popup
        let popup = window.open('https://vivien-chambe.github.io/Pomodoro/pomodoro.html', 'Pomodoro Timer', 'width=200,height=100,status=yes,scrollbars=no,resizable=yes');
        popup.focus();
        // Attention : window.close() ici fermera la fenêtre/tab actuelle d'où le script est exécuté
    }
});
