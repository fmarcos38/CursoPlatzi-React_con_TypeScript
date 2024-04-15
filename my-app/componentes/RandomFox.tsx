import React, { FC, FunctionComponent } from 'react'
type Props = {image: string, alt: string};


//formas de crear un componente
//1-implicita(no le digo nada) parece codigo JS pero es TypeScript
/* function RandonFox() {
    return (
        <div>RandonFox</div>
    )
} */

//2-implicita
/* function RandonFox(): JSX.Element {
    return (
        <div>RandonFox</div>
    )
} */

//3-usando importacion de tipos desde Typescript
/* const RandonFox: FunctionComponent = () => {
    return <img/>
} */

//4-usando la importacion FC
/* const RandonFox: FC = () => {
    return <img/>
} */

//la mas aconcejable es la 2da opc
//le estoy pasando props como 100pre en react SOLO q ATENTO a la declaracion, tamb recibo la propiedad ALT por props
function RandomFox({image, alt}:Props): JSX.Element { 

    return (
        <img width={320} height="auto" src={image} alt={alt}/>
    )
} 

export default RandomFox