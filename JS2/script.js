var a = parseInt(prompt())
var p = 0
while(a>0 && a<4){
	console.log("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura")
	var r = Math.ceil(Math.random()*3)
	if(r == 1) console.log("O computador jogou Papel\n")
	else if (r == 2) console.log("O computador jogou Pedra\n")
	else if (r == 3) console.log("O computador jogou Tesoura\n")

	if(a == r) console.log("A rodada empatou!")
	if(a == 1) {
		if(r == 2) {
			console.log("Você ganhou!")
			p++
		}
		else {
			console.log("Você perdeu! A sua pontuação foi de " + p)
			break
		}
	}
	if(a == 2){
		if(r == 3) {
			console.log("Você ganhou!")
			p++
		}
		else {
			console.log("Você perdeu! A sua pontuação foi de " + p)
			break
		}
	}
	if(a == 3){
		if(r == 1) {
			console.log("Você ganhou!")
			p++
		}
		else {
			console.log("Você perdeu! A sua pontuação foi de " + p)
			break
		}
	}
	
	a = parseInt(prompt())
}