import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const ImagePreview = ({image, id, deleteItem, trash, name}) => {

    
    
    return ( 
    <figure id={id} className="col-6 col-md-4 col-lg-3 figcontainer m-0" data-name={name}>
        <img className="preview"  src={image} alt='foto de producto' data-name={name}></img>
        <div className="overlay d-flex flex-row overlay justify-content-around w-100">
            {
                trash ? <div className="icon-container bg-info" onClick={deleteItem}><FontAwesomeIcon icon={faTrash} className="icon text-dark"/></div> : null
            }
        </div>
    </figure>
     );
}
 
export default ImagePreview;