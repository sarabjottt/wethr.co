import React, { useContext, useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  LabelList,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { GlobalState } from '../GlobalState';
import { toCelsius } from '../Helper';

export default function Chart() {
  const [showRain, setShowRain] = useState(false);
  const [chartData, setChartData] = useState([]);
  const { isFern, weather, theme } = useContext(GlobalState);
  useEffect(() => {
    setChartData(weather.weatherData.hourly
    .map(e => ({
      tempCel: toCelsius(e.main.temp),
      tempFer: Math.round(e.main.temp),
      time: new Date(e.dt * 1000).toLocaleString('en-AU', {
        hour: 'numeric',
        hour12: true,
      }),
      rain: Math.round(e.pop * 100),
    })).slice(0, 9));
  } , [weather]);
  function LabelForRain({ x, y, value }) {
    return (
      <text
        x={x}
        y={y}
        dy={-4}
        fontSize="0.8rem"
        fill={theme.font}
        textAnchor="middle">
        {value < 1 ? null : `${value}%`}
      </text>
    );
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          onClick={() => setShowRain(!showRain)}
          data={chartData}
          margin={{ top: 50, right: 20, left: 20, bottom: 6 }}>
          {!showRain ? (
            <Area
              type="monotone"
              dataKey="tempCel"
              stroke="#FFA000"
              strokeWidth="4"
              fill="#ffc10754"
              fillOpacity={1}>
              <LabelList
                content={({ x, y, value }) => <text x={x} y={y} dy={-8} fill={theme.font} fontSize="0.8rem">{value}°</text>}
                fontSize="0.8rem"
                fill={theme.font}
                dataKey={!isFern ? 'tempCel' : 'tempFer'}
                offset={10}
                position="top"
              />
            </Area>
          ) : (
            <Area
              type="step"
              fill="#6bbfff"
              fillOpacity={1}
              strokeWidth="0"
              dataKey="rain">
              <LabelList
                content={<LabelForRain />}
                dataKey="rain"
                position="top"
              />
            </Area>
          )}
          <XAxis
            axisLine
            stroke={theme.font}
            strokeOpacity={0.5}
            tick={{ fill: theme.font, fontSize: '0.7rem' }}
            interval={0}
            dataKey="time"
          />
          {showRain && <YAxis hide domain={[0, 100]} />}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
