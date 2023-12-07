import { BrowserWindow } from "electron";
import path from "path";

class WindowHandler {
    static preloadScript: string = path.join(__dirname, "preload.js");
    static windows: Array<BrowserWindow> = [];

    static createMainWindow = () => {
        const mainWindow: BrowserWindow = new BrowserWindow(
            {
                width: 800,
                height: 600,
                webPreferences: {
                    preload: WindowHandler.preloadScript
                }
            }
        );

        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
            WindowHandler.windows.push(mainWindow);
        } else {
            mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
            WindowHandler.windows.push(mainWindow);
        }
    }

    static createInsertVehicleAttributesWindow = (): void => {
        const win: BrowserWindow = new BrowserWindow({
            webPreferences: {
                preload: WindowHandler.preloadScript
            },
        });

        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            win.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/insert_vehicleAttributes.html`);
            WindowHandler.windows.push(win);
        } else {
            win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/insert_vehicleAttributes.html`));
            WindowHandler.windows.push(win);
        }

        win.maximize();
    }

    static createInsertReservationWindow = (): void => {
        const win: BrowserWindow = new BrowserWindow({
            webPreferences: {
                preload: WindowHandler.preloadScript
            },
        });

        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            win.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/insert_reservation.html`);
            WindowHandler.windows.push(win);
        } else {
            win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/insert_reservation.html`));
            WindowHandler.windows.push(win);
        }

        win.maximize();
    }

    static createDisplayReservationWindow = (): void => {
        const win: BrowserWindow = new BrowserWindow({
            webPreferences: {
                preload: WindowHandler.preloadScript
            },
        });

        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            win.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/display_reservation.html`);
            WindowHandler.windows.push(win);
        } else {
            win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/display_reservation.html`));
            WindowHandler.windows.push(win);
        }

        win.maximize();
    }
}

export { WindowHandler }