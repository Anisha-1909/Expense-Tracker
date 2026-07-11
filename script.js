//get all elements
const dateInput = document.getElementById("dateInput");
const amountInput = document.getElementById("amountInput");
const typeInput = document.getElementById("typeInput");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const balanceEl = document.getElementById("balance");

//load the saved transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

//add transaction
addBtn.addEventListener("click", () => {
  const date = dateInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (!date || !amount || !type) {
    alert("Please fill all fields");
    return;
  }

  const transaction = {
    id: Date.now(),
    date,
    amount,
    type,
  };

  transactions.push(transaction);
  saveAndRender();

  //reset the form
  dateInput.value = "";
  amountInput.value = "";
  typeInput.value = "";
});

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  updateSummary();
}

function renderTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach((t) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>₹ ${t.amount}</td>
      <td>${t.type}</td>
      <td>${formatDate(t.date)}</td>
      <td><button class="delete-btn" onclick="deleteTransaction(${t.id})">🗑️</button></td>
    `;
    transactionList.appendChild(row);
  });
}

function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "Income") {
      income += t.amount;
    } else if (t.type === "Expense") {
      expense += t.amount;
    }
  });

  totalIncomeEl.textContent = income;
  totalExpenseEl.textContent = expense;
  balanceEl.textContent = income - expense;
}

function formatDate(dateStr) {
  //formating date (dd-mm-yyyy)
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

//initial render
renderTransactions();
updateSummary();
