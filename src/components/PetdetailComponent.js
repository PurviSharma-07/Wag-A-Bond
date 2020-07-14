import React,{ Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,Button, Modal, ModalHeader, ModalBody,
        Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

export class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state= {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this); //Bind the function toggleNav to use it in React
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.petId, values.rating, values.author, values.comment);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        }); 
    }


    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Label htmlFor="Rating">Rating</Label>
                            
                                <Control.select model=".rating" id="rating" name="rating" className="form" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            
                        </div>

                        <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                
                                    <Control.text model=".author"  id="author" name="author" 
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors 
                                            className="text-danger" 
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                         />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                                
                                <Control.textarea model=".comment" id="comment" name="comment" 
                                rows="6" className="form-control" />
                        </div>
                        
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                            </ModalBody>
                </Modal>
            </div>
        );
    }
}    



    function RenderComments({comments, postComment, petId}) {
        if (comments != null)
        return(
            <div className="col-12 col-md-5 m-1"> 
            <h4>Comments</h4>
            <ul className="list-unstyled">
            <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
            </Stagger>
            {comments.map((comment) => {
            return (
                <li key={comment.id} type="none">
                    <p>{comment.comment}</p>
                
                    <p>-- {comment.author}{" , "} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
            );
            })}
            </ul>
            <CommentForm petId={petId} postComment={postComment}  />
            </div>
            );
        else
        return(
            <div></div>
        )
    }

    function RenderPet({pet}) {
        
            return (
                <div className="col-12 col-md-5 m-1">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + pet.image} alt={pet.name} />
                        <CardBody>
                            <CardTitle>{pet.name}</CardTitle>
                            <CardText>{pet.description}</CardText>
                        </CardBody>
                    </Card>
                    </FadeTransform>
                </div>
            );
        }

    const Petdetail =(props) => {
        if (props.pet !=null)
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.pet.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.pet.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderPet pet={props.pet} />
                    <RenderComments comments={props.comments}
                    postComment={props.postComment}
                    petId={props.pet.id} />
                </div>
            </div>
    
            );
        else
        return(
            <div></div>
        )
    }


export default Petdetail;


