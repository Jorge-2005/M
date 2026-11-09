const canvas = document.getElementById("flor");
const ctx = canvas.getContext("2d");

const particulas = [];

const centroX = 400;
const centroY = 280;

// CREAR PÉTALOS
for (let i = 0; i < 2500; i++) {
    const angulo = Math.random() * Math.PI * 2;
    const esCentro = Math.random() < 0.12;

    let distancia;

    if (esCentro) {
        distancia = Math.random() * 25;
    } else {
        distancia = 100
            + Math.sin(angulo * 6) * 45
            + (Math.random() - 0.5) * 30;
    }

    particulas.push({
        x: centroX + Math.cos(angulo) * distancia,
        y: centroY + Math.sin(angulo) * distancia,
        radio: Math.random() * 2.5 + 0.5,
        color: esCentro ? 1 : 0,
        fase: Math.random() * Math.PI * 2,
        velocidad: Math.random() * 0.02 + 0.005
    });
}

// CREAR TALLO
for (let i = 0; i < 700; i++) {
    const t = Math.random();

    const x = (1 - t) ** 2 * 400
        + 2 * (1 - t) * t * 370
        + t ** 2 * 400;

    const y = (1 - t) ** 2 * 400
        + 2 * (1 - t) * t * 475
        + t ** 2 * 550;

    particulas.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        radio: Math.random() * 2 + 0.5,
        color: 2,
        fase: Math.random() * Math.PI * 2,
        velocidad: Math.random() * 0.02
    });
}

// CREAR HOJAS
function crearHoja(cx, cy, rotacion) {
    for (let i = 0; i < 350; i++) {
        const t = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random());

        const x = 35 * r * Math.cos(t);
        const y = 12 * r * Math.sin(t);

        const rx = x * Math.cos(rotacion) - y * Math.sin(rotacion);
        const ry = x * Math.sin(rotacion) + y * Math.cos(rotacion);

        particulas.push({
            x: cx + rx,
            y: cy + ry,
            radio: Math.random() * 2 + 0.5,
            color: 2,
            fase: Math.random() * Math.PI * 2,
            velocidad: Math.random() * 0.02
        });
    }
}

crearHoja(416, 470, -0.5);
crearHoja(360, 510, 0.5);

// ANIMACIÓN
let tiempo = 0;

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tiempo += 0.02;

    for (const p of particulas) {
        const brillo = 0.45 + Math.sin(tiempo + p.fase) * 0.35;

        let color;

        if (p.color === 0) {
            color = `rgba(194, 91, 255, ${brillo})`;
        } else if (p.color === 1) {
            color = `rgba(255, 218, 255, ${brillo})`;
        } else {
            color = `rgba(180, 70, 255, ${brillo})`;
        }

        const movimientoX = Math.sin(tiempo * 0.8 + p.fase) * 1.2;
        const movimientoY = Math.cos(tiempo * 0.7 + p.fase) * 1.2;

        ctx.beginPath();
        ctx.arc(
            p.x + movimientoX,
            p.y + movimientoY,
            p.radio,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#bd55ff";
        ctx.fill();
    }

    ctx.shadowBlur = 0;

    requestAnimationFrame(animar);
}

animar();