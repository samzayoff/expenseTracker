let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const addButton = document.getElementById('add-expense');
const expensesTableBody = document.getElementById('expense-table-body'); // Fixed ID
const totalAmountCell = document.getElementById('total-amount');

// Load expenses from localStorage if available
function loadExpenses() { 
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmountCell.textContent = totalAmount.toFixed(2);
        renderExpenses();
    }
}

// Render all expenses in the table
function renderExpenses() {
    expensesTableBody.innerHTML = ''; // Clear the table first
    
    expenses.forEach((expense, index) => {
        const newRow = expensesTableBody.insertRow();
        
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        
        deleteBtn.addEventListener('click', function() {
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount.toFixed(2);
            
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses(); // Re-render the table
        });
        
        categoryCell.textContent = expense.category;
        categoryCell.classList.add('category-cell');
        
        amountCell.textContent = expense.amount.toFixed(2);

        amountCell.classList.add('amount-cell');
        
        dateCell.textContent = expense.date;
        dateCell.classList.add('date-cell');
        
        deleteCell.appendChild(deleteBtn);
        deleteCell.classList.add('action-cell');
    });
}

addButton.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert("Please select a category!");
        return;
    }

    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a correct number!");
        return;
    }

    if (date === '') {
        alert("Enter date!");
        return;
    }

    expenses.push({category, amount, date});
    totalAmount += amount;
    totalAmountCell.textContent =totalAmount.toFixed(2);
    
    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Clear inputs
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
    
    // Re-render the table
    renderExpenses();
});

// Initialize the app
loadExpenses();