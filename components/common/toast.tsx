import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import { useToast } from "@/components/ui/toast";

interface ToastProps {
    title?: string;
    description: string;
    type?: "info" | "error" | "success";
}

const ToastComponent = () => {
    const toast = useToast();
    const [toastId, setToastId] = useState<number | null>(null);

    const showToast = ({ title, description, type = "info" }: ToastProps) => {
        const newId = Math.random();
        setToastId(newId);

        toast.show({
            id: newId.toString(),
            placement: "top",
            duration: 4000,
            render: ({ id }) => {
                const { icon, color, bgColor } = getToastStyle(type);

                return (
                    <SafeAreaView>
                        <View
                            nativeID={`toast-${id}`}
                            className={clsx(
                                "flex-row rounded-2xl items-center px-8 py-4 border-transparent gap-4",
                                bgColor
                            )}
                        >
                            {/* Icon */}
                            <Feather name={icon} size={30} color={color} />
                            <Text className="text-[24px] text-gray-800">{description}</Text>
                        </View>
                    </SafeAreaView>
                );
            },
        });
    };

    return { showToast };
};

const getToastStyle = (type: "info" | "error" | "success") => {
    switch (type) {
        case "info":
            return { icon: "info", color: "#2563EB", bgColor: "bg-blue-50" };
        case "error":
            return { icon: "alert-triangle", color: "#B91C1C", bgColor: "bg-red-50" };
        case "success":
            return { icon: "check-circle", color: "#047857", bgColor: "bg-green-50" };
        default:
            return { icon: "info", color: "#F59E0B", bgColor: "bg-orange-50" };
    }
};

export default ToastComponent;