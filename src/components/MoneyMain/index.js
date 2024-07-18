import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TxnItem  from '../TxnItem'

// ... (potential imports for styling or other components)

const optionsList = [
  { optionId: 'INCOME', displayText: 'Income' },
  { optionId: 'EXPENSE', displayText: 'Expense' },
];

function MoneyMain() { //okay use effect gurinhi tarwata chudu bro primary goal is to show money balence and on delet function
    // so first truy to show the balence then will do delete button so copy this to that 
    const [titleInput, setTitleInput] = useState('');  // Initialize with empty string
  const [amountInput, setAmountInput] = useState(''); // Initialize with empty string
  const [selectedOptionId, setSelectedOptionId] = useState(optionsList[0].optionId);
  const [transactionList, setTransactionList] = useState([]);

  // useEffect to ensure consistent initial state
  useEffect(() => {
    setTitleInput('');
    setAmountInput('');
    setSelectedOptionId(optionsList[0].optionId);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmountInput(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOptionId(event.target.value);
  };

  const handleAddTransaction = (event) => {
    event.preventDefault();

    const newTransaction = {
      id: uuidv4(),
      transactionName:titleInput, 
      amount:parseInt(amountInput),  
      optionIdFromUser: selectedOptionId,
    };

    setTransactionList(prevList => [...prevList, newTransaction]);

    // Reset input fields (optional)
    setTitleInput('');
    setAmountInput('');
  };
  const getBalance = () => {
    let mainBalance = 0;
    let income = 0;
    let expense = 0;

    transactionList.forEach((eachTransaction) => {
        if (eachTransaction.optionIdFromUser ==='INCOME') {
            income += eachTransaction.amount;
        } else if (eachTransaction.optionIdFromUser === 'EXPENSE') {
            expense += eachTransaction.amount;
        }
    });

    mainBalance = income - expense;
    return mainBalance;
};

const getIncome = () => {
    let income = 0;

    transactionList.forEach((eachTransaction) => {
        if (eachTransaction.optionIdFromUser === 'INCOME') {
            income += eachTransaction.amount;
        }
    });

    return income;
};

const getExpense = () => {
    let expense = 0;

    transactionList.forEach((eachTransaction) => {
        if (eachTransaction.optionIdFromUser === 'EXPENSE') {
            expense += eachTransaction.amount;
        }
    });

    return expense;
};

const deleteFromMain = (id) => {
    setTransactionList(prevList => prevList.filter(xTransaction => xTransaction.id !== id))
}


return (
    <>
        <h1>Balance heading</h1>
        <p>Balance: {getBalance()}</p>
        <p>Income: {getIncome()}</p>
        <p>Expense: {getExpense()}</p>
    
      <form onSubmit={handleAddTransaction}>
        <input type="text" value={titleInput} onChange={handleTitleChange} />
        <input type="text" value={amountInput} onChange={handleAmountChange} />

        <select value={selectedOptionId} onChange={handleOptionChange}>
          {optionsList.map(option => (
            <option key={option.optionId} value={option.optionId} >
              {option.displayText}
            </option>
          ))}
        </select>

        <button type="submit">Add Transaction</button>
      </form>

      <table>
        <tbody>
          <tr>
            <th>Unique ID</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
          {transactionList.map(transaction => (
            <TxnItem key={transaction.id} Txn={transaction} deleteitem={deleteFromMain}/>
          ))}
        </tbody>
      </table>
    </>
  );
}


export default MoneyMain;
