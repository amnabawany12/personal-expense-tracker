
const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalCount = document.getElementById("total-count");
const totalAmount = document.getElementById("total-amount");
const emptyMessage = document.getElementById("empty-message");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function displayExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach(function(expense) {
        const row = document.createElement("tr");

        [expense.title, "Rs. " + Number(expense.amount).toFixed(2),
         expense.category, expense.date].forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });

            saveExpenses();
            displayExpenses();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        expenseList.appendChild(row);
    });

    totalCount.textContent = expenses.length;

    const total = expenses.reduce(function(sum, expense) {
        return sum + Number(expense.amount);
    }, 0);

    totalAmount.textContent = "Rs. " + total.toFixed(2);
    emptyMessage.style.display = expenses.length ? "none" : "block";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const expense = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        title: document.getElementById("title").value.trim(),
        amount: Number(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        date: document.getElementById("date").value
    };

    if (!expense.title || !expense.category || !expense.date ||
        !Number.isFinite(expense.amount) || expense.amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push(expense);
    saveExpenses();
    displayExpenses();
    form.reset();
});

displayExpenses();
