var carrito = [];
const btnComprar = document.querySelector("#btnComprar")

const recuperarCarrito = () => {
    if (localStorage.getItem("carrito")) {
        console.log(localStorage.getItem("carrito"))
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
        // carritoRecuperado.forEach(producto => carrito.push(producto))
        carrito = carritoRecuperado;
        cargarCarrito();//recargo los productos
    } else {
        console.warn("No se encontró un carrito previamente guardado.")
    }
}

const cargarCarrito = () => {
    let tablaBody;
    const tbody = document.querySelector("#foodtable")
    // carrito.forEach(producto => {
    //     tablaBody += `<tr>
    //                         <th class="centrar">${producto.imagen}</th>
    //                         <th>${producto.nombre}</th>
    //                         <th>$ ${producto.precio}</th>
    //                         <th><button id="${producto.nombre}" class="button-delete button-small">x</button></th>
    //                     </tr>`
    // })

    // remplazo por map, es mas rapido segun testeos hechos
    carrito.map((value, index) => {
        tablaBody += `<tr key="${index}">
                        <th class="centrar">${value.imagen}</th>
                        <th>${value.nombre}</th>
                        <th>$ ${value.precio}</th>
                        <th><button id="${value.nombre}" class="button-delete button-small">x</button></th>
                    </tr>`;
    });
    console.log(tablaBody);
    tbody.innerHTML = tablaBody;
    let totalCarrito = carrito.reduce((acc, prod) => acc + prod.precio, 0)
    tbody.innerHTML += `<tr>
                                <th></th>
                                <th>TOTAL</th>
                                <th>$ ${totalCarrito.toFixed(2)}</th>
                            </tr>`
    activoBotonesDelete() //Una vez que armé toda la tabla, activo el click en los botones DELETE 
}

const activoBotonesDelete = () => { //ARMO ARRAY DE BOTONES DELETE
    const btnsDelete = document.querySelectorAll(".button-delete.button-small")
    btnsDelete.forEach(btn => {
        btn.addEventListener("click", (e) => { //event 
            //uso SPLICE() para borrar un elemento del carrito 
            let aEliminar = carrito.findIndex(producto => producto.nombre === e.target.id)
            carrito.splice(aEliminar, 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }   //ACTUALIZO CARRITO EN LOCALSTORAGE 
        ,
        
        )
    })
}

//Sweet alert
const alerta = (titulo, textoBoton)=> {
    return Swal.fire({title: titulo, confirmButtonText: textoBoton})
}

const carritoVacio = () => {
        alerta("¡El carrito está vacío!", "OPS!")
}

const finalizarCompra = () => {
    alerta('Muchas gracias por su compra.', 'FINALIZAR').then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem(carrito)
            location.href = 'index.html'
        }
    })
}

btnComprar.addEventListener('click', () => carrito.length === 0 ? carritoVacio() : finalizarCompra())

//cargar al inicio

recuperarCarrito()

