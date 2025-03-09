import {TelemetryData} from "@/components/pages/dashboard-page/_types/telemetry-data";
import {create} from "zustand";

interface TelemetryState {
    data: TelemetryData | null;
    setData: (data: TelemetryData) => void;
    clearData: () => void;
}

/**
 * useTelemetryStore is a state management hook created using Zustand.
 * It is responsible for managing the telemetry data state within the application.
 * The state includes the telemetry data and provides methods to update or clear the data.
 *
 * @constant
 * @type {Function}
 * @returns {Object} An object containing the current telemetry state and action methods.
 */
export const useTelemetryStore = create<TelemetryState>((set) => ({
    data: null,
    setData: (data: TelemetryData) => set({ data }),
    clearData: () => set({ data: null }),
}))