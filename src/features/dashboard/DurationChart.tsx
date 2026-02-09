import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../hooks/useDarkMode";
import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
    {
        duration: "1 night",
        value: 0,
        color: "#ef4444",
    },
    {
        duration: "2 nights",
        value: 0,
        color: "#f97316",
    },
    {
        duration: "3 nights",
        value: 0,
        color: "#eab308",
    },
    {
        duration: "4-5 nights",
        value: 0,
        color: "#84cc16",
    },
    {
        duration: "6-7 nights",
        value: 0,
        color: "#22c55e",
    },
    {
        duration: "8-14 nights",
        value: 0,
        color: "#14b8a6",
    },
    {
        duration: "15-21 nights",
        value: 0,
        color: "#3b82f6",
    },
    {
        duration: "21+ nights",
        value: 0,
        color: "#a855f7",
    },
];

const startDataDark = [
    {
        duration: "1 night",
        value: 0,
        color: "#b91c1c",
    },
    {
        duration: "2 nights",
        value: 0,
        color: "#c2410c",
    },
    {
        duration: "3 nights",
        value: 0,
        color: "#a16207",
    },
    {
        duration: "4-5 nights",
        value: 0,
        color: "#4d7c0f",
    },
    {
        duration: "6-7 nights",
        value: 0,
        color: "#15803d",
    },
    {
        duration: "8-14 nights",
        value: 0,
        color: "#0f766e",
    },
    {
        duration: "15-21 nights",
        value: 0,
        color: "#1d4ed8",
    },
    {
        duration: "21+ nights",
        value: 0,
        color: "#7e22ce",
    },
];

type DataItem = {
    duration: string;
    value: number;
    color: string;
};

type Stay = {
    numNights: number;
    [key: string]: any;
};

function prepareData(startData: DataItem[], stays: Stay[]): DataItem[] {
    // A bit ugly code, but sometimes this is what it takes when working with real data 😅

    function incArrayValue(arr: DataItem[], field: string): DataItem[] {
        return arr.map((obj: DataItem) =>
            obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
        );
    }

    const data = stays
        .reduce((arr: DataItem[], cur: Stay) => {
            const num = cur.numNights;
            if (num === 1) return incArrayValue(arr, "1 night");
            if (num === 2) return incArrayValue(arr, "2 nights");
            if (num === 3) return incArrayValue(arr, "3 nights");
            if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
            if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
            if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
            if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
            if (num >= 21) return incArrayValue(arr, "21+ nights");
            return arr;
        }, startData)
        .filter((obj: DataItem) => obj.value > 0);

    return data;
}

const DurationChart = ({ confirmedStays }: { confirmedStays: any[] }) => {
    const { isDarkMode } = useDarkMode()
    const startData = isDarkMode ? startDataDark : startDataLight
    const data = prepareData(startData, confirmedStays || [])

    // 转换为 ECharts 饼图数据格式
    const chartData = useMemo(() => {
        return data.map((item: DataItem) => ({
            value: item.value,
            name: item.duration,
            itemStyle: {
                color: item.color,
            },
        }))
    }, [data])

    // 根据数据项数量动态调整布局
    const dataCount = chartData.length;
    const showLegend = dataCount <= 6; // 数据项少时显示图例，多时隐藏（只依赖标签）

    const option = useMemo(() => ({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        legend: showLegend ? {
            orient: 'horizontal', // 横向布局，放在底部
            bottom: '5%',
            left: 'center',
            textStyle: {
                color: isDarkMode ? 'var(--color-grey-300)' : 'var(--color-grey-700)',
                fontSize: 12,
            },
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 15, // 减小间距，让更多项能显示
            // 如果数据项太多，自动换行
            type: 'scroll', // 启用滚动，避免遮盖
        } : undefined, // 数据多时隐藏图例
        series: [
            {
                name: 'Stay duration',
                type: 'pie',
                radius: dataCount > 6 ? ['35%', '65%'] : ['40%', '70%'], // 数据多时稍小一些，避免标签拥挤
                center: showLegend ? ['50%', '45%'] : ['50%', '50%'], // 有图例时偏上，无图例时完全居中
                avoidLabelOverlap: true, // 启用标签重叠避免
                itemStyle: {
                    borderRadius: 8,
                    borderColor: isDarkMode ? 'var(--color-grey-800)' : '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    formatter: '{b}\n{d}%',
                    color: isDarkMode ? 'var(--color-grey-300)' : 'var(--color-grey-700)',
                    position: 'outside', // 标签显示在外部
                },
                labelLine: {
                    show: true, // 显示标签连接线
                    length: 15,
                    length2: 10,
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                },
                data: chartData,
            },
        ],
    }), [chartData, isDarkMode, dataCount])

    return (
        <ChartBox>
            <Heading as="h2">Stay duration</Heading>
            {data.length > 0 ? (
                <ReactECharts
                    option={option}
                    style={{ height: '300px', width: '100%' }}
                    opts={{ renderer: 'svg' }}
                />
            ) : (
                <p style={{ textAlign: 'center', color: 'var(--color-grey-500)' }}>
                    No data to display
                </p>
            )}
        </ChartBox>
    )
}
export default DurationChart