import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { DatePicker, Space, Spin } from 'antd';
import 'antd/dist/reset.css';
import moment from 'moment';
import { fetchPurchaseFrequency } from '../api/api';

// Chart.js 모듈 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type PurchaseFrequency = {
  range: string;
  count: number;
};

const PriceChart: React.FC = () => {
  const [data, setData] = useState<PurchaseFrequency[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(moment().subtract(1, 'month').toDate());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchPurchaseFrequency(startDate, endDate);
        setData(response);
      } catch (error) {
        console.error('Error fetching purchase frequency data', error);
        window.alert('데이터를 불러오는 데 실패했습니다.'); // 에러 발생 시 알림 표시
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const chartData: ChartData<'bar'> = {
    labels: data.map(item => {
      const [min, max] = item.range.split(' - ');
      return `${Number(min).toLocaleString()}원 - ${Number(max).toLocaleString()}원`;
    }),
    datasets: [
      {
        label: 'Count',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '가격대별 구매 빈도',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Price Range (₩)',
        },
      },
    },
  };

  return (
    <div className='margin-container'>
      <h2>가격대별 구매 빈도</h2>
      <Space direction="horizontal">
        <DatePicker 
          value={startDate ? moment(startDate) : null} 
          onChange={(date: moment.Moment | null) => setStartDate(date ? date.toDate() : null)} 
        />
        <DatePicker 
          value={endDate ? moment(endDate) : null} 
          onChange={(date: moment.Moment | null) => setEndDate(date ? date.toDate() : null)} 
        />
      </Space>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default PriceChart;
