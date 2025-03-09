import React from "react";
import { View, Text } from "react-native";
import {BlurView} from "expo-blur";
import {Feather} from "@expo/vector-icons";

interface Props {
    direction: string;
}

/**
 * A functional component that renders a compass indicator with directional gears.
 * The compass visually represents the current direction by highlighting the relevant label.
 *
 * @param {Object} Props - The props object for the component.
 * @param {string} Props.direction - The current direction to be displayed. Accepted values are "N", "S", "E", "W".
 *
 * @returns {JSX.Element} A styled view component representing the compass structure with directional indicators.
 */
const CompassIndicator = ({ direction }: Props) => {
    const gears = [
        { label: "N", value: "N", color: "black" },
        { label: "S", value: "S", color: "black" },
        { label: "E", value: "E", color: "black" },
        { label: "W", value: "W", color: "black" },
    ];

    return (
        <View className="w-[70%] rounded-lg justify-center pt-10 items-center overflow-hidden">
            <BlurView intensity={60} tint="light" className="absolute top-0 left-0 right-0 bottom-0 rounded-lg" />
            <Feather name={"compass"} size={45} color={"white"} />

            {/* Render each gear */}
            {gears.map((item) => (
                <Text
                    key={item.label}
                    style={{
                        fontSize: 48,
                        fontFamily: "Poppins-Bold",
                        color: direction === item.value ? item.color : "white",
                        marginTop: item.label !== "P" ? 8 : 16,
                        opacity: direction === item.value ? 1 : 0.5,
                    }}
                >
                    {item.label /* Gear label */}
                </Text>
            ))}
        </View>
    );
};

export default CompassIndicator;