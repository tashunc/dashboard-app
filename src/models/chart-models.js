export class FinalDataSetData {
    label: string;
    data: any [];
    borderColor: string;
    backgroundColor: string;

    constructor(label: string, data: any[], borderColor: string, backgroundColor: string) {
        this.label = label;
        this.data = data;
        this.borderColor = borderColor;
        this.backgroundColor = backgroundColor;
    }
}


export class FinalChartDataModel {
    labels: string[];
    datasets: FinalDataSetData[];

    constructor(labels: string[], datasets: FinalDataSetData[]) {
        this.labels = labels;
        this.datasets = datasets;
    }
}