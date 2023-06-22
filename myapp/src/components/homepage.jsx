import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import Card, { MemoCard } from "./card";
import SearchContext from "../searchContext";
import './homepage.css';


function HomePage(){
    const {search}=useContext(SearchContext);
    console.log(search);
    const [arr,setArr]=useState([]);
    const [wholearr,setWholeArr]=useState([]);
    const [searchStr,setSearchStr]=useState("");

    const pageArr=[];
    let i=0;
    
    
    const [page,setPage]=useState(1);

    const getData= async()=>{
        await fetch("https://jsonplaceholder.typicode.com/posts",{
            method:"GET",
        })
        .then((res)=> res.json())
        .then((data)=>{
            setWholeArr(data);
            const end=page;
            const start=page;
            const newData=data.slice(start,end);
            setArr(newData);
        });
    };
    const handlePage=(el) =>{
        setPage(el);
      };
    useEffect(()=>{
        getData();
    },[page]);

    


     return (
        <div >
        <MemoCard image =""
          title = "CALENDAR" desc = "" />
            <Navbar/>
        {pageArr.map((el)=>{
          return <button onClick={() =>handlePage(el)}>{el}</button>;
        })}
        </div>
      );
}
export default HomePage;