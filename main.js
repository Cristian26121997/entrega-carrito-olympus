let carritoVisible = false;
let productos = [];
let carrito = [];  // Variable para almacenar los productos en el carrito

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    cargarDatosDesdeJSON().then(data => {
        productos = data;
        setupEventListeners();
    }).catch(error => {
        console.error('Error al cargar los datos:', error);
    });
}

function setupEventListeners() {
    const botonesEliminarItem = document.querySelectorAll('.btn-eliminar');
    botonesEliminarItem.forEach(button => {
        button.addEventListener('click', eliminarItemCarrito);
    });

    const botonesAgregarAlCarrito = document.querySelectorAll('.boton-item');
    botonesAgregarAlCarrito.forEach((button, index) => {
        button.addEventListener('click', () => {
            agregarAlCarritoClicked(productos[index]);
            actualizarTotal();
            hacerVisibleCarrito();
        });
    });

    const botonesSumarCantidad = document.querySelectorAll('.sumar-cantidad');
    botonesSumarCantidad.forEach(button => {
        button.addEventListener('click', sumarCantidad);
    });

    const botonesRestarCantidad = document.querySelectorAll('.restar-cantidad');
    botonesRestarCantidad.forEach(button => {
        button.addEventListener('click', restarCantidad);
    });
}

function agregarAlCarritoClicked(producto) {
    const productoEnCarrito = carrito.find(item => item.titulo === producto.titulo);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            titulo: producto.titulo,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

function cargarDatosDesdeJSON() {
    return fetch('./productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos.');
            }
            return response.json();
        })
        .catch(error => {
            throw new Error('Error al cargar los datos:', error);
        });
}

function hacerVisibleCarrito() {
    const carrito = document.getElementById('carrito');
    carrito.style.opacity = '1';
    carrito.style.marginRight = '0';
}

function eliminarItemCarrito(event) {
    const productoIndex = event.target.dataset.index;
    carrito.splice(productoIndex, 1);
    actualizarCarrito();
}

function sumarCantidad(event) {
    const productoIndex = event.target.dataset.index;
    carrito[productoIndex].cantidad++;
    actualizarCarrito();
}

function restarCantidad(event) {
    const productoIndex = event.target.dataset.index;
    if (carrito[productoIndex].cantidad > 1) {
        carrito[productoIndex].cantidad--;
        actualizarCarrito();
    }
}

function actualizarTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    const totalElement = document.querySelector('.carrito-precio-total');
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function actualizarCarrito() {
    const carritoItems = document.querySelector('.carrito-items');
    carritoItems.innerHTML = '';

    carrito.forEach((item, index) => {
        const productoEnCarrito = document.createElement('div');
        productoEnCarrito.classList.add('carrito-item');
        productoEnCarrito.innerHTML = `
            <img src="${item.imagen}" alt="${item.titulo}">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${item.titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad" data-index="${index}"></i>
                    <input type="text" value="${item.cantidad}" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad" data-index="${index}"></i>
                </div>
                <span class="carrito-item-precio">$${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
            <button class="btn-eliminar" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        carritoItems.appendChild(productoEnCarrito);
    });

    actualizarTotal();

    const botonesEliminarItem = document.querySelectorAll('.btn-eliminar');
    botonesEliminarItem.forEach(button => {
        button.addEventListener('click', eliminarItemCarrito);
    });

    const botonesSumarCantidad = document.querySelectorAll('.sumar-cantidad');
    botonesSumarCantidad.forEach(button => {
        button.addEventListener('click', sumarCantidad);
    });

    const botonesRestarCantidad = document.querySelectorAll('.restar-cantidad');
    botonesRestarCantidad.forEach(button => {
        button.addEventListener('click', restarCantidad);
    });
}





