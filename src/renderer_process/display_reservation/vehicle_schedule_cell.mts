import { VehicleAttributes, VehicleScheduleCell } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d"

const VehicleScheduleCell = class extends HTMLDivElement {
    static vehicleScheduleCells: VehicleScheduleCell[] = [];

    constructor(args: { vehicleAttributes: VehicleAttributes, vehicleCalendarWidth: string, date: Date }) {
        super();

        const { vehicleAttributes, vehicleCalendarWidth, date } = args;

        Object.assign(this.style, {
            display: "flex",
            flexDirection: "column",
            whiteSpace: "nowrap",
            overflow: "visible",
            minHeight: "130px",
            width: vehicleCalendarWidth,
            border: "solid"
        });

        const reservationScheduleDiv: HTMLDivElement = this.reservationScheduleDiv();
        const maintenanceScheduleDiv: HTMLDivElement = this.maintenanceScheduleDiv();

        this.append(reservationScheduleDiv, maintenanceScheduleDiv);

        const newVehicleScheduleCell: VehicleScheduleCell = {
            vehicleId: vehicleAttributes.id,
            monthIndex: date.getMonth(),
            vehicleScheduleCell: this,
            reservationScheduleDiv: reservationScheduleDiv,
            maintenanceScheduleDiv: maintenanceScheduleDiv
        }

        VehicleScheduleCell.vehicleScheduleCells.push(newVehicleScheduleCell);
    }

    private reservationScheduleDiv = (): HTMLDivElement => {
        const reservationScheduleDiv: HTMLDivElement = document.createElement("div");
        Object.assign(reservationScheduleDiv.style, {
            display: "flex",
            flexDirection: "row",
            height: "50%",
        });
        return reservationScheduleDiv;
    }

    private maintenanceScheduleDiv = (): HTMLDivElement => {
        const maintenanceScheduleDiv: HTMLDivElement = document.createElement("div");
        Object.assign(maintenanceScheduleDiv.style, {
            display: "flex",
            flexDirection: "row",
            height: "50%"
        });
        return maintenanceScheduleDiv;
    }
}

customElements.define("vehicle-schedule-cell", VehicleScheduleCell, { extends: "div" });

export { VehicleScheduleCell }