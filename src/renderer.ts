const { ipcRenderer } = require('electron');

console.log('Hello from renderer process!');



// Обработчик нажатия на кнопку
document.getElementById('open-window-btn')?.addEventListener('click', () => {
    ipcRenderer.send('open-additional-window');
});
