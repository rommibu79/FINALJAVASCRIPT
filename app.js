function myFunction() {
    let ingreso = parseInt(prompt(`Por favor ingrese la opcion deseada:
            1- Ingresar nuevo producto
            2- Editar producto
            3- Visualizar productos disponibles
            4- Buscar articulo
            5- salir`));
            
        switch(ingreso){
            case 1:
                ingresar_producto();
                break
            case 2:
                editar_producto();
                break
            case 3:
                visualizar_productos();
                break
            case 4:
                buscar_producto();
                break
            default: 
                alert("adios");
        }
    }
    let Productos = [];
    
    function ingresar_producto() {
        let codigo = prompt("Ingrese el codigo del articulo:");
        let articulo = prompt("Ingrese el nombre del articulo:");
        let marca = prompt("Ingrese la marca del articulo:");
        let modelo = prompt("Ingrese el modelo del articulo:");
        let precio = prompt("Ingrese el precio del articulo:");
        let cantidad = prompt("Ingrese el stock del articulo:");
        let prod = new Object();
        prod.codigo = codigo;
        prod.articulo = articulo;
        prod.marca = marca;
        prod.modelo = modelo;
        prod.precio = precio;
        prod.cantidad = cantidad;
        Productos.push(prod);
        alert("Hola, el producto " + prod.articulo + " es marca " + prod.marca + " modelo " + prod.modelo + " cuesta " + prod.precio);
    }
    
    function buscar_producto(){
        let codigo = prompt("Ingrese el codigo a buscar:");
        let prod = buscar_por_codigo(codigo);
        alert(JSON.stringify(prod));
    }
    
    function buscar_por_codigo(code){
            let prod = Productos.find(item => item.codigo === code);
            if(prod){
                return prod;
            }
            else{
                return "producto no encontrado";
            }
    }
    
    function visualizar_productos(){
        alert(JSON.stringify(Productos));
    }
    
    function editar_producto(){
        let codigo = prompt("Ingrese el codigo del articulo a editar:");
        let edit = buscar_por_codigo(codigo);
        if(edit){
            let articulo = prompt("Ingresa el nuevo nombre de articulo:");
            let marca = prompt("Ingrese la nueva marca del articulo:");
            let modelo = prompt("Ingrese el nuevo modelo del articulo:");
            let precio = prompt("Ingrese el nuevo precio del articulo:");
            let cantidad = prompt("Ingrese el nuevo stock del articulo:");
            producto.articulo = articulo;
            producto.marca = marca;
            producto.modelo = modelo;
            producto.precio = precio;
            producto.cantidad = cantidad;
        }
        else{
            alert("el producto no existe");
        }
    }

    const cards = document.getElementById('cards')
    const items = document.getElementById('items')
    const footer= document.getElementById('footer')
    const templateCard = document.getElementById('template-card').content
    const templateFooter = document.getElementById('template-footer').content
    const templateCarrito = document.getElementById('template-carrito').content
    const fragment = document.createDocumentFragment()
    let carrito = [];
    
    document.addEventListener('DOMContentLoaded', () =>{
        fetchData()
        if(localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'))
            pintarCarrito()
        }
    })
    cards.addEventListener('click', e => {
        addCarrito(e)
    })

    items.addEventListener('click', e => {
        btnAccion(e)
    })
    
    const fetchData = async () => {
        try {
            const res = await fetch('api.json')
            const data = await res.json()
            
            pintarCards(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const pintarCards = data => { 
    
        data.forEach(producto => {
            templateCard.querySelector('h5').textContent=producto.title
            templateCard.querySelector('p').textContent=producto.precio
            templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
            templateCard.querySelector('.btn-dark').dataset.id=producto.id
    
            const clone = templateCard.cloneNode(true) 
            fragment.appendChild(clone)
        })
        cards.appendChild(fragment)
    }
    
    const addCarrito = e => {
        //console.log(e.target)
        //console.log(e.target.classList.contains('btn-dark'))
        if (e.target.classList.contains('btn-dark')){
            setCarrito(e.target.parentElement)
        }
        e.stopPropagation();
        calcularTotal();
    };
    
    function calcularTotal(){
        let total =0;

        carrito.forEach((prod) => {
            total += prod.precio * prod.cantidad;
        });

        console.log(total);

        const t= document.getElementById("totales");
        t.innerHTML = `<h5>$${total}</h5>`;

    }

    
    const setCarrito = objeto => {
        console.log(objeto)
        const producto = {
            id: objeto.querySelector('.btn-dark').dataset.id,
            title: objeto.querySelector('h5').textContent,
            precio: objeto.querySelector('p').textContent,
            cantidad: 1
        }
    
        if(carrito.hasOwnProperty(producto.id)){
            producto.cantidad=carrito[producto.id].cantidad+1
        }
        carrito[producto.id]={ ...producto }
        pintarCarrito ()
    }
    
    const pintarCarrito = () => {
        //console.log(carrito)
        items.innerHTML = ''
        Object.values(carrito).forEach(producto => {
            templateCarrito.querySelector('th').textContent = producto.id
            templateCarrito.querySelectorAll('td')[0].textContent = producto.title
            templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
            templateCarrito.querySelector('.btn-info').dataset.id = producto.id
            templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
            templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
            const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)
        })
        items.appendChild(fragment)

        pintarFooter()
    }
        localStorage.setItem('carrito', JSON.stringify(carrito))
    
        const pintarFooter = () => {
            footer.innerHTML = ''
            if (Object.keys(carrito).length === 0){
                footer.innerHTML = '<th scope="row" colspan="5">Carrito vacio - Prosiga a comprar!</th>'
                return
            }
        }
    
        const nCantidad = Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad,0)
        const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio})=> acc + cantidad * precio,0)
        console.log(nCantidad)
        templateFooter.querySelectorAll('td')[0].textContent = nCantidad
        templateFooter.querySelector('span').textContent = nPrecio

        const clone = templateFooter.cloneNode(true)
        fragment.appendChild(clone)
        footer.appendChild(fragment)

        const btnVaciar = document.getElementById('vaciar-carrito')
        btnVaciar.addEventListener('click', () => {
            carrito = {}
            pintarCarrito()
        })
    

    const btnAccion = e => {
        // se hace una accion de aumentar
        console.log(e.target)
        if(e.target.classList.contains('incrementar')){
            console.log(carrito[e.target.dataset.id])
            const producto = carrito[e.target.dataset.id]
            producto.cantidad++
            carrito[e.target.dataset.id] = {...producto}
            pintarCarrito()
        }

        if(e.target.classList.contains('decrementar')){
            const producto = carrito[e.target.dataset.id]
            producto.cantidad--
            if(producto.cantidad=== 0){
                delete carrito[e.target.dataset.id]
            }
            pintarCarrito()
        }
        e.stopPropagation()
    }

    //e.stopPropagation() : cancela el evento, lo que significa que cualquier acción por defecto que deba producirse como resultado de este evento, no ocurrirá. Puedes usar event.
    //querySelector Devuelve el primer elemento del documento (utilizando un recorrido primero en profundidad pre ordenado de los nodos del documento) que coincida con el grupo especificado de selectores
    //addEventListener es un escuchador que indica al navegador que este atento a la interacción del usuario.
    //appendChild El método appendChild() inserta un nuevo nodo dentro de la estructura DOM de un documento, y es la segunda parte del proceso central uno-dos, crear-y-añadir para construir páginas web a base de programación
    //"Parsing" significa analizar y convertir un programa en un formato interno que un entorno de ejecución pueda realmente ejecutar, por ejemplo el motor JavaScript dentro de los navegadores
    //El método JSON. parse() analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis.3 dic 2022
    //stringify() convierte un objeto o valor de JavaScript en una cadena de texto JSON, opcionalmente reemplaza valores si se indica una función de reemplazo, o si se especifican las propiedades mediante un array de reemplazo
    //Async y await en JavaScript son dos palabras clave que nos permiten transformar un código asíncrono para que parezca ser síncrono.
    //btn-default : Botón estándar o por defecto.
    //btn-primary : Es un botón que se destaca entre un conjunto de botones.
    //btn-success : Se utiliza para indicar una acción exitosa (por ejemplo luego de registrarse a un servicio donde se muestra un botón para ir a la página principal del sitio)
    //btn-info : Es un botón para información.
    //btn-warning : Es un botón que nos informa que debemos tener cuidado con la acción que tiene asociado el botón.
    //btn-danger : Indica que la acción que tiene asociado el botón es peligrosa.
    //btn-link : Convierte al botón como un hipervínculo, haciendo que disminuya su importancia.