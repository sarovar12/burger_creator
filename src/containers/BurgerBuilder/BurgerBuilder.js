import React,{ Component } from "react";
import Aux from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENTS_Prices={
    Salad:0.5,
    Cheese:0.3,
    Meat:1.2,
    Bacon:0.9, 
}
class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state ={...}
    // }
    state ={
        ingredients:{
            Salad:0,
            Bacon:0,
            Cheese:0,
            Meat:0,
        },
        totalPrice:4,
        purchasable:false,
        purchasing: false,

    }
    updatePurchaseState(ingredients){
       
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{
            return sum+el;
        },0)
        this.setState({purchasable : sum>0});
    }
    addIngredientsHandler =(type)=>{
        const oldCount =this.state.ingredients[type];
        const updatedCount= oldCount+1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCount;
        const priceAddition =INGREDIENTS_Prices[type];
        const oldPrice =this.state.totalPrice;
        const newPrice = oldPrice +priceAddition; 
        
        this.setState({totalPrice:newPrice,
        ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientsHandler =(type)=>{
            const oldCount = this.state.ingredients[type];
            if(oldCount <= 0){
                return;
            }
            const updatedCount = oldCount-1;
            const updatedIngredients ={
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceSubtraction = INGREDIENTS_Prices[type];
            const oldPrice =this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;
            this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
            this.updatePurchaseState(updatedIngredients);

    }
    purchaseHandler=()=>{
        this.setState({purchasing: true} );
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        alert('You continue!');
    };
    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0 // Example: Salad = 0 <=0 (true)
        }
        return(
           <Aux>
            <Burger ingrediants={this.state.ingredients}/>
            <BuildControls 
                ingredientsAdded={this.addIngredientsHandler}
                ingredientsRemoved={this.removeIngredientsHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable ={this.state.purchasable }
                ordered={this.purchaseHandler}
                />
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
            </Aux>
        );
    }
};
export default BurgerBuilder;