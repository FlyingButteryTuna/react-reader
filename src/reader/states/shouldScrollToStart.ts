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
