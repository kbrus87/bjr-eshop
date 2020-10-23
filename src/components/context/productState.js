import React, { useReducer, useState, useEffect } from 'react';
import {v4 as uuid4} from 'uuid';

import productContext from './productContext';
import productReducer from './productReducer';

import { st, db } from '../../firebase/firebaseconfig';


const ProductState = props => {

    const [update, doUpdate] = useState(0);

     //Producto del formulario
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
     const [product, setProduct] = useState(initialProductState);

     //Imagenes a subir de producto en formulario
     const [toUpload, setToUpload] = useState ([]);

     //Lista de Productos en DB
     const productsRef = db.collection('products');
    const [yourProducts, setYourProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        const getDoc = async () => { 
            setLoading(true);
            setYourProducts([])
            let freshProducts = [];
            await productsRef.limit(10).get()
            .then(async snapshot => {
                await snapshot.forEach(async doc => {
                    const product = doc.data();
                    product.imageURL =[];
                    for (const image of product.images){
                            const imgRef = st.ref(`images/${product.id}/${image}`);
                            await imgRef.getDownloadURL().then((url)=>{
                               product.imageURL.push(url);
                            }).catch((err) => {
                                //error al descargar imagen
                                switch (err.code) {
                                    case 'storage/object-not-found':
                                        console.log('hubo un error', err.code);
                                        break;
                                    default:
                                    break;
                                } 
                            })
                    }
                    freshProducts = freshProducts.concat(product);
                    setYourProducts(freshProducts.sort((a, b)=>{
                        if(a.id > b.id){
                            return 1
                        }else if(b.id > a.id){
                            return -1
                        }
                        return 0
                    })); 
                })  
                
               return
            })
            .catch(async err => {
                console.log('hubo un error', err)
                await setLoading(false)
                return
            }) 
            await setLoading(false);
        }
        getDoc();
    },[] )

    return(
        <productContext.Provider
        value={{
            update,
            initialProductState,
            product,
            toUpload,
            yourProducts,
            loading,
            doUpdate,
            setProduct,
            setToUpload,
            setYourProducts
        }}>
            {props.children}
        </productContext.Provider>
    )
}

export default ProductState;