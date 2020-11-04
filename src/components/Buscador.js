import React, {useState, useContext} from 'react';
import productContext from './context/productContext';

const Buscador = () => {
    const { search, setSearch, yourProducts, setYourProducts } = useContext(productContext);
    //const [keyword, setKeyword] = useState('');

    const handleSubmit = (e) => {

    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        //let newList = yourProducts.filter((product)=>{
            console.log(Array())
        
        //})
  
    }

    return ( 
        <form className="">
            <div className="md-form active-pink-2  form-row m-1">
                <input className="form-control col-10" aria-label="Search" type="text" value={search} onChange={handleChange} onSubmit={handleSubmit} placeholder="Búsqueda"/>
                <input className="form-control col-2 bg-info " type="submit" value="Buscar" />
            </div>
        </form>
     );
}
 
export default Buscador;