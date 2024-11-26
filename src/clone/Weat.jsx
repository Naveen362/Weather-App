import axios from 'axios'
import React, { useEffect, useState } from 'react'
const API_KEY = '2cf2677b837431c48086978bf6824812'; 

const Weat = () => {
let [data1,setData1]=useState([])
let [city,setCity]=useState("Delhi");
let [dummycity,setDummyCity]=useState("")
    useEffect(()=>{
     var x=axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).then((res)=>{setData1(res.data);console.log(res.data)}).catch((e)=>{console.log("err")})

    },[city])
const onefn=(e)=>{
    setDummyCity(e.target.value)
}
const submitfn=(e)=>{
e.preventDefault();
if (dummycity.trim()){
setCity(dummycity);
setDummyCity('')}
}
  return (
    <div>
      <form onSubmit={submitfn}>
       <input className="form-action" type="text" value={dummycity} onChange={onefn} placeholder="enter city name.."/>
      </form>
    </div>
  )
}

export default Weat