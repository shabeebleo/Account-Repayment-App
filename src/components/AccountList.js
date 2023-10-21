import React, { useState, useEffect } from "react";
import "./AccountList.css";
import { useSelector, useDispatch } from "react-redux";
import { addAccount, addTotalAmount } from "../redux/accountSlice";

function AccountList() {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState("");
  const accounts = useSelector((store) => store.account.accounts);
  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(balance, "e.target.valuee.target.value");
    dispatch(
      addAccount({ count: accounts?.length + 1, balance: parseInt(balance) })
    );
    setBalance("");
  };

  const key = "balance";
  
  function sumArrayValues(array, key) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i][key] !== undefined) {
        sum += array[i][key];
      }
    }
    console.log(sum, "sumsum");
    return sum;
  }

  useEffect(() => {
    console.log(accounts, "accountsaccounts");
    setTotal(sumArrayValues(accounts, key));
  }, [accounts]);


  useEffect(() => {
    dispatch(addTotalAmount(total));
  }, [total]);
  return (
    <div className="accountList">
      <h2>Add an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="li">      
        </div>
        <div>
          <label className="label">
            Balance:
            <input
              type="number"
              value={balance}
              onChange={handleBalanceChange}
              required
            />
          </label>
        </div>
        <button className="button" type="submit">
          Add Account
        </button>
      </form>
      {accounts.map((x) => {        
        return (
          <>
            <h2>
              Account:&nbsp;{x.count} &nbsp;
              <span>balance:&nbsp;{x.balance}</span>
            </h2>
          </>
        );
      })}
      <div>
        <h1>
          Total amount: <span>{total}</span>{" "}
        </h1>
      </div>
    </div>
  );
}

export default AccountList;
