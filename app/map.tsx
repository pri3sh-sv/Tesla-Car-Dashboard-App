import {View, Text, ActivityIndicator, Pressable} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Feather} from "@expo/vector-icons";
import {BlurView} from "expo-blur";
import React, {useEffect, useState} from "react";
import {useLocationStore} from "@/store/use-location-store";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {API_KEY} from "@/config";
import {router} from "expo-router";

/**
 * The `MapPage` component renders a map view displaying the user's current location and nearby EV charging stations.
 *
 * Functionality:
 * - Requests the user's permission to access their current location.
 * - Fetches the user's current geolocation coordinates and sets these as the initial region in the map view.
 * - Loads a list of nearby EV charging stations within a 10 km radius using the Google Places API.
 * - Displays markers on the map for the user's location and each EV charging station, with relevant details.
 *
 * Features:
 * - Displays a loading indicator while fetching location data.
 * - Provides a navigation button to return to the dashboard.
 * - Dynamically maps the fetched EV station data to markers on the map.
 *
 * Notes:
 * - Requires location permissions to function effectively.
 * - Uses the Google Maps API to fetch nearby EV station data. Make sure to configure the API key correctly.
 * - The user's location and fetched EV station data are managed via React state.
 */
const MapPage = () => {
    const { location, setLocation } = useLocationStore();
    const [evStations, setEvStations] = useState<{ lat: number; lng: number, name: string, star: string, description: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.error("Location permission denied");
                    setLoading(false);
                    return;
                }

                let loc = await Location.getCurrentPositionAsync({});
                setLocation(loc.coords.latitude, loc.coords.longitude);
                // setLocation(13.0307615, 80.2178327)
                console.log("my location set",loc.coords.latitude, loc.coords.longitude);
                await fetchNearbyEVStations(loc.coords.latitude, loc.coords.longitude);
                // await fetchNearbyEVStations(13.0307615, 80.2178328)
            } catch (error) {
                console.error("Error fetching location:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    /**
     * Fetches a list of nearby EV (Electric Vehicle) charging stations based on the provided latitude and longitude.
     * Utilizes the Google Places API to retrieve station details within a set radius.
     * The retrieved data, including location coordinates, name, rating, and description, is processed and stored.
     * Handles any errors that may occur during the API fetch operation.
     *
     * @param {number} lat - The latitude of the user's current location.
     * @param {number} lng - The longitude of the user's current location.
     * @returns {Promise<void>} A promise that resolves once the nearby EV stations data has been fetched and stored.
     */
    const fetchNearbyEVStations = async (lat: number, lng: number) => {
        const apiKey = API_KEY;
        const radius = 10000; //in metres
        const type = "ev charging station";

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
                setEvStations(
                    data.results.map((place: any) => ({
                        lat: place.geometry.location.lat,
                        lng: place.geometry.location.lng,
                        name: place.name,
                        star: place.rating,
                        description: place.vicinity
                    }))
                );
            }
        } catch (error) {
            console.error("Error fetching EV stations:", error);
        }
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <Pressable className={"w-full h-[10%] p-4 flex-row items-center gap-4 absolute mt-safe"} style={{zIndex:10}} onPress={() => router.back()}>
                    <BlurView intensity={80} tint="dark" className="absolute top-0 left-0 right-0 bottom-0" style={{ backgroundColor: "rgba(255,255,255,0.8)" }} />
                    <Feather name="chevron-left" size={24} color="white" />
                    <Text className={"text-white text-xl font-semibold"}>
                        Dashboard
                    </Text>
                </Pressable>

                {loading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="blue" />
                        <Text className="text-gray-500 mt-2">Fetching location...</Text>
                    </View>
                ) : (
                    location && (
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                                title="You are here"
                                pinColor="red"
                            />

                            {evStations.map((station, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: station.lat, longitude: station.lng }}
                                    pinColor={"#4b96f3"}
                                    title={station.name + "  " + station.star+"⭐"}
                                    description={station.description}
                                />
                            ))}
                        </MapView>
                    )
                )}
            </SafeAreaView>
        </>
    )
}

export default MapPage;