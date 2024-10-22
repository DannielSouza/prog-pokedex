import { create } from "zustand";

interface usePokemonViewStore {
  currentView: 1 | 2 | 3;
  onChangeCurrentView: (view: 1 | 2 | 3) => void;
}

const usePokemonView = create<usePokemonViewStore>((set) => ({
  currentView: 1,
  onChangeCurrentView: (view: 1 | 2 | 3) => set({ currentView: view }),
}));

export default usePokemonView;
