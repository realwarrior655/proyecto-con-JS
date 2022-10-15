//ESTRUCTURAS BASICA HTML CON JAVASCRIPT
const retornoCard = (producto)=> {
    return `<div class="card">
                <div class="card-image">${producto.imagen}</div>
                <div class="card-name">${producto.nombre}</div>
                <div class="card-price">$ ${producto.precio}</div>
                <div class="card-button">
                    <button class="button button-outline button-add" id="${producto.nombre}" title="Clic para agregar el '${producto.nombre}' al carrito">+</button>
                </div>
            </div>`
}

//POR SI SE PRESENTA UN PROBLEMA
const Error = ()=> {
return  `<div class="card-error">
            <h2>No sabemos que pasó, pero no es lo que esperabamos...</h2>
            <h3>En caso de no visualizar los productos, recarga la página 🤦🏻‍♂️</h3>
            <h3>Si el error persiste, por favor comunicate con nosotros a este mail:
            <br>info.error@tusnack.com</h3>
        </div>`
}