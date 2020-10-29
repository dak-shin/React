import React from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

	function RenderComments({dishes_comments}){
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

    function RenderDishDeets({dish_sel})
    {
    	return(
			<Card className="col-12 col-md-5 m-1">
                <CardImg top src={dish_sel.image} alt={dish_sel.name} />
                <CardBody>
                  <CardTitle>{dish_sel.name}</CardTitle>
                  <CardText>{dish_sel.description}</CardText>
                </CardBody>
            </Card>
    	);
    }

	const DishDetail = (props) => {
		var res = '';
		var dish_card = '';
   		if (props.dish_sel != null){
     		res = <RenderComments dishes_comments = {props.dish_sel.comments}/>;
        	dish_card = <RenderDishDeets dish_sel = {props.dish_sel}/>;
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


export default DishDetail;