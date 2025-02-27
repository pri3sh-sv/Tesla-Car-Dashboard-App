export interface TelemetryData {
    throttle: number;
    brake: number;
    steer: number;
    speed_kmh: number;
    battery_percentage: number;
    time: string;
    date: string;
    gear: number;
    direction: string;
}