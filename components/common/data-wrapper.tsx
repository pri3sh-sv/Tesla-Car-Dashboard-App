import {View, Text} from "react-native";
import LottieView from "lottie-react-native";

interface Props {
    isEmpty: boolean
    text: String
}

/**
 * A functional component that wraps and displays a "No Data" view when the `isEmpty` prop is true.
 * The component renders an animation and text message to indicate a lack of data.
 *
 * @param {Object} Props - The props used to configure the DataWrapper component.
 * @param {boolean} Props.isEmpty - A flag indicating whether the data is empty. If true, the "No Data" view is displayed.
 * @param {string} Props.text - The text message displayed in the "No Data" view.
 * @returns {JSX.Element|null} Returns a JSX element to render the "No Data" view if `isEmpty` is true, otherwise null.
 */
const DataWrapper = ({isEmpty, text}: Props) => {
    if (isEmpty) {
        return (
            <View className={"justify-center gap-6 items-center bg-gray-800 w-full h-full"}>
                <LottieView
                    source={require("../../assets/lottie/no-data.json")}
                    autoPlay
                    loop
                    style={{width:240, height:240 }}/>
                <Text className={"text-3xl text-white font-psemibold"}> {text}

                </Text>
            </View>
        )
    }
}

export default DataWrapper;