import React, {useState, useEffect, useContext} from 'react';
import productContext from './context/productContext';
import { st, db } from '../firebase/firebaseconfig';
//import ListLiCard from './ListLiCard';
import ListLi from './ListLi';
import Buscador from './Buscador';
import Spinner from './spinner/Spinner';
import { ObjExtractByValue } from '../Helper';
import {deleteItem, getItem} from '../firebase/crud';


const ProductList = () => {

    const { doUpdate, update, setProduct, setToUpload, product } = useContext(productContext);



    const productsRef = db.collection('products');
    const [yourProducts, setYourProducts] = useState([]);
    const [loading, setLoading] = useState(false);
 
    const deleteItemS = async (e) => {
        const li = await document.querySelector(`#${e.target.closest('li').id}`); 
        await deleteItem(li.id);
        doUpdate((update)=>{return update+1});
        let newProducts = yourProducts.filter((obj) => {
            return obj.id !== li.id
        });
        setYourProducts(newProducts);
    }

    const editItems = async (e) => {
        const li = await document.querySelector(`#${e.target.closest('li').id}`);
        //const item = await getItem(li.id);
        //await setProduct(item);
        let urls = {};
        const item = ObjExtractByValue(yourProducts, 'id', li.id);
        setProduct(item)
        document.querySelector('.titulo').scrollIntoView({behavior:'smooth'});

        for(const img of item.images){
            const url = await st.ref(`images/${item.id}/${img}`).getDownloadURL();
            urls[img] = url;
        }
        item.dataURL = await urls;
        
        setToUpload([]);
    }

useEffect (() => {
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
}, [update])

const lista = () =>{
    
    if(yourProducts.length === 0){
        return(
            <h2 className="jumbotron w-100 text-center">No tiene productos en su eshop</h2>
        )
    }else{
        return(
        yourProducts.map( (product) => {
            return(
                <ListLi key={product.name+product.imageURL[0]} product={product} deleteItem={deleteItemS} editItem={editItems} />
            )
        }) )
    }
}


    return ( 
        <>
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
        </>
     );
}
 
export default ProductList;