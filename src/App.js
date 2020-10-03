import React, {useState} from 'react';
import ProductForm2 from './components/ProductForm2';
import ProductList from './components/ProductsList';
import {v4 as uuid4} from 'uuid';


function App() {

  const initialState = {
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
 const [product, setProduct] = useState(initialState);
 const [toUpload, setToUpload] = useState ([]);

  return (
    <>
      <div className="px-5">       
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-6">
            <ProductForm2 toUpload={toUpload} setToUpload={setToUpload} doUpdate={doUpdate} setProduct={setProduct} product={product} initialState={initialState} />
          </div>
           <div className="col-12 col-lg-6">
             <ProductList doUpdate={doUpdate} update={update} setProduct={setProduct} product={product} setToUpload={setToUpload}/>
           </div>
        </div> 
      </div>
    </>
  );  
}

export default App;
