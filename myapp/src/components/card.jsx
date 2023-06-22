import React from "react";
import { useMemo } from "react";

export const MemoCard = React.memo(({title}) => {
    return(
        <div>
            
            <h1>{title}</h1>
           
        </div>
    );
});

const Card = ({postid,Id,email,body,title}) => {
    const myComponent = useMemo(() => {

    },[postid,Id,email,body,title])
    
};


export default Card;