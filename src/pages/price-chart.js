import {data as data1, options} from "../mock/data";
import React, {useEffect, useRef, useState} from "react";
import {startGasUsedRatioService } from "../service/data-fetch-service";

import {Line} from 'react-chartjs-2';
import {GeneralModels} from "../models/general-models";
import { Chart  } from 'chart.js'


export const PriceChart = (props: any) => {
    const [chart,setChart] = useState(null);
    const chartReference: any = useRef("chart");
    const [rpcData, setRpcData] = useState(new GeneralModels())
    const [data, setData] = useState(data1)
    useEffect(() => {
        setChart(Chart.getChart(chartReference));
        startGasUsedRatioService(rpcData,setRpcData);
        console.log(data1.datasets)
        console.log(data1.datasets[0].data)
    }, [])

    useEffect(() => {
        setChart(Chart.getChart(chartReference))
        // data.labels.push(...rpcData.fixedLengthKeyArrayQueue);
        data.labels=rpcData.fixedLengthKeyArrayQueue;
        // data.datasets[0].data.push(...rpcData.fixedLengthValueArrayQueue);
        data.datasets[0].data=rpcData.fixedLengthValueArrayQueue;
        console.log(data.datasets[0].data)
        console.log(data.labels)
        setData(()=>data)
        // if (chart) {
        //     chart.update()
        // }

    }, [rpcData])

    return (
        // <div></div>
        // <Chart type='line' data={data} />
        // <Line data={data} />
        // <div>
        //     {rpcData && rpcData?.fixedLengthKeyArrayQueue.length > 0 &&
        //         <CustomChart data={new createDataSet(rpcData.fixedLengthKeyArrayQueue,rpcData.fixedLengthValueArrayQueue, "TEST")} options={options}/>}
        // </div>
        <Line ref={chartReference} data={data} options={options(()=>{})} />

    )

}
