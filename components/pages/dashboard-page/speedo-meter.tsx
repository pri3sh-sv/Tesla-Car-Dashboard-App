import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { calculateCarRange } from "@/utils/calculate-car-range";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
} from "react-native-reanimated";

interface Props {
    speed: number;
    battery: number;
}

const getBatteryColor = ( battery: number ) => {
    if (battery > 70) {
        return "green";
    } else if (battery > 30) {
        return "orange";
    } else {
        return "red";
    }
};

const SpeedoMeter = ({ speed, battery }: Props) => {
    const speedAnimation = useSharedValue(0);

    const previousSpeed = useRef(speed);

    useEffect(() => {
        if (speed !== previousSpeed.current) {

            speedAnimation.value = withSpring(speed > previousSpeed.current ? 1 : -1, {
                damping: 12,
                stiffness: 150,
            }, () => {

                speedAnimation.value = 0;
            });

            previousSpeed.current = speed;
        }
    }, [speed]);

    const animatedSpeedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(speedAnimation.value, [-1, 0, 1], [40, 0, -40]);
        const opacity = interpolate(speedAnimation.value, [-1, 0, 1], [0, 1, 0]);

        return {
            transform: [{ translateY }],
            opacity,
        };
    });

    return (
        <View className="justify-center items-center">
            <View className={"flex-row justify-center gap-8"}>
                <Animated.Text
                    style={[
                        animatedSpeedStyle,
                        {
                            fontSize: 144,
                            fontFamily: "Poppins-Bold",
                            color: "white",
                        },
                    ]}
                >
                    {speed}
                </Animated.Text>
                <Text className={"text-white text-4xl font-pmedium top-1/2"}>KM / HR</Text>
            </View>

            <View className="flex-row gap-6 items-center bg-white rounded-full px-12 py-2 shadow-md">
                <Feather name="battery" size={60} color={getBatteryColor(battery)} className={"mr-8"} />
                <Text className="text-4xl font-pmedium pt-3 text-typography-800">
                    {battery.toFixed(2)} %
                </Text>
                <Text className="text-4xl font-pmedium text-typography-800 pt-3"> | </Text>
                <Text className="text-4xl font-pmedium text-typography-800 pt-3">
                    {calculateCarRange(battery, 600).toFixed(2)} km
                </Text>
            </View>
        </View>
    );
};

export default SpeedoMeter;
