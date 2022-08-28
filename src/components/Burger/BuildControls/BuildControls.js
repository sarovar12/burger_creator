import React from "react";
import classes from './BuildControls.css'
import BuildControl from "./BuildControl/BuildControl";
const controls =[
    {label:'Salad', type:'Salad'},
    {label:'Bacon', type:'Bacon'},
    {label:'Cheese', type:'Cheese'},
    {label:'Meat', type:'Meat'},
];
const buildControls =(props) =>(
    <div className={classes.BuildControls}>
        <p >Current Price :<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>
            <BuildControl key={ctrl.label} label={ctrl.label}
            added={()=>props.ingredientsAdded(ctrl.type)}
            removed={()=>props.ingredientsRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>)
            }
        <button
        disabled={!props.purchasable}
         className={classes.OrderButton}
         onClick={props.ordered}>ORDER NOW</button>    
    </div>
);
export default buildControls; 
