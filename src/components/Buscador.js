import React, {useContext, useEffect} from 'react';
import productContext from './context/productContext';

const Buscador = () => {
    const { search, setSearch, setYourProducts, original, db} = useContext(productContext);
    const possibleFields = ['name', 'brand', 'category', 'description']

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //searches the on the data base
        const searchDataBase = async () =>{
            console.clear()
            possibleFields.forEach(async (field)=>{
                const snapshot = await db.collection('products').where('name', '==', search).get();

                if (snapshot.empty) {
                console.log('No matching documents.');
                return;}  

                snapshot.forEach(doc => {
                    
                console.log(doc.data().name);
                });
            })
        }
        searchDataBase();
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
        <form className="" onSubmit={handleSubmit} >
            <div className="md-form active-pink-2  form-row m-1">
                <input className="form-control col-10" aria-label="Search" type="text" onChange={handleChange} placeholder="Búsqueda"/>
                <input className="form-control col-2 bg-info " type="submit" value="Buscar" />
            </div>
        </form>
     );
}
 
export default Buscador;