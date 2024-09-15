import {BrowserWindow} from 'electron';
import {getAdditionalWindowSettings} from "./settings/settings_utils";

let additionalWindow: BrowserWindow | null = null;

export const createAdditionalWindow = (parentWindow: BrowserWindow) => {

    if (additionalWindow) {
        additionalWindow.focus();
        return;
    }

    const settings = getAdditionalWindowSettings();

    additionalWindow = new BrowserWindow({
        ...settings,
        parent: parentWindow
    });

    additionalWindow.loadFile('components/additional_window.html');

    additionalWindow.on('closed', () => {
        additionalWindow = null;
    });
};
