import React from "react";

function Donut ({name, description, price}){

    return(

        <div className="donut">
        
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
        
        </div>

    );
}

export default Donut;