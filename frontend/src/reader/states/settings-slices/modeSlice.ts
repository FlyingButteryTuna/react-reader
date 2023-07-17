import { StateCreator } from "zustand";
import {
  defaultValueMode,
  readerModes,
} from "../../settings-consts/readerSettings";

export interface ModeSlice {
  mode: readerModes;
  setMode: (value: string | readerModes) => void;
}

export const createModeSlice: StateCreator<ModeSlice, [], [], ModeSlice> = (
  set
) => ({
  mode: defaultValueMode,
  setMode: (value: string | readerModes) =>
    set(() => ({
      mode: Number(value),
    })),
});
