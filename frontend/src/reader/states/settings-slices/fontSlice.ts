import { StateCreator } from "zustand";
import { defaultValueFont, fonts } from "../../settings-consts/readerSettings";

export interface FontSlice {
  font: string;
  setFontStyle: (value: string) => void;
}

export const createFontSlice: StateCreator<FontSlice, [], [], FontSlice> = (
  set
) => ({
  font: fonts[defaultValueFont],
  setFontStyle: (value: string) =>
    set(() => ({
      font: value,
    })),
});
