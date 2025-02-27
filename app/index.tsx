import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import {closeSocket, connectWebSocket} from "@/ws-service";
import {useTelemetryStore} from "@/store/use-telemetry-store";
import {SafeAreaView} from "react-native-safe-area-context";
import DataWrapper from "@/components/common/data-wrapper";
import data from "@/mock/telemetryData.json";
import {formatTimeTo12Hour} from "@/utils/time-converter";
import {Feather} from "@expo/vector-icons";
import {BlurView} from "expo-blur";
import Header from "@/components/pages/dashboard-page/header";

const App = () => {
    // const data = useTelemetryStore((state) => state.data);

    useEffect(() => {
        connectWebSocket()
        return () => closeSocket();
    }, []);

    console.log(data);
    return (
        <SafeAreaView>
            {/*<DataWrapper isEmpty={!data}>*/}
                <View className="bg-gray-950 w-full h-full p-12">
                    <Header time={formatTimeTo12Hour(data.time)}/>
                </View>
            {/*</DataWrapper>*/}
        </SafeAreaView>
    );
};

export default App;