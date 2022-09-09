import React, {useEffect, useRef, useState} from "react";
import {GeneralModels} from "../models/general-models";
import {data as data1, options} from "../mock/data";
import {Chart} from "chart.js";
import {startGasUsedRatioService} from "../service/data-fetch-service";
import {Line} from "react-chartjs-2";

export const GasPriceChart = () => {
    const chartReference: any = useRef("chart");
    const [rpcData, setRpcData] = useState(new GeneralModels())
    const [data, setData] = useState(data1)
    useEffect(() => {
        startGasUsedRatioService(rpcData, setRpcData);
    }, [])

    useEffect(() => {
        data.labels = rpcData.fixedLengthKeyArrayQueue;
        data.datasets[0].data = rpcData.fixedLengthValueArrayQueue;
        console.log(data.datasets[0].data)
        console.log(data.labels)
        setData(() => data)

    }, [rpcData])

    return (
        <Line ref={chartReference} data={data} options={options(() => {
        })}/>
    )

}