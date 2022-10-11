/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { config } from "../../utils/config";
import { getPercentage } from "../../utils/getPercentage";
import { toastError } from "../../utils/toastError";
import { Loading } from "../Loading";
import * as S from "../../styles/style.js";

export const Graph = () => {
  const URL = `${process.env.REACT_APP_API_URL}/asset`;
  const { user } = useAuth();
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    axios
      .get(URL, config(user))
      .then(({ data: incomingData }) => setData(incomingData))
      .catch((error) => toastError(error));
  }, []);

  const runningPercentage = getPercentage(data, "Running");
  const alertingPercentage = getPercentage(data, "Alerting");
  const stoppedPercentage = getPercentage(data, "Stopped");

  const test = data.map((asset) => asset.healthLevel);
  console.log(test);

  const pieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Assets Status",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Status",
        colorByPoint: true,
        data: [
          {
            name: "Running",
            y: runningPercentage,
            sliced: true,
            selected: true,
          },
          {
            name: "Alerting",
            y: alertingPercentage,
          },
          {
            name: "Stopped",
            y: stoppedPercentage,
          },
        ],
      },
    ],
  };

  const areaOptions = {
    chart: {
      type: "area",
    },
    title: {
      text: "Assets Health Level",
    },
    legend: { enabled: false },
    yAxis: {
      labels: {
        format: "{value}%",
      },
      title: {
        enabled: true,
      },
      max: 100,
    },
    xAxis: {
      categories: data.map((asset) => asset.name),
    },
    tooltip: {
      pointFormat: "Health Level: <b>{point.y:.1f}%</b>",
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}%",
        },
      },
      area: {
        fillOpacity: 0.5,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Assets",
        data: data.map((asset) => asset.healthLevel),
      },
    ],
  };

  if (!data?.length) {
    return <Loading />;
  }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={pieOptions} />
      <S.Margin />
      <HighchartsReact highcharts={Highcharts} options={areaOptions} />
    </>
  );
};
