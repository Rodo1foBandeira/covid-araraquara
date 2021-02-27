import React, { useState, useEffect } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const CustomizedAxisTick = props => {
    const { x, y, stroke, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-70)">
                {payload.value}
            </text>
        </g>
    );
}

const Grafic = () => {
    let data = [
        { date: '2021-02-01', Enfermaria: 55, UTI: 32, mortes_acumulada: 121 },
        { date: '2021-02-02', Enfermaria: 62, UTI: 34, mortes_acumulada: 121 },
        { date: '2021-02-03', Enfermaria: 77, UTI: 36, mortes_acumulada: 121 },
        { date: '2021-02-04', Enfermaria: 85, UTI: 36, mortes_acumulada: 126 },
        { date: '2021-02-05', Enfermaria: 105, UTI: 44, mortes_acumulada: 127 },
        { date: '2021-02-06', Enfermaria: 100, UTI: 47, mortes_acumulada: 127 },
        { date: '2021-02-07', Enfermaria: 101, UTI: 48, mortes_acumulada: 128 },
        { date: '2021-02-08', Enfermaria: 100, UTI: 50, mortes_acumulada: 129 },
        { date: '2021-02-09', Enfermaria: 112, UTI: 52, mortes_acumulada: 130 },
        { date: '2021-02-10', Enfermaria: 113, UTI: 53, mortes_acumulada: 134 },
        { date: '2021-02-11', Enfermaria: 127, UTI: 49, mortes_acumulada: 135 },
        { date: '2021-02-12', Enfermaria: 131, UTI: 53, mortes_acumulada: 141 },
        { date: '2021-02-13', Enfermaria: 132, UTI: 47, mortes_acumulada: 143 },
        { date: '2021-02-14', Enfermaria: 135, UTI: 56, mortes_acumulada: 146 },
        { date: '2021-02-15', Enfermaria: 139, UTI: 58, mortes_acumulada: 148 },
        { date: '2021-02-16', Enfermaria: 149, UTI: 63, mortes_acumulada: 153 },
        { date: '2021-02-17', Enfermaria: 149, UTI: 60, mortes_acumulada: 158 },
        { date: '2021-02-18', Enfermaria: 152, UTI: 67, mortes_acumulada: 162 },
        { date: '2021-02-19', Enfermaria: 159, UTI: 68, mortes_acumulada: 167 },
        { date: '2021-02-20', Enfermaria: 148, UTI: 65, mortes_acumulada: 170 },
        { date: '2021-02-21', Enfermaria: 155, UTI: 63, mortes_acumulada: 171 },
        { date: '2021-02-22', Enfermaria: 165, UTI: 66, mortes_acumulada: 177 },
        { date: '2021-02-23', Enfermaria: 169, UTI: 74, mortes_acumulada: 181 },
        { date: '2021-02-24', Enfermaria: 165, UTI: 73, mortes_acumulada: 185 },
        { date: '2021-02-25', Enfermaria: 172, UTI: 75, mortes_acumulada: 192 },
        { date: '2021-02-26', Enfermaria: 175, UTI: 72, mortes_acumulada: 197 },
    ];

    const mortesDiaAnterior = 116; // 31/01

    data.forEach((x, i) => x.mortes_dia = i ? x.mortes_acumulada - data[i-1].mortes_acumulada : x.mortes_acumulada - mortesDiaAnterior);

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <ComposedChart
                width={windowDimensions.width - 10}
                height={500}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                
                <YAxis />
                <Tooltip formatter={(value, name) => ([value, name == 'mortes_acumulada' ? 'Mortes Acumulada' : name == 'mortes_dia' ? 'Mortes por dia' : name])}/>
                <Legend verticalAlign="top" formatter={(value, entry) => value == 'mortes_acumulada' ? 'Mortes Acumulada' : value == 'mortes_dia' ? 'Mortes por dia' : value} />
                
                <Bar dataKey="mortes_dia"  fill="#c5a8f7" />

                <Line type="monotone" dataKey="Enfermaria" stroke="grey" />
                <Line type="monotone" dataKey="UTI" stroke="orange" />
                <Line type="monotone" dataKey="mortes_acumulada" stroke="red" />

                <XAxis dataKey="date" height={70} scale="auto" padding={{ bottom: 150 }} interval={0} angle={-70} tick={false}/>
            </ComposedChart>
        </>
    );
}

export default Grafic;