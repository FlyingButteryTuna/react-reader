import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  FontSizeSlice,
  createFontSizeSlice,
} from "./settings-slices/fontSizeSlice";
import {
  LineSpacingSlice,
  createLineSpacingSlice,
} from "./settings-slices/lineSpacingSlice";
import {
  VMarginsSlice,
  createVMarginsSlice,
} from "./settings-slices/vMarginsSlice";
import { FontSlice, createFontSlice } from "./settings-slices/fontSlice";
import { ModeSlice, createModeSlice } from "./settings-slices/modeSlice";
import { ThemeSlice, createThemeSlice } from "./settings-slices/themeSlice";

type readerSettings = FontSizeSlice &
  LineSpacingSlice &
  VMarginsSlice &
  FontSlice &
  ModeSlice &
  ThemeSlice;

export const useReaderSettings = create<readerSettings>()(
  persist(
    (...a) => ({
      ...createFontSizeSlice(...a),
      ...createLineSpacingSlice(...a),
      ...createVMarginsSlice(...a),
      ...createFontSlice(...a),
      ...createModeSlice(...a),
      ...createThemeSlice(...a),
    }),
    { name: "reader-settings-store" }
  )
);
