import React,{ Component } from "react";
import Aux from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

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
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing: false,
        loading:false,

    }
    componentDidMount(){
        axios.get('https://react-burger-app-748b3-default-rtdb.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data})
        })
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
        this.setState({purchasing: true,} );
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        this.setState({loading:true});
        const order = {
            ingrediants:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Sarovar Bhandari',
                address:{
                    street:'Nakkhu',
                    zipcode:'46400',
                    country:'Nepal'
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest',
        }
        axios.post('/orders.json',order)
        .then(response => this.setState({loading:false,purchasing:false}))
        .catch(error=>this.setState({loading:false,purchasing:false}));
        // alert('You continue!');
    };
    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0 // Example: Salad = 0 <=0 (true)
        }
        let orderSummary =null;
        if(this.state.ingredients){
            
        }
        
        let burger =<Spinner/>
        if(this.state.ingredients){
            
            burger = (
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
                </Aux>)

            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice} />
            if(this.state.loading){
                    orderSummary = <Spinner/>
            }
        }
       
        return(
           <Aux>

                
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};
export default WithErrorHandler(BurgerBuilder,axios);