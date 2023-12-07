import { VehicleAttributes } from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/@types/types.d";

import NoImagePng from "/Users/takehiromizuno/Documents/drive-me-20231202/drive-me/src/public/assets/NoImage.png";

const VehicleAttributesItem = class extends HTMLDivElement {
    constructor(args: { vehicleAttributes: VehicleAttributes }) {
        super();
        const { vehicleAttributes } = args;

        Object.assign(this.style, {
            display: "flex",
            flexDirection: "row",
            whiteSpace: "nowrap",
            alignItems: "center",
            border: "solid",
            minWidth: "300px",
            minHeight: "130px",
            lineHight: "200%"
        });

        (async () => {
            if (vehicleAttributes.imageFileName) {
                const imageDiv: HTMLDivElement = await this.imageDiv(vehicleAttributes.imageFileName);
                this.append(imageDiv);
            } else {
                const imageDiv: HTMLDivElement = await this.imageDiv();
                this.append(imageDiv);
            }
            const textDiv: HTMLDivElement = this.textDiv({ vehicleAttributes });
            this.append(textDiv);
        })();
    }

    private imageDiv = async (fileName?: string): Promise<HTMLDivElement> => {
        const serverHost: string = await window.serverInfo.serverHost();
        const port: string = await window.serverInfo.port();
        const imageDirectory: string = await window.serverInfo.imageDirectory();

        const imageDiv: HTMLDivElement = document.createElement("div");
        Object.assign(imageDiv.style, {
            display: "flex",
            margin: "2px"
        });
        const imgElement: HTMLImageElement = document.createElement("img");

        if (fileName) {
            imgElement.src = `http://${serverHost}:${port}/${imageDirectory}/${fileName}`;
        } else {
            imgElement.src = NoImagePng;
        }

        Object.assign(imgElement.style, {
            objectFit: "contain",
            width: "130px",
            height: "130px"
        });

        imageDiv.append(imgElement);

        return imageDiv;
    }

    private textDiv = (args: { vehicleAttributes: VehicleAttributes }): HTMLDivElement => {
        const { vehicleAttributes } = args;

        const textDiv: HTMLDivElement = document.createElement("div");
        Object.assign(textDiv.style, {
            display: "flex",
            flexDirection: "column",
            whiteSpace: "nowrap",
            overflow: "scroll"
        });

        const carModelDiv: HTMLDivElement = document.createElement("div");
        carModelDiv.textContent = vehicleAttributes.carModel;

        const licensePlateDiv: HTMLDivElement = document.createElement("div");
        licensePlateDiv.textContent = `${vehicleAttributes.licensePlateRegion} ${vehicleAttributes.licensePlateCode} ${vehicleAttributes.licensePlateHiragana} ${vehicleAttributes.licensePlateNumber}`;

        const modelCodeDiv: HTMLDivElement = document.createElement("div");
        modelCodeDiv.textContent = vehicleAttributes.modelCode;

        const nonSmokingDiv: HTMLDivElement = document.createElement("div");
        nonSmokingDiv.textContent = vehicleAttributes.nonSmoking ? "禁煙車" : "喫煙車";

        const insurancePriorityDiv: HTMLDivElement = document.createElement("div");
        insurancePriorityDiv.textContent = vehicleAttributes.insurancePriority ? "損保優先" : "一般貸出";

        textDiv.append(carModelDiv, licensePlateDiv, modelCodeDiv, nonSmokingDiv, insurancePriorityDiv);

        return textDiv;
    }
}

customElements.define("vehicle-attributes-item-div", VehicleAttributesItem, { extends: "div" });

export { VehicleAttributesItem }