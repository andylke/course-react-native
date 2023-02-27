import { StyleSheet, Text, View } from "react-native";

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{props.itemText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 4,
    backgroundColor: "gray",
  },
  goalText: {
    color: "white",
  },
});

export default GoalItem;
