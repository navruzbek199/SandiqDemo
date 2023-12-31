import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const LineChart = ({data}) => {
    return (
        <Pie data={data} />
    )
}

export default LineChart






