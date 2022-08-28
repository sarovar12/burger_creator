import React, {Component} from "react";
import classes from './BurgerIngrediant.css';
import PropTypes from 'prop-types';

class BurgerIngrediant extends Component {
    render() {
        let ingrediants = null;
    switch(this.props.type){
        case('BreadBottom'):
            ingrediants = <div className={classes.BreadBottom}></div>;
                break;
        case('BreadTop'):
            ingrediants =<div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
            </div>;
                break;
        case('Meat'):
            ingrediants=<div className={classes.Meat}></div>;
                break;
        case('Cheese'):
            ingrediants=<div className={classes.Cheese}></div>;
                break;
        case('Salad'):
            ingrediants=<div className={classes.Salad}></div>;
                break;
        case('Bacon'):
            ingrediants=<div className={classes.Bacon}></div>;
                break;

        default:
            ingrediants =null;
    }
    return ingrediants;
    }; 
    
};
BurgerIngrediant.propTypes= {
    type: PropTypes.string.isRequired,
}
export default BurgerIngrediant;