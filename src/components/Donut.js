import React from "react";
import Styles from './Home.module.css';

function Donut ({name, description, price}){

    return(

        <div className={Styles.donutItem}>
            <div className={Styles.donutName}>{name}</div>
            <div className={Styles.donutDescription}>{description}</div>
            <div className={Styles.donutPrice}>${price}</div>
        </div>

    );
}

export default Donut;