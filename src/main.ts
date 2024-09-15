import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { createAdditionalWindow } from './additional_window';
import {getMainWindowResolution} from "./settings/settings_utils";


let mainWindow: BrowserWindow | null;

// Создание основного окна
const createMainWindow = async () => {

    mainWindow = new BrowserWindow(getMainWindowResolution());

    mainWindow.loadFile('components/main_window.html');

    mainWindow.on('close', () => {
        if (mainWindow) {
            // Сохранение размеров и позиции окна при закрытии
            const bounds = mainWindow.getBounds();
        }
        mainWindow = null;
    });
};

// Автоперезагрузка при изменении файлов
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
});

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

// Обработка сообщения от рендер-процесса для создания нового окна
ipcMain.on('open-additional-window', () => {
    if (mainWindow) {
        createAdditionalWindow(mainWindow);
    }
});
