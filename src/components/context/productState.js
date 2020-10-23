import React, { useReducer, useState } from 'react';
import {v4 as uuid4} from 'uuid';

import productContext from './productContext';
import productReducer from './productReducer';


const ProductState = props => {

    const initialProductState = {
        category: '',
        name: '',
        brand: '',
        price: '',
        images: [],
        description: '',
        isPublic:false,
        id:`a${uuid4()}`
      }
   
     const [update, doUpdate] = useState(0);
     const [product, setProduct] = useState(initialProductState);
     const [toUpload, setToUpload] = useState ([]);

    return(
        <productContext.Provider
        value={{
            update,
            product,
            toUpload,
            doUpdate,
            setProduct,
            setToUpload
        }}>
            {props.children}
        </productContext.Provider>
    )
}

export default ProductState;