import { StyleSheet, Text, View } from "react-native";

function UserScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>
        This is a <Text style={styles.highlight}>User</Text> screen
      </Text>
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#eb1064",
  },
});
