// === UNIDAD II: JAVASCRIPT ===

// Variables globales
const jugadoresPorPagina = 6;
let paginaActual = 1;
let totalJugadores = 0;
let todosLosJugadores = [];

// Elementos del DOM
let gridJugadores, paginacion, barraProgreso;

// ✅ FUNCIÓN PRINCIPAL CON DATOS EMBEBIDOS (evita CORS)
function cargarJugadores() {
    try {
        console.log('🚀 Iniciando carga de datos...');
        mostrarBarraProgreso();

        // ✅ USAR DATOS DIRECTAMENTE (evita problemas de CORS)
        const data = {
            "jugadores": [
                {
                    "id": "miguel-cabrera",
                    "nombre": "Miguel Cabrera",
                    "ciudadNatal": "Maracay, Aragua",
                    "debut": "2003",
                    "retiro": "2023",
                    "equipos": ["Florida Marlins", "Detroit Tigers"],
                    "logros": ["Triple Corona 2012", "2x MVP", "12x All-Star"],
                    "imagen": "https://ca-times.brightspotcdn.com/dims4/default/edd9eb7/2147483647/strip/true/crop/4674x3117+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F13%2F64%2F62b6273fbbee4c256a13895a0ea5%2Fab268fb7b1cd4b0f81f4a1b647d06af2"
                },
                {
                    "id": "luis-aparicio",
                    "nombre": "Luis Aparicio", 
                    "ciudadNatal": "Maracaibo, Zulia",
                    "debut": "1956",
                    "retiro": "1973",
                    "equipos": ["Chicago White Sox", "Baltimore Orioles", "Boston Red Sox"],
                    "logros": ["Salón de la Fama", "ROY 1956", "13x All-Star", "9x Guantes de Oro"],
                    "imagen": "https://elextrabase.com/wp-content/uploads/2024/04/225-515097602-jpg-0-1024x682.jpg"
                },
                {
                    "id": "johan-santana",
                    "nombre": "Johan Santana",
                    "ciudadNatal": "Tovar, Mérida",
                    "debut": "2000",
                    "retiro": "2012",
                    "equipos": ["Minnesota Twins", "New York Mets"],
                    "logros": ["2x Cy Young", "Triple Corona de Picheo 2006", "4x All-Star"],
                    "imagen": "https://img.mlbstatic.com/mlb-images/image/private/t_2x1/t_w1536/mlb/gl5ru6c3gfy1gmh3bnoo.jpg"
                },
                {
                    "id": "omar-vizquel",
                    "nombre": "Omar Vizquel",
                    "ciudadNatal": "Caracas, Distrito Capital",
                    "debut": "1989",
                    "retiro": "2012",
                    "equipos": ["Seattle Mariners", "Cleveland Indians", "San Francisco Giants"],
                    "logros": ["11x Guantes de Oro", "3x All-Star", "Récod de juegos en shortstop"],
                    "imagen": "https://lvbp.com/wp-content/uploads/2024/05/omar-vizquel-obtuvo-el-37-de-los-votos-en-su-primer-ano-de-elegibilidad-a-cooperstown_6651654ea41b1.jpeg"
                },
                {
                    "id": "ronald-acuna",
                    "nombre": "Ronald Acuña Jr.",
                    "ciudadNatal": "La Guaira, La Guaira",
                    "debut": "2018",
                    "retiro": null,
                    "equipos": ["Atlanta Braves"],
                    "logros": ["MVP 2023", "4x All-Star", "Club 40-70"],
                    "imagen": "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/jfcgssfygzqjynlzgrkw"
                },
                {
                    "id": "david-concepcion",
                    "nombre": "David Concepción",
                    "ciudadNatal": "Ocumare de la Costa, Aragua",
                    "debut": "1970",
                    "retiro": "1988",
                    "equipos": ["Cincinnati Reds"],
                    "logros": ["5x Guantes de Oro", "9x All-Star", "2x Serie Mundial"],
                    "imagen": "https://elextrabase.com/wp-content/uploads/2021/12/CONCEPCION.jpg"
                },
                {
                    "id": "andres-galarraga",
                    "nombre": "Andrés Galarraga",
                    "ciudadNatal": "Caracas, Distrito Capital",
                    "debut": "1985",
                    "retiro": "2004",
                    "equipos": ["Montreal Expos", "Colorado Rockies", "Atlanta Braves"],
                    "logros": ["2x Bateo de NL", "5x All-Star", "2x Guantes de Oro"],
                    "imagen": "https://avn.info.ve/wp-content/uploads/2025/08/IMG_3424.webp"
                },
                {
                    "id": "felix-hernandez",
                    "nombre": "Félix Hernández",
                    "ciudadNatal": "Valencia, Carabobo",
                    "debut": "2005",
                    "retiro": "2019",
                    "equipos": ["Seattle Mariners"],
                    "logros": ["Cy Young 2010", "6x All-Star", "Juego Perfecto 2012"],
                    "imagen": "https://magallanesbbc.com.ve/img/lg/584.jpg"
                }
            ]
        };

        console.log('📊 Datos cargados:', data);
        
        // Asignar a variable global
        todosLosJugadores = data.jugadores;
        totalJugadores = todosLosJugadores.length;
        
        console.log(`✅ Se cargaron ${totalJugadores} jugadores`);
        
        // Mostrar en la interfaz
        mostrarJugadores(paginaActual);
        configurarPaginacion();
        ocultarBarraProgreso();
        
    } catch (error) {
        console.error('❌ Error:', error);
        ocultarBarraProgreso();
        manejarErrorCarga(error);
    }
}

