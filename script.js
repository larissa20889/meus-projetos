function ativarCupom(codigo) {
  let mensagem = "";


  const msgEl = document.getElementById("mensagem-cupom");
  msgEl.textContent = mensagem;
  msgEl.style.color = mensagem.includes("❌") ? "red" : "green";
}
const carrinho = [];
const listaCarrinho = document.getElementById("lista-carrinho");
const totalElem = document.getElementById("total");
const btnLimpar = document.getElementById("btn-limpar");

function formatarPreco(valor) {
  return valor.toFixed(2).replace(".", ",");
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML =
      '<li style="text-align:center; padding: 20px; color: #888;">Carrinho vazio</li>';
  }

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "8px 10px";
    li.style.borderBottom = "1px solid #eee";

    li.innerHTML = `
      <span>${item.nome} x${item.quantidade} - R$ ${formatarPreco(
      item.preco * item.quantidade
    )}</span>
      <button onclick="removerProduto(${index})" style="background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">X</button>
    `;

    listaCarrinho.appendChild(li);
  });

  totalElem.textContent = formatarPreco(total);
}

function adicionarCarrinho(nome, preco) {
  const itemExistente = carrinho.find((item) => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  atualizarCarrinho();
}

function removerProduto(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

btnLimpar.addEventListener("click", () => {
  carrinho.length = 0;
  atualizarCarrinho();
});



// Controle de pagamento
const radiosPagamento = document.querySelectorAll(
  'input[name="metodo-pagamento"]'
);
const formCartao = document.getElementById("form-cartao");
const formPix = document.getElementById("form-pix");
const formPagamento = document.getElementById("form-pagamento");

radiosPagamento.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "cartao" && radio.checked) {
      formCartao.style.display = "flex";
      formPix.style.display = "none";
      formCartao.querySelectorAll("input").forEach((i) => (i.required = true));
      formPix.querySelector("input").required = false;
    } else if (radio.value === "pix" && radio.checked) {
      formCartao.style.display = "none";
      formPix.style.display = "block";
      formPix.querySelector("input").required = true;
      formCartao.querySelectorAll("input").forEach((i) => (i.required = false));
    }
  });
});

formPagamento.addEventListener("submit", (e) => {
  e.preventDefault();
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const metodo = formPagamento.querySelector(
    'input[name="metodo-pagamento"]:checked'
  ).value;

  if (metodo === "cartao") {
    alert("Pagamento com cartão processado (simulado). Obrigado pela compra!");
  } else if (metodo === "pix") {
    alert("Pagamento via Pix processado (simulado). Obrigado pela compra!");
  }

  carrinho.length = 0;
  atualizarCarrinho();
  formPagamento.reset();
  formCartao.style.display = "flex";
  formPix.style.display = "none";
});


// ✅ Verificação do formulário de cadastro
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const mensagem = document.getElementById("mensagem");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefone = document.getElementById("telefone").value.trim();

      const apenasNumeros = /^\d+$/;

      if (!nome || !email || !telefone) {
        mensagem.textContent = "❌ Preencha todos os campos!";
        mensagem.style.color = "red";
      } else if (!apenasNumeros.test(telefone)) {
        mensagem.textContent = "❌ O telefone deve conter apenas números!";
        mensagem.style.color = "red";
      } else {
        mensagem.textContent = '✅ Obrigado', $;{nome}!'Cadastro realizado com sucesso';
        mensagem.style.color = "green";

        setTimeout(function () {
          form.reset();
          mensagem.textContent = "";
        }, 4000);

      }
    });
  }
});
