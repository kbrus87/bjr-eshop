import React, {useState} from 'react';
import ProductForm2 from './components/ProductForm2';
import ProductList from './components/ProductsList';
import ProductState from './components/context/productState';
import {v4 as uuid4} from 'uuid';


function App() {

  

  return (
    <ProductState>
      <div className="px-5">       
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-6">
            <ProductForm2 />
          </div>
           <div className="col-12 col-lg-6">
             <ProductList />
           </div>
        </div> 
      </div>
    </ProductState>
  );  
}

export default App;
