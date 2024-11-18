import React from "react";
import { connect } from "react-redux";
import ReactECharts from "echarts-for-react";
import "./Chart.scss";

const Chart = () => {
    const colors = ['#5470C6', '#EE6666'];

  // Cấu hình biểu đồ ECharts
  const option = {
    color: colors,
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {},
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                'Precipitation ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            }
          }
        },
        // prettier-ignore
        data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                'Precipitation ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            }
          }
        },
        // prettier-ignore
        data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Năm (2015)',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: 'Năm (2016)',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [
          3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
        ]
      }
    ]
  };

  return (
    <div className="chart-container">
    <div className="chart-content">
      <h2>Biểu đồ khí thải carbon năm 2015 và 2016</h2>
      <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
    </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(Chart);
