import { create } from "zustand";
import { Place } from "../types/types.js";
import axios from "axios";
import { BASE_API_URL } from "../contants/api.ts";
interface PlacesState {
  places: Place[];
  selectedPlace: Place | null;
  error: null | string;
  loading: boolean;

  fetchPlaces: () => Promise<void>;
}

export const usePlacesStore = create<PlacesState>((set) => ({
  places: [],
  error: null,
  loading: false,
  selectedPlace: null,

  fetchPlaces: async () => {
    set({ error: null, loading: true });
    try {
      const response = await axios.get(`${BASE_API_URL}/api/v1/places/`);
      set({ places: response.data.places, error: null });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  getchPlaceById: async (id: any) => {
    set({ error: null, loading: true });
    try {
      const response = await axios.get(`${BASE_API_URL}/api/v1/places/${id}`);
      if (response.status === 404) throw new Error(response.data.message);
      set({ selectedPlace: response.data, error: null });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },
}));
