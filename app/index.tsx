import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import {closeSocket, connectWebSocket} from "@/ws-service";
import {useTelemetryStore} from "@/store/use-telemetry-store";
import {SafeAreaView} from "react-native-safe-area-context";
import DataWrapper from "@/components/common/data-wrapper";
import data from "@/mock/telemetryData.json";
import {formatTimeTo12Hour} from "@/utils/time-converter";
import Header from "@/components/pages/dashboard-page/header";
import SpeedoMeter from "@/components/pages/dashboard-page/speedo-meter";
import GearIndicator from "@/components/pages/dashboard-page/gear";
import clsx from "clsx";
import Compass from "@/components/pages/dashboard-page/compass";


const App = () => {
    // const data = useTelemetryStore((state) => state.data);

    const [speed, setSpeed] = useState(0); // Initial speed
    const [battery, setBattery] = useState(100); // Initial battery percentage
    const [time, setTime] = useState(new Date().toISOString());
    const [throttle, setThrottle] = useState(0);


    // Simulate real-time telemetry updates using setInterval
    useEffect(() => {
        // Update speed and battery every second
        const interval = setInterval(() => {
            setSpeed((prev) => Math.max(0, Math.min(240, prev + Math.floor(Math.random() * 20 - 10)))); // Speed fluctuates between 0 and 240 km/h
            setBattery((prev) => Math.max(0, prev - Math.random() * 0.5)); // Battery drains slowly
            setTime(new Date().toISOString()); // Update the time
            setThrottle(Math.random()); // Simulate throttle value (0 to 1)
        }, 2000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        connectWebSocket()
        return () => closeSocket();
    }, []);

    const bgClass = clsx({
        "bg-green-600": throttle <= 0.5,
        "bg-orange-600": throttle > 0.5 && throttle <= 0.8,
        "bg-red-600": throttle > 0.8,
    });

    console.log(data);
    return (
        <SafeAreaView>
            {/*<DataWrapper isEmpty={!data}>*/}
                <View className={`${bgClass} w-full h-full p-12`}>
                    <Header time={formatTimeTo12Hour(data.time)}/>
                    <View className="flex-row w-full mt-8">
                        <View className="flex-[1] justify-center items-center mt-5">
                            <GearIndicator gear={-1}/>
                        </View>
                        <View className="flex-[4] justify-center items-center">
                            <SpeedoMeter speed={speed} battery={battery} />
                        </View>
                        <View className="flex-[1] justify-center items-center mt-5">
                            <Compass direction={"S"}/>
                        </View>
                    </View>
                </View>
            {/*</DataWrapper>*/}
        </SafeAreaView>
    );
};

export default App;