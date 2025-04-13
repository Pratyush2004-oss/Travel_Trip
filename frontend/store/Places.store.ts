import { create } from "zustand";
import { Place } from "../types/types.js";
interface PlacesState {
  places: Place[];
  error: null | string;

  fetchPlaces: () => Promise<void>;
}

export const usePlacesStore = create<PlacesState>((set) => ({
  places: [],
  error: null,

  fetchPlaces : async () => {},
}));
