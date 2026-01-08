

// 1. Variáveis globais
let fuse;
let processos = [];

// 2. DETECTOR DE CAMINHO: Verifica se estamos dentro da pasta "HTML"
const estaNaPastaHTML = window.location.pathname.includes('/HTML/');

// Define o caminho correto para o JSON baseado em onde o usuário está
const caminhoJson = estaNaPastaHTML ? '../Json/busca.json' : './Json/busca.json';

// 3. CARREGAR DADOS
fetch(caminhoJson)
    .then(response => {
        if (!response.ok) throw new Error(`Erro ao carregar JSON: ${response.status}`);
        return response.json();
    })
    .then(data => {
        processos = data;
        // Configura o Fuse.js
        fuse = new Fuse(processos, {
            keys: ['titulo'],
            threshold: 0.4
        });
        console.log("Sistema de busca carregado com sucesso!");
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
                let linkFinal = res.item.link;

                /* AJUSTE DINÂMICO DE LINKS:
                   Se o link no JSON for "HTML/arquivo.html" e eu já estiver na pasta HTML,
                   eu preciso remover o "HTML/" para o link não ficar quebrado.
                */
                if (estaNaPastaHTML && linkFinal.startsWith('HTML/')) {
                    linkFinal = linkFinal.replace('HTML/', '');
                }
                /* Se eu estiver na RAIZ e o link no JSON NÃO tiver "HTML/",
                   eu adiciono para ele saber onde entrar (exceto links externos http).
                */
                else if (!estaNaPastaHTML && !linkFinal.startsWith('HTML/') && !linkFinal.startsWith('http')) {
                    linkFinal = 'HTML/' + linkFinal;
                }

                item.href = linkFinal;
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