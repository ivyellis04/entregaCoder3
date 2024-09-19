// Función para capitalizar texto
function capitalizarTexto(texto) {
    return texto.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

// Variables
let canciones = JSON.parse(localStorage.getItem('canciones')) || [];
let idCancion = canciones.length ? canciones[canciones.length - 1].id + 1 : 0;

// Selección de elementos del DOM
const nombreInput = document.getElementById('nombre-cancion');
const artistaInput = document.getElementById('artista');
const generoInput = document.getElementById('genero');
const linkInput = document.getElementById('link-cancion');
const listaCanciones = document.getElementById('lista-canciones');
const btnAgregar = document.getElementById('btn-agregar');

// Función para agregar una canción
function agregarCancion() {
    const nombre = capitalizarTexto(nombreInput.value.trim());
    const artista = capitalizarTexto(artistaInput.value.trim());
    const genero = capitalizarTexto(generoInput.value.trim());
    const link = linkInput.value.trim();

    if (nombre === "" || artista === "" || genero === "" || link === "") {
        mostrarMensaje("Por favor, completá todos los campos.", "error");
        return;
    }

    const nuevaCancion = {
        id: idCancion++,
        nombre: nombre,
        artista: artista,
        genero: genero,
        link: link,
        favorita: false
    };

    canciones.push(nuevaCancion);
    localStorage.setItem('canciones', JSON.stringify(canciones));

    mostrarCanciones();

    nombreInput.value = '';
    artistaInput.value = '';
    generoInput.value = '';
    linkInput.value = '';

    mostrarMensaje(`¡Qué buena la canción "${nombre}" de ${artista}!`, "exito");
}

function mostrarCanciones() {
    listaCanciones.innerHTML = '';

    canciones.forEach(cancion => {
        let li = document.createElement('li');
        li.textContent = `${cancion.nombre} - ${cancion.artista} [${cancion.genero}]`;

        let linkCancion = document.createElement('a');
        linkCancion.href = cancion.link;
        linkCancion.textContent = ' Escuchar';
        linkCancion.target = '_blank';
        li.appendChild(linkCancion);

        let btnFavorita = document.createElement('button');
        btnFavorita.textContent = cancion.favorita ? 'No Fav' : 'Fav';
        btnFavorita.classList.add('btn-favorita');
        btnFavorita.onclick = function () {
            cancion.favorita = !cancion.favorita;
            localStorage.setItem('canciones', JSON.stringify(canciones));
            mostrarCanciones();
        };

        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = function () {
            canciones = canciones.filter(c => c.id !== cancion.id);
            localStorage.setItem('canciones', JSON.stringify(canciones));
            mostrarCanciones();
        };

        let acciones = document.createElement('div');
        acciones.classList.add('btn-acciones');
        acciones.appendChild(btnFavorita);
        acciones.appendChild(btnEliminar);

        li.appendChild(acciones);
        listaCanciones.appendChild(li);
    });
}

function mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.textContent = mensaje;
    divMensaje.classList.add(tipo === "error" ? 'mensaje-error' : 'mensaje-exito');

    document.querySelector('.container').insertBefore(divMensaje, document.getElementById('formulario-contenedor'));

    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
}

btnAgregar.addEventListener('click', agregarCancion);

mostrarCanciones();
