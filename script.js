// Nubes
const nubesContainer = document.getElementById('nubes');
for(let i = 0; i < 5; i++) {
    const nube = document.createElement('div'); 
    nube.classList.add('nube');
    nube.style.width = `${100 + Math.random() * 100}px`;
    nube.style.height = `${50 + Math.random() * 30}px`;
    nube.style.top = `${Math.random() * 200}px`;
    nube.style.animationDuration = `${20 + Math.random() * 30}s`;
    nubesContainer.appendChild(nube);
}


const tulipanesContainer = document.getElementById('tulipanes');
for (let i = 0; i < 8; i++) {
    const tulipan = document.createElement('div');
    tulipan.classList.add('tulipan');
    tulipan.style.left = `${Math.random() * window.innerWidth}px`;
    tulipan.style.animationDuration = `${5 + Math.random() * 5}s`;
    tulipanesContainer.appendChild(tulipan);
}

//Lógica de los adornos
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulas = [];
for(let i = 0; i < 100; i++){
    particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random()-0.5) * 0.5,
        dy: (Math.random()-0.5) * 0.5
    });
}

function animarParticulas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particulas.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,192,203,0.7)'; // rosa suave
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animarParticulas);
}

const btn = document.getElementById('btnAsistir');

btn.addEventListener('click', async () => {
    const nombre = prompt("¿Cómo te llamas?");
    if(!nombre) return alert("Debes poner tu nombre 😅");

    try {
        const res = await fetch('/api/asistir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });
        const data = await res.json();
        if(data.success){
            btn.textContent = "Confirmado ✅";
            btn.disabled = true;
        } else {
            alert("Ocurrió un error 😢");
        }
    } catch (err) {
        console.error(err);
        alert("Error de conexión con el servidor 😢");
    }
});

animarParticulas();

