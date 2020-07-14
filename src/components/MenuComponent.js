import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

    function RenderMenuItem ({pet, onClick}) {
        return (
            <Card>
                <Link to={`/menu/${pet.id}`} >
                    <CardImg width="100%" src={baseUrl + pet.image} alt={pet.name} />
                    <CardImgOverlay>
                        <CardTitle>{pet.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }

    const Menu = (props) => {

        const menu = props.pets.pets.map((pet) => {
            return (
                <div className="col-12 col-md-5 m-1"  key={pet.id}>
                    <RenderMenuItem pet={pet} />
                </div>
            );
        });
        if (props.pets.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.pets.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.pets.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else 
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

export default Menu;