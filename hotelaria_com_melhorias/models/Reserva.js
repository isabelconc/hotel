class Reserva {
    constructor(nome, quarto, checkIn, checkOut, HcheckOut) {
      this.nome = nome;
      this.quarto = quarto;
      this.checkIn = new Date(checkIn);
      this.checkOut = new Date(checkOut);
      this.HcheckOut = HcheckOut;
      this.diaria = this.calcularDiarias();
      this.total = this.calcularTotal();
    }

    calcularDiarias(checkIn, checkOut, HcheckOut) {
        diaria = checkOut - checkIn;
        if (HcheckOut > 12) diaria += 1;

        let totalDiarias = 300 * diaria;
        contaHospede.push(totalDiarias);
        document.getElementById("diarias").textContent = diaria;
        document.getElementById("totalDiarias").textContent = `R$ ${totalDiarias}`;

        return diaria;
    
    }
    
    calcularTotal() {
        const precoDiaria = Quarto.tipos[this.quarto.tipo] || 0;
        return this.diaria * precoDiaria;
        }

  }

const reservas = [];

function reservarQuarto(nome, quarto, checkIn, checkOut, HcheckOut) {

    const temQuarto = reservas.some(reserva => reserva.quarto === quarto);
    if (temQuarto) {
        alert("O quarto selecionado já está reservado.");
        return;
    }

    const novaReserva = new Reserva(nome, quarto, checkIn, checkOut, HcheckOut);
    reservas.push(novaReserva);

    exibirReservas();
    }

function exibirReservas() {
    const reservasLista = document.getElementById('reservaslista');
    reservasLista.innerHTML = "<h2>Reservas de Quartos:</h2>";
    reservas.forEach(reserva => {
      reservasLista.innerHTML += `<p>Hóspede: ${reserva.nome}, Quarto: ${reserva.quarto}, Total: R$ ${reserva.total}</p>`;
    });
  }
  
function limparCamposReserva() {
    document.getElementById("Nomehosp").value = "";
    document.getElementById("quarto").value = "";
    document.getElementById("checkIn").value = "";
    document.getElementById("checkOut").value = "";
    document.getElementById("HcheckOut").value = "";
    const reservasLista = document.getElementById("reservaslista");
    reservasLista.innerHTML = "";
  }
  
  