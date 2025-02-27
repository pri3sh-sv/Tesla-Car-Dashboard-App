import {ReactNode} from "react";
import {View, Text} from "react-native";
import LottieView from "lottie-react-native";

interface Props {
    isEmpty: boolean
    children: ReactNode
}

const DataWrapper = ({isEmpty, children}: Props) => {
    if (isEmpty) {
        return (
            <View className={"justify-center gap-6 items-center bg-gray-800 w-full h-full"}>
                <LottieView
                    source={require("../../assets/lottie/no-data.json")}
                    autoPlay
                    loop
                    style={{width:240, height:240 }}/>
                <Text className={"text-3xl text-white font-psemibold"}> No Data Available, Waiting ...

                </Text>
            </View>
        )
    }

    return <View>{children}</View>;
}

export default DataWrapper;