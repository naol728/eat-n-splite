import './App.css';
import {useState} from 'react'

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [show,setShow]=useState(false)
  const [frends,setFrends]=useState([])
  const [selectedfrend,setSelectedfrend]=useState(null)
  function handleShow(){
  setShow(show=> !show)
  }
function  handlenewfrend(friend){
setFrends((frends)=>[...frends,friend])
}
function handleselectedfriend(frends){
  setSelectedfrend((cur) =>cur?.id===frends.id  ? null:frends)
  setShow(false)
}
function handlebill(value){
 console.log(value)
 setFrends((frends)=>frends.map(((frend)=>frend.id===selectedfrend.id ? {...frend,balance:frend.balance + value}:frend )))
 setSelectedfrend(null)
}
  return (<div className="app">
      <div className="sidebar">
        <Frendlist frends={frends} onSelection={handleselectedfriend} selectedfrend={selectedfrend}/>
       {show && <Formaddfrend onaddnewfrend={handlenewfrend}/>}
        <Button onClick={handleShow}>{show ? "close":"Add friend"}</Button>
      </div>

     {selectedfrend && <Formsplitbill selectedfrend={selectedfrend} onsplitebill={handlebill}/>}
  </div> 
  );
}
function Frendlist({onSelection,selectedfrend,frends}){
  const frend=initialFriends

  return ( <ul>
   {
    frends.map((frend)=> <Frend frends={frend} key={frend.id} onSelection={onSelection} selectedfrend={selectedfrend}/>
  )
   }
  </ul>

  )
}
function Frend({frends,onSelection,selectedfrend}){
  const isselected=selectedfrend?.id===frends.id;
return <li className={ isselected ? 'selected':''}>
  <img src={frends.img} alt={frends.name}></img>
  <h2> {frends.name}</h2>
  { frends.balance <0 && (
      <p className="red">
        you ows {frends.name}  ${Math.abs(frends.balance)}
      </p>
    )}
    {frends.balance >0 && (
      <p className="green">
         {frends.name} owes you ${frends.balance}
      </p>
    )}
  
     { frends.balance ===0 && (
      <p >
        you and {frends.name} are even 
      </p>
    )}
    <Button onClick={()=>onSelection(frends)} >{isselected ? 'close':'select'}</Button>
  
 </li>
}
function Button({children,onClick}){
  return <button className="button" onClick={onClick}>
    {children}
  </button>
}
function Formaddfrend ({onaddnewfrend}){
  const [name,setName]=useState("")
  const [image,setImage]=useState("https://i.pravatar.cc/48")
  function handleaddfriend(e){
    if(!name || !image) return;
    e.preventDefault();
    const id=crypto.randomUUID();
    const newfrend={
      name,
      image:`${image}?=${id}`,
      balance:0,
      id,
    };
    onaddnewfrend(newfrend)
    setName("")
   setImage("https://i.pravatar.cc/48")
  }

  return <form className="form-add-friend" onSubmit={handleaddfriend}>
    <label> 🧑‍🤝‍🧑frend name</label>
    <input type="text" value={name} onChange={e=>setName(e.target.value)}/>

    <label>🏞️image url</label>
    <input type="text" value={image} onChange={e=>setImage(e.target.value)}/>

    <Button >Add</Button>
  </form>
}
function Formsplitbill({selectedfrend,onsplitebill}){
  const [bill,setbill]=useState("")
  const [paidbyuser,setpaidbyuser]=useState("")
  const paidbyfirend=bill ? bill-paidbyuser :"";
  const [whoispaying,setwhoispaying]=useState("user")
  function handlesplitebill(e){
    e.preventDefault();
    onsplitebill(whoispaying==="user" ? paidbyfirend: -paidbyuser)
  }
  return <form className="form-split-bill" onSubmit={handlesplitebill}>
    <h2>split a bill with {selectedfrend.name}</h2>
    <label>💰bill value</label>
    <input type="number" value={bill} onChange={(e)=>setbill(Number(e.target.value))}/>

    <label>🧑your expenses</label>
    <input type="number" value={paidbyuser} onChange={(e)=>setpaidbyuser(Number(e.target.value) >bill ? paidbyuser: Number(e.target.value))}/>

    <label> {selectedfrend.name}s expenses</label>
    <input type="text" disabled value={paidbyfirend}/>
   <label>🤑 who is paying the bill?</label>
    <select value={whoispaying} onChange={(e)=>setwhoispaying(e.target.value)}>
      <option value="friend">you</option>
      <option value="user">{selectedfrend.name}</option>
    </select>
  <Button>split bill</Button>
  </form>
}

export default App;
