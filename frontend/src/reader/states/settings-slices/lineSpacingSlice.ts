import { StateCreator } from "zustand";
import {
  defaultValueLineSpace,
  lineSpaces,
  getNext,
  getPrev,
} from "../../settings-consts/readerSettings";

export interface LineSpacingSlice {
  lineSpacing: string;
  increaseLineSpacing: () => void;
  decreaseLineSpacing: () => void;
}

export const createLineSpacingSlice: StateCreator<
  LineSpacingSlice,
  [],
  [],
  LineSpacingSlice
> = (set) => ({
  lineSpacing: lineSpaces[defaultValueLineSpace],
  increaseLineSpacing: () =>
    set((state) => ({
      lineSpacing: getNext(lineSpaces, state.lineSpacing),
    })),
  decreaseLineSpacing: () =>
    set((state) => ({
      lineSpacing: getPrev(lineSpaces, state.lineSpacing),
    })),
});
