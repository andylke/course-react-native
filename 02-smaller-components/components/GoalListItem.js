import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GoalListItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#5e6f75" }}
        onPress={props.onDelete.bind(this, props.id)}
        style={({ pressed }) => pressed & styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 4,
    borderRadius: 4,
    backgroundColor: "#718790",
  },
  goalText: {
    color: "#2a3235",
    padding: 16,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
