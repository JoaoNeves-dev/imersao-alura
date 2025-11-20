let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("input[type='text']");
let dados = [];

 async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    let termoBusca = inputBusca.value.toLowerCase();
    let dadosFiltrados = dados.filter(dado => dado.nome.toLowerCase().includes(termoBusca));
    
    // Limpa o campo de busca para a próxima pesquisa
    inputBusca.value = "";
    
    // Adiciona apenas os jogadores que ainda não estão na tela
    adicionarCards(dadosFiltrados);
}

function adicionarCards(dados) {
    for (let dado of dados) {
        // Verifica se um card com o mesmo nome já não existe
        const jogadorJaExiste = cardContainer.querySelector(`[data-nome-jogador="${dado.nome}"]`);
        if (!jogadorJaExiste) {
            let article = document.createElement("article");
            article.classList.add("card");
            // Adiciona um atributo para identificar o card futuramente
            article.dataset.nomeJogador = dado.nome;
            article.innerHTML = `
                 <h2>${dado.nome}</h2>
                    <p>${dado.descricao}</p>
                    <a href="${dado.link}" target="_blank">Saiba mais</a>
            `;
            cardContainer.appendChild(article);
        }
    }
}