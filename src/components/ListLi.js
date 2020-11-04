import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


const ListLi = ({product, deleteItem, editItem}) => {
    let border = {}
    
    if(product.isPublic){
        border={
            border: '1px solid green',
        }
    }else{
        border ={ 
            border:'1px solid red',
        }
    }
    
  

    return ( 
        <li id={product.id} style={border}  className="row bg-dark productLi rounded d-flex justify-content-around align-items-center p-0 mx-0 my-1  w-100 ">
            <div className="col-3 my-1 d-flex align-items-center">
                    <img className="img-thumbnail max-img " src={product.imageURL[0]} alt="thumbnail"></img>
            </div>
            <div className="col-9 bg-clear row mx-0 p-0 ">
                <div className="col-4 product-info ">
                    <p>Nombre: <span>{product.name}</span> </p>
                    <p className="">Marca: <span>{product.brand}</span> </p>
                </div>
                <div className="col-4 product-info ">
                    <p>Categoria: <span>{product.category}</span> </p>
                    <p className="price-tag">Precio:<span className="ml-2 price">${product.price}</span></p>
                </div>
                <div className="col-4 d-flex flex-column icons ">
                    <div className="icons d-flex justify-content-around align-items-center h-100 flex-row flex-lg-column justify-content-lg-evenly">
                            <FontAwesomeIcon icon={faTrash} className="icon text-light " onClick={deleteItem}/>
                            <FontAwesomeIcon icon={faEdit} className="icon text-light" onClick={editItem}/>
                    </div>
                </div>
            </div>  
        </li>
     );
}
 
export default ListLi;