// ✅ FUNCIÓN MOSTRAR JUGADORES (que estaba faltando)
function mostrarJugadores(pagina) {
    if (!gridJugadores) {
        console.error('❌ gridJugadores no encontrado');
        return;
    }
    
    const inicio = (pagina - 1) * jugadoresPorPagina;
    const fin = inicio + jugadoresPorPagina;
    const jugadoresPagina = todosLosJugadores.slice(inicio, fin);
    
    // Limpiar grid
    gridJugadores.innerHTML = '';
    
    // Crear cards para cada jugador
    jugadoresPagina.forEach(jugador => {
        const card = crearCardJugador(jugador);
        gridJugadores.appendChild(card);
    });
}

// ✅ FUNCIÓN CREAR CARD
function crearCardJugador(jugador) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    col.innerHTML = `
        <div class="card jugador-card h-100">
            <img src="${jugador.imagen}" class="card-img-top" alt="${jugador.nombre}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${jugador.nombre}</h5>
                <p class="card-text">
                    <i class="bi bi-geo-alt"></i> ${jugador.ciudadNatal}<br>
                    <i class="bi bi-calendar"></i> ${jugador.debut} - ${jugador.retiro || 'Activo'}<br>
                    <i class="bi bi-trophy"></i> ${jugador.logros.join(', ')}
                </p>
                <button class="btn btn-outline-warning btn-sm" onclick="mostrarDetalles('${jugador.id}')">
                    Ver detalles
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// ✅ FUNCIÓN CONFIGURAR PAGINACIÓN
function configurarPaginacion() {
    if (!paginacion) return;
    
    const totalPaginas = Math.ceil(totalJugadores / jugadoresPorPagina);
    paginacion.innerHTML = '';
    
    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === paginaActual ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="cambiarPagina(${i})">${i}</a>`;
        paginacion.appendChild(li);
    }
}

// ✅ FUNCIÓN CAMBIAR PÁGINA
function cambiarPagina(pagina) {
    paginaActual = pagina;
    mostrarJugadores(paginaActual);
    configurarPaginacion();
    window.scrollTo({ top: gridJugadores.offsetTop - 100, behavior: 'smooth' });
}

// ✅ FUNCIÓN BUSCAR JUGADOR
function buscarJugador(termino) {
    if (!termino.trim()) {
        // Si está vacío, mostrar todos
        mostrarJugadores(paginaActual);
        configurarPaginacion();
        return;
    }
    
    const jugadoresFiltrados = todosLosJugadores.filter(jugador =>
        jugador.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        jugador.equipos.some(equipo => equipo.toLowerCase().includes(termino.toLowerCase()))
    );
    
    // Mostrar resultados filtrados
    gridJugadores.innerHTML = '';
    jugadoresFiltrados.forEach(jugador => {
        const card = crearCardJugador(jugador);
        gridJugadores.appendChild(card);
    });
    
    // Ocultar paginación durante la búsqueda
    if (paginacion) {
        paginacion.style.display = jugadoresFiltrados.length <= jugadoresPorPagina ? 'none' : 'flex';
    }
}

// ✅ FUNCIÓN MOSTRAR DETALLES
function mostrarDetalles(idJugador) {
    const jugador = todosLosJugadores.find(j => j.id === idJugador);
    if (jugador) {
        alert(`🔍 Detalles de ${jugador.nombre}\n\n🏟️ Equipos: ${jugador.equipos.join(', ')}\n🏆 Logros: ${jugador.logros.join(', ')}`);
    }
}

// ✅ FUNCIONES DE BARRA DE PROGRESO
function mostrarBarraProgreso() {
    if (barraProgreso) {
        barraProgreso.style.display = 'block';
        const progressBar = barraProgreso.querySelector('.progress-bar');
        let width = 0;
        
        const interval = setInterval(() => {
            if (width >= 90) {
                clearInterval(interval);
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }, 20);
    }
}

function ocultarBarraProgreso() {
    if (barraProgreso) {
        const progressBar = barraProgreso.querySelector('.progress-bar');
        progressBar.style.width = '100%';
        progressBar.textContent = '¡Carga completada!';
        
        setTimeout(() => {
            barraProgreso.style.display = 'none';
        }, 1000);
    }
}

function manejarErrorCarga(error) {
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger alert-dismissible fade show mt-3';
    alerta.innerHTML = `
        <i class="bi bi-exclamation-triangle"></i> 
        <strong>Error:</strong> ${error.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.querySelector('.container').prepend(alerta);
}

// ✅ INICIAR LA APLICACIÓN
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏠 Página cargada, iniciando aplicación...');
    
    // Inicializar elementos del DOM
    gridJugadores = document.getElementById('gridJugadores');
    paginacion = document.getElementById('paginacion');
    barraProgreso = document.getElementById('barraProgreso');
    
    // Verificar que los elementos existan
    if (!gridJugadores) {
        console.error('❌ No se encontró el elemento gridJugadores');
        return;
    }
    
    // Configurar evento de búsqueda
    const formBusqueda = document.getElementById('formBusqueda');
    if (formBusqueda) {
        formBusqueda.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputBusqueda = document.getElementById('inputBusqueda');
            if (inputBusqueda) {
                buscarJugador(inputBusqueda.value);
            }
        });
    }
    
    // Cargar jugadores
    cargarJugadores();
});