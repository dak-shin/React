import React from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent.js';

	function RenderComments({dishes_comments}){
    	if (dishes_comments != null){
			console.log('Dish comments invoked');
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
							<CommentForm />
		            	</ul>
		            </div>
	            );
        }
        else
            return(<div></div>);
    }

    function RenderDishDeets({dish})
    {
    	return(
			<Card className="col-12 col-md-5 m-1">
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
    	);
    }

	const DishDetail = (props) => {
		var comments_part = '';
		var dish_card = '';
   		if (props.dish != null){
     		comments_part = <RenderComments dishes_comments = {props.comments}/>;
        	dish_card = <RenderDishDeets dish = {props.dish}/>;
        }
		return(
			<div className="container">
				<div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
				<div className="row">
					{dish_card}
		            {comments_part}
		        </div>
		    </div>
		);
	}



export default DishDetail;