import dotenv from "dotenv";
dotenv.config();
import { BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import axios, { AxiosResponse } from "axios";
import { Windows, ReservationData } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";

class WindowHandler {
    static preloadScript: string = path.join(__dirname, "preload.js");
    static windows: Windows = {
        mainWindow: undefined,
        insertVehicleAttributesWindow: undefined,
        insertReservationWindow: undefined,
        displayReservationWindow: undefined,
        editReservationWindow: undefined
    };

    static createMainWindow = () => {
        const mainWindow: BrowserWindow = new BrowserWindow(
            {
                width: 1000,
                height: 800,
                webPreferences: {
                    preload: WindowHandler.preloadScript
                }
            }
        );

        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
            WindowHandler.windows.mainWindow = mainWindow;
        } else {
            mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
            WindowHandler.windows.mainWindow = mainWindow;
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
            WindowHandler.windows.insertVehicleAttributesWindow = win;
        } else {
            win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/insert_vehicleAttributes.html`));
            WindowHandler.windows.insertVehicleAttributesWindow = win;
        }

        win.maximize();
    }

    static createInsertReservationWindow = (): void => {
        const win: BrowserWindow = new BrowserWindow({
            width: 1000,
            height: 800,
            webPreferences: {
                preload: WindowHandler.preloadScript
            },
        });

        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            win.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/insert_reservation.html`);
            WindowHandler.windows.insertReservationWindow = win;
        } else {
            win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/insert_reservation.html`));
            WindowHandler.windows.insertReservationWindow = win;
        }
    }

    static createEditReservationWindow = (reservationId: string): void => {
        const win: BrowserWindow = new BrowserWindow({
            width: 1000,
            height: 800,
            webPreferences: {
                preload: WindowHandler.preloadScript
            },
        });

        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            win.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/edit_reservation.html`);
            WindowHandler.windows.editReservationWindow = win;
        } else {
            win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/edit_reservation.html`));
            WindowHandler.windows.editReservationWindow = win;
        }

        WindowHandler.windows.editReservationWindow.webContents.on("dom-ready", () => {
            WindowHandler.windows.editReservationWindow.webContents.send("contextMenu:getReservationId", reservationId);
        });
    }

    static createDisplayReservationWindow = (): void => {
        const win: BrowserWindow = new BrowserWindow({
            webPreferences: {
                preload: WindowHandler.preloadScript
            },
        });

        ipcMain.on("contextMenu:schedule-bar", (event: Electron.IpcMainEvent, args: { reservationId: string }) => {
            const { reservationId } = args;

            const contextMenu = Menu.buildFromTemplate([
                {
                    label: "変更",
                    click: async () => {
                        WindowHandler.createEditReservationWindow(reservationId);
                    }
                },
                {
                    label: "キャンセル",
                    click: () => {
                        // console.log("cancel", reservationId);
                    }
                }
            ]);
            contextMenu.popup(WindowHandler.windows.displayReservationWindow);
        });


        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            win.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/display_reservation.html`);
            WindowHandler.windows.displayReservationWindow = win;
        } else {
            win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/display_reservation.html`));
            WindowHandler.windows.displayReservationWindow = win;
        }

        win.maximize();
    }
}

export { WindowHandler }