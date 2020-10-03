import { st, db } from "./firebaseconfig";


const deleteItem = async (id) => {
    
    const res = await db.collection('products').where('id', '==', id).get();

    if(res.empty){
        console.log('Hubo un error');
        return
    }

    await res.forEach( async doc => {
        await doc.data().images.forEach(img => {
            st.ref(`images/${doc.data().id}/${img}`).delete().catch((e)=>{   
            })
            console.log(doc.data().id)
        })
        await doc.ref.delete()
            .then(()=>{console.log('eliminado con exito'); return})
            .catch(()=>{console.log('algo salio mal, archivo no eliminado'); return})
    })
}

const getItem = async (id) => {
    let urls = {};
    const res = await db.collection('products').doc(id).get();
    let item = res.data();
    
    for(const img of res.data().images){
        const url = await st.ref(`images/${res.data().id}/${img}`).getDownloadURL();
        urls[img] = url;
    }

    item.dataURL = await urls;
    
    return item
}

const deleteImageOnSt = async (id, img) => {
    st.ref(`images/${id}/${img}`).delete();
}

export { deleteItem, getItem, deleteImageOnSt };