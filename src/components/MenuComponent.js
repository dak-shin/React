import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import  DishDetail  from './DishDetailComponent.js';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        };
        console.log('Menu Component constuctor is invoked');
    }

    componentDidMount()
    {
    	console.log('Menu Component componentDidMount method is invoked');
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }

    renderDish(dish) {
        if (dish != null){
            return(
            	<DishDetail dish_sel={dish}/>
            );}
        else
            return(
                <div></div>
            );
    }
  
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });
        console.log('Menu Component render function is invoked');
      
        return (
            <div className="container">
                <div className="row">
                    {menu}
                    {this.renderDish(this.state.selectedDish)}      
                </div>
            </div>
        );
    }
}


export default Menu;