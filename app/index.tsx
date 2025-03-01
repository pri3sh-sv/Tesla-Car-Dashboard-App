import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { closeSocket, connectWebSocket } from "@/ws-service";
import { useTelemetryStore } from "@/store/use-telemetry-store";
import { SafeAreaView } from "react-native-safe-area-context";
import DataWrapper from "@/components/common/data-wrapper";
import { formatTimeTo12Hour } from "@/utils/time-converter";
import Header from "@/components/pages/dashboard-page/header";
import SpeedoMeter from "@/components/pages/dashboard-page/speedo-meter";
import GearIndicator from "@/components/pages/dashboard-page/gear";
import clsx from "clsx";
import Compass from "@/components/pages/dashboard-page/compass";
import { BlurView } from "expo-blur";
import Icons from "@/constants/icons";
import { router } from "expo-router";
import {useAppStore} from "@/store/use-app-store";

const App = () => {
    const data = useTelemetryStore((state) => state.data);
    const isConnected = useAppStore((state) => state.wsConnection);

    useEffect(() => {
        connectWebSocket(); // Update state when connected
        return () => closeSocket();
    }, []);

    console.log("connection: " + isConnected , "data available " + data);
    if (!isConnected) {
        return <DataWrapper isEmpty={true} text={"Connecting to Server..."} />;
    }
    if (!data) {
        return <DataWrapper isEmpty={true} text={"Connected to Server, waiting for data..."} />;
    }

    const { speed_kmh = 0, battery_percentage = 100, time = new Date().toISOString(), throttle = 0, gear = 0, direction = "N" } = data;

    const bgClass = clsx({
        "bg-green-600": throttle <= 0.5,
        "bg-orange-600": throttle > 0.5 && throttle <= 0.8,
        "bg-red-600": throttle > 0.8,
    });

    return (
        <SafeAreaView>
            <View className={`${bgClass} w-full h-full p-12`}>
                <Header time={formatTimeTo12Hour(time)} />
                <View className="flex-row w-full mt-8">
                    <View className="flex-[1] justify-center items-center mt-5">
                        <GearIndicator gear={gear} />
                    </View>
                    <View className="flex-[4] justify-center items-center">
                        <SpeedoMeter speed={speed_kmh} battery={battery_percentage} />
                    </View>
                    <View className="flex-[1] justify-center items-center mt-5">
                        <Compass direction={direction} />
                    </View>
                </View>
                <Pressable
                    className={
                        "px-10 py-5 rounded-lg overflow-hidden flex-row gap-8 items-center justify-center self-center"
                    }
                    onPress={() => {
                        console.log("Navigating to EV Stations...");
                        router.push("/map");
                    }}
                >
                    <BlurView
                        intensity={80}
                        tint="dark"
                        className="absolute top-0 left-0 right-0 bottom-0 rounded-lg"
                    />
                    <Image source={Icons.GOOGLE_MAP} style={{ width: 50, height: 50 }} />
                    <Text className={"text-2xl text-white font-psemibold"}>EV Stations</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default App;
