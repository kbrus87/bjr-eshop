import React from 'react';
import {childHasId} from '../Helper';

const Carousel = ({imagenes}) => {
    
    let innerCarousel = document.querySelector('#carousel-inner');
    const cleanCarousel = () => {
        if(innerCarousel !== null){
        while (innerCarousel.hasChildNodes()) {  
            innerCarousel.removeChild(innerCarousel.firstChild);
          }
        };
    };
    cleanCarousel();
            
    const setPreview = (imagen, id) => {
        
            //Crea el carrusel
        let  img = document.createElement("img"),
             div = document.createElement("div");

            div.classList.add('carousel-item', 'justify-content-center');
            img.src = imagen;
            
            div.setAttribute('id', id )
            
            img.classList.add('d-block');
            div.setAttribute('data-interval', '2000');
            div.appendChild(img);
            innerCarousel.appendChild(div);

            if(innerCarousel.children.length > 0){
                let active = document.querySelector('.active');
                if(active === null){
                    innerCarousel.firstChild.classList.add('active')
                }
                return
            }
    }

    imagenes.forEach((img) => {
        const id = img.toString().slice(img.toString().length-100, img.toString().length)

        if(!childHasId(innerCarousel, id)){
            setPreview(img, id)
        } else{
            return
        }
        
     })

    return ( 
        <div id="carousel" className="img-div col-12 carousel slide carousel-fade p-2" data-ride="carousel">
                    <div id='carousel-inner' className="carousel-inner">
                            
                    </div>
                    <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>

        </div>
     );
}
 
export default Carousel;