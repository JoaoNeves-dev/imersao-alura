let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("input[type='text']");
let dados = [];

 async function iniciarBusca() {
    let termoBusca = inputBusca.value.toLowerCase();
    if (!termoBusca.trim()) {
        cardContainer.innerHTML = ""; // Limpa os resultados se a busca for vazia
        return;
    }

    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    let dadosFiltrados = dados.filter(dado => dado.nome.toLowerCase().includes(termoBusca));
    
    // Limpa os cards existentes antes de adicionar os novos
    cardContainer.innerHTML = "";

    adicionarCards(dadosFiltrados);
}

function adicionarCards(dados) {
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
                 <h2>${dado.nome}</h2>
                    <p>${dado.descricao}</p>
                    <a href="${dado.link}" target="_blank">Saiba mais</a>
            `;
            cardContainer.appendChild(article);
        }
    }
