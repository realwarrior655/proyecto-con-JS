const carrito = []
const container = document.querySelector("div.container")

//EVENTO CLICK EN LOS BOTONES DE LAS CARDS
const activarBotonesAdd = ()=> { 
    const botonesAdd = document.querySelectorAll(".button.button-outline.button-add")
          botonesAdd.forEach(btn => btn.addEventListener("click", (e)=> agregarAlCarrito(e)))
}

//ARMO LAS CARDS, PARA CARGARLAS EN PANTALLA
const cargarMisProductos = ()=> { 
    container.innerHTML = ""
    productos.forEach(producto => container.innerHTML += retornoCard(producto))
    activarBotonesAdd() //uso la funcion para activar el evento click en los botones
}
cargarMisProductos()

const agregarAlCarrito = (e)=> {  //AGREGAR UN PRODUCTO AL CARRITO
    let resultado = productos.find(prod => prod.nombre === e.target.id)
        if (resultado !== undefined) {
            carrito.push(resultado)
            console.clear()
            console.table(carrito)
        }
}
