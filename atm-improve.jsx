const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0); // state of this transaction
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);

  const [validTransaction, setValidTransaction] = React.useState(false);
  const [butMode, setButMode] = React.useState(" ")

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);

    if(Number(event.target.value) <= 0){
      return setValidTransaction(false)}
      if(butMode === "Cash Back" && Number(event.target.value) > totalState){
       setValidTransaction(false)
      }else{
        setValidTransaction(true);
      }
    setDeposit(Number(event.target.value));
   // setButtonMode(event.target.value)
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    console.log(newTotal)
    setTotalState(newTotal);
   setValidTransaction(false)
    event.preventDefault();
  };

  const handleButton = (event) => {
    console.log(event.target.value)
       setButMode(event.target.value)
          if(event.target.value === "Cash Back "){
            setIsDeposit(true)
            }else{
             setIsDeposit(false)
              }
            setValidTransaction(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      
      <select onChange={(e) => handleButton(e)} name="mode" id="mode-select">
    <option id="deposit-selection" value="Deposit">Deposit</option>
     <option id="cashback-selection" value="Cash Back">Cash Back</option>
     </select>
   

    <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
