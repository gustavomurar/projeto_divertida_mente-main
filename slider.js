// Carrossel de lançamentos: rolagem suave com snap, botões, arrastar com o mouse
(function () {
    const slider = document.querySelector(".slider");
    if (!slider) return;
    const track = slider.querySelector(".slider-track");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    if (!track || !prev || !next) return;
 
    function passo() {
        const item = track.querySelector(".item");
        if (!item) return track.clientWidth;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return item.getBoundingClientRect().width + gap;
    }
 
    function atualizarBotoes() {
        const max = track.scrollWidth - track.clientWidth;
        slider.classList.toggle("sem-overflow", max <= 2);   // tudo cabe: esconde as setas
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= max - 2;
    }
 
    next.addEventListener("click", () => track.scrollBy({ left: passo(), behavior: "smooth" }));
    prev.addEventListener("click", () => track.scrollBy({ left: -passo(), behavior: "smooth" }));
    track.addEventListener("scroll", atualizarBotoes, { passive: true });
    window.addEventListener("resize", atualizarBotoes);
    window.addEventListener("load", atualizarBotoes);
    atualizarBotoes();
 
    // Arrastar com o mouse (no toque o navegador já faz a rolagem sozinho)
    let arrastando = false, moveu = false, inicioX = 0, inicioScroll = 0;
 
    track.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        arrastando = true;
        moveu = false;
        inicioX = e.pageX;
        inicioScroll = track.scrollLeft;
    });
    window.addEventListener("mousemove", (e) => {
        if (!arrastando) return;
        const dx = e.pageX - inicioX;
        if (!moveu && Math.abs(dx) > 5) {
            moveu = true;
            track.classList.add("arrastando");
        }
        if (moveu) track.scrollLeft = inicioScroll - dx;
    });
    window.addEventListener("mouseup", () => {
        arrastando = false;
        track.classList.remove("arrastando");
    });
    // se arrastou, não deixa o clique cair em link/botão/ícone do card
    track.addEventListener("click", (e) => {
        if (moveu) { e.preventDefault(); e.stopPropagation(); moveu = false; }
    }, true);
    track.addEventListener("dragstart", (e) => e.preventDefault());
})();
 