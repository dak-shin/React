import React,{ Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Modal, ModalBody, ModalHeader, Button, Col, Row, Label } from 'reactstrap';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

	function RenderComments({dishes_comments, addComment, dishId}){
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
							<CommentForm dishId={dishId} addComment={addComment}/>
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
     		comments_part = <RenderComments dishes_comments = {props.comments} addComment={props.addComment} dishId={props.dish.id}/>;
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


class CommentForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			isCommentModalOpen : false
		};
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
		this.toggleCommentModal = this.toggleCommentModal.bind(this);

	}

	handleCommentSubmit(values){
		this.toggleCommentModal();
		//alert(JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
	}

	toggleCommentModal(){
		this.setState({
			isCommentModalOpen: !(this.state.isCommentModalOpen)
		});
	}

	render(){
		return(
			<div className='container'>
				<Button outline onClick={this.toggleCommentModal}>
					<span className="fa fa-pencil fa-lg"></span>Submit Comment
				</Button>
				<Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
					<ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor='Rating' md={12}>Rating</Label>
								<Col md={12}>
									<Control.select model=".contactType" name="contactType"
										className="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="name" md={6}>Your Name</Label>
								<Col md={12}>
									<Control.text model=".name" id="name" name="name"
										placeholder="Name"
										className="form-control"
										validators={{
											minLength: minLength(3), maxLength: maxLength(15)
										}}
										/>
									<Errors
										className="text-danger"
										model=".name"
										show="touched"
										messages={{
											minLength: 'Must be greater than 2 characters',
											maxLength: 'Must be 15 characters or less'
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="message" md={6}>Comment</Label>
								<Col md={12}>
									<Control.textarea model=".comment" id="comment" name="comment"
										rows="6"
										className="form-control" />
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={5}>
									<Button type="submit" color="primary">
									Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);

	}
}
	

export default DishDetail;