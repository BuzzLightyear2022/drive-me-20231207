import { VehicleAttributes, VehicleScheduleCell } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d"

const VehicleScheduleCell = class extends HTMLDivElement {
    static vehicleScheduleCells: VehicleScheduleCell[] = [];

    constructor (args: { vehicleAttributes: VehicleAttributes, monthCalendarWidth: string, daysOfMonth: number }) {
        super();

        const { vehicleAttributes, monthCalendarWidth, daysOfMonth } = args;

        const vehicleScheduleCell: HTMLDivElement = document.createElement("div");
        Object.assign(vehicleScheduleCell.style, {
            display: "flex",
            whiteSpace: "nowrap",
            border: "solid",
            overflow: "hidden",
            width: monthCalendarWidth,
            height: "130px",
        });

        const reservationScheduleDiv: HTMLDivElement = document.createElement("div");
        Object.assign(reservationScheduleDiv.style, {
            display: "flex",
            height: "50%",
        });

        for (let i = 1; i <= daysOfMonth; i++) {
            const dayCell = this.dayCell({ monthCalendarWidth: monthCalendarWidth, daysOfMonth: daysOfMonth });
            // reservationScheduleDiv.append(dayCell);
        }

        const maintenanceScheduleDiv: HTMLDivElement = document.createElement("div");
        Object.assign(maintenanceScheduleDiv.style, {
            display: "flex",
            height: "50%"
        });

        vehicleScheduleCell.append(reservationScheduleDiv, maintenanceScheduleDiv);

        const newVehicleScheduleCell: VehicleScheduleCell = {
            vehicleId: vehicleAttributes.id,
            vehicleScheduleCell: vehicleScheduleCell,
            reservationScheduleDiv: reservationScheduleDiv,
            maintenanceScheduleDiv: maintenanceScheduleDiv
        }

        VehicleScheduleCell.vehicleScheduleCells.push(newVehicleScheduleCell);
    }

    private dayCell = (args: { monthCalendarWidth: string, daysOfMonth: number }) => {
        const { monthCalendarWidth, daysOfMonth } = args;
        const dayCell: HTMLDivElement = document.createElement("div");
        Object.assign(dayCell.style, {
            display: "flex",
            position: "relative",
            width: `calc(${monthCalendarWidth} / ${daysOfMonth})`,
            height: "100%",
            border: "solid"
        });
        return dayCell;
    }
}

export { VehicleScheduleCell }