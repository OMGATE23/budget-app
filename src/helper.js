export function fetchData(key){
    return localStorage.getItem(key)
}

export function createNewBudget({name , amount}){
    const newItem = {
        id : crypto.randomUUID(),
        name : name,
        createdAt : Date.now(),
        amount : +amount,
        color : generateRandomColor()
    }

    const existingBudgets = JSON.parse(fetchData('budgets')) ?? [];
    return localStorage.setItem("budgets",
    JSON.stringify([...existingBudgets, newItem]))
}

export function createNewExpense({name , amount , budgetId}){
    const newItem = {
        id : crypto.randomUUID(),
        name : name,
        createdAt : Date.now(),
        amount : +amount,
        budgetId
    }

    const existingExpenses = JSON.parse(fetchData('expenses')) ?? [];
    return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

function generateRandomColor(){
    let existingBudgetLength = JSON.parse(fetchData('budgets'))?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

export const deleteItem = ({ key, id }) => {
    let existingData = fetchData(key);

    if(key === 'userName'){
        existingData = localStorage.getItem(key)
    } else {
        existingData = JSON.parse(localStorage.getItem(key))
    }
    if (id) {
      const newData = existingData.filter((item) => item.id !== id);
      return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
  };

export const calculateSpentByBudget = (budgetId) => {
    const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
      
      if (expense.budgetId !== budgetId) return acc;
  
      
      return (acc += expense.amount);
    }, 0);
    return budgetSpent;
  };

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();


export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};


export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const getAllMatchingItems = ({ category, key, value }) => {
    const data = JSON.parse(localStorage.getItem(category)) ?? [];
    console.log(data)
    return data.filter((item) => item[key] === value);
  };