import { StateCreator } from "zustand";
import {
  defaultValueFontSize,
  fontSizes,
  getNext,
  getPrev,
} from "../../settings-consts/readerSettings";

export interface FontSizeSlice {
  fontSize: string;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

export const createFontSizeSlice: StateCreator<
  FontSizeSlice,
  [],
  [],
  FontSizeSlice
> = (set) => ({
  fontSize: fontSizes[defaultValueFontSize],
  increaseFontSize: () =>
    set((state) => ({
      fontSize: getNext(fontSizes, state.fontSize),
    })),
  decreaseFontSize: () =>
    set((state) => ({
      fontSize: getPrev(fontSizes, state.fontSize),
    })),
});
