import { StyleSheet, FlatList, View } from "react-native";
import GoalListItem from "./GoalListItem";

export default function GoalList(props) {
  return (
    <View style={styles.goalsContainer}>
      <FlatList
        data={props.goals}
        renderItem={(itemData) => {
          return (
            <GoalListItem
              id={itemData.item.id}
              text={itemData.item.text}
              onDelete={props.onDeleteGoal}
            />
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 5,
  },
});
