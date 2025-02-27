import { format, parse } from "date-fns";

/**
 * Convert a time string in HH:mm:ss format to h:mm a format (e.g., 15:23:55 -> 3:00 PM).
 * @param timeStr - The time string in HH:mm:ss format.
 * @returns - Formatted time string in h:mm a format.
 */
export const formatTimeTo12Hour = (timeStr: string): string => {
    try {
        const parsedTime = parse(timeStr, "HH:mm:ss", new Date());
        return format(parsedTime, "h : mm a");
    } catch (error) {
        console.error("Error formatting time:", error);
        return "";
    }
};