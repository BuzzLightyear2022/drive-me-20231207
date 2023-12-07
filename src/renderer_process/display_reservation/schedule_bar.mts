import { ReservationData } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";

const ScheduleBar = class extends HTMLDivElement {
    private reservationData: ReservationData;

    constructor(args: { reservationData: ReservationData, startMs: number, totalMsOfSchedule: number, previousScheduleBarWidth: string, color: string }) {
        super();

        const { reservationData, startMs, totalMsOfSchedule, previousScheduleBarWidth, color } = args;
        this.reservationData = reservationData;

        const departureDatetime: Date = new Date(reservationData.departureDatetime);
        const returnDatetime: Date = new Date(reservationData.returnDatetime);

        const diffInTime: number = returnDatetime.getTime() - departureDatetime.getTime();
        const relativeWidth = `${(diffInTime / totalMsOfSchedule) * 100}%`;
        const diffFromStart = `${((departureDatetime.getTime() - startMs) / totalMsOfSchedule) * 100}%`;

        this.className = "card";

        Object.assign(this.style, {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            height: "100%",
            border: "solid",
            width: relativeWidth,
            left: `calc(${diffFromStart} - ${previousScheduleBarWidth}`,
            backgroundColor: color,
            whiteSpace: "nowrap",
            overflow: "scroll",
            // zIndex: 2
        });

        const departureReturnInfoDiv: HTMLDivElement = this.departureReturnInfoDiv();
        const reservationNameDiv: HTMLDivElement = this.reservationNameDiv();
        this.append(departureReturnInfoDiv, reservationNameDiv);

        // this.addEventListener("click", () => {

        // }, false);
    }

    private departureReturnInfoDiv = () => {
        const departureTimeDiv: HTMLDivElement = this.departureTimeDiv();
        const departureStoreDiv: HTMLDivElement = this.departureStoreDiv();
        const returnTimeDiv: HTMLDivElement = this.returnTimeDiv();
        const returnStoreDiv: HTMLDivElement = this.returnStoreDiv();

        const departureReturnInfoDiv: HTMLDivElement = document.createElement("div");
        Object.assign(departureReturnInfoDiv.style, {
            display: "grid",
            height: "100%",
            width: "100px"
        });

        departureReturnInfoDiv.append(departureTimeDiv, departureStoreDiv, returnTimeDiv, returnStoreDiv);
        return departureReturnInfoDiv;
    }

    private departureTimeDiv = () => {
        const departureDatetime: Date = new Date(this.reservationData.departureDatetime);
        const departureHour = String(departureDatetime.getHours());
        const departureMinutes: string = String(departureDatetime.getMinutes()).padStart(2, "0");
        const departureTime = `${departureHour}:${departureMinutes}`;
        const departureTimeDiv: HTMLDivElement = document.createElement("div");
        Object.assign(departureTimeDiv.style, {
            gridRow: "1",
            gridColumn: "1"
        });
        departureTimeDiv.textContent = departureTime;
        return departureTimeDiv;
    }

    private departureStoreDiv = () => {
        const departureStore: string = this.reservationData.departureStore;
        const departureStoreDiv: HTMLDivElement = document.createElement("div");
        Object.assign(departureStoreDiv.style, {
            gridRow: "1",
            gridColumn: "2"
        });
        departureStoreDiv.textContent = departureStore;
        return departureStoreDiv;
    }

    private returnTimeDiv = () => {
        const returnDatetime: Date = new Date(this.reservationData.returnDatetime);
        const returnHour = String(returnDatetime.getHours());
        const returnMinutes: string = String(returnDatetime.getMinutes()).padStart(2, "0");
        const returnTime = `${returnHour}:${returnMinutes}`;
        const returnTimeDiv: HTMLDivElement = document.createElement("div");
        Object.assign(returnTimeDiv.style, {
            gridRow: "2",
            gridColumn: "1"
        });
        returnTimeDiv.textContent = returnTime;

        return returnTimeDiv;
    }

    private returnStoreDiv = () => {
        const returnStore: string = this.reservationData.returnStore;
        const returnStoreDiv: HTMLDivElement = document.createElement("div");
        Object.assign(returnStoreDiv.style, {
            gridRow: "2",
            gridColumn: "2"
        });
        returnStoreDiv.textContent = returnStore;
        return returnStoreDiv;
    }

    private reservationNameDiv = () => {
        const reservationName = `${this.reservationData.reservationName} 様`;
        const reservationNameDiv: HTMLDivElement = document.createElement("div");
        Object.assign(reservationNameDiv.style, {
            padding: "1em"
        });
        reservationNameDiv.textContent = reservationName;
        return reservationNameDiv;
    }
}

customElements.define("schedule-bar", ScheduleBar, { extends: "div" });

export { ScheduleBar }