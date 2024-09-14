import {BrowserWindow} from 'electron';
import * as path from 'path';

let additionalWindow: BrowserWindow | null = null;

export const createAdditionalWindow = (parentWindow: BrowserWindow) => {

    if (additionalWindow) {
        additionalWindow.focus();
        return;
    }

    additionalWindow = new BrowserWindow({
        width: 400,
        height: 300,
        parent: parentWindow,
        modal: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    additionalWindow.loadFile('components/additional_window.html');

    additionalWindow.on('closed', () => {
        additionalWindow = null;
    });
};
