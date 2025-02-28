import React from "react";
import { View, Text } from "react-native";
import {BlurView} from "expo-blur";

interface Props {
    gear: number;
}

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