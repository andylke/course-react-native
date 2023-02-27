import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import GoalList from "./components/GoalList";

export default function App() {
  const [enteredGoalList, setEnteredGoalList] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setEnteredGoalList((goalList) => [
      ...goalList,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }

  function deleteGoalHandler(id) {
    setEnteredGoalList((goalList) => goalList.filter((goal) => goal.id !== id));
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
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
