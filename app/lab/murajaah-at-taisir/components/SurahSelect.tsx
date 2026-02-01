"use client";

import {
  Button,
  ComboBox,
  Dialog,
  DialogTrigger,
  Input,
  ListBox,
  ListBoxItem,
  ListLayout,
  Modal,
  ModalOverlay,
  Popover,
  Pressable,
  Virtualizer,
} from "react-aria-components";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import useSWR from "swr";

import { fetchAllSurah } from "../lib/fetchAllSurah";
import { SURAH_MAP } from "../lib/constants";
import { useIsMobile } from "../hooks/useIsMobile";
import { useBottomSheet } from "../hooks/useBottomSheet";

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
  const isMobile = useIsMobile();
  const { data: allSurah } = useSWR("all-surah", fetchAllSurah);

  const { isVisible, onVisibleChange, modalOverlayRef, bottomSheetRef } =
    useBottomSheet();

  const [search, setSearch] = useState("");

  const options: Option[] = (allSurah?.data || []).map((item) => {
    const surahNameId = SURAH_MAP[item.number];

    return {
      key: String(item.number),
      label: `${item.number}. ${surahNameId}`,
      id: item.number,
    };
  });

  if (isMobile) {
    const filteredOptions = options.filter((option) => {
      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]/g, "");
      return normalize(option.label).includes(normalize(search.trim()));
    });

    const renderLabel = (surahNumber: number) => {
      const surah = allSurah?.data.find(
        (surah) => surah.number === surahNumber
      );
      if (!surah) {
        return <span className="text-zinc-400">Pilih Surah</span>;
      }
      const surahNameId = SURAH_MAP[surah.number];
      return `${surah.number}. ${surahNameId}`;
    };

    return (
      <DialogTrigger isOpen={isVisible} onOpenChange={onVisibleChange}>
        <Pressable>
          <button
            className={clsx(
              "relative rounded-lg text-left cursor-pointer py-2 pl-3 pr-8 border border-gray-300 "
            )}
          >
            {renderLabel(value ?? -1)}
            <div className="flex items-center px-2 absolute right-0 top-0 bottom-0">
              <ChevronDown size={16} />
            </div>
          </button>
        </Pressable>
        <ModalOverlay
          ref={modalOverlayRef}
          isDismissable
          className="fixed inset-0 z-20 overlay-enter-active"
        >
          <Modal>
            <Dialog
              ref={bottomSheetRef}
              className="bg-white fixed bottom-0 left-0 right-0 rounded-t-xl pb-8 pt-6 slide-up-active"
            >
              {({ close }) => (
                <>
                  <div className="mx-auto max-w-[420px] pb-2 px-3">
                    <div className="space-y-2">
                      <h2 className="text-lg tracking-tight font-bold">
                        Pilih Surat Al-Qur{"'"}an
                      </h2>
                      <div>
                        <input
                          placeholder="Cari"
                          className="grow-1 py-2 px-3 rounded-lg pr-8 border border-gray-300 w-full"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <Virtualizer
                    layout={ListLayout}
                    layoutOptions={{ rowHeight: 44 }}
                  >
                    <ListBox
                      aria-label="Surah List"
                      items={filteredOptions}
                      renderEmptyState={() => (
                        <div className="py-2.5 px-3 italic text-zinc-400">
                          Tidak ada surah dengan nama tersebut.
                        </div>
                      )}
                      onAction={(key) => {
                        onChange?.(Number(key));
                        close();
                      }}
                      className="mx-auto max-w-[420px] overflow-auto h-[60vh] -mb-7 pb-7"
                    >
                      {({ label }: Option) => (
                        <ListBoxItem
                          textValue={label}
                          className={({ isFocused }) =>
                            clsx(
                              "py-2.5 px-6 select-none cursor-pointer transition-colors duration-150",
                              isFocused && "bg-zinc-200"
                            )
                          }
                        >
                          {label}
                        </ListBoxItem>
                      )}
                    </ListBox>
                  </Virtualizer>
                </>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    );
  }

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
                className="grow-1 py-2 px-3 rounded-lg pr-8 cursor-pointer sm:cursor-text"
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
              {({ label }: Option) => (
                <ListBoxItem
                  textValue={label}
                  className={({ isFocused }) =>
                    clsx(
                      "py-1.5 px-2 rounded-md cursor-pointer transition-colors duration-150",
                      isFocused && "bg-zinc-200"
                    )
                  }
                >
                  {label}
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </>
      )}
    </ComboBox>
  );
}
