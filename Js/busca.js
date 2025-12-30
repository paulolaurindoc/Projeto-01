// Variável global para armazenar os dados carregados
let processos = [];
let fuse;

// 1. Carregar os dados do arquivo JSON
fetch('./Json/busca.json')
    .then(response => response.json())
    .then(data => {
        processos = data;
        // 2. Configurar o Fuse com os dados carregados
        fuse = new Fuse(processos, {
            keys: ['titulo'],
            threshold: 0.3
        });
    });

const input = document.getElementById('campo-busca');
const lista = document.getElementById('lista-resultados');

input.addEventListener('input', () => {
    const termo = input.value;
    
    if (termo.length < 1) {
        lista.classList.add('d-none');
        return;
    }

    const resultados = fuse.search(termo);
    lista.innerHTML = '';
    lista.classList.remove('d-none');

    if (resultados.length > 0) {
        resultados.forEach(res => {
            const item = document.createElement('a');
            item.href = res.item.link;
            item.className = 'list-group-item list-group-item-action';
            item.innerText = res.item.titulo;
            lista.appendChild(item);
        });
    } else {
        lista.innerHTML = '<div class="list-group-item disabled text-muted">Nenhum resultado encontrado</div>';
    }
});

// Fechar lista ao clicar fora
document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !lista.contains(e.target)) {
        lista.classList.add('d-none');
    }
});