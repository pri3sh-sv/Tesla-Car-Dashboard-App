import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import {closeSocket, connectWebSocket} from "@/ws-service";
import {useTelemetryStore} from "@/store/use-telemetry-store";
import {SafeAreaView} from "react-native-safe-area-context";

const App = () => {
    const data = useTelemetryStore((state) => state.data);

    useEffect(() => {
        connectWebSocket()
        return () => closeSocket();
    }, []);

    return (
        <SafeAreaView>
            <View className="bg-white w-full h-full items-center justify-center">
                <Text className="text-lg text-red">Hello World!</Text>
            </View>
        </SafeAreaView>
    );
};

export default App;