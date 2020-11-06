import React, {useContext, useEffect} from 'react';
import productContext from './context/productContext';
import { hasObjectId } from '../Helper.js';

const Buscador = () => {
    const { search, setSearch, setYourProducts, original, db, setOriginal} = useContext(productContext);
    const possibleFields = ['name', 'brand', 'category']

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //searches the on the data base
        const searchDataBase = async () =>{
            console.clear()
            let searchEnd = '';
            let results = [];
            let searchStart = String.fromCharCode(search.charCodeAt());
            
            if(search.length === 1){
                searchEnd = String.fromCharCode(search.charCodeAt() + 1);
            }else{ searchEnd = search}

            console.log(`searching from ${searchStart} to ${searchEnd}`);

            const busquedaTags = ()=>{
                

                return Promise.resolve(
                db.collection('products')
                .where('tags', 'array-contains-any', [search, searchStart, searchEnd] )
                .get().then((snapshot)=>{
                    snapshot.forEach(doc => {
                        if (snapshot.empty) {
                            console.log('No matching documents.');
                            return results;}
                        
                        if(!hasObjectId(results, doc.data().id)){
                            results = results.concat(doc.data())
                        }
                        //console.log(results);
                    });
                }))
            }
            const busquedaFields = ()=>{
                
                return new Promise((resolve, reject)=>{
                    possibleFields.forEach(async (field)=>{
                        const snapshot = await db.collection('products')
                        .orderBy(field)
                        .startAt(searchStart)
                        .endAt(searchEnd)
                        .get();
        
                        if (snapshot.empty) {
                        console.log('No matching documents.');
                        resolve(results);
                    }  
        
                        snapshot.forEach(doc => {
                            if(!hasObjectId(results, doc.data().id)){
                                results = results.concat(doc.data())
                            }
                            //console.log(results);
                        });
                    })
                    resolve(results)
                })
            }
            await busquedaTags();
            await busquedaFields();

            return Promise.resolve(results)
        }
        searchDataBase().then((res)=>{
            
            setYourProducts(res)
            setOriginal(res)
            setSearch('')
        })
        
    }

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value.toLowerCase().trim()
        setSearch(value);
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
                <input className="form-control col-10" value={search} aria-label="Search" type="text" onChange={handleChange} placeholder="Búsqueda"/>
                <input className="form-control col-2 bg-info " type="submit" value="Buscar" />
            </div>
        </form>
     );
}
 
export default Buscador;