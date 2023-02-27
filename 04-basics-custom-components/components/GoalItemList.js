import { FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./GoalItem";

function GoalitemList(props) {
  return (
    <View style={styles.goalsContainer}>
      <FlatList
        data={props.itemList}
        alwaysBounceVertical={false}
        renderItem={(itemData) => {
          return <GoalItem itemText={itemData.item.text} />;
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

export default GoalitemList;
