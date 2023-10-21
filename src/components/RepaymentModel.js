import React,{useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Graph from "./Graph";
import "./RepaymentModel.css";


function RepaymentModel() {

  const totalAmount = useSelector((store) => store.account.totalAmount);
  const [payment, setPayment] = useState("")
  const [totalPayment, setTotalPayment] = useState([totalAmount/12]);


  const handlePayments=()=>{
      totalPayment.push(payment);
      setTotalPayment([...totalPayment])
      setNewMonthlyPayment("")
      setBalanceAmount(totalAmount-sumArrayValues(totalPayment))  
  }

  const updateBalance=(e)=>{
      setNewMonthlyPayment(e.target.value)
      setPayment(e.target.value)
      sumArrayValues(totalPayment)
  }


  function sumArrayValues(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += parseInt(arr[i]) ;
    }
    if(sum<=totalAmount ){
      return sum;
    }else{
      alert("Payment Value Exceeded")
    }
   
  }


// const [total, settotal] = useState(0)

 const [balanceAmount, setBalanceAmount] = useState('')
  // settotal(totalAmount)

const [monthlyPayment, setMonthlyPayment] = useState(0)
const [NewMonthlyPayment, setNewMonthlyPayment] = useState()

useEffect(() => {
  setMonthlyPayment(Math.floor(totalAmount/12))
  setBalanceAmount(totalAmount)
  setNewMonthlyPayment(monthlyPayment)

}, [totalAmount])

useEffect(() => {
  
  setNewMonthlyPayment(monthlyPayment)}, [monthlyPayment])

  return (
    <div className="RepaymentModel">
      <div >
        <div>
          <h1>
            Monthly amount: <span>{Math.floor(totalAmount/12)}</span>{" "}
          </h1>
        </div>
        <div>
          <h1>

            Balance amount: <span>{balanceAmount}</span>{" "}
          </h1>
        </div>
      </div>
      <label>Enter Amount</label>
      <div>
      <input value={NewMonthlyPayment} onChange={updateBalance}  className="payment"/>
      <button  onClick={handlePayments}>Enter Amount</button>
      </div>
      <Graph />
    </div>
  );
}

export default RepaymentModel;
