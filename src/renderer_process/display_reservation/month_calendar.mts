import { VehicleAttributes, Calendars } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";
import { getMonthName } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/common_modules.mjs";
import { VehicleScheduleCell } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/vehicle_schedule_cell.mjs";

const MonthCalendar = class {
    private calendars: Calendars = {
        currentMonth: {
            calendarContainer: undefined,
            vehicleScheduleContainer: undefined
        }
    };

    constructor(args: {
        calendar: string,
        vehicleAttributesArray: VehicleAttributes[],
        date: Date
    }) {
        const { calendar, vehicleAttributesArray, date } = args;

        const calendarContainer: HTMLDivElement = this.daysContainer({ date: date });
        const vehicleScheduleContainer: HTMLDivElement = this.vehicleScheduleContainer();

        this.setCalendarContainer({
            calendar: calendar,
            calendarContainer: calendarContainer,
            vehicleScheduleContainer: vehicleScheduleContainer
        });
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

    private vehicleScheduleContainer = (): HTMLDivElement => {
        const vehicleScheduleContainer: HTMLDivElement = document.createElement("div");
        Object.assign(vehicleScheduleContainer.style, {
            display: "flex",
            flexDirection: "column"
        });
        return vehicleScheduleContainer;
    }

    private setCalendarContainer(args: {
        calendar: string,
        calendarContainer: HTMLDivElement,
        vehicleScheduleContainer: HTMLDivElement
    }) {
        const { calendar, calendarContainer, vehicleScheduleContainer } = args;

        switch (calendar) {
            case "currentMonth":
                this.calendars.currentMonth.calendarContainer = calendarContainer;
                this.calendars.currentMonth.vehicleScheduleContainer = vehicleScheduleContainer;
                break;
        }

    }

    getCalendarInfo() {
        return this.calendars;
    }
}

export { MonthCalendar }