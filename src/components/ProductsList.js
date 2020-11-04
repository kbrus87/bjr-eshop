import React, { useContext, useEffect } from 'react';
import productContext from './context/productContext';

import { st } from '../firebase/firebaseconfig';
import ListLi from './ListLi';
import Buscador from './Buscador';
import Spinner from './spinner/Spinner';
import { ObjExtractByValue } from '../Helper';
import {deleteItem} from '../firebase/crud';


const ProductList = () => {

    const { update, setProduct, setToUpload, yourProducts, loading, setYourProducts} = useContext(productContext);
 
    const deleteItemS = async (e) => {
        const li = await document.querySelector(`#${e.target.closest('li').id}`); 
        await deleteItem(li.id);
        
        let newProducts = yourProducts.filter((obj) => {
            return obj.id !== li.id
        });
        setYourProducts(newProducts);
    }

    const editItems = async (e) => {
        const li = document.querySelector(`#${e.target.closest('li').id}`);
        
        let urls = {};
        const item = ObjExtractByValue(yourProducts, 'id', li.id);
        setProduct(item);
        document.querySelector('.titulo').scrollIntoView({behavior:'smooth'});

        for(const img of item.images){
            const url = await st.ref(`images/${item.id}/${img}`).getDownloadURL();
            urls[img] = url;
        }
        item.dataURL = urls;
        setToUpload([]);
    }

useEffect (() => {
    
}, [yourProducts])

    const lista = () =>{
        
        if(yourProducts.length < 1){
            return(
                <h2 className="jumbotron w-100 text-center">No tiene productos en su eshop</h2>
            )
        }
        return(
            yourProducts.map( (product) => {
                return(
                    <ListLi key={product.name+product.imageURL[0]} product={product} deleteItem={deleteItemS} editItem={editItems} />
                )
            }) 
        )
        
    }

    return ( 
        <div id="productlist">
            <div className="card card-body py-2 mt-2 titulo">
                <h4 className="m-0 ">Productos en tu Ecommerce</h4>
                <div className="underline bg-primary">            </div>
            </div>
            <Buscador />
            <div className="m-0" data-update={update}>
                <ul id="productList " className="p-0 mt-2 d-flex flex-wrap mx-0 col-12">
                    { 
                        loading ? <Spinner /> : lista()
                    }  
                </ul>
            </div>
        </div>
     );
}
 
export default ProductList;