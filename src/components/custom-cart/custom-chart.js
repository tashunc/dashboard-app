import {Line} from 'react-chartjs-2';

export const CustomChart = (props) => {
    return (
        <div>
            <Line options={props?.options} data={props?.data}/>
        </div>
    )
}