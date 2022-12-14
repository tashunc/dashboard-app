import {FinalChartDataModel, FinalDataSetData} from "../models/chart-models";

export const data = {
    labels: ['1', '1', '1', '1', '1', '1', '1'],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};


export const createDataSet = (labels: string[], data: any[], dataSetLabel: string) => {
    const dataSet = new FinalDataSetData(dataSetLabel, data, 'rgb(53, 162, 235)', 'rgba(53, 162, 235, 0.5)');
    return new FinalChartDataModel(labels, [dataSet]);
}


