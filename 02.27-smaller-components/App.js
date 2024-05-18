import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalList from "./components/GoalList";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...courseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(goalId) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== goalId);
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appContainer}>
        <View style={styles.button}>
          <Button
            title="Add New Goal"
            color="#6b95de"
            onPress={startAddGoalHandler}
          />
        </View>
        <GoalInput
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
          visible={modalIsVisible}
        />
        <GoalList goals={courseGoals} onDeleteGoal={deleteGoalHandler} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  button: {
    margin: 4,
  },
});
