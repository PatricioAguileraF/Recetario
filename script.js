let botonBurger = document.querySelector('#burger-button');
let botonCrear = document.querySelector('#boton-crear');
let botonEliminarInfo = document.querySelector('#boton-eliminar-info');
let botonEliminar = document.querySelector('.boton-eliminar');
let botonEliminarDetalle = document.querySelector('#boton-eliminar-detalle');
let botonGuardar = document.querySelector('.boton-guardar');
let ul = document.querySelector('.lista-recetas'); //selecciona el elemento ul
let recetaEnEdicion = null;


//Cargar datos si hay, sino empieza con una lista vacia

let datosGuardados = localStorage.getItem('misRecetas');
let listaRecetas = datosGuardados ? JSON.parse(datosGuardados) : [];
mostrarReceta();

// Se le agrega un evento de click al boton de hamburguesa para desplegar el modulo de informacion

botonBurger.addEventListener('click', () => {
    document.querySelector('.modulo-info').classList.add('modulo-info-activo');
})

// Se le agrega un evento de click al boton de eliminar info para cerrar el modulo de informacion

botonEliminarInfo.addEventListener('click', () => {
    document.querySelector('.modulo-info').classList.remove('modulo-info-activo');
})

botonEliminarDetalle.addEventListener('click', () => {
    document.querySelector('.modulo-contenedor-detalle').style.display = 'none';
})

// Se aagrega un evento al boton de crear para desplegar el modulo donde se rellenan los campos para hacer la receta nueva.

botonCrear.addEventListener('click', () => {
    document.querySelector('.modulo-contenedor').style.display = 'block'

    //Se limpian los campos para que el usuario cree otra receta
    document.getElementById('input-titulo').value = '';
    document.getElementById('txt-ingredientes').value = '';
    document.getElementById('txt-preparacion').value = '';
    document.getElementById('txt-descripcion').value = '';
})

botonEliminar.addEventListener('click', () => {
    document.querySelector('.modulo-contenedor').style.display = 'none'
})

botonGuardar.addEventListener('click', () => {

    //Quitar el contenedor principal del modulo
    document.querySelector('.modulo-contenedor').style.display = 'none'

    if (recetaEnEdicion) {
        recetaEnEdicion.titulo = document.querySelector('#input-titulo').value;
        recetaEnEdicion.ingredientes = document.querySelector('#txt-ingredientes').value;
        recetaEnEdicion.preparacion = document.querySelector('#txt-preparacion').value;
        recetaEnEdicion.descripcion = document.querySelector('#txt-descripcion').value;

        recetaEnEdicion = null;
        guardarEnLocalStorage();
        
    } else {

        let recetaNueva = {
            titulo: document.querySelector('#input-titulo').value,
            ingredientes: document.querySelector('#txt-ingredientes').value,
            preparacion: document.querySelector('#txt-preparacion').value,
            descripcion: document.querySelector('#txt-descripcion').value
        }

        listaRecetas.push(recetaNueva);
        guardarEnLocalStorage();
    }

    //selecciono el elemento
    let mensajeExito = document.querySelector('.mensaje');

    //Agrega una clase al elemento .mensaje
    mensajeExito.classList.add('mensaje-activo');

    //funcion despues de 3 segundos desaparece el mensaje
    setTimeout(() => {
        mensajeExito.classList.remove('mensaje-activo');
    }, 3000);

    mostrarReceta();
})

function mostrarReceta() {

    ul.innerHTML = '';

    listaRecetas.forEach(receta => {

        //Creacion de elementos 

        let crearLi = document.createElement('li');
        let crearImg = document.createElement('img');
        let crearH4 = document.createElement('h4');
        let crearBotonEliminar = document.createElement('button');
        let crearBotonEditar = document.createElement('button');

        // asignando contenido a los elementos creados

        crearImg.src = './recursos/imagen-receta.jpg';
        crearH4.textContent = receta.titulo;
        crearBotonEliminar.textContent = '❌';
        crearBotonEditar.textContent = '✏️';

        //asignando clases a elementos

        crearBotonEliminar.classList.add('boton-eliminar-receta');
        crearBotonEditar.classList.add('boton-editar-receta');

        // agregando los elementos a la etiqueta ul, es decir al padre.

        crearLi.appendChild(crearImg);
        crearLi.appendChild(crearH4);
        crearLi.appendChild(crearBotonEliminar);
        crearLi.appendChild(crearBotonEditar);
        ul.appendChild(crearLi);


        crearLi.addEventListener('click', () => {
            document.querySelector('.modulo-contenedor-detalle').style.display = 'block'

            //Se le asigna el contenido exacto de la receta que se creo
            document.querySelector('#titulo-detalle h2').textContent = receta.titulo;
            document.querySelector('#ingredientes-detalle p').textContent = receta.ingredientes;
            document.querySelector('#preparacion-detalle p').textContent = receta.preparacion;
            document.querySelector('#descripcion-detalle p').textContent = receta.descripcion;
        })

        crearBotonEliminar.addEventListener('click', (e) => {
            e.stopPropagation();

            //Obtengo el indice en donde se encuentra esta receta en la lista.
            let indice = listaRecetas.indexOf(receta);
            listaRecetas.splice(indice, 1);
            guardarEnLocalStorage();
            ul.removeChild(crearLi);
        })

        crearBotonEditar.addEventListener('click', (e) => {
            e.stopPropagation();

            recetaEnEdicion = receta;
            document.querySelector('.modulo-contenedor').style.display = 'block'
            document.querySelector('#input-titulo').value = receta.titulo;
            document.querySelector('#txt-ingredientes').value = receta.ingredientes;
            document.querySelector('#txt-preparacion').value = receta.preparacion;
            document.querySelector('#txt-descripcion').value = receta.descripcion;

        })
    });
}


function guardarEnLocalStorage(){
    const listaEnTexto = JSON.stringify(listaRecetas);
    localStorage.setItem('misRecetas', listaEnTexto);
}

