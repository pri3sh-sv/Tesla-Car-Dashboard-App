import {View, Text} from "react-native";
import LottieView from "lottie-react-native";

interface Props {
    isEmpty: boolean
    text: String
}

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