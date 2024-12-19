class Quarto {
    constructor(numero, tipo, diaria) {
      this.numero = numero;           
      this.tipo = tipo;              
      this.diaria = diaria; 
      this.disponivel = true;        
    }
    
    liberarQuarto() {
      this.disponivel = true;
      return `Quarto ${this.numero} agora está disponível.`;
    }
  }
  