const childHasId = (parent, id) => {

        const children = Object.values(parent.children);

        for (const child of children) {
            if(child.id === id){
                //console.log('id already exists')
                return true;
            }
        }
        //console.log('no id found')
        return false;
}

const hasObjectId = (array, id) => {
    for (let object of array) {
      if (object.id === id) {
        return true;
      } 
    }
    return false
};

const ObjFilterByKey = (obj, key) => {
  let newObj ={};
  for(const k in obj){
    if(k === key){
      
    }else{
      newObj[k] = obj[k];
    }
  }
  return newObj
}

const ObjExtractByValue = (arr, key, value) => {
  let objExtracted ={};
  arr.forEach(() => {
    for(const obj of arr){
      if(obj[key] === value){
        objExtracted = obj;
      }
    }
  })
  return objExtracted
}


export { hasObjectId, childHasId, ObjFilterByKey, ObjExtractByValue};
