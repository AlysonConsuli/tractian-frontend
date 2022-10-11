/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { config } from "../../utils/config";
import {
  getHealthLevelPercentage,
  getStatusPercentage,
} from "../../utils/getPercentage";
import { toastError } from "../../utils/toastError";
import { Loading } from "../Loading";
import * as S from "../../styles/style.js";
import { getUnitsWithAssets } from "../../utils/getunitsWithAssets";

export const Graph = () => {
  const URL = `${process.env.REACT_APP_API_URL}/asset`;
  const { user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(URL, config(user))
      .then(({ data: incomingData }) => setData(incomingData))
      .catch((error) => toastError(error));
  }, []);

  const runningPercentage = getStatusPercentage(data, "Running");
  const alertingPercentage = getStatusPercentage(data, "Alerting");
  const stoppedPercentage = getStatusPercentage(data, "Stopped");

  const unitsWithAssets = getUnitsWithAssets(data);

  const healthLevels = unitsWithAssets.map((unit, i) =>
    getHealthLevelPercentage(data, unitsWithAssets[i]),
  );

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
            name: "Stopped",
            y: stoppedPercentage,
          },
          {
            name: "Alerting",
            y: alertingPercentage,
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
        enabled: false,
      },
      max: 100,
    },
    xAxis: {
      categories: data.map((asset) => asset.name),
    },
    tooltip: {
      pointFormat: "Health Level: <b>{point.y}%</b>",
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y}%",
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

  const columnOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Assets average health level per unit",
    },
    xAxis: {
      categories: unitsWithAssets,
    },
    yAxis: {
      labels: {
        format: "{value}%",
      },
      title: {
        enabled: false,
      },
      max: 100,
    },
    tooltip: {
      pointFormat: "Health Level Average: <b>{point.y}%</b>",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Units",
        data: healthLevels,
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
      <S.Margin />
      <HighchartsReact highcharts={Highcharts} options={columnOptions} />
    </>
  );
};
