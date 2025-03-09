import React from "react";
import { View, Text } from "react-native";
import {BlurView} from "expo-blur";

interface Props {
    gear: number;
}

/**
 * GearIndicator is a functional React component that visually displays the current gear selection of a vehicle.
 * It renders a list of predefined gears (P, R, N, D) with corresponding colors and styles, indicating the selected gear in a distinct manner.
 *
 * The component also provides a blurred background effect and is styled to fit a specific layout with rounded corners and centered content.
 *
 * Props:
 * @param {Object} props - The props object for the GearIndicator component.
 * @param {number} props.gear - The currently selected gear's value. Matches the value of one element in the predefined `gears` array.
 *
 * Gears Configuration:
 * - P (Parking) with value 0 and color blue.
 * - R (Reverse) with value -1 and color red.
 * - N (Neutral) with value 2 and color yellow.
 * - D (Drive) with value 1 and color green.
 *
 * The selected gear is displayed with its respective color and full opacity, while the unselected gears have white text and reduced opacity.
 *
 * @returns {React.Element} A styled view containing the gear indicator.
 */
const GearIndicator = ({ gear }: Props) => {
    const gears = [
        { label: "P", value: 0, color: "blue" }, // Parking (P) - Blue
        { label: "R", value: -1, color: "red" }, // Reverse (R) - Red
        { label: "N", value: 2, color: "yellow" }, // Neutral (N) - Yellow (not selected/faded unless extended)
        { label: "D", value: 1, color: "green" }, // Drive (D) - Green
    ];

    return (
        <View className="w-[70%] rounded-lg justify-center pt-10 items-center overflow-hidden">
            <BlurView intensity={60} tint="light" className="absolute top-0 left-0 right-0 bottom-0 rounded-lg" />
            <Text className="text-4xl font-pbold text-white">Gear</Text>

            {/* Render each gear */}
            {gears.map((gearItem) => (
                <Text
                    key={gearItem.label}
                    style={{
                        fontSize: 48,
                        fontFamily: "Poppins-Bold",
                        color: gear === gearItem.value ? gearItem.color : "white",
                        marginTop: gearItem.label !== "P" ? 8 : 16,
                        opacity: gear === gearItem.value ? 1 : 0.5,
                    }}
                >
                    {gearItem.label /* Gear label */}
                </Text>
            ))}
        </View>
    );
};

export default GearIndicator;