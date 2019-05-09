class integerSet{
	constructor(max){
		this.total = 0;
		this.max = max;
		this.arr = [];
		for(var i=0;i<=max;++i)
			this.arr[i] = false;
	}
	inserir (num){
		if(num <= this.max) 
			this.arr[num] = true;
	}
	excluir (num){
		if(num <= this.max) 
			this.arr[num] = false;
	}
	uniao (iS){
		for(var i=0;i<=this.max;++i) 
			if(iS.arr[i] == true) 
				this.arr[i] = true;
	}
	intersecao (iS){
		for(var i=0;i<=this.max;++i) 
			if(iS.arr[i] == true && this.arr[i] == true)
				{this.arr[i] = true;}
			else
				{this.arr[i] = false;}
	}
	diferenca (iS){
		for(var i=0;i<=this.max;++i) 
			if(iS.arr[i] == true && this.arr[i] == true) 
				this.arr[i] = false;
	}
	getString (){
		var string = "";
		for(var i=0;i<=this.max;++i) 
			if(this.arr[i] == true) 
				string += this.arr[i];
		return string;
	}
}


v = new IntegerSet(10);
v.inserir(1);
v.inserir(5);
v.getString();