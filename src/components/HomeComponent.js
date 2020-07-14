import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if(errMess){
        return(
            <h4>{errMess}</h4>
        );
    }
    else
    return(
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
  );

}
/*function RenderLeader({leader}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + leader.image} alt={leader.name} />
                <CardBody>
                    <CardTitle>{leader.name}</CardTitle>
                    <CardText>{leader.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}*/

function Home(props) {
    console.log('render home')
    console.log(props);
  return(
      <div className="container">
          <div className="row align-items-start">
              <div className="col-12 col-md m-1">
                  <RenderCard item={props.pet}
                  isLoading={props.petsLoading}
                  errMess={props.petsErrMess}/>
              </div>
              <div className="col-12 col-md m-1">
                  <RenderCard item={props.promotion}
                  isLoading={props.promoLoading}
                  errMess={props.promoErrMess} />
              </div>
              <div className="col-12 col-md m-1">
                  <RenderCard item={props.leader} 
                  isLoading={props.leaderLoading}
                  errMess={props.leaderErrMess}/>
              </div>
          </div>
      </div>
  );
}

export default Home;   