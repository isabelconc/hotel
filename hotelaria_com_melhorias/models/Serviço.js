class Servico {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
}

const conta = []; 
let totalConta = 0;

function adicionarConta(tipo) {
    const seletor = document.getElementById(tipo);
    const itemNome = seletor.options[seletor.selectedIndex].text;
    const itemValor = parseFloat(seletor.value); 

    if (!itemValor) {
        alert("Escolha um item.");
        return;
    }


    const servico = new Servico(itemNome, itemValor);
    conta.push(servico);  

  
    const contaLista = document.getElementById("conta");
    const novoItem = document.createElement("li");
    novoItem.textContent = `${servico.nome} - R$ ${servico.preco}`;  
    contaLista.appendChild(novoItem);

  
    totalConta += servico.preco;
    document.getElementById("total").textContent = `R$ ${totalConta}`;  

    
    seletor.value = "";
}



function calcularTotal() {
  return conta.reduce((total, item) => total + item.preco, 0);
}


function exibirConta() {
  const listaConta = document.getElementById("conta");
  const totalConta = document.getElementById("total");

  listaConta.innerHTML = ""; 
  let total = 0; 

  conta.forEach(servico => {
    total += servico.preco; 

    const li = document.createElement("li");
    li.innerHTML = `${servico.nome} - R$ ${Math.round(servico.preco * 100) / 100}`;
    listaConta.appendChild(li);
  });

  totalConta.innerHTML = Math.round(total * 100) / 100; 
}

