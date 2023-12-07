import { VehicleAttributesItem } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/vehicle_attributes_item.mjs";
import { MonthCalendar } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/month_calendar.mjs";
import { VehicleScheduleCell } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/vehicle_schedule_cell.mjs";
import { VehicleAttributes, ReservationData, Calendars } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";
import { getMonthName } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/common_modules.mjs";
import { ScheduleBar } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/display_reservation/schedule_bar.mjs";

const windowContainer: HTMLDivElement = document.querySelector("#window-container") as HTMLDivElement;
const headerDiv: HTMLDivElement = document.querySelector("#header-div") as HTMLDivElement;
const vehicleAttributesItemContainer: HTMLDivElement = document.querySelector("#vehicle-attributes-item-container-div") as HTMLDivElement;
const calendarContainer: HTMLDivElement = document.querySelector("#calendar-container-div") as HTMLDivElement;
const vehicleShceduleContainer: HTMLDivElement = document.querySelector("#vehicle-schedule-container-div");

const currentMonthDiv: HTMLDivElement = document.createElement("div");
Object.assign(currentMonthDiv.style, {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    fontSize: "x-large",
    lineHeight: "200%"
});

// Get the Date objects of 3 monthes.
const currentDate: Date = new Date();
const previousMonthDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
const nextMonthDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

// Get the last date of 3 monthes.
const previousMonthDays: number = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
const currentMonthDays: number = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
const nextMonthDays: number = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0).getDate();
const totalDays: number = previousMonthDays + currentMonthDays + nextMonthDays;

// retrieve ms of total days.
const previousMonthStart: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1, 0, 0, 0, 0);
const nextMonthEnd: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0, 23, 59, 59, 999);
const totalMsOfSchedule: number = nextMonthEnd.getTime() - previousMonthStart.getTime();

// const previousMonthCalendar: HTMLDivElement = PreviousMonthCalendar.HTMLDivElement as HTMLDivElement;
// const currentMonthCalendar: HTMLDivElement = CurrentMonthCalendar.HTMLDivElement as HTMLDivElement;
// const nextMonthCalendar: HTMLDivElement = NextMonthCalendar.HTMLDivElement as HTMLDivElement;

// calendarContainer.append(previousMonthCalendar, currentMonthCalendar, nextMonthCalendar);

const vehicleScheduleCells: VehicleScheduleCell[] = VehicleScheduleCell.vehicleScheduleCells;

// Rendering necessary elements.
windowContainer.append(
    headerDiv,
    calendarContainer,
    vehicleAttributesItemContainer,
);

headerDiv.append(currentMonthDiv);

// Retrieve the width of each calendar and the overall total width of the calendars.
// const previousCalendarWidth: number = previousMonthCalendar.offsetWidth;
// const currentCalendarWidth: number = currentMonthCalendar.offsetWidth;
// const nextCalendarWidth: number = nextMonthCalendar.offsetWidth;
// const totalCalendarWidth: number = previousCalendarWidth + currentCalendarWidth + nextCalendarWidth;

// const updateCurrentMonth = () => {
//     const scrollPosition: number = calendarContainer.scrollLeft;

//     const previousCalendarStart: number = totalCalendarWidth - previousCalendarWidth - currentCalendarWidth - nextCalendarWidth;
//     const previousCalendarEnd: number = totalCalendarWidth - currentCalendarWidth - nextCalendarWidth;
//     const currentCalendarEnd: number = totalCalendarWidth - nextCalendarWidth;

//     if (scrollPosition >= previousCalendarStart && scrollPosition < previousCalendarEnd) {
//         const previousCalendarYear = `${PreviousMonthCalendar.year}年`;
//         const previousCalendarMonthIndex: number = PreviousMonthCalendar.month as number;
//         const previousCalendarMonth: string = getMonthName({ monthIndex: previousCalendarMonthIndex });
//         currentMonthDiv.textContent = `${previousCalendarYear}${previousCalendarMonth}`;
//     } else if (scrollPosition > previousCalendarEnd && scrollPosition < currentCalendarEnd) {
//         const currentCalendarYear = `${CurrentMonthCalendar.year}年`;
//         const currentCalendarMonthIndex: number = CurrentMonthCalendar.month as number;
//         const currentCalendarMonth: string = getMonthName({ monthIndex: currentCalendarMonthIndex });
//         currentMonthDiv.textContent = `${currentCalendarYear}${currentCalendarMonth}`;
//     } else if (scrollPosition > currentCalendarEnd && scrollPosition <= totalCalendarWidth) {
//         const nextCalendarYear = `${NextMonthCalendar.year}年`;
//         const nextCalendarMonthIndex: number = NextMonthCalendar.month as number;
//         const nextCalendarMonth: string = getMonthName({ monthIndex: nextCalendarMonthIndex });
//         currentMonthDiv.textContent = `${nextCalendarYear}${nextCalendarMonth}`;
//     }
// }

