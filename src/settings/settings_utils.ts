import * as path from "path";
import * as fs from 'fs';
import {BrowserWindow} from "electron";

const settingsPath = path.join(__dirname, 'settings.json');

function loadResolutionSettings(): any {
    if (fs.existsSync(settingsPath)) {
        const settingsData = fs.readFileSync(settingsPath, 'utf-8');
        return JSON.parse(settingsData)
    } else {
        return {
            resolution: {
                mainWindowResolution: {width: 800, height: 600},
                additionalWindowResolution: {width: 400, height: 300},
            }
        }
    }
}

function addWebPreferences() {
    return {
        nodeIntegration: true,
        contextIsolation: false
    }
}

function addSetting(settings: any, key: string, value: string | number | boolean | BrowserWindow) {
    settings[key] = value;
}

export function getMainWindowResolution() {
    const settings = loadResolutionSettings();
    return {
        ...settings.resolution.mainWindowResolution,
        frame: false,
        webPreferences: addWebPreferences()
    }
}

export function getAdditionalWindowSettings() {
    const settings = loadResolutionSettings();
    return {
        ...settings.resolution.additionalWindowResolution,
        modal: true,
        frame: false,
        webPreferences: addWebPreferences()
    }
}
