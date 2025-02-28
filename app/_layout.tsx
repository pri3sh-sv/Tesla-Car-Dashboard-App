import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import "@/global.css"
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";

// Extracted constant for font mapping
const FONT_MAP = {
    "SpaceMono": require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
};

// Extracted function for effect logic
function handleFontsLoaded(error: Error | null, fontsLoaded: boolean): void {
    if (error) throw error;
    if (fontsLoaded) {
        SplashScreen.hideAsync();
    }
}

/**
 * Initializes the root layout of the application, ensuring that fonts are loaded before rendering the layout.
 * Side effects are handled using useEffect, checking the status of font loading.
 *
 * @return The root layout of the application, including navigation stack and status bar.
 */
export default function RootLayout() {
    const [fontsLoaded, error] = useFonts(FONT_MAP);

    // useEffect handles side effects here
    useEffect(() => {
        handleFontsLoaded(error, fontsLoaded);
    }, [fontsLoaded, error]);

    // Early exit if fonts aren't loaded
    if (!fontsLoaded) {
        return null;
    }

    // Render the layout
    return (
        <>
            <GluestackUIProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="dark" />
            </GluestackUIProvider>
        </>
    );
}