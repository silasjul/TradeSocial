"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export function SearchSelector({
    options,
    category,
    state,
    setState,
}: {
    category: string;
    options: { value: string; img: string }[];
    state: string;
    setState: (arg0: string) => void;
}) {
    const [open, setOpen] = React.useState(false);
    const imageSize = 20;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    <div>
                        {state ? (
                            <div className="flex items-center gap-2">
                                <Image
                                    className="rounded-full"
                                    src={
                                        options.find(
                                            (opt) => opt.value == state
                                        )?.img ?? ""
                                    }
                                    alt={"LOGO"}
                                    width={imageSize}
                                    height={imageSize}
                                />
                                {state}
                            </div>
                        ) : (
                            `Select ${category}...`
                        )}
                    </div>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder={`Search ${category}...`}
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        setState(
                                            currentValue === state
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            className="rounded-full"
                                            src={option.img}
                                            alt={"LOGO"}
                                            width={imageSize}
                                            height={imageSize}
                                        />
                                        {option.value}
                                    </div>
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            state === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
