# 💧 Modernização do Portal SAAE - Alegre/ES

> **Link do Projeto:** [Acesse o site aqui](https://paulolaurindoc.github.io/Projeto-01/)

Este projeto foi desenvolvido com o objetivo de **modernizar a interface e a experiência do usuário (UX/UI)** do site real do Serviço Autônomo de Água e Esgoto (SAAE) do município de Alegre/ES. 

## 🎯 Sobre o Projeto

O projeto nasceu de uma iniciativa puramente de estudos, **sem qualquer intuito financeiro ou vínculo oficial**. O foco principal foi adquirir experiência prática no desenvolvimento de portais públicos, buscando atender às especificações de acessibilidade, organização de informações e clareza que um órgão municipal exige.

### 🚀 Melhorias Focadas:
* **Interface Responsiva:** Adaptada para dispositivos móveis (celulares e tablets) e desktops.
* **Navegação Simplificada:** Organização visual mais limpa para facilitar o acesso do cidadão aos serviços essenciais.
* **Design Moderno:** Uso de paleta de cores e tipografia atualizadas, mantendo a identidade visual do órgão.

## 🛠️ Tecnologias Utilizadas

O portal foi construído utilizando as seguintes tecnologias e serviços:

* **HTML5 & CSS3:** Estruturação semântica e estilização moderna, com foco em responsividade (Flexbox/Grid).
* **JavaScript (ES6+):** Utilizado de forma assíncrona por baixo dos panos para manipulação dinâmica da interface (DOM) e consumo de arquivos estruturados.
* **Netlify:** Plataforma utilizada para a hospedagem e gerenciamento do projeto.
* **Gerenciamento de Conteúdo (JSON):** Estruturação dos dados das publicações em formato JSON, permitindo que novos conteúdos sejam atualizados de forma desacoplada da estrutura visual do site.

## ⚙️ Como Funciona o Portal Admin

Para viabilizar as publicações no portal de forma dinâmica, foi implementada uma solução de gerenciamento via Netlify:
* **Painel Administrativo:** Um portal restrito hospedado no Netlify que permite a criação e edição de novas publicações.
* **Persistência em JSON:** Os dados inseridos no painel geram/atualizam arquivos JSON automaticamente.
* **Renderização Dinâmica:** O JavaScript do front-end consome esses arquivos JSON para renderizar as novas notícias, editais ou avisos no portal público em tempo real, sem a necessidade de reescrever o código HTML manualmente.
