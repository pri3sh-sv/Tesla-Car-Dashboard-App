import { WS_URL } from "@/config";
import { TelemetryData } from "@/components/pages/dashboard-page/_types/telemetry-data";
import { useTelemetryStore } from "@/store/use-telemetry-store";
import { useAppStore } from "@/store/use-app-store";

let socket: WebSocket | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = Infinity; // Set a limit if needed
const reconnectInterval = 3000; // 3 seconds

/**
 * Establishes a WebSocket connection to the specified URL and assigns relevant event handlers.
 * If a connection is already open, the function exits without creating a new connection.
 *
 * The WebSocket event handlers perform the following:
 * - `onopen`: Invoked when the WebSocket connection is successfully opened.
 * - `onclose`: Invoked when the WebSocket connection is closed.
 * - `onerror`: Invoked when an error occurs on the WebSocket.
 * - `onmessage`: Handles incoming WebSocket messages, processing the data and updating the state using the setData function from the telemetry store.
 *
 * Logging outputs are provided to indicate the connection status.
 *
 * @returns {void} Does not return a value.
 */
export const connectWebSocket = (): void => {
    const { setData } = useTelemetryStore.getState();

    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("WebSocket is already connected.");
        return;
    }

    console.log("Attempting to connect WebSocket...");
    socket = new WebSocket(WS_URL);

    socket.onopen = handleSocketOpen;
    socket.onclose = handleSocketClose;
    socket.onerror = handleSocketError;
    socket.onmessage = (event) => handleSocketMessage(event, setData);
};

/**
 * Closes the active WebSocket connection if it exists.
 *
 * This function performs the following actions:
 * - Logs a message indicating the WebSocket connection is being closed.
 * - Ensures the reconnection handler is not triggered by setting `onclose` to null.
 * - Closes the WebSocket connection and sets the `socket` to null.
 * - Clears telemetry data via the telemetry store.
 * - Updates the application store to indicate the WebSocket connection is inactive.
 *
 * If no WebSocket connection exists, a warning message is logged instead.
 */
export const closeSocket = (): void => {
    if (socket) {
        console.log("Closing WebSocket connection...");
        socket.onclose = null; // Prevent triggering reconnection
        socket.close();
        socket = null;
        useTelemetryStore.getState().clearData();
        useAppStore.getState().setWsConnection(false);
    } else {
        console.warn("WebSocket is already closed or not initialized.");
    }
};

/**
 * Handles the "open" event for a WebSocket connection.
 *
 * This function is triggered when the WebSocket connection is successfully established.
 * It performs the following actions:
 * - Logs a success message to the console.
 * - Resets the reconnectAttempts counter to 0.
 * - Updates the application state to indicate that the WebSocket connection is active.
 *
 * @returns {void}
 */
const handleSocketOpen = (): void => {
    console.log("WebSocket connected successfully.");
    reconnectAttempts = 0;
    useAppStore.getState().setWsConnection(true);
};

/**
 * Handles the WebSocket close event. This function performs the necessary actions when the WebSocket
 * disconnects, including logging the event, updating the application state, and attempting to reconnect
 * if the maximum reconnect attempts have not been exceeded.
 *
 * Behavior:
 * - Logs the WebSocket disconnection status.
 * - Updates the application state in the global store to reflect the disconnection.
 * - Attempts to reconnect with an exponential backoff mechanism if the number of reconnect attempts
 *   does not exceed the defined threshold.
 * - Stops reconnection and logs a warning message when the maximum reconnect attempts are reached.
 */
const handleSocketClose = (): void => {
    console.log("WebSocket disconnected.");
    useAppStore.getState().setWsConnection(false);

    if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        console.log(`Reconnecting in ${reconnectInterval / 1000} seconds...`);
        setTimeout(connectWebSocket, reconnectInterval);
    } else {
        console.warn("Max reconnect attempts reached. Stopping reconnection.");
    }
};

/**
 * Handles WebSocket error events by logging the error and closing the socket connection.
 * This ensures the socket is properly closed and can trigger reconnection if needed.
 *
 * @param {Event} error - The error event emitted by the WebSocket.
 * @returns {void}
 */
const handleSocketError = (error: Event): void => {
    console.error("WebSocket encountered an error:", error);
    if (socket) socket.close(); // Close the socket to trigger reconnection
};

/**
 * Handles incoming WebSocket messages, parses the telemetry data from the message event,
 * and updates the application state through a provided setter function.
 *
 * @param {MessageEvent} event - The WebSocket message event containing telemetry data.
 * @param {function} setData - A function to update the application state with the parsed telemetry data.
 * @returns {void}
 *
 * @throws {Error} Logs an error to the console if the incoming data cannot be parsed as JSON.
 */
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
