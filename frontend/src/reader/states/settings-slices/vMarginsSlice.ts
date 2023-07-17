import { StateCreator } from "zustand";
import {
  defaultValueVMargin,
  vMargins,
  getPrev,
  getNext,
} from "../../settings-consts/readerSettings";

export interface VMarginsSlice {
  vMargins: string;
  increaseVMargins: () => void;
  decreaseVmargins: () => void;
}

export const createVMarginsSlice: StateCreator<
  VMarginsSlice,
  [],
  [],
  VMarginsSlice
> = (set) => ({
  vMargins: vMargins[defaultValueVMargin],
  increaseVMargins: () =>
    set((state) => ({
      vMargins: getNext(vMargins, state.vMargins),
    })),
  decreaseVmargins: () =>
    set((state) => ({
      vMargins: getPrev(vMargins, state.vMargins),
    })),
});
