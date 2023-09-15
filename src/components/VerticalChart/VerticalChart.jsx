import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const VerticalChart = ({data}) => {
    console.log(data, "line");
    // const data = [
    //     {
    //         "name": "Page A",
    //         "Выходящие": 4000,
    //         "Входящие": 2400
    //     },
    //     {
    //         "name": "Page B",
    //         "Выходящие": 3000,
    //         "Входящие": 1398
    //     },
    //     {
    //         "name": "Page C",
    //         "Выходящие": 2000,
    //         "Входящие": 9800
    //     },
    //     {
    //         "name": "Page D",
    //         "Выходящие": 2780,
    //         "Входящие": 3908
    //     },
    //     {
    //         "name": "Page E",
    //         "Выходящие": 1890,
    //         "Входящие": 4800
    //     },
    //     {
    //         "name": "Page F",
    //         "Выходящие": 2390,
    //         "Входящие": 3800
    //     },
    //     {
    //         "name": "Page G",
    //         "Выходящие": 3490,
    //         "Входящие": 4300
    //     },
    //     {
    //         "name": "Page A",
    //         "Выходящие": 4000,
    //         "Входящие": 2400
    //     },
    //     {
    //         "name": "Page B",
    //         "Выходящие": 3000,
    //         "Входящие": 1398
    //     },
    //     {
    //         "name": "Page C",
    //         "Выходящие": 2000,
    //         "Входящие": 9800
    //     },
    //     {
    //         "name": "Page D",
    //         "Выходящие": 2780,
    //         "Входящие": 3908
    //     },
    //     {
    //         "name": "Page E",
    //         "Выходящие": 1890,
    //         "Входящие": 4800
    //     },
    //     {
    //         "name": "Page F",
    //         "Выходящие": 2390,
    //         "Входящие": 3800
    //     },
    //     {
    //         "name": "Page G",
    //         "Выходящие": 3490,
    //         "Входящие": 4300
    //     },
    //     {
    //         "name": "Page A",
    //         "Выходящие": 4000,
    //         "Входящие": 2400
    //     },
    //     {
    //         "name": "Page B",
    //         "Выходящие": 1828,
    //         "Входящие": 1283
    //     },
    //     {
    //         "name": "Page C",
    //         "Выходящие": 1002,
    //         "Входящие": 8388
    //     },
    //     {
    //         "name": "Page D",
    //         "Выходящие": 2393,
    //         "Входящие": 7614
    //     },
    //     {
    //         "name": "Page E",
    //         "Выходящие": 3219,
    //         "Входящие": 9548
    //     },
    //     {
    //         "name": "Page F",
    //         "Выходящие": 1292,
    //         "Входящие": 9392
    //     },
    //     {
    //         "name": "Page G",
    //         "Выходящие": 2394,
    //         "Входящие": 1200
    //     }
    // ]

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
                <Bar className='chart' barSize={15} dataKey="ketgan" fill="#FF2424" radius={50} width={"10px"} cursor={"pointer"} />
                <Bar className='chart' barSize={15} dataKey="kelgan" fill="#008700" radius={50} width={"10px"} cursor={"pointer"}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default VerticalChart




