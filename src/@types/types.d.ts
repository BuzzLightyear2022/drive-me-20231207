export type CarCatalog = {
    rentalClass: {
        [rentalClassName: string]: {
            [carModel: string]: {
                modelCode?: string[],
                driveType?: string[],
                transmission?: string[],
                bodyColor?: string[]
            }
        }
    }
}

export type VehicleAttributes = {
    id?: string
    imageFileName?: string,
    carModel: string,
    modelCode: string,
    nonSmoking: boolean,
    insurancePriority: boolean,
    licensePlateRegion: string,
    licensePlateCode: string,
    licensePlateHiragana: string,
    licensePlateNumber: string,
    bodyColor: string,
    driveType: string,
    transmission: string,
    rentalClass: string,
    navigation: string,
    hasBackCamera: boolean,
    hasDVD: boolean,
    hasTelevision: boolean,
    hasExternalInput: boolean,
    hasSpareKey: boolean,
    otherFeatures?: string
}

export type ReservationData = {
    id?: string
    vehicleId: string,
    reservationName: string,
    rentalCategory: string,
    departureStore: string,
    returnStore: string,
    departureDatetime: Date,
    returnDatetime: Date,
    nonSmoking: string,
    comment?: string
}

export type LicensePlatesData = Array<{
    id: string,
    licensePlate: string
}>

export type Navigations = {
    navigations: string[]
}

export type MonthCalendar = {
    HTMLDivElement: HTMLDivElement | undefined
    month: number | undefined;
    year: number | undefined
}

export type CalendarInfo = {
    year: number | undefined;
    monthIndex: number | undefined;
}

export type ScheduleBarInfo = {
    reservationData: ReservationData;
    divElement: HTMLDivElement;
}

export type VehicleScheduleCellInfo = {
    vehicleId: string;
    vehicleScheduleCell: HTMLDivElement;
    reservationScheduleDiv: HTMLDivElement;
    maintenanceScheduleDiv: HTMLDivElement;
}

export type Windows = {
    mainWindow: BrowserWindow,
    insertVehicleAttributesWindow: BrowserWindow,
    insertReservationWindow: BrowserWindow,
    displayReservationWindow: BrowserWindow,
    editReservationWindow: BrowserWindow
}