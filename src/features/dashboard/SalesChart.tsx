import styled from "styled-components";
import DashboardBox from "./DashboardBox.tsx";
import Heading from "../../ui/Heading";
import ReactECharts from "echarts-for-react";
import { useDarkMode } from "../../hooks/useDarkMode";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useMemo } from "react";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
`;

type Booking = {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
  [key: string]: any;
};

export function SalesChart({ bookings, numDays }: { bookings: Booking[] | undefined, numDays: number }) {
  const { isDarkMode } = useDarkMode();

  // 生成日期范围
  const allDates = useMemo(() => {
    return eachDayOfInterval({
      start: subDays(new Date(), numDays - 1),
      end: new Date(),
    });
  }, [numDays]);

  // 处理数据：按日期聚合销售数据
  const data = useMemo(() => {
    const bookingsData = bookings || [];
    if (bookingsData.length === 0) {
      return allDates.map((date) => ({
        label: format(date, "MMM dd"),
        totalSales: 0,
        extrasSales: 0,
      }));
    }

    return allDates.map((date) => {
      const dayBookings = bookingsData.filter((booking) => {
        if (!booking?.created_at) return false;
        return isSameDay(date, new Date(booking.created_at));
      });

      return {
        label: format(date, "MMM dd"),
        totalSales: dayBookings.reduce((acc, cur) => {
          const price = Number(cur.totalPrice) || 0;
          return acc + price;
        }, 0),
        extrasSales: dayBookings.reduce((acc, cur) => {
          const price = Number(cur.extrasPrice) || 0;
          return acc + price;
        }, 0),
      };
    });
  }, [allDates, bookings]);


  // 根据 dark mode 设置颜色
  const colors = useMemo(() => {
    return isDarkMode
      ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
        grid: "#374151",
      }
      : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
        grid: "#e5e7eb",
      };
  }, [isDarkMode]);

  // ECharts 配置
  const option = useMemo(() => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: colors.background,
      borderColor: colors.grid,
      textStyle: {
        color: colors.text,
      },
      formatter: (params: any) => {
        let result = `<div style="margin-bottom: 4px;">${params[0].axisValue}</div>`;
        params.forEach((param: any) => {
          result += `<div style="margin: 4px 0;">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${param.color};margin-right:8px;"></span>
            ${param.seriesName}: $${param.value}
          </div>`;
        });
        return result;
      },
    },
    legend: {
      data: ["Total sales", "Extras sales"],
      textStyle: {
        color: colors.text,
      },
      top: 10,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) => item.label),
      axisLabel: {
        color: colors.text,
      },
      axisLine: {
        lineStyle: {
          color: colors.grid,
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: colors.text,
        formatter: "${value}",
      },
      axisLine: {
        lineStyle: {
          color: colors.grid,
        },
      },
      splitLine: {
        lineStyle: {
          color: colors.grid,
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "Total sales",
        type: "line",
        stack: "Total",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: colors.totalSales.fill,
              },
              {
                offset: 1,
                color: isDarkMode ? "rgba(79, 70, 229, 0.1)" : "rgba(199, 210, 254, 0.3)",
              },
            ],
          },
        },
        lineStyle: {
          color: colors.totalSales.stroke,
          width: 2,
        },
        itemStyle: {
          color: colors.totalSales.stroke,
        },
        data: data.map((item) => item.totalSales),
      },
      {
        name: "Extras sales",
        type: "line",
        stack: "Total",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: colors.extrasSales.fill,
              },
              {
                offset: 1,
                color: isDarkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(220, 252, 231, 0.3)",
              },
            ],
          },
        },
        lineStyle: {
          color: colors.extrasSales.stroke,
          width: 2,
        },
        itemStyle: {
          color: colors.extrasSales.stroke,
        },
        data: data.map((item) => item.extrasSales),
      },
    ],
  }), [data, colors, isDarkMode]);

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDates[allDates.length - 1], "MMM dd yyyy")}
      </Heading>
      {data.length > 0 && allDates.length > 0 ? (
        <ReactECharts
          option={option}
          style={{ height: "300px", width: "100%" }}
          opts={{ renderer: "svg" }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "var(--color-grey-500)" }}>
          No sales data to display
        </p>
      )}
    </StyledSalesChart>
  );
}

export default SalesChart;