import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.accent500,
    borderWidth: 4,
    borderRadius: 8,
    margin: 24,
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 32,
    textAlign: "center",
    color: Colors.accent500,
  },
});
