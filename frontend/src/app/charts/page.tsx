"use client";

import { AppSidebar } from "@/components/app-sidebar";
import PostCard from "@/components/post-card";
import { SearchSelector } from "@/components/search-selector";
import StockChart from "@/components/stock-chart";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { dummyPeople, dummyPosts } from "@/lib/dummy-data";
import { defaultSymbols, timeFrames } from "@/lib/configs";
import { Person, Post, TimeFrame } from "@/lib/interfaces";
import TimeFrameButton from "@/components/timeframe-btn";

export default function Charts() {
    const [symbol, setSymbol] = useState("");
    const [person, setPerson] = useState("");
    const [selectedPerson, setSelectedPerson] = useState<Person>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [hoveredPost, setHoveredPost] = useState<Post>();
    const [timeFrame, setTimeFrame] = useState(timeFrames[0]);

    useEffect(() => {
        setPosts(dummyPosts);
        setSelectedPerson(
            dummyPeople.find((p) => p.username.slice(1) == person)
        );
    }, [person]);

    return (
        <AppSidebar activepage="Charts" includeHeader={false}>
            <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 z-10">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                </div>
                <div className="flex gap-4">
                    <SearchSelector
                        options={dummyPeople.map((p) => ({
                            value: p.username.slice(1),
                            img: p.img,
                        }))}
                        category={"Person"}
                        state={person}
                        setState={setPerson}
                    />
                    <SearchSelector
                        options={defaultSymbols.map((s) => ({
                            value: s,
                            img: `/logos/${s}.svg`,
                        }))}
                        category={"Symbol"}
                        state={symbol}
                        setState={setSymbol}
                    />
                </div>
                <div className="flex gap-1">
                    {timeFrames.map((tf) => (
                        <TimeFrameButton
                            key={tf.name}
                            tf={tf}
                            onClick={() => setTimeFrame(tf)}
                            selectedTf={timeFrame.name}
                        />
                    ))}
                </div>
                <div className="ml-auto m-4">
                    <ThemeSwitch />
                </div>
            </header>
            <div className="mx-16">
                <section>
                    {symbol ? (
                        <div
                            className={`w-screen h-full absolute bottom-0 right-0`}
                        >
                            <StockChart
                                symbol={symbol}
                                multiplier={timeFrame.multiplier}
                                timeSpan={timeFrame.time}
                                post={hoveredPost}
                            />
                        </div>
                    ) : (
                        <div className="flex-col my-6">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Charts
                            </h1>
                            <p className="text-xl text-muted-foreground mt-1">
                                Select a symbol to get started.
                            </p>
                        </div>
                    )}
                </section>
                <section className="absolute flex gap-4 z-10 mr-4">
                    {person &&
                        posts.map((post, idx) => {
                            if (selectedPerson)
                                return (
                                    <PostCard
                                        key={idx}
                                        post={post}
                                        person={selectedPerson}
                                        onHover={setHoveredPost}
                                    />
                                );
                        })}
                </section>
            </div>
        </AppSidebar>
    );
}
