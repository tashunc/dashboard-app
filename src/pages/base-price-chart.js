import {data as data1, options} from "../mock/data";
import React, {useEffect, useRef, useState} from "react";
import {startBaseFeeService} from "../service/data-fetch-service";

import {Line} from 'react-chartjs-2';
import {GeneralModels} from "../models/general-models";


export const BasePriceChart = (props: any) => {
    const chartReference: any = useRef("chart");
    const [rpcData, setRpcData] = useState(new GeneralModels())
    const [data, setData] = useState(data1)
    useEffect(() => {
        startBaseFeeService(rpcData,setRpcData);
        // setData(data1);
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
