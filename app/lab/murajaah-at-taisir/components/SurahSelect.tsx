"use client";

import {
  Button,
  ComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import useSWR from "swr";

import { fetchAllSurah } from "../lib/fetchAllSurah";
import { SURAH_MAP } from "../lib/constants";

type SurahSelectProps = Readonly<{
  value?: number;
  onChange?: (surahNumber: number) => void;
}>;

type Option = {
  key: string;
  label: string;
  id: number;
};

export function SurahSelect({ value, onChange }: SurahSelectProps) {
  const { data: allSurah } = useSWR("all-surah", fetchAllSurah);

  const options: Option[] = (allSurah?.data || []).map((item) => {
    const surahNameId = SURAH_MAP[item.number];

    return {
      key: String(item.number),
      label: surahNameId,
      id: item.number,
    };
  });

  return (
    <ComboBox
      aria-label="Surah Select"
      allowsEmptyCollection
      defaultFilter={(textValue, inputValue) => {
        const normalize = (str: string) =>
          str.toLowerCase().replace(/[^a-z0-9]/g, "");
        return normalize(textValue).includes(normalize(inputValue.trim()));
      }}
      defaultItems={options}
      selectedKey={value ? String(value) : undefined}
      onSelectionChange={(value) => {
        onChange?.(Number(value));
      }}
    >
      {({ isOpen }) => (
        <>
          <div>
            <Button className="flex border border-gray-300 rounded-lg relative cursor-pointer w-full">
              <Input
                placeholder="Masukkan surah Alquran"
                className="grow-1 py-2 px-3 rounded-lg pr-8"
              />
              <div className="flex items-center px-2 absolute right-0 top-0 bottom-0">
                <ChevronDown
                  size={16}
                  className={
                    "transition-transform" + (isOpen ? " rotate-180" : "")
                  }
                />
              </div>
            </Button>
          </div>
          <Popover
            className={clsx(
              "bg-white rounded-lg p-1 border border-gray-300 overflow-y-auto w-[var(--trigger-width)] origin-top",
              "data-[placement=bottom]:data-[entering]:animate-slide-down-fade-in data-[placement=bottom]:data-[exiting]:animate-slide-up-fade-out",
              "data-[placement=top]:data-[entering]:animate-slide-up-fade-in data-[placement=top]:data-[exiting]:animate-slide-down-fade-out"
            )}
          >
            <ListBox
              renderEmptyState={() => (
                <div className="py-1.5 px-2 italic text-zinc-400">
                  Tidak ada surah dengan nama tersebut.
                </div>
              )}
            >
              {({ label, id }: Option) => (
                <ListBoxItem
                  textValue={label}
                  className={({ isFocused }) =>
                    clsx(
                      "py-1.5 px-2 rounded-md cursor-pointer transition-colors duration-150",
                      isFocused && "bg-zinc-200"
                    )
                  }
                >
                  {id}. {label}
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </>
      )}
    </ComboBox>
  );
}
