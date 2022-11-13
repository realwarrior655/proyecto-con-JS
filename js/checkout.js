const carrito = []
const btnComprar = document.querySelector("#btnComprar")

const recuperarCarrito = ()=> {
    if (localStorage.getItem(carrito)) {
        let carritoRecuperado = JSON.parse(localStorage.getItem(carrito)) || []
            carritoRecuperado.forEach(producto => carrito.push(producto))
    } else {
        console.warn("No se encontró un carrito previamente guardado.")
    }
}

const cargarCarrito = ()=> {
    let tablaBody = ""
    const tbody = document.querySelector("tbody")
        tbody.innerHTML = ""
        carrito.forEach(producto => {
            tablaBody += `<tr>
                            <th class="centrar">${producto.imagen}</th>
                            <th>${producto.nombre}</th>
                            <th>$ ${producto.precio}</th>
                            <th><button id="${producto.nombre}" class="button-delete button-small">x</button></th>
                        </tr>`
        })
        tbody.innerHTML = tablaBody
    let totalCarrito = carrito.reduce((acc, item)=> acc + item.precio, 0 )
        tbody.innerHTML += `<tr>
                                <th></th>
                                <th>TOTAL</th>
                                <th>$ ${totalCarrito.toFixed(2)}</th>
                            </tr>`
        activoBotonesDelete() //Una vez que armé toda la tabla, activo el click en los botones DELETE 
}

const activoBotonesDelete = ()=> { //ARMO ARRAY DE BOTONES DELETE
    const btnsDelete = document.querySelectorAll(".button-delete.button-small")
        btnsDelete.forEach(btn => {
            btn.addEventListener("click", (e)=> { //event 
                //BUSCO INDEX DE UN PRODUCTO EN CARRITO Y LO ELIMINO CON SPLICE() 
                let aEliminar = carrito.findIndex(producto => producto.nombre === e.target.id) 
                    carrito.splice(aEliminar, 1)
                    localStorage.setItem("carrito", JSON.stringify(carrito)) //ACTUALIZO CARRITO EN LOCALSTORAGE 
                    cargarCarrito() //RECARGO CARRITO EN TABLE Y SE ACTUALIZAN LOS PRODUCTOS 
            })
        })
}

//INTEGRO SWEET ALERT DE FORMA GENERICA
const alerta = (titulo, textoBoton)=> {
    return Swal.fire({title: titulo, confirmButtonText: textoBoton})
}

const carritoVacio = ()=> {
        alerta("¡El carrito está vacío!", "OPS!")
}

const finalizarCompra = ()=> {
    alerta('Muchas gracias por su compra.', 'FINALIZAR').then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito")
            location.href = 'index.html'
        }
    })
}

btnComprar.addEventListener("click", ()=> carrito.length === 0 ? carritoVacio() : finalizarCompra() )

//CARGAR AL INICIO DEL FORMULARIO HTML

recuperarCarrito()
carrito.length > 0 && cargarCarrito()
