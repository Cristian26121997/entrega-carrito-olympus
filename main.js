let carritoVisible = false;
let productos = [];  // Variable para almacenar los productos desde el JSON

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    cargarDatosDesdeJSON().then(data => {
        productos = data;  // Guarda los datos del JSON en la variable productos
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

    // ... Resto del código de setupEventListeners

    const botonesAgregarAlCarrito = document.querySelectorAll('.boton-item');
    botonesAgregarAlCarrito.forEach((button, index) => {
        button.addEventListener('click', () => {
            agregarAlCarritoClicked(productos[index]);  // Pasa el producto correspondiente al clic
        });
    });

    // ... Resto del código de setupEventListeners
}

function agregarAlCarritoClicked(producto) {
    agregarItemAlCarrito(producto.titulo, producto.precio, producto.imagen);
    hacerVisibleCarrito();
}



// Función para cargar datos desde un JSON local usando fetch y promesas
function cargarDatosDesdeJSON() {
    return fetch('productos.json')  // Reemplaza con la ruta correcta a tu JSON
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









