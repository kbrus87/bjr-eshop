import React, {useState} from 'react';

const Buscador = () => {
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (e) => {

    }

    const handleChange = (e) => {
        setKeyword(e.target.value)
    }

    return ( 
        <form className="">
            <div className="md-form active-pink-2 mb-3 ">
                <input className="form-control" aria-label="Search" type="text" value={keyword} onChange={handleChange} onSubmit={handleSubmit} placeholder="Búsqueda"/>
            </div>
        </form>
     );
}
 
export default Buscador;