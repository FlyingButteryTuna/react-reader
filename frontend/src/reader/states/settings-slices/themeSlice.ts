import { StateCreator } from "zustand";
import {
  ReaderTheme,
  defaultTheme,
  getTheme,
} from "../../settings-consts/readerThemes";
export interface ThemeSlice {
  theme: ReaderTheme;
  setTheme: (themeName: string) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set
) => ({
  theme: defaultTheme,
  setTheme: (themeName: string) => set(() => ({ theme: getTheme(themeName) })),
});
