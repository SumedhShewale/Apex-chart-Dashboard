import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts'

function Graph(props: any) {
    const { title, xAxisData, yAxisData }: { title: string; xAxisData: []; yAxisData: []; } = props

    let data: { options: ApexOptions; series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined } = {
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: title,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: xAxisData,
            }
        },
        series: [{
            "name": title,
            "data": yAxisData
        }]
    }

    return (
        <Chart
            options={data.options}
            series={data.series}
            type={"line"}
            height={350}
        />
    );
}

export default Graph;