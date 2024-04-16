import React, { ImgHTMLAttributes, useEffect, useRef, useState } from 'react'


//props q vienen del padre unicamnte para el componente
type ComponentProps = {image: string, alt: string};
//atributos Nativos de la etiqueta img(ej: onClick), con esto me voy a evitar escribir cada evento/props q le quiera pasar
type ImageNativeProps = ImgHTMLAttributes<HTMLImageElement>; //viene desde React --> ImgHTMLAttributes<HTMLImageElement>
//los voy a combinar osea UNION
type Props = ComponentProps & ImageNativeProps;


//ESTOY CREANDO UN COMPONENTE GENERICO (osea q me sirva para cualqr imagen reciba)-->
//DEJO Q MEDIANTE LAS PROPS Q LE PASO DESDE EL PADRE, C/DESARROLLADOR ELIJA DICHAS PROS
//por ejem: el ancho, el alto, onClick etc
//y no necesito declarar c/u --> utilizo el spredOperation desde el Padre.

//le estoy pasando props como 100pre en react SOLO q ATENTO a la declaracion, tamb recibo la propiedad ALT por props
function RandomFox({image, alt, ...imgProps}:Props): JSX.Element { 

    //estado para asignar SI es visible
    const [isVisible, setIsVisible] = useState(false);

    //utilizaremos useRef ---> la idea es de saber q imagen está por fuera o dentro del viewPort(solo qrmos q cargue la q está dentro)
    const nodo = useRef<HTMLImageElement>(null); //a useRef le debemos decir el Tipo de elemento en el DOM en el q se va a usar(osea etiqueta de imagen)--> NO olvidar el null

    //como todo lo relacionado al obsevador tiene q suceder del lado del cliente --> usamos un useEffect
    useEffect(() => {
        //creacion del observador
        const observador = new IntersectionObserver((entradas) => { //en el callback recibo una lista de entradas
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    setIsVisible(true);
                    console.log("estoy en el viewport");
                }
            })
        });

        //me aseguro de q el observador está observando nuestro nodo
        //el if quita error de typescript
        if(nodo.current){
            observador.observe(nodo.current) //el valor del contenido de nodo se encuentra en la propiedad current (puede q sea una etiqta img, o no)
        }
        

        //desconectarnos  del componente cuando dicho comp es retirado/o muere 
        //y eso se logra con el return del useEffect
        return () => {
            observador.disconnect();
        };
    }, []); //solo queremos q se EJECUTE CUANDO SE MONTA EL COMP, por eso se coloca el array vacio
    
    return (
        <div style={{marginBottom: "10px"}} ref={nodo}>
            {
                isVisible && 
                <img  
                    src={image} 
                    alt={alt}
                    {...imgProps}  /* aca vienen todas los atributos Q DECLARO en el Padre, nativas de react para dicha etiqueta ejem: onClick etc*/
                />
            }
        </div>
    )
} 

export default RandomFox;