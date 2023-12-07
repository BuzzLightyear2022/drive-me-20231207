import { VehicleAttributes, CalendarInfo } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";
import { getMonthName } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/common_modules.mjs";
import { VehicleScheduleCell } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/vehicle_schedule_cell.mjs";

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
                vehicleCalendarWidth: `${daysContainerWidth}px`
            });
            innerVehicleScheduleContainer.append(vehicleScheduleCell);
        });

        vehicleScheduleContainer.append(innerVehicleScheduleContainer);

        this.calendarInfo.year = date.getFullYear();
        this.calendarInfo.monthIndex = date.getMonth();
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