import React from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.css"
import NavigationItems from "../Toolbar/NavigationItems/NavigationItems";
import Aux from "../../../hoc/Auxi";
const sideDrawer=(props)=>{
    let attachedClasses =[classes.SideDrawer,classes.Close]
    if (props.open){
        attachedClasses =[classes.SideDrawer,classes.Open]
    }
    return(
    <Aux>
    <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
            <Logo height="10%"/>
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </div>
    </Aux>);
};
export default sideDrawer;