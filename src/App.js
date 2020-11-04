import React from 'react';
import ProductForm2 from './components/ProductForm2';
import ProductList from './components/ProductsList';
import ProductState from './components/context/productState';



function App() {

  

  return (
    
      <div className="px-5">       
        <div className="row d-flex justify-content-between">
          <ProductState>
            <div className="col-12 col-lg-6">
              <ProductForm2 />
            </div>
            <div className="col-12 col-lg-6">
              <ProductList />
            </div>
           </ProductState>
        </div> 
      </div>
   
  );  
}

export default App;
