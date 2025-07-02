import { View, Text, StyleSheet } from "react-native";

export default function AlertCard({description, type}) {
    return (
        <View>
            <Text>This is a sample of an alert card</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        height: 50,
    }
})