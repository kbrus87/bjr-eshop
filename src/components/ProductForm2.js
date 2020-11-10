import React, { useEffect, useContext } from 'react';
import productContext from './context/productContext';

import { st, db } from '../firebase/firebaseconfig';
import Preview from './Preview';
import {v4 as uuid4} from 'uuid';
import {deleteImageOnSt} from '../firebase/crud';
import {ObjFilterByKey} from '../Helper';



const ProductForm = () => {

    const { setProduct, product, initialProductState: initialState, toUpload, setToUpload, setYourProducts, yourProducts} = useContext(productContext);


    const deleteImage = (e) => {
        
        const item = e.target.closest('figure');
        const id = item.getAttribute('id');
        const name = item.firstChild.dataset.name;
        
        //Eliminacion de la imagen del lote a subir
        for(const obj of toUpload){
            if(obj.id === id){
                setToUpload(toUpload.filter(item => item.id !== id
                ));
                //return
            }
        }
        //Eliminacion de la imagen de la info de Product
        let imagesLeft = product.images.filter((img) => {
            return img !== name
        })
        setProduct({...product, 'images': imagesLeft });
    }

    const deleteImageOnStorage = async (e) => {
        let rest = window.confirm('¿Está Seguro?');
        if(rest){
            const imageName = e.target.closest('figure').firstChild.dataset.name;
            const id = product.id;
            await deleteImageOnSt(id, imageName);
            const images = product.images.filter((img) => {
                return imageName !== img
            })
            const newDataURL = ObjFilterByKey(product.dataURL, imageName);

            setProduct(product.dataURL = newDataURL);
            setProduct({...product, 'images': images });
        }    
    }

    const handleFileInput = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        //Validacion
        //chequear si son imagenes de formatos aceptables
        const imgFormat = ['jpg', 'jpeg', 'png', 'gif'];
        files = files.filter((file) => {
            let fileFormat = file.name.split('.').slice(-1);
            let image = false;
            imgFormat.forEach((format) => {
                if(format === fileFormat[0].toLowerCase()){
                    return image = true;
                }
            })
            return image
        })

        //Evitar imagenes que ya fueron añadidas en products
        let productImagesCopy = product.images;
        files = files.filter((file) => {
            let alreadyInProduct = false;
            productImagesCopy.forEach((imgName) => {
                if(imgName === file.name){
                    alreadyInProduct = true;
                }
            })
            return !alreadyInProduct
        })
        
        //actualizacion de product
        let newImages = files.map((a) => {
            return a.name
        })
        if(product.images.length > 0){
           productImagesCopy.map((a)=>{
               return newImages.push(a)
           })
        }
        setProduct({...product, 'images': newImages })

        //preparacion de archivos para subir
        for(const file of files){
            let reader = new FileReader();
            reader.onload = () => {
                let dataURL = reader.result;
                const fileData = {
                    file: file,
                    dataURL: dataURL,
                    id : uuid4()
                } 
                setToUpload( (toUpload )=>[...toUpload, fileData]);
                
            }
            reader.readAsDataURL(file)
        }
        e.target.value = '' ;
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        
        //uses handle submit for Update List component
        const modifyYourProducts = (product) => {
            let newList = yourProducts;
            //.filter((obj) => obj.id !== product.id );
            const index = yourProducts.findIndex( obj =>  obj.id === product.id );
            
            if(index === -1){
                newList.splice(0,0,product);
            } else {
                newList[index] = product;
            }
            setYourProducts(newList);
        }

        const uploadImages = (toUpload) =>{

            if(toUpload.length < 1){return Promise.resolve([])} //if toUplad < 1 it's an Update not involving images

            let files = toUpload.map(a => a.file);
            return Promise.all(
                files.map(async (file)=>{
                    const ref = st.ref(`images/${product.id}/${file.name}`);
                    await ref.put(file);
                    return ref.getDownloadURL();
                })
            )
        }

        //uses handle submit for new entries
        const writedb = async (product) => {
            return Promise.resolve(uploadImages(toUpload).then(async (urls)=>{
                    let productCopy = product;
                    if(urls.length > 0){
                        productCopy.imageURL = productCopy.imageURL.concat(urls)
                    }
                    //I'm sure there is a more elegant way to do this, but right now i'm tired. :(
                    //Tags are the workaround I could find to use search for the products because Firebase query does not search for words or partial words
                    productCopy.tags = (`${product.name} ${product.brand} ${product.category} ${product.description}`)
                                            .toLowerCase() // eslint-disable-next-line 
                                            .split(/[\s*\.'"?,:()-]/g)
                                            .filter(arr => arr.length > 3)
                    productCopy.name = product.name.toLowerCase();  
                    productCopy.brand = product.brand.toLowerCase();   
                    productCopy.category = product.name.toLowerCase();                       
                    setProduct(productCopy);
                    db.collection("products").doc(product.id).set(product);
            }))
        }

        
        if (product.category.trim().length < 3 || product.name.length < 3 || product.brand.length < 3 || product.price.trim() === '' ||  product.description.length < 3 || product.images.length === 0){        
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            forms[0].classList.add('was-validated');
        } else {
            writedb(product).then(()=>{
                modifyYourProducts(product);
                setProduct(initialState);
                setToUpload([]);
            })
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setProduct({...product, [e.target.name]:e.target.value})        
    }

    
    useEffect(() => {     
 
    }, [toUpload])

    return (    
        <>
        <div className="card card-body py-2 mt-2 titulo">
            <h4 className="m-0 ">Añade tu producto</h4>
            <div className="underline bg-primary">            
        </div>
        </div>
        <form className="card card-body needs-validation productForm" onSubmit={handleSubmit} noValidate>            
            <div className="d-flex align-items-center flex-column flex-md-row">
                <div className="form-group col-12 col-md-6 ">
                    <label htmlFor="name ">Nombre del Producto</label>
                    <input  className="form-control " type="text" name="name" value={product.name} placeholder="Ej: Turbo Dinamizer 3.0" onChange={handleChange} required />
                    <div className="invalid-feedback">
                        Por favor ingrese un nombre
                    </div>
                </div>
                <div className="form-group col-12 col-md-6 ">
                    <label htmlFor="category">Categoria de Producto</label>
                    <input required className="form-control" type="text" name="category" value={product.category} placeholder="Ej: Electronica" onChange={handleChange}/>
                    <div className="invalid-feedback">
                        Por favor ingrese una categoria
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center flex-column flex-md-row">
                <div className="form-group col-md-6 col-12">
                    <label htmlFor="brand">Marca del Producto</label>
                    <input required className="form-control" type="text" name="brand" value={product.brand}  placeholder="Ej: FutureBrand" onChange={handleChange}/>
                    <div className="invalid-feedback">
                        Por favor ingrese una marca
                    </div>
                </div>
                <div className="form-group col-md-6 d-flex justify-content-center align-items-center">
                        <div className="form-row align-items-center ">
                            <label htmlFor="price" className="col-12 text-uppercase precio">Precio</label>
                            
                            <div className="col-12 form-row d-flex align-items-center">
                                <span className="material-icons col ">attach_money</span>
                                <input required className="form-control col-9" type="number" name="price" value={product.price} placeholder="Ej: $500" onChange={handleChange}/>
                                <div className="invalid-feedback">
                                Nunca regale su trabajo
                                </div>
                            </div>
                        </div>                    
                </div>
            </div>
            <div className="form-group col-12 ">
                <label htmlFor="description">Descripción del Producto</label>
                <p><textarea className="form-control" type="text" name="description" value={product.description} placeholder="Ej: Amazing Dinamizer with turbo power for a next gen experience!" rows="7" onChange={handleChange} required/></p>
                <div className="invalid-feedback">
                        Por favor ingrese una descripcion
                </div>
            </div>
            
            {/*Imagenes de producto*/}
            <div className="flex-row d-flex">
            <div  className="d-flex justify-content-between col-6 flex-column form-group"> 
                    <label htmlFor="image">Añada la foto de tu producto</label>
                    <div className="form-group custom-file">
                        <label htmlFor="images" className="custom-file-label">File</label>
                        <input required id="images-input" className="custom-file-input" type="file" name="images" accept="image/*" onChange={handleFileInput} multiple />
                        <div className="invalid-feedback">
                            Añada fotos de su producto
                        </div>
                    </div>
            </div>
            <div className="col-6  d-flex flex-wrap ">
                <label htmlFor="isPublic" className="col-12 ">Haga público su producto</label>
                <input 
                    type="checkbox" 
                    id="isPublic" 
                    className="justify-content-center w-100" 
                    name="isPublic" 
                    onChange={() => setProduct({...product, 'isPublic': !product.isPublic})} 
                    value={product.isPublic} 
                    checked= {product.isPublic}
                />
            </div>
            </div>
            
            <div  className="d-flex flex-column flex-md-row pt-2 container col-12">
                <Preview deleteItem={deleteImage} deleteImageOnStorage={deleteImageOnStorage} files={toUpload} product={product}/>
            </div>
            
            <div className="d-flex justify-content-between container">
            <div className="">
                <button id="submit-form" type="submit" className="btn btn-primary justify-content-end" value="Guardar">Guardar</button>
            </div>
            <div className="">
                <button id="reset-form" type="submit" className="btn btn-info justify-content-end" value="Reset" onClick={(e) => {e.preventDefault(); setProduct(initialState)}}>Reset</button>
            </div>
            </div>
            
        </form>
        </>
    )
}
 
export default ProductForm;