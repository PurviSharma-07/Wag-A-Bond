import React, { Component } from 'react';
//import { addComment } from '../redux/ActionCreators';
import  PetDetail  from './PetdetailComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { postComment, postFeedback, addComment, fetchPets, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    pets: state.pets,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  postComment: (petId, rating, author, comment) => dispatch(postComment(petId, rating, author, comment)),
  fetchPets: () => { dispatch(fetchPets())},
  postFeedback: (firstname, lastname, telnum, email,agree,contactType,message) => dispatch(postFeedback(firstname, lastname, telnum, email,agree,contactType,message)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPets();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      return(
          <Home 
              pet={this.props.pets.pets.filter((pet) => pet.featured)[0]}
              petsLoading={this.props.pets.isLoading}
              petErrMess={this.props.pets.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
          />
      );
    }

    const PetWithId = ({match}) => {
      return(
          <PetDetail pet={this.props.pets.pets.filter((pet) => pet.id === parseInt(match.params.petId,10))[0]} 
          isLoading={this.props.pets.isLoading}
          errMess={this.props.pets.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.petId === parseInt(match.params.petId,10))} 
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}/>
      );
    };
    
    return (
      <div>
        <Header />

        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />}  />
                  <Route exact path='/menu' component={() => <Menu pets={this.props.pets} />} />
                  <Route path='/menu/:petId' component={PetWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                  postFeedback ={ this.props.postFeedback} />} />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));