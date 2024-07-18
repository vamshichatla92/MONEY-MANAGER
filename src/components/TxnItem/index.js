function TxnItem({ Txn,deleteitem}) {
    const {id,transactionName,amount,optionIdFromUSer } = Txn; 

    const deleteTrasaction = () => {
        deleteitem(id)
    } 

    return ( 
      <tr>
        <td>{id}</td>
        <td>{transactionName}</td>
        <td>{amount}</td>
        <td>{optionIdFromUSer}</td>
        <td><button onClick={deleteTrasaction}>Delete Transaction</button></td>
      </tr>
    );
  }
  

  export default TxnItem