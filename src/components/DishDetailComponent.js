import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{

	constructor(props)
	{
		super(props);

	}

	renderComments(dishes_comments){
    	if (dishes_comments != null){
	    	const comms = dishes_comments.map((item) => {
		    	  	return(	
		    	  		<li>
		    	  			{item.comment}<br/>
		    	  			--{item.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', 
		    	  				day: '2-digit'}).format(new Date(Date.parse(item.date)))}<br/><br/>
		    	  		</li>
		    	  	);
	    		}
	    	  	);
	            return(
		            <div className="col-12 col-md-5 m-1">  
		            	<h4>Comments</h4>
		            	<ul className="list-unstyled">
		            		{comms}
		            	</ul>
		            </div>
	            );
        }
        else
            return(<div></div>);
    }
    renderDishDeets(dish_sel)
    {
    	return(
			<Card className="col-12 col-md-5 m-1">
                <CardImg top src={this.props.dish_sel.image} alt={this.props.dish_sel.name} />
                <CardBody>
                  <CardTitle>{this.props.dish_sel.name}</CardTitle>
                  <CardText>{this.props.dish_sel.description}</CardText>
                </CardBody>
            </Card>
    	);
    }

	render(){
		var res = '';
		var dish_card = '';
   		if (this.props.dish_sel != null){
     		res = this.renderComments(this.props.dish_sel.comments);
        	dish_card = this.renderDishDeets(this.props.dish_sel);
        }
		return(
			<div className="container">
				<div className="row">
					{dish_card}
		            {res}
		        </div>
		    </div>
		);
	}
}

export default DishDetail;