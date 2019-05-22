class Venda{
	constructor(id,qtd,preco){
		this.id = id;
		this.quantidade = qtd;
		this.preco = preco;
	}
	getValorTotal() {
        return this.preco * this.quantidade;
    }
}

var teste1 = new Venda("teste1",2,1.5);
var teste2 = new Venda("teste2",5,2);

console.log(teste1.id + ": " + teste1.getValorTotal());
console.log(teste2.id + ": " + teste2.getValorTotal());
						