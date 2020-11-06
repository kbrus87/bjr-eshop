import React, { useState, useEffect } from 'react';
import {v4 as uuid4} from 'uuid';

import productContext from './productContext';


import { db } from '../../firebase/firebaseconfig';


const ProductState = props => {

    const [update, doUpdate] = useState(0);

    //Producto del formulario
    const initialProductState = {
        category: '',
        name: '',
        brand: '',
        price: '',
        images: [],
        imageURL:[],
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
    const [ original , setOriginal ] = useState([]);
    const [loading, setLoading] = useState(false);

    //Buscador
    const [ search, setSearch ] = useState('')

    useEffect(() => {
        const getDoc = async () => { 
            setLoading(true);
            setYourProducts([])
            let freshProducts = [];
            await productsRef.limit(10).get()
            .then(snapshot => {
                return Promise.resolve(    snapshot.forEach(async doc => {
                        const product = doc.data();
                        
                        freshProducts = freshProducts.concat(product);
                        setOriginal(freshProducts);
                        setYourProducts(freshProducts.sort((a, b)=>{
                            if(a.id > b.id){
                                return 1
                            }else if(b.id > a.id){
                                return -1
                            }
                            return 0
                        })); 
                    })  )
            }).then(()=>{
                setLoading(false);
            })
            .catch(async err => {
                console.log('hubo un error', err)
                setLoading(false)
                return
            })  
        }
        getDoc();
        // eslint-disable-next-line 
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
            search,
            original,
            db,
            
            doUpdate,
            setProduct,
            setToUpload,
            setYourProducts,
            setSearch,
            setOriginal
            
        }}>
            {props.children}
        </productContext.Provider>
    )
}

export default ProductState;