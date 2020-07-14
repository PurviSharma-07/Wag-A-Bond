import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderLeader({leader}){
    return(
        <div key={leader.id} className="col-12 mt-5">
            <Media tag="li">
                <Media left middle>
                <Media object src={baseUrl + leader.image} alt={leader.name}/>
                </Media>
                <Media body className="ml-5">
                    <Media heading>{leader.name}</Media>
                        <p>{leader.designation}</p>
                        <p>{leader.description}</p>
                </Media>
            </Media>
        </div>
    );
}

function About(props) {
    function RenderLeaders({ item, isLoading, errMEss }) {
        if (isLoading) {
            return (
                <Loading />
            );
        }
        else if (errMEss) {
            return (
                <h4>{errMEss}</h4>
            )
        }
        else
            return (
                <div>
                    <Stagger in>
                    {item.map((leader) => {
                        return (
                            <Fade in>
                            <div key={leader.id}>
                                <RenderLeader leader={leader} />
                            </div>
                            </Fade>
                        );
                    })}
                    </Stagger>
                </div>
            )
    }
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2020, Wag-A-Bond aspires to reach out to every stray animal who is in search of shelter and food.We insists our customers to adopt these beautiful animals instead of purchsing from pet shops. If you see a stray animal never restrict yourself from helping or feeding them. We emphasize you to choose a breed which best fits your lifestyle..</p>
                    <p><h4> Our moto is to provide shelter and food to every stray animal.</h4></p>
                    <p>We will provide you information regarding the animals which are to be adopted, and you can also just drop the location/ call us if you find any animal in your neighbour. We will take care of them,  
                    together we can make it a successful, just by doing a little efforts to call and by showing kindness towards these non-speaking creatures <em> We can judge the heart of a man by his treatment of animals</em>.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6"> June 2020</dd>
                                <dt className="col-6">location</dt>
                                <dd className="col-6">Jaipur</dd>
                                <dt className="col-6">Colllaboration</dt>
                                <dd className="col-6">Spreading Smiles NGO</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">20</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">"Until we extend our circle of compassin to all living things,humanity will not find peace."</p>
                                <footer className="blockquote-footer">Albert Schweitzer,
                                <cite title="Source Title">French-German Humanitarian, Theologian, and Philosopher.</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                    <RenderLeaders item={props.leaders.leaders}
                            errMEss={props.leaders.errMEss}
                            isLoading={props.leaders.isLoading} />
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    