import {create} from "zustand";

type LocationState = {
    location: { latitude: number; longitude: number } | null;
    setLocation: (lat: number, lng: number) => void;
};

/**
 * `useLocationStore` is a Zustand-based store that manages the application state
 * related to the user's geographic location.
 *
 * This store provides the following functionalities:
 * - Stores the user's current location as latitude and longitude.
 * - Updates the location state with a provided latitude and longitude.
 *
 * The initial state of `location` is set to `null`.
 *
 * Methods:
 * - `setLocation(lat, lng)`: Updates the `location` state with the given latitude (`lat`) and longitude (`lng`).
 */
export const useLocationStore = create<LocationState>((set) => ({
    location: null,
    setLocation: (lat, lng) => set({ location: { latitude: lat, longitude: lng } }),
}));
