import {TelemetryData} from "@/components/pages/dashboard-page/_types/telemetry-data";
import {create} from "zustand";

interface TelemetryState {
    data: TelemetryData | null;
    setData: (data: TelemetryData) => void;
    clearData: () => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
    data: null,
    setData: (data: TelemetryData) => set({ data }),
    clearData: () => set({ data: null }),
}))