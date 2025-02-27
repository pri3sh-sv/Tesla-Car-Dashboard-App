import { WS_URL } from "@/config";
import { TelemetryData } from "@/components/pages/dashboard-page/_types/telemetry-data";
import { useTelemetryStore } from "@/store/use-telemetry-store";

let socket: WebSocket | null = null;

export const connectWebSocket = (): void => {
    const { setData } = useTelemetryStore.getState();

    socket = new WebSocket(WS_URL);

    socket.onopen = handleSocketOpen;
    socket.onclose = handleSocketClose;
    socket.onerror = handleSocketError;
    socket.onmessage = (event) => handleSocketMessage(event, setData);
};

export const closeSocket = (): void => {
    if (socket) {
        console.log("Closing WebSocket connection...");
        socket.close();
        socket = null;
        useTelemetryStore.getState().clearData();
    } else {
        console.warn("WebSocket is already closed or not initialized.");
    }
};

const handleSocketOpen = (): void => {
    console.log("WebSocket connected successfully.");
};

const handleSocketClose = (): void => {
    console.log("WebSocket disconnected.");
};

const handleSocketError = (error: Event): void => {
    console.error("WebSocket encountered an error:", error);
};

const handleSocketMessage = (
    event: MessageEvent,
    setData: (data: TelemetryData) => void
): void => {
    try {
        const data: TelemetryData = JSON.parse(event.data);
        setData(data);
    } catch (error) {
        console.error("Failed to parse telemetry data:", error);
    }
};