// const handleVehicleScheduleScrollX = (): void => {
//     const calendarContainerScrollLeft: number = calendarContainer.scrollLeft;
//     vehicleScheduleContainer.scrollLeft = calendarContainerScrollLeft;
// }

// const handleVehicleScheduleScrollY = (): void => {
//     const vehicleAttributesItemScrollTop: number = vehicleAttributesItemContainer.scrollTop;
//     vehicleScheduleContainer.scrollTop = vehicleAttributesItemScrollTop;
// }

// const handleCalendarScroll = (): void => {
//     const vehicleScheduleScrollLeft: number = vehicleScheduleContainer.scrollLeft;
//     calendarContainer.scrollLeft = vehicleScheduleScrollLeft;
// }

// const handleVehicleAttributesItemScroll = (): void => {
//     const vehicleScheduleScrollTop: number = vehicleScheduleContainer.scrollTop;
//     vehicleAttributesItemContainer.scrollTop = vehicleScheduleScrollTop;
// }

(async () => {
    const vehicleAttributesArray: VehicleAttributes[] = await window.sqlSelect.vehicleAttributes();

    // const PreviousMonthCalendar: MonthCalendar = new MonthCalendar({ date: previousMonthDate }).getCalendarInfo();
    const currentMonthCalendarInstance = new MonthCalendar({ calendar: "currentMonth", vehicleAttributesArray: vehicleAttributesArray, date: currentDate });
    const currentMonthCalendar: HTMLDivElement = currentMonthCalendarInstance.getCalendarInfo().currentMonth.calendarContainer;

    // const NextMonthCalendar: MonthCalendar = new MonthCalendar({ date: nextMonthDate }).getCalendarInfo();

    calendarContainer.append(currentMonthCalendar);

    vehicleAttributesArray.forEach((vehicleAttributes: VehicleAttributes): void => {
        const vehicleAttributesItem = new VehicleAttributesItem({ vehicleAttributes: vehicleAttributes });
        vehicleAttributesItemContainer.append(vehicleAttributesItem);

        // const vehicleScheduleCell = VehicleScheduleCell.create({ vehicleAttributes: vehicleAttributes, monthCalendarWidth: `${totalCalendarWidth}px`, daysOfMonth: totalDays });
        // const vehicleScheduleCellElement: HTMLDivElement = vehicleScheduleCell.vehicleScheduleCell as HTMLDivElement;
        // vehicleScheduleCellElement.style.width = `${totalCalendarWidth}px`;

        
        // vehicleScheduleContainer.append(vehicleScheduleCellElement);
    });

    // // Render vehicle schedules.
    // const reservationData: ReservationData[] = await window.sqlSelect.reservationData({ startDate: previousMonthStart, endDate: nextMonthEnd });

    // // Render reservation data.
    // reservationData.forEach((reservationData: ReservationData) => {
    //     vehicleScheduleCells.forEach((vehicleScheduleCell: VehicleScheduleCell) => {
    //         const reservationDisplayDiv: HTMLDivElement = vehicleScheduleCell.reservationScheduleDiv as HTMLDivElement;
    //         if (reservationData.vehicleId === vehicleScheduleCell.vehicleId) {
    //             const previousScheduleBar: HTMLDivElement | undefined = reservationDisplayDiv.lastElementChild as HTMLDivElement;
    //             const previousScheduleBarWidth: number = previousScheduleBar ? previousScheduleBar.getBoundingClientRect().width : 0;

    //             const scheduleBar: HTMLDivElement = new ScheduleBar({
    //                 reservationData: reservationData,
    //                 totalMsOfSchedule: totalMsOfSchedule,
    //                 previousMonthStart: previousMonthStart,
    //                 previousScheduleBarWidth: `${previousScheduleBarWidth}px`,
    //                 color: "green"
    //             });
    //             reservationDisplayDiv.append(scheduleBar);
    //         }
    //     });
    // });

    // vehicleAttributesItemContainer.addEventListener("scroll", handleVehicleScheduleScrollY);
    // vehicleScheduleContainer.addEventListener("scroll", handleVehicleAttributesItemScroll);
    // calendarContainer.addEventListener("scroll", handleVehicleScheduleScrollX);
    // vehicleScheduleContainer.addEventListener("scroll", handleCalendarScroll);

    // // Handling default scroll posiotion.
    // const dayWidth: number = currentMonthCalendar.offsetWidth / currentMonthDays;
    // const todayPosition: number = (previousMonthDays + currentDate.getDate() - 0.5) * dayWidth;
    // const containerWidth: number = vehicleScheduleContainer.clientWidth;
    // const scrollToCenter: number = todayPosition - (containerWidth / 2);
    // vehicleScheduleContainer.scrollLeft = scrollToCenter;

    // updateCurrentMonth();
    // calendarContainer.addEventListener("scroll", updateCurrentMonth);
})();