import React from "react";
import classes from './Burger.css';
import BurgerIngrediant from "./BurgerIngrediant";
const Burger =(props) =>{
    let transformedIngrediants = Object.keys(props.ingrediants) 
    .map(igKey=>{
        return [...Array(props.ingrediants[igKey])].map((_,i )=>{
           return( <BurgerIngrediant key={igKey + i} type={igKey}/>
    );}); //
    } ).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if (transformedIngrediants.length === 0){
        transformedIngrediants= <p>Please start Adding ingredients</p>;
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngrediant type="BreadTop"/>
            {transformedIngrediants}           
            <BurgerIngrediant type="BreadBottom"/>
        </div>  
    );
};
export default Burger;
