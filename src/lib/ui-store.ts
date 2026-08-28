import { create } from "zustand";
import type { ProductId } from "./products";

export type DiscoveryInterest = ProductId | "suite" | "bespoke";

type UiState = {
  discoveryOpen: boolean;
  discoveryInterest: DiscoveryInterest;
  openDiscovery: (interest?: DiscoveryInterest) => void;
  closeDiscovery: () => void;
};

export const useUi = create<UiState>((set) => ({
  discoveryOpen: false,
  discoveryInterest: "suite",
  openDiscovery: (interest) =>
    set({
      discoveryOpen: true,
      discoveryInterest: interest ?? "suite",
    }),
  closeDiscovery: () => set({ discoveryOpen: false }),
}));
