import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 32,
    borderColor: Colors.primary900,
    borderWidth: 2,
    borderRadius: 8,
    color: Colors.primary900,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
