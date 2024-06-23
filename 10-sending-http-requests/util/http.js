import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-b3d8e-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  await delay();
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  console.log(response.data);

  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }
  await delay();
  return expenses;
}

export async function updateExpense(id, expenseData) {
  const response = await axios.put(
    BACKEND_URL + `/expenses/${id}.json`,
    expenseData
  );
  await delay();
}

export async function deleteExpense(id) {
  const response = await axios.delete(BACKEND_URL + `/expenses/${id}.json`);
  await delay();
}

function delay(millis) {
  return new Promise((resolve) => setTimeout(resolve, 500));
}
