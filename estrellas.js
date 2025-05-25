// Personaliza aquí tus mensajes bonitos para tu crush
const mensajesBonitos = [
  "Eres la estrella más brillante del universo 💫",
  "Cada vez que sonríes, iluminas⭐️",
  "Si pudiera pedir un deseo, sería pasar cada noche jugando con tigo✨",
  "Tus ojos tienen más magia que todas las estrellas juntas 🌠",
  "Estar contigo es como ver el cielo en su máximo esplendor 💙",
  "Estas llena de luz y color 🌌",
  "Tú eres la constelación principal 🪐",
  "Gracias por existir y por hacer de mi mundo un lugar más bonito 🌟",
  "Tu risa hace brillar mi universo más que mil galaxias 💞",
  "Eres ese destello inesperado que embellece todo 🌟",
  "Eres como un eclipse: todos paran para verte 🌑🌞",
  "Tu energía transforma el espacio a tu alrededor ⚡🌌",
  "Tienes una galaxia de ideas hermosas dentro de ti 💭🌌",
  "Si fueras una estrella, serías de esas que nunca dejan de arder 🔥⭐",
  "Tu existencia ya es un regalo para este mundo 🎁🌠"
];

// Configuración
const totalEstrellas = 120; // ¡Ahora muchas más estrellas!
const minRadio = 8, maxRadio = 18;

// Obtén dimensiones
const canvas = document.getElementById('cielo');
const ctx = canvas.getContext('2d');
let estrellas = [];

// Redimensiona el canvas a pantalla completa
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  generarEstrellas();
});

// Crea estrellas con posiciones y radios aleatorios
function generarEstrellas() {
  estrellas = [];
  for(let i=0; i<totalEstrellas; i++) {
    let radio = Math.random() * (maxRadio-minRadio) + minRadio;
    let x = Math.random() * (canvas.width - 2*radio) + radio;
    let y = Math.random() * (canvas.height - 2*radio) + radio + 40; // evitar zona superior para mensajes
    let parpadeo = Math.random()*1.5+0.5;
    estrellas.push({
      x, y, radio,
      alpha: Math.random()*0.5+0.5,
      dAlpha: (Math.random()-0.5)*0.012,
      parpadeo, // Velocidad de parpadeo
      mensaje: mensajesBonitos[i%mensajesBonitos.length]
    });
  }
}
generarEstrellas();

// Dibuja el fondo y las estrellas
function dibujar() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Fondo degradado
  let grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#20243d");
  grad.addColorStop(0.7, "#253864");
  grad.addColorStop(1, "#11172c");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Estrellas
  for(const est of estrellas) {
    // Parpadeo
    est.alpha += est.dAlpha * est.parpadeo;
    if(est.alpha < 0.4 || est.alpha > 1){
      est.dAlpha *= -1;
      est.alpha = Math.max(0.4, Math.min(1, est.alpha));
    }
    ctx.save();
    ctx.globalAlpha = est.alpha;
    // Círculo exterior brillante
    let gradStar = ctx.createRadialGradient(est.x, est.y, est.radio*0.1, est.x, est.y, est.radio);
    gradStar.addColorStop(0, "#fffbe9");
    gradStar.addColorStop(0.8, "#fffbe900");
    ctx.beginPath();
    ctx.arc(est.x, est.y, est.radio, 0, Math.PI * 2);
    ctx.fillStyle = gradStar;
    ctx.shadowColor = "#fffbe9";
    ctx.shadowBlur = 16;
    ctx.fill();

    // Estrella central
    ctx.globalAlpha = est.alpha*1.1;
    ctx.beginPath();
    ctx.arc(est.x, est.y, est.radio*0.45, 0, Math.PI * 2);
    ctx.fillStyle = "#fffbe9";
    ctx.shadowBlur = 0;
    ctx.fill();

    ctx.restore();
  }
  requestAnimationFrame(dibujar);
}
dibujar();

// Interactividad: cada estrella es un botón
canvas.addEventListener('click', function(e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  for(const est of estrellas) {
    let dx = est.x - clickX;
    let dy = est.y - clickY;
    if(dx*dx + dy*dy < est.radio*est.radio){
      mostrarMensaje(est.mensaje);
      break;
    }
  }
});

// Mensajes bonitos animados
const mensajesDiv = document.getElementById('mensajes');
let cerrando = false;
function mostrarMensaje(mensaje) {
  if(cerrando) return;
  mensajesDiv.textContent = mensaje;
  mensajesDiv.classList.add("mostrar");
  cerrando = true;
  setTimeout(() => {
    mensajesDiv.classList.remove("mostrar");
    cerrando = false;
  }, 2800);
}

// Bonus: ¡agrega estrellas fugaces!
function estrellaFugaz() {
  const y = Math.random() * (canvas.height*0.7) + canvas.height*0.15;
  const x0 = Math.random() * (canvas.width*0.7);
  const ang = Math.random()*Math.PI/7 - Math.PI/14;
  let t = 0;
  function dibujarFugaz() {
    ctx.save();
    ctx.globalAlpha = 0.7 - t/25;
    ctx.strokeStyle = "#fffbe9";
    ctx.shadowColor = "#fffbe9";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(x0+t*18*Math.cos(ang), y+t*8*Math.sin(ang));
    ctx.lineTo(x0+(t-2)*18*Math.cos(ang), y+(t-2)*8*Math.sin(ang));
    ctx.lineWidth = 2.5-t*0.09;
    ctx.stroke();
    ctx.restore();
    t++;
    if(t < 25) requestAnimationFrame(dibujarFugaz);
  }
  dibujarFugaz();
}
setInterval(() => {
  if(Math.random()<0.5) estrellaFugaz();
}, 2500);

// Botón cerrar instrucciones
const btnCerrar = document.getElementById('cerrar-instrucciones');
const instruccionesDiv = document.getElementById('instrucciones');
btnCerrar.addEventListener('click', () => {
  instruccionesDiv.style.display = "none";
});