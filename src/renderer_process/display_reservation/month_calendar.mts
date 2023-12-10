import { VehicleAttributes, CalendarInfo, ReservationData, VehicleScheduleCellInfo, ScheduleBarType } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";
import { getMonthName } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/common_modules.mjs";
import { VehicleScheduleCell } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/vehicle_schedule_cell.mjs";
import { ScheduleBar } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/schedule_bar.mjs";

const MonthCalendar = class {
    calendarInfo: CalendarInfo;
    date: Date;
    reservationData: ReservationData[];
    vehicleScheduleCells: VehicleScheduleCellInfo[] = [];

    constructor(args: {
        vehicleAttributesArray: VehicleAttributes[],
        date: Date
    }) {
        const { date, vehicleAttributesArray } = args;

        this.date = date;
        this.calendarInfo = {
            year: date.getFullYear(),
            monthIndex: date.getMonth()
        }

        const calendarContainer: HTMLDivElement = document.querySelector("#calendar-container-div") as HTMLDivElement;
        const vehicleScheduleContainer: HTMLDivElement = document.querySelector("#vehicle-schedule-container-div") as HTMLDivElement;

        const innerVehicleScheduleContainer: HTMLDivElement = this.innerVehicleScheduleContainer();

        const daysContainer: HTMLDivElement = this.daysContainer({ date: date });
        calendarContainer.append(daysContainer);

        const daysContainerWidth: number = daysContainer.getBoundingClientRect().width;

        vehicleAttributesArray.forEach((vehicleAttributes: VehicleAttributes) => {
            const vehicleScheduleCell = new VehicleScheduleCell({
                vehicleAttributes: vehicleAttributes,
                vehicleCalendarWidth: `${daysContainerWidth}px`
            });
            innerVehicleScheduleContainer.append(vehicleScheduleCell.vehicleScheduleCell);
            this.vehicleScheduleCells.push(vehicleScheduleCell);
        });

        vehicleScheduleContainer.append(innerVehicleScheduleContainer);

        this.appendScheduleBars();
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

            if (i === date.getDate() && this.calendarInfo.monthIndex === new Date().getMonth()) {
                dayCell.style.backgroundColor = "red"
            }

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

    private backgroundDiv = (): HTMLDivElement => {
        const backgroundDiv: HTMLDivElement = document.createElement("div");
        Object.assign(backgroundDiv.style, {
            display: "block",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            position: "fixed",
            zIndex: "1",
            backgroundColor: "blue"
        })
        return backgroundDiv;
    }

    private reservationInfoModal = (reservationData: ReservationData): HTMLDivElement => {
        const reservationMonthIndex: number = new Date(reservationData.departureDatetime).getMonth();
        const returnMonthIndex: number = new Date(reservationData.returnDatetime).getMonth();

        const departureMonth: string = getMonthName({ monthIndex: reservationMonthIndex });
        const departureDate: number = new Date(reservationData.departureDatetime).getDate();
        const returnMonth: string = getMonthName({ monthIndex: returnMonthIndex });
        const returnDate: number = new Date(reservationData.returnDatetime).getDate();

        const reservationInfoModal: HTMLDivElement = document.createElement("div");
        Object.assign(reservationInfoModal.style, {
            display: "flex",
        });
        const reservationInfoDiv: HTMLDivElement = document.createElement("div");

        const departureDatetimeDiv: HTMLDivElement = document.createElement("div");
        departureDatetimeDiv.textContent = `出発時刻: ${departureMonth}${departureDate}日`;

        reservationInfoDiv.append(departureDatetimeDiv);

        return reservationInfoModal;
    }

    private appendScheduleBars = async () => {
        const start: Date = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
        const end: Date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 23, 59, 59, 999);
        const totalMsOfMonth: number = end.getTime() - start.getTime();

        const reservationData: ReservationData[] = await window.sqlSelect.reservationData({ startDate: start, endDate: end });
        this.reservationData = reservationData;

        this.reservationData.forEach((reservationData: ReservationData) => {
            this.vehicleScheduleCells.forEach((vehicleScheduleCell) => {
                const reservationDisplayDiv: HTMLDivElement = vehicleScheduleCell.reservationScheduleDiv;
                if (reservationData.vehicleId === vehicleScheduleCell.vehicleId) {
                    const previousScheduleBar: HTMLDivElement | undefined = reservationDisplayDiv.lastElementChild as HTMLDivElement;
                    const previousScheduleBarWidth: number = previousScheduleBar ? previousScheduleBar.getBoundingClientRect().width : 0;

                    const scheduleBar: ScheduleBarType = new ScheduleBar({
                        reservationData: reservationData,
                        startMs: start.getTime(),
                        totalMsOfSchedule: totalMsOfMonth,
                        previousScheduleBarWidth: `${previousScheduleBarWidth}px`,
                        color: "green"
                    });

                    reservationDisplayDiv.append(scheduleBar.scheduleBar);
                }
            });
        });
    }

    getCalendarInfo() {
        return this.calendarInfo;
    }
}

export { MonthCalendar }