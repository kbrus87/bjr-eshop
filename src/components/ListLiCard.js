import React, {useState, useEffect} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


const ListLiCard = ({product}) => {

    return ( 
        
        <li  className="card bg-dark rounded d-flex flex-column justify-content-center align-items-center   p-0 my-2 flex-wrap col-6 col-md-4 col-lg-3">
            <div className=" d-flex align-items-center">
                <img className="img-thumbnail  w-100" src={product.imageURL[0]} ></img>
            </div>
            <div className=" bg-clear m-0 px-3 w-100 card-body justify-content-between flex-column d-flex">
                <div className="w-100 product-info  text-justify">
                    <p>Nombre: <span>{product.name}</span> </p>
                    <p>Marca: <span>{product.brand}</span> </p>
                    <p>Categoria: <span>{product.category}</span> </p>
                </div>
                <div className="flex-column price-icons ">
                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <p className="">Precio: </p> 
                        <span className="price">${product.price}</span>
                    </div>
                    <div className="icons justify-content-around d-flex h-100">
                            <FontAwesomeIcon icon={faTrash} className="icon text-light mx-2"/>
                            <FontAwesomeIcon icon={faEdit} className="icon text-light mx-2"/>
                    </div>
                </div>
            </div>  
        </li>
        
     );
}
 
export default ListLiCard;