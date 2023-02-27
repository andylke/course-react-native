import { FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./GoalItem";

function GoalList(props) {
  function onDeleteItem(id) {
    props.onDeleteItem(id);
  }
  return (
    <View style={styles.goalsContainer}>
      <FlatList
        data={props.items}
        alwaysBounceVertical={false}
        renderItem={(itemData) => {
          return (
            <GoalItem
              itemId={itemData.item.id}
              itemText={itemData.item.text}
              onDeleteItem={onDeleteItem}
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

export default GoalList;
