import { VehicleAttributes, CalendarInfo, ReservationData, VehicleScheduleCellInfo } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";
import { getMonthName } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/common_modules.mjs";
import { VehicleScheduleCell } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/vehicle_schedule_cell.mjs";
import { ScheduleBar } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/schedule_bar.mjs";

const MonthCalendar = class {
    calendarInfo: CalendarInfo;
    date: Date;
    reservationDataArray: ReservationData[];
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

    static backgroundDiv = (): HTMLDivElement => {
        const backgroundDiv: HTMLDivElement = document.createElement("div");
        Object.assign(backgroundDiv.style, {
            display: "block",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            position: "fixed",
            zIndex: "1"
        })
        return backgroundDiv;
    }

    static reservationInfoModal = (args: { reservationData: ReservationData, mouseEvent: MouseEvent }): HTMLDivElement => {
        const { reservationData, mouseEvent } = args;

        const ReservationInfoModal = (): HTMLDivElement => {
            const reservationInfoModal: HTMLDivElement = document.createElement("div");
            Object.assign(reservationInfoModal.style, {
                display: "grid",
                zIndex: "2",
                backgroundColor: "green",
                position: "absolute",
                left: `${mouseEvent.x}px`,
                top: `${mouseEvent.y}px`,
                border: "solid"
            });
            reservationInfoModal.className = "card"
            return reservationInfoModal;
        }

        const ReservationNameDiv = (): HTMLDivElement => {
            const reservationNameDiv: HTMLDivElement = document.createElement("div");
            Object.assign(reservationNameDiv.style, {
                display: "flex"
            });
            reservationNameDiv.textContent = `${reservationData.reservationName} 様`;
            return reservationNameDiv;
        }

        const DepartureDatetimeDiv = (): HTMLDivElement => {
            const departureDatetimeDiv: HTMLDivElement = document.createElement("div");
            Object.assign(departureDatetimeDiv.style, {
                display: "flex"
            });

            const departureDatetime: Date = new Date(reservationData.departureDatetime);
            const departureMonthIndex: number = departureDatetime.getMonth();

            const departureYear: number = departureDatetime.getFullYear();
            const departureMonth: string = getMonthName({ monthIndex: departureMonthIndex });
            const departureDate: string = String(departureDatetime.getDate()).padStart(2, "0");
            const departureHours: number = departureDatetime.getHours();
            const departureMinutes: string = String(departureDatetime.getMinutes()).padStart(2, "0");

            departureDatetimeDiv.textContent = `出発時刻: ${departureYear}年${departureMonth}${departureDate}日 ${departureHours}:${departureMinutes}`;
            return departureDatetimeDiv;
        }

        const ReturnDatetimeDiv = (): HTMLDivElement => {
            const returnDatetimeDiv: HTMLDivElement = document.createElement("div");
            Object.assign(returnDatetimeDiv.style, {
                display: "flex"
            });

            const returnDatetime: Date = new Date(reservationData.returnDatetime);
            const returnMonthIndex: number = returnDatetime.getMonth();

            const returnYear: number = returnDatetime.getFullYear();
            const returnMonth: string = getMonthName({ monthIndex: returnMonthIndex });
            const returnDate: string = String(returnDatetime.getDate()).padStart(2, "0");
            const returnHours: number = returnDatetime.getHours();
            const returnMinutes: string = String(returnDatetime.getMinutes()).padStart(2, "0");

            returnDatetimeDiv.textContent = `返却時刻: ${returnYear}年${returnMonth}${returnDate}日 ${returnHours}:${returnMinutes}`;
            return returnDatetimeDiv;
        }

        const DepartureStoreDiv = (): HTMLDivElement => {
            const departureStoreDiv: HTMLDivElement = document.createElement("div");
            Object.assign(departureStoreDiv.style, {
                display: "flex"
            });
            departureStoreDiv.textContent = reservationData.departureStore;
            return departureStoreDiv;
        }

        const ReturnStoreDiv = (): HTMLDivElement => {
            const returnStoreDiv: HTMLDivElement = document.createElement("div");
            Object.assign(returnStoreDiv.style, {
                display: "flex"
            });
            returnStoreDiv.textContent = reservationData.returnStore;
            return returnStoreDiv;
        }

        const RentalCategoryDiv = (): HTMLDivElement => {
            const rentalCategoryDiv: HTMLDivElement = document.createElement("div");
            Object.assign(rentalCategoryDiv.style, {
                display: "flex"
            });
            switch (reservationData.rentalCategory) {
                case "general-rental":
                    rentalCategoryDiv.textContent = "貸出区分: 一般貸出"
                    break;
                case "loaner-rental":
                    rentalCategoryDiv.textContent = "貸出区分: 損保代車"
                    break;
                case "booking":
                    rentalCategoryDiv.textContent = "貸出区分: 仮押さえ"
            }
            return rentalCategoryDiv;
        }

        const NonSmokingDiv = (): HTMLDivElement => {
            const nonSmokingDiv: HTMLDivElement = document.createElement("div");
            Object.assign(nonSmokingDiv.style, {
                display: "flex"
            });
            switch (reservationData.nonSmoking) {
                case "non-smoking":
                    nonSmokingDiv.textContent = "禁煙希望"
                    break;
                case "ok-smoking":
                    nonSmokingDiv.textContent = "喫煙希望"
                    break;
                case "none-specification":
                    nonSmokingDiv.textContent = "指定なし"
                    break;
            }
            return nonSmokingDiv;
        }

        const reservationInfoModal: HTMLDivElement = ReservationInfoModal();
        const reservationNameDiv: HTMLDivElement = ReservationNameDiv();
        const departureStoreDiv: HTMLDivElement = DepartureStoreDiv();
        const departureDatetimeDiv: HTMLDivElement = DepartureDatetimeDiv();
        const returnStoreDiv: HTMLDivElement = ReturnStoreDiv();
        const returnDatetimeDiv: HTMLDivElement = ReturnDatetimeDiv();
        const rentalCategoryDiv: HTMLDivElement = RentalCategoryDiv();
        const nonSmokingDiv: HTMLDivElement = NonSmokingDiv();

        reservationInfoModal.append(
            reservationNameDiv,
            departureStoreDiv,
            departureDatetimeDiv,
            returnStoreDiv,
            returnDatetimeDiv,
            rentalCategoryDiv,
            nonSmokingDiv
        );

        return reservationInfoModal;
    }

    async initialize(): Promise<void> {
        await this.appendScheduleBars();
    }

    private appendScheduleBars = async () => {
        const start: Date = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
        const end: Date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 23, 59, 59, 999);
        const totalMsOfMonth: number = end.getTime() - start.getTime();

        const reservationData: ReservationData[] = await window.sqlSelect.reservationData({ startDate: start, endDate: end });
        this.reservationDataArray = reservationData;

        this.reservationDataArray.forEach((reservationData: ReservationData) => {
            this.vehicleScheduleCells.forEach((vehicleScheduleCell) => {
                const reservationDisplayDiv: HTMLDivElement = vehicleScheduleCell.reservationScheduleDiv;
                if (reservationData.vehicleId === vehicleScheduleCell.vehicleId) {
                    const previousScheduleBar: HTMLDivElement | undefined = reservationDisplayDiv.lastElementChild as HTMLDivElement;
                    const previousScheduleBarWidth: number = previousScheduleBar ? previousScheduleBar.getBoundingClientRect().width : 0;

                    const newScheduleBar = new ScheduleBar({
                        reservationData: reservationData,
                        startMs: start.getTime(),
                        totalMsOfSchedule: totalMsOfMonth,
                        previousScheduleBarWidth: `${previousScheduleBarWidth}px`,
                        color: "green"
                    }).getScheduleBarElement();

                    reservationDisplayDiv.append(newScheduleBar);
                }
            });
        });
    }

    getCalendarInfo() {
        return this.calendarInfo;
    }
}

export { MonthCalendar }