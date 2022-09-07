
import {data, options} from "../mock/data";
import React, {useEffect} from "react";
import {CustomChart} from "../components/custom-cart/custom-chart";
import {startService} from "../service/data-fetch-service";

export const PriceChart = (props: any) => {
    useEffect(() => {
        startService()
    }, [])

    return (
        <div></div>
        // <CustomChart data={data} options={options}/>
    )

}