const API = "http://localhost:3000/produtos";


// GET - Listar bebidas
async function listarBebidas() {

    const resposta = await fetch(API);

    const produtos = await resposta.json();

    const bebidas = produtos.filter(
        produto => produto.categoria === "Bebidas"
    );

    const lista = document.getElementById("listaBebidas");

    lista.innerHTML = "";

    bebidas.forEach(produto => {

        lista.innerHTML += `
            <div class="card">

                <h3>${produto.nome}</h3>

                <p>
                    Preço: R$ ${produto.preco.toFixed(2)}
                </p>

                <p>
                    Categoria: ${produto.categoria}
                </p>

                <p>
                    Estoque: ${produto.estoque}
                </p>

            </div>
        `;

    });
}


// POST - Cadastrar produto
document
    .getElementById("formProduto")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const nome = document.getElementById("nome").value;

        const preco = Number(
            document.getElementById("preco").value
        );

        const categoria =
            document.getElementById("categoria").value;

        const estoque = Number(
            document.getElementById("estoque").value
        );


        const novoProduto = {

            nome: nome,

            preco: preco,

            categoria: categoria,

            estoque: estoque

        };


        const resposta = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(novoProduto)

        });


        if (resposta.ok) {

            document.getElementById("mensagem").textContent =
                "Produto cadastrado com sucesso!";

            document.getElementById("formProduto").reset();

        }

    });