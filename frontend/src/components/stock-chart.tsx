"use client";

import { useOHCL, useTrades } from "@/hooks/use-stock";
import { Timespan } from "@/lib/stock-data/polygon";
import {
    CandlestickSeries,
    createChart,
    ColorType,
    HistogramSeries,
    CrosshairMode,
    createSeriesMarkers,
    SeriesMarkerBarPosition,
    SeriesMarkerShape,
    Time,
} from "lightweight-charts";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Post } from "@/lib/interfaces";

interface StockChartProps {
    symbol: string;
    multiplier: number;
    timeSpan: Timespan;
    post?: Post;
    resize?: boolean;
    dependency?: any;
}

export default function StockChart({
    symbol,
    multiplier,
    timeSpan,
    post,
    resize,
    dependency,
}: StockChartProps) {
    const { volumeData, candleData, isLoading, isError } = useOHCL(
        symbol,
        multiplier,
        timeSpan
    );
    const { theme } = useTheme();
    const isDark = () => theme == "dark";
    const [lockScale, setLockScale] = useState(true);
    const updateData = useTrades(symbol);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        // --- Chart setup
        const chart = createChart(ref.current, {
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
            layout: {
                textColor: isDark() ? "#DDD" : "black",
                background: {
                    type: ColorType.Solid,
                    color: isDark() ? "#0a0a0a" : "white",
                },
                attributionLogo: false,
            },
            rightPriceScale: {
                borderVisible: false,
            },
            grid: isDark()
                ? {
                      vertLines: { color: "#444" },
                      horzLines: { color: "#444" },
                  }
                : undefined,
            crosshair: {
                // Allows the crosshair to move freely without snapping to datapoints
                mode: CrosshairMode.Normal,

                vertLine: isDark()
                    ? {
                          color: "#9B7DFF",
                          labelBackgroundColor: "#9B7DFF",
                      }
                    : undefined,
                horzLine: isDark()
                    ? {
                          color: "#9B7DFF",
                          labelBackgroundColor: "#9B7DFF",
                      }
                    : undefined,
            },
        });
        chart.timeScale().applyOptions({
            timeVisible: true,
            secondsVisible: false,
        });
        chart.timeScale().fitContent();

        // --- Candle chart
        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
        });
        candleSeries.priceScale().applyOptions({
            autoScale: lockScale,
        });

        isDark() &&
            candleSeries.applyOptions({
                wickUpColor: "rgb(54, 116, 217)",
                upColor: "rgb(54, 116, 217)",
                wickDownColor: "rgb(225, 50, 85)",
                downColor: "rgb(225, 50, 85)",
                borderVisible: false,
            });

        // --- Volume chart
        const volumeSeries = chart.addSeries(HistogramSeries, {
            color: "#26a69a",
            priceFormat: {
                type: "volume",
            },
            priceScaleId: "", // set as an overlay by setting a blank priceScaleId
        });
        volumeSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.9, // highest point of the series will be 90% away from the top
                bottom: 0,
            },
        });

        // --- Post marker
        if (post) {
            const date = new Date(post.time);
            createSeriesMarkers(candleSeries, [
                {
                    time: Math.floor(date.getTime() / 1000) as Time,
                    position: "aboveBar" as SeriesMarkerBarPosition,
                    color: isDark() ? "white" : "black",
                    shape: "arrowDown" as SeriesMarkerShape,
                    text: "Tweet here.",
                    price: 0,
                },
            ]);
        }

        // --- Setting data from api
        candleSeries.setData(candleData);
        volumeSeries.setData(volumeData);

        // --- Updates from socket
        /* if (updateData) {
            const last = candleData[candleData.length - 1];
            const current = updateData.p;
            candleSeries.update({
                time: (updateData.t / 1000) as Time,
                open: last.open < current ? current : last.open,
                high: last.high < current ? current : last.open,
                close: last.close > current ? current : last.open,
                low: last.low > current ? current : last.open,
            });
        } */

        // --- Resize the canvas on window resize
        const handleResize = () => {
            if (!resize) return;
            chart.applyOptions({
                width: ref.current?.clientWidth,
                height: ref.current?.clientHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            chart.remove();
        };
    }, [candleData, volumeData, theme, post, dependency, updateData]);

    if (isLoading) return <Skeleton className="w-full h-full" />;

    if (isError)
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                    Error loading chart data.
                </h4>
            </div>
        );

    return <div className={`w-full h-full cursor-crosshair`} ref={ref} />;
}
