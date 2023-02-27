import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import GoalitemList from "./components/GoalItemList";

export default function App() {
  const [enteredGoalList, setEnteredGoalList] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setEnteredGoalList((goalList) => [
      ...goalList,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <GoalitemList itemList={enteredGoalList} />
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
