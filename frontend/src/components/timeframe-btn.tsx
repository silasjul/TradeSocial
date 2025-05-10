import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { TimeFrame } from "@/lib/interfaces";
import clsx from "clsx";

export default function TimeFrameButton({
    tf,
    selectedTf,
    onClick,
}: {
    tf: TimeFrame;
    selectedTf: string;
    onClick: () => void;
}) {
    const { theme } = useTheme();
    const [isMounted, setMounted] = useState(false); // is needed as theme depends on user system preferences and cannot be rendered on server

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        isMounted && (
            <Button
                key={tf.name}
                className={clsx("w-8 h-8", {
                    "bg-black text-white hover:bg-black":
                        theme === "dark" && tf.name === selectedTf,
                    "bg-white text-black hover:bg-white":
                        theme === "light" && tf.name === selectedTf,
                })}
                onClick={onClick}
            >
                {tf.name}
            </Button>
        )
    );
}
