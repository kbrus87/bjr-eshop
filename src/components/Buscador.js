import React, {useState, useContext, useEffect} from 'react';
import productContext from './context/productContext';

const Buscador = () => {
    const { search, setSearch, setYourProducts, original} = useContext(productContext);
   

    const handleSubmit = (e) => {

    }

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    
    useEffect(()=>{
        
        //filters Products to show
        const searchLocal = () => {
            let newList = [];
            newList = original.filter(prod => {
                let description = null,
                    name = prod.name.toLowerCase().includes(search.toLowerCase()),
                    category = prod.category.toLowerCase().includes(search.toLowerCase()),
                    brand =  prod.brand.toLowerCase().includes(search.toLowerCase());
                if(search.length >= 6){
                    description = prod.description.toLowerCase().includes(search.toLowerCase());
                }
                return [ name, category, brand, description ].includes(true) ;
            }) 
            return newList
        }
        setYourProducts(searchLocal());
        // eslint-disable-next-line
    },[search])

    return ( 
        <form className="">
            <div className="md-form active-pink-2  form-row m-1">
                <input className="form-control col-10" aria-label="Search" type="text" onChange={handleChange} onSubmit={handleSubmit} placeholder="Búsqueda"/>
                <input className="form-control col-2 bg-info " type="submit" value="Buscar" onSubmit={handleSubmit}/>
            </div>
        </form>
     );
}
 
export default Buscador;