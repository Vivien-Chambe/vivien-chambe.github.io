document.addEventListener('DOMContentLoaded', () => {
    let popup = window.open('http://127.0.0.1:5500/Pomodoro/pomodoro.html', 'Eheh', 'width=400,height=400,status=yes,scrollbars=yes,resizable=yes');
    popup.focus();
    window.close();
})