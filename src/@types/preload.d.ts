import { CarCatalog, LicensePlatesData, ReservationData, Navigations, VehicleAttributes, VehicleAttributesArray } from "../types";

export interface serverInfo {
    serverHost: () => Promise<string>;
    port: () => Promise<string>;
    imageDirectory: () => Promise<string>;
}

export interface openWindow {
    vehicleInputWindow: () => Promise<void>;
    reservationInputWindow: () => Promise<void>;
    displayReservationWindow: () => Promise<void>;
}

export interface fetchJson {
    carCatalog: () => Promise<CarCatalog>;
    navigations: () => Promise<Navigations>;
}

export interface sqlSelect {
    vehicleAttributes: () => Promise<VehicleAttributesArray>;
    rentalClasses: (args: { selectedSmoking: string }) => Promise<string[]>;
    carModels: (args: { selectedSmoking: string, selectedRentalClass: string }) => Promise<string[]>;
    licensePlates: (args: { selectedSmoking: string, selectedCarModel: string }) => Promise<LicensePlatesData>;
    reservationData: (args: { startDate: Date, endDate: Date }) => Promise<>;
}

export interface sqlInsert {
    vehicleAttributes: (vehicleAttributes: VehicleAttributes) => Promise<string>;
    reservationData: (reservationData: ReservationData) => Promise<string>
}

declare global {
    interface Window {
        serverInfo: serverInfo;
        openWindow: openWindow;
        fetchJson: fetchJson;
        sqlSelect: sqlSelect;
        sqlInsert: sqlInsert;
    }
}