import {Pressable, Text, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import {Feather} from "@expo/vector-icons";
import React from "react";
import ToastComponent from "@/components/common/toast";

/**
 * Header component displaying a time and temperature, along with a pressable option showing car information.
 *
 * @param {Object} props - The props object for the Header component.
 * @param {string} props.time - The time string to be displayed in the header.
 *
 * @returns {JSX.Element} - Returns a React Native component with styled views and interactive elements.
 */
const Header = ({time} : {time : string}) => {
    const {showToast} = ToastComponent();
    return (
        <View className={"w-full flex-row justify-between"}>
            <View className={"py-4 px-8 rounded-3xl overflow-hidden"}>
                <BlurView intensity={60} tint="dark" className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl" />
                <View className="flex-row items-center gap-5">
                    <Feather name="clock" size={25} color="white" />
                    <Text className="pt-3 text-3xl text-white font-pregular">
                        {time}{"  |  "}-12 °C
                    </Text>
                </View>
            </View>
            <Pressable className={"py-4 px-8 rounded-3xl overflow-hidden"}
                       onPress={() => showToast({description:"Your selected car is Tesla", type:"info"})}>
                <BlurView intensity={60} tint="dark" className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl" />
                <View className="flex-row items-center gap-5">
                    <Feather name="info" size={25} color="white" />
                    <Text className="pt-3 text-3xl text-white font-pregular">
                        Tesla Car
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Header;