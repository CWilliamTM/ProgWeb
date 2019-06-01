(function(){
	const FPS = 300;
	const PROB_NUVEM = 2;
	var DIFICULDADE;
	var gameLoop;
	var status; //0: parado//1: rodando
	var deserto; 
	var dino;
	var nuvens = [];
	var placar = [];
	var cactus = [];
	var inimigos = [];

	window.addEventListener("keydown", function(e){
		if(e.key == "ArrowUp" && status == 0){status = 1; dino.element.style.backgroundPositionX = dino.sprites[0];}
		if(e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
		if(e.key == "ArrowDown" && status == 1 && dino.status == 0){dino.status = 3; dino.element.style.width = "60px";}
	});

	window.addEventListener("keyup", function(e){
		if(e.key == "ArrowDown" && dino.status == 3){dino.status = 0; dino.element.style.width = "42px";}
	});

	function init (){
		DIFICULDADE = 20;
		status = 0;
		gameLoop = setInterval(run, 1);
		setInterval(mplacar, 100);
		setInterval(obstaculos, 1000);
		setInterval(function(){if(DIFICULDADE>9)DIFICULDADE--;}, 100000);
		deserto = new Deserto();
		dino = new Dino();
		for(var i=0;i<5;i++)placar[i] = new Numero(i);
	}

	function Deserto(){
		this.element = document.createElement("div");
		this.element.className = "deserto";
		document.body.appendChild(this.element);

		this.chao = document.createElement("div");
		this.chao.className = "chao";
		this.chao.style.backgroundPositionX = "0px";
		this.element.appendChild(this.chao);
	}

	Deserto.prototype.mover = function(){
		this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX)-1) + "px";
	}

	function Dino(){
		this.status = 0; //0:correndo//1:subindo//2:descendo//3:agachado
		this.alturaMaxima = "100px";
		this.sprites = ["-766px","-810px","-679px","-939px","-999px"];
		this.element = document.createElement("div");
		this.element.className = "dino";
		this.element.style.backgroundPositionX = this.sprites[2];
		this.element.style.bottom = "0px";
		this.element.style.width = "42px";
		deserto.element.appendChild(this.element);
	}

	Dino.prototype.correr = function(){
		if(this.status == 0) this.element.style.backgroundPositionX = 
			(this.element.style.backgroundPositionX == this.sprites[0])?this.element.style.backgroundPositionX = this.sprites[1]:this.element.style.backgroundPositionX = this.sprites[0];
		else if(this.status == 1){
			this.element.style.backgroundPositionX = this.sprites[2];
			this.element.style.bottom = (parseInt(this.element.style.bottom) + 1) + "px"; 
			if(this.element.style.bottom == this.alturaMaxima) this.status = 2;
		}
		else if(this.status == 2){
			this.element.style.bottom = (parseInt(this.element.style.bottom) - 1) + "px"; 
			if(this.element.style.bottom == "0px") this.status = 0;
		}
		else if(this.status == 3){
			this.element.style.backgroundPositionX = 
			(this.element.style.backgroundPositionX == this.sprites[3])?this.element.style.backgroundPositionX = this.sprites[4]:this.element.style.backgroundPositionX = this.sprites[3];
		}
	}

	function Inimigo(t){
		this.status = 0;
		this.sprites = ["-133px","-180px","110px","60px","5px"];
		this.element = document.createElement("div");
		this.element.className = "inimigo";
		this.element.style.backgroundPositionX = this.sprites[0];
		this.element.style.top = this.sprites[t];
		this.element.style.right = "0px";
		deserto.element.appendChild(this.element);
	}

	Inimigo.prototype.mover = function(){
		this.element.style.backgroundPositionX = 
			(this.element.style.backgroundPositionX == this.sprites[0])?this.element.style.backgroundPositionX = this.sprites[1]:this.element.style.backgroundPositionX = this.sprites[0];
		this.element.style.right = (parseInt(this.element.style.right)+1) + "px";
	}

	function Nuvem(){
		this.element = document.createElement("div");
		this.element.className = "nuvem";
		this.element.style.right = "0px";
		this.element.style.top = Math.floor(Math.random() * 120) + "px";
		deserto.element.appendChild(this.element);
	}

	Nuvem.prototype.mover = function(){
		this.element.style.right = (parseInt(this.element.style.right)+1) + "px";
	}

	function Cactus(p){
		this.c = ["-226px","17px", "-244px", "34px", "-278px", "51px", "-331px", "25px", "-356px", "50px", "-406px", "75px"];
		this.element = document.createElement("div");
		this.element.className = "cactus";
		this.element.style.bottom = "0px";
		this.element.style.right = "0px";
		if(p < 5) this.element.style.height = "34px";
		else this.element.style.height = "50px";
		this.element.style.width = this.c[p+1];
		this.element.style.backgroundPositionX = this.c[p];
		deserto.element.appendChild(this.element);
	}

	Cactus.prototype.mover = function(){
		this.element.style.right = (parseInt(this.element.style.right)+1) + "px";
	}

	function Numero(r){
		this.nums = ["-484px","-494px","-504px","-514px","-524px","-534px","-544px","-554px","-564px","-574px"];
		this.element = document.createElement("div");
		this.element.className = "numero";
		this.element.style.right = "0px";
		this.element.style.backgroundPositionX = this.nums[0];
		this.element.style.right = r*10 + "px";
		deserto.element.appendChild(this.element);
	}

	Numero.prototype.mudar = function(){
		var a = this.element.style.backgroundPositionX;
		if(a == this.nums[0]) this.element.style.backgroundPositionX = this.nums[1];
		else if(a == this.nums[1]) this.element.style.backgroundPositionX = this.nums[2];
		else if(a == this.nums[2]) this.element.style.backgroundPositionX = this.nums[3];
		else if(a == this.nums[3]) this.element.style.backgroundPositionX = this.nums[4];
		else if(a == this.nums[4]) this.element.style.backgroundPositionX = this.nums[5];
		else if(a == this.nums[5]) this.element.style.backgroundPositionX = this.nums[6];
		else if(a == this.nums[6]) this.element.style.backgroundPositionX = this.nums[7];
		else if(a == this.nums[7]) this.element.style.backgroundPositionX = this.nums[8];
		else if(a == this.nums[8]) this.element.style.backgroundPositionX = this.nums[9];
		else if(a == this.nums[9]) this.element.style.backgroundPositionX = this.nums[0];
	}

	function mplacar(){
		if(status == 1){
			placar[0].mudar();
			if(placar[0].element.style.backgroundPositionX == placar[0].nums[0]){
				placar[1].mudar();
				if(placar[1].element.style.backgroundPositionX == placar[0].nums[0]){
					placar[2].mudar();
					if(placar[2].element.style.backgroundPositionX == placar[0].nums[0]){
						placar[3].mudar();
						if(placar[3].element.style.backgroundPositionX == placar[0].nums[0]) placar[4].mudar();
					} 
				} 
			}                                            
		}
   }

	function obstaculos(){
		if(status == 1){
			var r = Math.random() * DIFICULDADE;
			if(r < 1){
				cactus.push(new Cactus(0));
			}
			else if(r < 2){
				cactus.push(new Cactus(2));
			}
			else if(r < 3){
				cactus.push(new Cactus(4));
			}
			else if(r < 4){
				cactus.push(new Cactus(6));
			}
			else if(r < 5){
				cactus.push(new Cactus(8));
			}
			else if(r < 6){
				cactus.push(new Cactus(10));
			}
			else if(r < 7){
				inimigos.push(new Inimigo(2));
			}
			else if(r < 8){
				inimigos.push(new Inimigo(3));
			}
			else if(r < 9){
				inimigos.push(new Inimigo(4));
			}
		}
	}

	function run () {
		if(status == 1){
			deserto.mover();
			dino.correr();
			if(Math.random() * 1000 <= PROB_NUVEM) nuvens.push(new Nuvem());
			nuvens.forEach(function(n){
				n.mover();
				if(parseInt(n.element.style.right) > 1000){
					var head = nuvens.shift();
					deserto.element.removeChild(head.element);
				}
			});
			cactus.forEach(function(c){
				c.mover();
				if(parseInt(c.element.style.right) > 1000){
					var head = cactus.shift();
					deserto.element.removeChild(head.element);
				}
			});
			inimigos.forEach(function(i){
				i.mover();
				if(parseInt(i.element.style.right) > 1000){
					var head = inimigos.shift();
					deserto.element.removeChild(head.element);
				}
			});
			//Em caso de game over //clearInterval(gameLoop)
		}
	}
	init();
})();