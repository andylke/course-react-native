import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

function Card({ children }) {
  return <View style={styles.container}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 6,
    backgroundColor: Colors.primary800,
    //android
    elevation: 8,
    //ios
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
  },
});
