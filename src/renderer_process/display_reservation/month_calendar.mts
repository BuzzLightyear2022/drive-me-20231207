import { VehicleAttributes, CalendarInfo, ReservationData } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";
import { getMonthName } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/common_modules.mjs";
import { VehicleScheduleCell } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/vehicle_schedule_cell.mjs";
import { ScheduleBar } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/schedule_bar.mjs";

const MonthCalendar = class {
    private calendarInfo: CalendarInfo = {
        year: undefined,
        monthIndex: undefined
    }

    constructor(args: {
        vehicleAttributesArray: VehicleAttributes[],
        date: Date
    }) {
        const { date, vehicleAttributesArray } = args;

        const calendarContainer: HTMLDivElement = document.querySelector("#calendar-container-div") as HTMLDivElement;
        const vehicleScheduleContainer: HTMLDivElement = document.querySelector("#vehicle-schedule-container-div") as HTMLDivElement;

        const innerVehicleScheduleContainer: HTMLDivElement = this.innerVehicleScheduleContainer();

        const daysContainer: HTMLDivElement = this.daysContainer({ date: date });
        calendarContainer.append(daysContainer);

        const daysContainerWidth: number = daysContainer.getBoundingClientRect().width;

        vehicleAttributesArray.forEach((vehicleAttributes: VehicleAttributes) => {
            const vehicleScheduleCell: HTMLDivElement = new VehicleScheduleCell({
                vehicleAttributes: vehicleAttributes,
                vehicleCalendarWidth: `${daysContainerWidth}px`,
                date: date
            });
            innerVehicleScheduleContainer.append(vehicleScheduleCell);
        });

        vehicleScheduleContainer.append(innerVehicleScheduleContainer);

        this.calendarInfo.year = date.getFullYear();
        this.calendarInfo.monthIndex = date.getMonth();

        (async () => {
            const start: Date = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
            const end: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
            const totalMsOfMonth: number = end.getTime() - start.getTime();

            const reservationData: ReservationData[] = await window.sqlSelect.reservationData({ startDate: start, endDate: end });
            const vehicleScheduleCells = VehicleScheduleCell.vehicleScheduleCells;
            console.log(vehicleScheduleCells);

            reservationData.forEach((reservationData: ReservationData) => {
                vehicleScheduleCells.forEach((vehicleScheduleCell: VehicleScheduleCell) => {
                    const reservationDisplayDiv: HTMLDivElement = vehicleScheduleCell.reservationScheduleDiv as HTMLDivElement;
                    const departureMonthIndex: number = new Date(reservationData.departureDatetime).getMonth();
                    if (reservationData.vehicleId === vehicleScheduleCell.vehicleId && departureMonthIndex === vehicleScheduleCell.monthIndex) {
                        const previousScheduleBar: HTMLDivElement | undefined = reservationDisplayDiv.lastElementChild as HTMLDivElement;
                        const previousScheduleBarWidth: number = previousScheduleBar ? previousScheduleBar.getBoundingClientRect().width : 0;

                        const scheduleBar: HTMLDivElement = new ScheduleBar({
                            reservationData: reservationData,
                            startMs: start.getTime(),
                            totalMsOfSchedule: totalMsOfMonth,
                            previousScheduleBarWidth: `${previousScheduleBarWidth}px`,
                            color: "green"
                        });
                        reservationDisplayDiv.append(scheduleBar);
                    }
                });
            });
        })();
    }

    private daysContainer(args: { date: Date }): HTMLDivElement {
        const { date } = args;

        const daysContainer: HTMLDivElement = document.createElement("div");
        Object.assign(daysContainer.style, {
            display: "flex",
            flexDirection: "row",
            flexBasis: "auto",
            flexGrow: 1,
            flexShrink: 1,
            whiteSpace: "nowrap"
        });

        const daysOfMonth: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        for (let i = 1; i <= daysOfMonth; i++) {
            const dayCell: HTMLDivElement = document.createElement("div");
            Object.assign(dayCell.style, {
                display: "flex",
                justifyContent: "center",
                height: "50px",
                minWidth: "120px",
                lineHeight: "200%",
                fontSize: "x-large",
                border: "solid"
            });

            const monthIndex: number = new Date(date).getMonth();
            dayCell.textContent = i === 1 ? `${getMonthName({ monthIndex })}${i}日` : `${i}日`;

            daysContainer.append(dayCell);
        }
        return daysContainer;
    }

    private innerVehicleScheduleContainer = (): HTMLDivElement => {
        const vehicleScheduleContainer: HTMLDivElement = document.createElement("div");
        Object.assign(vehicleScheduleContainer.style, {
            display: "flex",
            flexDirection: "column",
            flexBasis: "content",
            whiteSpace: "nowrap",
        });
        return vehicleScheduleContainer;
    }

    getCalendarInfo() {
        return this.calendarInfo;
    }
}

export { MonthCalendar }