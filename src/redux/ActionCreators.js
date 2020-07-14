import * as ActionTypes from './ActionTypes';
import { PETS } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import fetch from 'cross-fetch';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (petId, rating, author, comment) => (dispatch) => {

    const newComment = {
        petId: petId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};
export const fetchPets = () => (dispatch) => {

    dispatch(petsLoading(true));

    return fetch(baseUrl + 'pets')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(pets => dispatch(addPets(pets)))
    .catch(error => dispatch(petsFailed(error.message)));
    
}

export const petsLoading = () => ({
    type: ActionTypes.PETS_LOADING
});

export const petsFailed = (errmess) => ({
    type: ActionTypes.PETS_FAILED,
    payload: errmess
});

export const addPets = (pets) => ({
    type: ActionTypes.ADD_PETS,
    payload: pets
});
export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
export const fetchLeaders = () => (dispatch) => {
    
  dispatch(promosLoading());

  return fetch(baseUrl + 'leaders')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(leaders => dispatch(addLeaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});
export const postFeedback = (firstname, lastname, telnum, email,agree,contactType,message) => (dispatch) => {
  const newFeedback = {
      firstname: firstname,
      lastname: lastname,
      telnum: telnum,
      email: email,
      agree: agree,
      contactType: contactType,
      message: message
  }
  newFeedback.date = new Date().toISOString();
  return fetch(baseUrl + 'feedback', {
      method: 'POST',
      body: JSON.stringify(newFeedback),
      headers: {
          'Content-type': 'application/json'
      },
      credentials: 'same-origin'
  })
      .then(response => {
          if (response.ok) {
              return response;
          }
          else {
              var error = new Error('Error' + response.status + ': ' + response.statusText)
              error.response = response;
              throw error;
          }
      }, (error) => {
          var errmess= new Error(error.message);
          throw errmess;
      })
      .then(response => response.json())
      .then((response)=>
      alert("thnkyou for your feedback!" + JSON.stringify(response))
      )
     // .then(response => dispatch(addComment(response)))
      .catch((error) => {
          console.log('Error sending feedback ' + error.message);
          alert('Your Feedback could not be sent\nError' + error.message)
      });
}