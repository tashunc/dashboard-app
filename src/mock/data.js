import {faker} from '@faker-js/faker';
// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//         title: {
//             display: true,
//             text: 'Chart.js Line Chart',
//         },
//     },
// };

const labels = [];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
        }
    ],
};

export const options = (refreshFunction) => {
    return {
        elements: {
            line: {
                tension: 0.5
            }
        },
        scales: {
            x: [
                {
                    type: "realtime",
                    distribution: "linear",
                    realtime: {
                        onRefresh: refreshFunction,
                        delay: 3000
                    },
                    ticks: {
                        stepSize: 1,
                        maxTicksLimit: 30,
                        source: "auto",
                        autoSkip: true
                    }
                }
            ],
            y: [
                {
                    ticks: {
                        stepSize: 5
                    }
                }
            ]
        }
    }
};