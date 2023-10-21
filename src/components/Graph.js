import React, { useState, useEffect } from 'react';
import {  useSelector } from "react-redux";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const Graph = () => {
  const totalAmount = useSelector((store) => store.account.totalAmount);

  const data={balance:totalAmount};
  console.log(data,"dataa");
  const [inputValue, setInputValue] = useState(0);
  const [chartValue, setChartValue] = useState({})
  const monthlyPayment = () => {
    let amount = data.balance;
   
    let due = amount / 12;
    let rounded = Math.floor(due / 10) * 10;
    setInputValue(rounded)
    let totalMonth = Math.ceil(amount / rounded)
    let month = totalMonth + 1
    const chartData = Array.from({ length: month, rounded }, (_, index) => {
      const calculatedBalance = data.balance - rounded * index;
      const balance = calculatedBalance < 0 ? 0 : calculatedBalance;
      return {
        month: index,
        balance: balance,
      };
    });
    setChartValue(chartData)
  };
  const changeInMonthlyPay = (newValue) => {
    if (newValue) {
      let amount = data.balance;
      let totalMonth = Math.ceil(amount / inputValue)
      let month = totalMonth + 1
      const Data = Array.from({ length: month, newValue }, (_, month) => {
        const calculatedBalance = data.balance - newValue * month;
        const balance = calculatedBalance < 0 ? 0 : calculatedBalance;
        return {
          month: month,
          balance: balance,
        };
      });
      setChartValue(Data)
    }
  }
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue >= 1) {
      setInputValue(newValue);
    }
  };
  useEffect(() => {
    monthlyPayment()
  }, [data.balance])
  useEffect(() => {
    changeInMonthlyPay(inputValue)
  }, [inputValue])
  return (
    <div>
     
      <LineChart
        width={500}
        height={300}
        data={chartValue}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="balance" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}
export default Graph