import { appendOptions } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/renderer_process/common_modules.mjs";
import { ReservationData, LicensePlatesData } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";

const reservationName: HTMLInputElement = document.querySelector("#reservation-name") as HTMLInputElement;
const rentalCategoryRadios: NodeListOf<HTMLInputElement> = document.getElementsByName("rental-category") as NodeListOf<HTMLInputElement>;
const departureStore: HTMLSelectElement = document.querySelector("#departure-store") as HTMLSelectElement;
const returnStore: HTMLSelectElement = document.querySelector("#return-store") as HTMLSelectElement;
const departureDatetime: HTMLInputElement = document.querySelector("#departure-datetime") as HTMLInputElement;
const returnDatetime: HTMLInputElement = document.querySelector("#return-datetime") as HTMLInputElement;
const rentalClassSelect: HTMLSelectElement = document.querySelector("#rental-class-select") as HTMLSelectElement;
const nonSmokingRadios: NodeListOf<HTMLInputElement> = document.getElementsByName("non-smoking") as NodeListOf<HTMLInputElement>;
const carModelSelect: HTMLSelectElement = document.querySelector("#car-model") as HTMLSelectElement;
const licensePlateSelect: HTMLSelectElement = document.querySelector("#license-plate") as HTMLSelectElement;
const commentTextarea: HTMLTextAreaElement = document.querySelector("#comment-textarea") as HTMLTextAreaElement;

const submitButton: HTMLButtonElement = document.querySelector("#submit-button") as HTMLButtonElement;

const getRadioValue = (args: { radios: NodeListOf<HTMLInputElement>, defaultValue: string }): string => {
    const { radios, defaultValue } = args;

    let selectedValue: string = defaultValue;
    radios.forEach((radio: HTMLInputElement): void => {
        if (radio.checked) {
            selectedValue = radio.value;
        }
    });
    return selectedValue;
}

(async (): Promise<void> => {
    const selectedSmoking: string = getRadioValue({ radios: nonSmokingRadios, defaultValue: "none-spacification" });

    const rentalClasses: string[] = await window.sqlSelect.rentalClasses({ selectedSmoking: selectedSmoking });

    appendOptions({ selectbox: rentalClassSelect, options: rentalClasses });

    const selectedRentalClass: string = rentalClassSelect.value;
    const carModels: string[] = await window.sqlSelect.carModels({ selectedSmoking: selectedSmoking, selectedRentalClass: selectedRentalClass });

    appendOptions({ selectbox: carModelSelect, options: carModels });

    const selectedCarModel: string = carModelSelect.value;
    const licensePlatesData: LicensePlatesData = await window.sqlSelect.licensePlates({ selectedSmoking: selectedSmoking, selectedCarModel: selectedCarModel });
    const licensePlatesArray: string[] = licensePlatesData.map((licensePlateData: { id: string, licensePlate: string }): string => {
        return licensePlateData.licensePlate;
    });
    const idsArray: string[] = licensePlatesData.map((licensePlateData: { id: string, licensePlate: string }) => {
        return licensePlateData.id;
    });

    appendOptions({ selectbox: licensePlateSelect, options: licensePlatesArray, values: idsArray });
})();

nonSmokingRadios.forEach((nonSmokingRadio: HTMLInputElement) => {
    nonSmokingRadio.addEventListener("change", async () => {
        const selectedSmoking: string = getRadioValue({ radios: nonSmokingRadios, defaultValue: "none-spacification" });

        const rentalClasses: string[] = await window.sqlSelect.rentalClasses({ selectedSmoking: selectedSmoking });

        appendOptions({ selectbox: rentalClassSelect, options: rentalClasses });

        const selectedRentalClass: string = rentalClassSelect.value;
        const carModels: string[] = await window.sqlSelect.carModels({ selectedSmoking: selectedSmoking, selectedRentalClass: selectedRentalClass });

        appendOptions({ selectbox: carModelSelect, options: carModels });

        const selectedCarModel: string = carModelSelect.value;
        const licensePlatesData: LicensePlatesData = await window.sqlSelect.licensePlates({ selectedSmoking: selectedSmoking, selectedCarModel: selectedCarModel });
        const licensePlatesArray: string[] = licensePlatesData.map((licensePlateData: { id: string, licensePlate: string }): string => {
            return licensePlateData.licensePlate;
        });
        const idsArray: string[] = licensePlatesData.map((licensePlateData: { id: string, licensePlate: string }) => {
            return licensePlateData.id;
        });

        appendOptions({ selectbox: licensePlateSelect, options: licensePlatesArray, values: idsArray });
    }, false);
});

rentalClassSelect.addEventListener("change", async () => {
    const selectedSmoking: string = getRadioValue({ radios: nonSmokingRadios, defaultValue: "none-spacification" });

    const selectedRentalClass: string = rentalClassSelect.value;
    const carModels: string[] = await window.sqlSelect.carModels({ selectedSmoking: selectedSmoking, selectedRentalClass: selectedRentalClass });

    appendOptions({ selectbox: carModelSelect, options: carModels });

    const selectedCarModel: string = carModelSelect.value;
    const licensePlatesData: LicensePlatesData = await window.sqlSelect.licensePlates({ selectedSmoking: selectedSmoking, selectedCarModel: selectedCarModel });
    const licensePlatesArray: string[] = licensePlatesData.map((licensePlateData: { id: string, licensePlate: string }): string => {
        return licensePlateData.licensePlate;
    });
    const idsArray: string[] = licensePlatesData.map((licensePlateData: { id: string, licensePlate: string }) => {
        return licensePlateData.id;
    });

    appendOptions({ selectbox: licensePlateSelect, options: licensePlatesArray, values: idsArray });
}, false);

carModelSelect.addEventListener("change", async () => {
    const selectedSmoking: string = getRadioValue({ radios: nonSmokingRadios, defaultValue: "none-spacification" });
    const selectedCarModel: string = carModelSelect.value;
    const licensePlatesData: LicensePlatesData = await window.sqlSelect.licensePlates({ selectedSmoking: selectedSmoking, selectedCarModel: selectedCarModel });
    const licensePlatesArray: string[] = licensePlatesData.map((licensePlateData: { id: string, licensePlate: string }): string => {
        return licensePlateData.licensePlate;
    });
    const idsArray: string[] = licensePlatesData.map((licensePlateData: { id: string, licensePlate: string }) => {
        return licensePlateData.id;
    });

    appendOptions({ selectbox: licensePlateSelect, options: licensePlatesArray, values: idsArray });
}, false);

submitButton.addEventListener("click", async () => {
    const selectedRentalCategory: string = getRadioValue({ radios: rentalCategoryRadios, defaultValue: "general-rental" });
    const selectedSmoking: string = getRadioValue({ radios: nonSmokingRadios, defaultValue: "none-specification" });
    const selectedDepartureDatetime: Date = new Date(departureDatetime.value);
    const selectedReturnDatetime: Date = new Date(returnDatetime.value);

    const reservationData: ReservationData = {
        vehicleId: licensePlateSelect.value,
        reservationName: reservationName.value,
        rentalCategory: selectedRentalCategory,
        departureStore: departureStore.value,
        returnStore: returnStore.value,
        departureDatetime: selectedDepartureDatetime,
        returnDatetime: selectedReturnDatetime,
        nonSmoking: selectedSmoking,
        comment: commentTextarea.value
    }

    try {
        await window.sqlInsert.reservationData(reservationData);
    } catch (error: unknown) {
        console.error(`Failed to invoke reservationData: ${error}`);
    }
}, false);