// 1. Variáveis globais
let fuse;
let processos = [];

// 2. CAMINHO ABSOLUTO: O "/" no início garante que o Netlify ache o arquivo 
// a partir da raiz, esteja você na index ou dentro de subpastas.
const caminhoJson = '/Json/busca.json'; 

// 3. CARREGAR DADOS
fetch(caminhoJson)
    .then(response => {
        if (!response.ok) throw new Error(`Erro ao carregar JSON: ${response.status}`);
        return response.json();
    })
    .then(data => {
        processos = data;
        fuse = new Fuse(processos, {
            keys: ['titulo'],
            threshold: 0.4
        });
        console.log("Sistema de busca carregado via caminho absoluto!");
    })
    .catch(err => console.error("Falha no carregamento da busca:", err));

// 4. LÓGICA DA INTERFACE
const campoBusca = document.getElementById('campo-busca');
const listaResultados = document.getElementById('lista-resultados');

if (campoBusca) {
    campoBusca.addEventListener('input', () => {
        const termo = campoBusca.value;

        if (termo.length < 1 || !fuse) {
            listaResultados.classList.add('d-none');
            return;
        }

        const resultados = fuse.search(termo);
        listaResultados.innerHTML = '';
        listaResultados.classList.remove('d-none');

        if (resultados.length > 0) {
            resultados.forEach(res => {
                const item = document.createElement('a');
                let linkOriginal = res.item.link;

                // AJUSTE DE LINK: Se o link não for externo (http), 
                // garantimos que ele comece com "/" para funcionar em qualquer subpágina
                if (!linkOriginal.startsWith('http')) {
                    // Remove "HTML/" se já existir no início para evitar duplicidade,
                    // e garante que comece com a pasta correta a partir da raiz.
                    let limpo = linkOriginal.replace(/^HTML\//, '');
                    item.href = `/HTML/${limpo}`; 
                } else {
                    item.href = linkOriginal;
                }

                item.className = 'list-group-item list-group-item-action';
                item.innerText = res.item.titulo;
                listaResultados.appendChild(item);
            });
        } else {
            listaResultados.innerHTML = '<div class="list-group-item disabled">Nenhum resultado encontrado</div>';
        }
    });
}

// Fechar lista ao clicar fora
document.addEventListener('click', (e) => {
    if (campoBusca && !campoBusca.contains(e.target) && !listaResultados.contains(e.target)) {
        listaResultados.classList.add('d-none');
    }
});