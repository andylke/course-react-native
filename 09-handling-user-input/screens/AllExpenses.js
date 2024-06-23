import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);

  return (
    <View style={styles.screen}>
      <ExpensesOutput
        expensesPeriod={"Total"}
        expenses={expensesContext.expenses}
        fallbackText={"No expenses found"}
      />
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
