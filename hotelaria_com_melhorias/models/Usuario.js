class Usuario {
  constructor(nome, email, senha) {
    this._nome = nome; 
    this._email = email; 
    this.senha = senha;  
  }

  get nome() {
    return this._nome;
  }

  get email() {
    return this._email;
  }

  exibir() {
    return `
      <p><strong>Nome:</strong> ${this._nome}</p>
      <p><strong>Email:</strong> ${this._email}</p>`;
  }

  async autenticar(nome, senha) {
   if (this._nome !== nome) return false;
   return await bcryptjs.compare(senha, this.senha);
  }
}

class Funcionario extends Usuario {
  constructor(nome, email, senha, idFuncionario) {
    super(nome, email, senha);
    this.idFuncionario = idFuncionario;
  }

  exibir() {
    return `${super.exibir()}<p><strong>Identificador do Funcionario:</strong> ${this.idFuncionario}</p>`;
  }
}


class Hospede extends Usuario {
  constructor(nome, email, senhaHash, sobrenome, idade, id, telefone) {
    super(nome, email, senhaHash);
    this.sobrenome = sobrenome;
    this.idade = idade;
    this.id = id;
    this.telefone = telefone;
  }

  exibir() {
    return `${super.exibir()},
      <p><strong>Idade:</strong> ${this.idade}</p>
      <p><strong>Documento Identificador:</strong> ${this.id}</p>
      <p><strong>Telefone:</strong> ${this.telefone}</p>`;
  }

  maiordeidade() {
    return this.idade >= 18;
  }
}

const hospedes = [];
const funcionario = new Funcionario("Claudete", "claudete@example.com", "1234", "F001");

function login(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  
  
  if (funcionario.autenticar(nome, senha)) {
    localStorage.setItem('usuarioLogado', funcionario.nome);
    window.location.href = "dashboard.html";  
    return;
  }

  const hospede = hospedes.find(h => h.autenticar(nome, senha));
  if (hospede) {
    localStorage.setItem('usuarioLogado', hospede.nome);
    window.location.href = "home.html";  
    return;
  }
  
  alert("Você não tem uma conta! Crie uma")
  window.location.href = "cadastro.html";  
}

document.getElementById("loginForm").addEventListener("submit", login);


function cadastro(event) {
  event.preventDefault();
   
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const senha = document.getElementById('senha').value;
  const id = document.getElementById('id').value;
  const idade = document.getElementById('idade').value;

  console.log(id, nome);

  if (!nome || !sobrenome || !email || !telefone || !senha || !id || !idade) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // const senhaHash = await bcryptjs.hash(senha, 10)

  console.log("Senha criptografada:", senhaHash)

  const hospede = new Hospede(nome, email, senhaHash, sobrenome, idade, id, telefone);
  hospedes.push(hospede);


  localStorage.setItem(nome + '_nome', hospede.nome);
  localStorage.setItem(nome + '_email', hospede.email);
  localStorage.setItem(nome + '_sobrenome', hospede.sobrenome);
  localStorage.setItem(nome + '_telefone', hospede.telefone);
  localStorage.setItem(nome + '_id', hospede.id);
  localStorage.setItem(nome + '_idade', hospede.idade);

  alert("Hospede cadastrado com sucesso");
  
  window.location.href = "home.html";      
  
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cadastroForm');
  if (form) {
    form.addEventListener('submit', cadastro);
  } else {
    console.error('Elemento cadastroForm não encontrado.');
  }
});



function exibirHosp() {
  const hosplista = document.getElementById('hosplista');
  hosplista.innerHTML = "<h2>Hóspedes Cadastrados:</h2>";
  
  hosplista.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.includes("_nome")) {
      const nome = localStorage.getItem(chave);
      const email = localStorage.getItem(nome + '_email');
      const telefone = localStorage.getItem(nome + '_telefone');
      const id = localStorage.getItem(nome + '_id');
      hosplista.innerHTML += `<p>Nome: ${nome}, Telefone: ${telefone}, Documento Identificador: ${id}</p>`;
    }
  }
}


function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("sobrenome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("id").value = "";
  document.getElementById("idade").value = "";
  const hosplista = document.getElementById("hosplista");
  hosplista.innerHTML = "";
}
