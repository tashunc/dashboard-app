import {data as data1, options} from "../mock/data";
import React, {useEffect, useRef, useState} from "react";
import {CustomChart} from "../components/custom-cart/custom-chart";
import {startTransferListenerService} from "../service/data-fetch-service";

import {Line} from 'react-chartjs-2';
import {GeneralModels} from "../models/general-models";
import { Chart  } from 'chart.js'
import {createDataSet} from "../utils/chart-utils";


// import { Chart } from 'react-chartjs-2';
export const TransferChart = (props: any) => {
    const chartReference: any = useRef("chart");
    const [rpcData, setRpcData] = useState(new GeneralModels())
    const [data, setData] = useState(data1)
    useEffect(() => {
        startTransferListenerService(props?.contractAddress,rpcData,setRpcData);
        console.log(data1.datasets)
        console.log(data1.datasets[0].data)
    }, [])

    useEffect(() => {
        data.labels=rpcData.fixedLengthKeyArrayQueue;
        data.datasets[0].data=rpcData.fixedLengthValueArrayQueue;
        console.log(data.datasets[0].data)
        console.log(data.labels)
        setData(()=>data)

    }, [rpcData])

    return (

        <Line ref={chartReference} data={data} options={options(()=>{})} />

    )

}
