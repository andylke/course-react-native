import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Colors from "../../constants/Colors";

function NumberContainer({ children }) {
  const { width, height } = useWindowDimensions();

  const paddingDistance = width < 300 || width > height ? 12 : 24;
  const marginDistance = width < 300 || width > height ? 12 : 24;

  return (
    <View
      style={[
        styles.container,
        { padding: paddingDistance, margin: marginDistance },
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.accent500,
    borderWidth: 4,
    borderRadius: 8,
    //    padding: deviceWidth < 380 ? 12 : 24,
    //    margin: deviceWidth < 380 ? 12 : 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: deviceWidth < 380 ? 28 : 36,
    textAlign: "center",
    color: Colors.accent500,
  },
});
