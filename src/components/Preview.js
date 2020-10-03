import React, {useEffect} from 'react';
import ImagePreview from './ImagePreview';
import {v4 as uuid4} from 'uuid';

const Preview = ({deleteItem, files, product, deleteImageOnStorage}) => {

    const imagenesSubidas = () => {
        if(typeof(product.dataURL) != 'undefined' ){
            
            let pfiles = Object.entries(product.dataURL);
            return pfiles.map((val) => {
                
                return(
                    <ImagePreview key={val[0]} id={uuid4()} name={val[0]} image={val[1]} isPublic={product.isPublic} deleteItem={deleteImageOnStorage} trash={true} />
                )
            })
        }else{
            return null
        }
    }


useEffect(() => {

},[product])

    return (
        <>
        <div className="row py-2 col-12 mx-0 mb-4 mt-0 prevcontainer rounded">
           { files.map((file) => {
               
                return(
                    <ImagePreview key={file.id} id={file.id} image={file.dataURL} name={file.file.name} deleteItem={deleteItem} trash={true} />
                )
            })}
            {
                imagenesSubidas()
            }
        </div>
        </>
    )
}
 
export default Preview 