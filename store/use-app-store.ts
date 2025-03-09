import { create } from "zustand";

type AppState = {
    wsConnection: boolean;
    setWsConnection: (status: boolean) => void;
};

/**
 * A Zustand store hook for managing application state.
 *
 * The `useAppStore` variable is a store created using the Zustand library and provides
 * a mechanism for managing state within the application. It includes methods to update
 * and retrieve the current state. The store is used to track and modify the WebSocket
 * connection status for the application.
 *
 * Properties:
 * - `wsConnection` (boolean): Represents the current status of the WebSocket connection.
 *   Defaults to `false`.
 * - `setWsConnection` (function): A function to update the `wsConnection` state.
 *   Accepts a boolean value to set the WebSocket connection status.
 */
export const useAppStore = create<AppState>((set) => ({
    wsConnection: false, // Initial state
    setWsConnection: (status) => set({ wsConnection: status }),
}));