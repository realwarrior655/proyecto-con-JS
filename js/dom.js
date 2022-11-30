let productos = []
const carrito = []
const urlFetch = 'https://63727631348e947299f6299d.mockapi.io/api/productos/productos'
const container = document.querySelector("div.container")

//EVENTO CLICK EN LOS BOTONES DE LAS CARDS
const activarBotonesAdd = ()=> { 
    const botonesAdd = document.querySelectorAll(".button.button-outline.button-add")
        botonesAdd.forEach(btn => btn.addEventListener("click", (e)=> agregarAlCarrito(e)))
}

//armo las cards para la pantalla, activo botones y preparo protocolo de error

const cargarMisProductos = async ()=> {
    let armoHTML = ""
    let activoBotones = true

    try {
        const response = await fetch(urlFetch)
        productos= await response.json()
        productos.forEach(producto => armoHTML += retornoCard(producto))
    } catch (error) {
        
    } finally {
        container.innerHTML = armoHTML
        if(activoBotones) {
            activarBotonesAdd()
        }
    }
}


//PLANTILLA DE TOASTIFY

const toast = (mensaje) => {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        }).showToast();
}

//AGREGAR UN PRODUCTO AL CARRITO

const agregarAlCarrito = (e)=> {
    let resultado = productos.find(prod => prod.nombre === e.target.id)
        if (resultado !== undefined) {
            carrito.push(resultado)
            guardarCarrito()
            toast(`'${e.target.id}' es un elemento del carrito ahora.`)
            }
}

const guardarCarrito = () => { //ACA USO OPERADOR LOGICO
    carrito.length > 0 && localStorage.setItem("carrito", JSON.stringify(carrito))
}

const recuperarCarrito = ()=> {
    if (localStorage.getItem(carrito)) {
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito")) || []
            carritoRecuperado.forEach(producto => carrito.push(producto))
    } else {
        console.warn("No se encontró un carrito previamente guardado.")
    }
}

//si hay un carrito previo 
recuperarCarrito()

//cargar productos para comprar
cargarMisProductos()
