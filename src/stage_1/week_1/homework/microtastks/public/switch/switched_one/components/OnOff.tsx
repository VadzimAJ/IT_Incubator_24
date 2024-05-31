import React, {useState}from "react";


type PropsType = {
  
}

function OnOff (props: PropsType) {

  let [on, setOn] = useState (true);

  const onStyle = {
    width: "30px",
    height: "20px",
    border: "1px solid black",
    padding: "2px",
    backgroundColor: on ? 'green' : ''
  };
  const offStyle = {
    width: "30px",
    height: "20px",
    border: "1px solid red",
    padding: "2px",
    backgroundColor: !on ? 'red' : ''
  };
  const indicatroStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '15px',
    border: '1px solid black',
    backgroundColor: on ? 'green' : 'red'
  };

  

  return (
    <div>
      <div style={onStyle} onClick={()=>{setOn(true)}}>On</div>
      <div style={offStyle} onClick={()=>{setOn(false)}}>Off</div>
      <div style={indicatroStyle}></div>
  </div>
  )
}
export default OnOff