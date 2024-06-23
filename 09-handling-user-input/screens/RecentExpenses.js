import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <View style={styles.screen}>
      <ExpensesOutput
        expensesPeriod={"Last 7 Days"}
        expenses={recentExpenses}
        fallbackText={"No expenses for the last 7 days"}
      />
    </View>
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
