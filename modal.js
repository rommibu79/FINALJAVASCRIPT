
botonAbrir . addEventListener ( 'clic' ,  ( ) => {
    contenedorModal . listaclases . alternar ( 'modal-activo' )
} )
botonCerrar . addEventListener ( 'clic' ,  ( ) => {
    contenedorModal . listaclases . alternar ( 'modal-activo' )
} )

contenedorModal . addEventListener ( 'clic' ,  ( evento )  => {
    contenedorModal . listaclases . alternar ( 'modal-activo' )

} )
modalCarrito . addEventListener ( 'clic' ,  ( evento )  =>  {
    evento . stopPropagation ( )  //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //capellán
} )