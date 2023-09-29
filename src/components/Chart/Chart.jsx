import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis,Tooltip, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00CE96', '#FFBB28', '#FF8042', 'red', 'pink'];
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
const Chart = ({monitoring}) => {
    console.log(monitoring, "mon");
    return (
        <div>
            <BarChart
                width={550}
                height={400}
                data={monitoring}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"  axisLine={false} tickLine={false}/>
                <YAxis
                    tickFormatter={(tick) => {
                        return tick.toLocaleString();
                    }}
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                    width={100}
                />
                <Tooltip
                    formatter={(value) => value.toLocaleString() + " сум"}
                    labelStyle={{ display: "none" }}
                    contentStyle={{ borderRadius: "10px" }}
                    shared={false}
                />
                <Bar dataKey="summa" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }} cursor={"pointer"}>
                    {monitoring?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} cursor={"pointer"}/>
                    ))}
                </Bar>
            </BarChart>
        </div>
    )
}

export default Chart