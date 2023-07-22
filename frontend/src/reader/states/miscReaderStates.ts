import { create } from "zustand";

interface ShouldScrollToStart {
  shouldScrollToStart: boolean;
  toggleScrollRestoration: () => void;
  disableScrollRestoration: () => void;
  enableScrollRestoration: () => void;
}

export const useShouldScrollToStart = create<ShouldScrollToStart>((set) => ({
  shouldScrollToStart: true,
  toggleScrollRestoration: () =>
    set((state) => ({ shouldScrollToStart: !state.shouldScrollToStart })),
  disableScrollRestoration: () => set(() => ({ shouldScrollToStart: false })),
  enableScrollRestoration: () => set(() => ({ shouldScrollToStart: true })),
}));

interface WindowVisibility {
  isWindowHidden: boolean;
  toggleWindowVisibility: () => void;
  disableWindowVisibility: () => void;
  enableWindowVisibility: () => void;
}

export const useWindowVisibility = create<WindowVisibility>((set) => ({
  isWindowHidden: true,
  toggleWindowVisibility: () =>
    set((state) => ({ isWindowHidden: !state.isWindowHidden })),
  disableWindowVisibility: () => set(() => ({ isWindowHidden: false })),
  enableWindowVisibility: () => set(() => ({ isWindowHidden: true })),
}));

interface BreadCrumbs {
  seriesTitle: string;
  chapterTitle: string;
  setSeriesTitle: (seriesTitle: string) => void;
  setChapterTitle: (chapterTitle: string) => void;
}

export const useBreadCrumbs = create<BreadCrumbs>((set) => ({
  seriesTitle: "",
  chapterTitle: "",
  setSeriesTitle: (seriesTitle: string) =>
    set(() => ({ seriesTitle: seriesTitle })),
  setChapterTitle: (chapterTitle: string) =>
    set(() => ({ chapterTitle: chapterTitle })),
}));
