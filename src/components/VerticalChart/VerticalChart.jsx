import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const VerticalChart = ({data}) => {
    console.log(data, "line");

    return (
        <ResponsiveContainer height={430}>
            <BarChart data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4339F2" stopOpacity={1} />
                        <stop offset="95%" stopColor="#4339F2" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="name" />
                <YAxis /> */}
                {/* <Tooltip /> */}
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
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
                <Legend />
                <Bar className='chart' barSize={15} dataKey="ketgan" fill="#FF4960" radius={50} width={"10px"} cursor={"pointer"} />
                <Bar className='chart' barSize={15} dataKey="kelgan" fill="#00CE96" radius={50} width={"10px"} cursor={"pointer"}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default VerticalChart




