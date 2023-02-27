import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import GoalList from "./components/GoalList";

export default function App() {
  const [goalInputVisible, setGoalInputVisible] = useState(false);
  const [enteredGoalList, setEnteredGoalList] = useState([]);

  function showGoalInputHandler() {
    setGoalInputVisible(true);
  }

  function hideGoalInputHandler() {
    setGoalInputVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setEnteredGoalList((goalList) => [
      ...goalList,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    hideGoalInputHandler();
  }

  function deleteGoalHandler(id) {
    setEnteredGoalList((goalList) => goalList.filter((goal) => goal.id !== id));
  }

  return (
    <View style={styles.appContainer}>
      <Button title="Add New Goal" onPress={showGoalInputHandler} />
      <GoalInput
        visible={goalInputVisible}
        onAddGoal={addGoalHandler}
        onCancel={hideGoalInputHandler}
      />
      <GoalList items={enteredGoalList} onDeleteItem={deleteGoalHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
});
