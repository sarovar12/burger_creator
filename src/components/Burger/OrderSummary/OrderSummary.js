import React from "react";
import Aux from "../../../hoc/Auxi";
import Button from "../../UI/Button/Button";
const OrderSummary = ( props )=>{
    const ingredientsSummary = Object.keys(props.ingredients)
    .map( igKey =>{
        return (<li key={igKey}>
                 {igKey} : {props.ingredients[igKey]}
                 </li>)
        
    }); // Here the ingredients is in Object and convert it here itself
    return(
        <Aux>
            <h3>Your Order:</h3>
            <p>A delicious burger with:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>Confirm</Button>
        </Aux>
    );
}
    
    

export default OrderSummary;