import React, { useEffect, useState } from 'react';
import axios from "axios"


export default function Breadcrump(){

    const [crumps,setCrumps] = useState(["root","home","myname","projects","mysupersecretproject"]);
    const [selectedPathIndex,setSelectedPathIndex] = useState(4);
    const [content,setContent] = useState([]);

    useEffect(()=>{
         selectPath(false,"mysupersecretproject")
    },[])

    const selectPath = async (isChildClicked,crump)=>{

            var requestedPath = [];

            if(isChildClicked){

                    const crumpsClone = [...crumps]
                    crumpsClone.push(crump);
                    requestedPath = crumpsClone;

                    setCrumps((prev)=>([...prev,crump]))
                    

            }else{
              

              const index = crumps.findIndex((item)=>item == crump);  

              for (let i = 0; i < index+1; i++) {
                    requestedPath.push(crumps[i])
               }
       
               setCrumps(requestedPath);
            }

            setSelectedPathIndex(crump);

         
            try {
    
               const {data} = await axios.get(`http://localhost:3001/${requestedPath}`)
               
               setContent(data.data);
    
            } catch (error){
                console.log(error)
            }

       
    }
    
    return(
        <div>
            <ul className="crumpHolderUl">
                {crumps.map((crump,index)=>{
                    return <li key={index} onClick={()=>selectPath(false,crump)} style={{color:selectedPathIndex == crump ? "grey" : "red"}}>{crump} {index == crumps.length-1 ? "" : <span style={{color:"black",paddingLeft:"10px"}}>{">"}</span>}</li>
                })}
            </ul>
            <div style={{paddingLeft:"50px"}}>
                <h2>Content</h2>
                {typeof content == "object" ? content.map((contentItem,index)=>{
                    return (<div key={index} style={{cursor:"pointer"}} onClick={()=>selectPath(true,contentItem)}><span style={{textDecoration:"underline"}}>{contentItem}</span></div>)
                }) : `THIS IS FILE : ${content}`}
            </div>
        </div>
    )

}