(function(){
   const FPS = 300;
   const PROB_NUVEM = 2;
   var gameLoop;
   var status; //0: parado//1: rodando
   var deserto; 
   var dino;
   var nuvens = [];
   var placar = [];
   var cactus;

   window.addEventListener("keydown", function(e){
      if(e.key == "ArrowUp" && status == 0){status = 1; dino.element.style.backgroundPositionX = dino.sprites[0];}
      if(e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
      if(e.key == "ArrowDown" && status == 1 && dino.status == 0){dino.status = 3; dino.element.style.width = "60px";}
   });

   window.addEventListener("keyup", function(e){
      if(e.key == "ArrowDown"){dino.status = 0; dino.element.style.width = "42px";}
   });

   function init (){
      status = 0;
      gameLoop = setInterval(run, 1);
      setInterval(mplacar, 100);
      deserto = new Deserto();
      dino = new Dino();
      for(var i=0;i<5;i++)placar[i] = new Numero(i);
      cactus = new Cactus();
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
      this.alturaMaxima = "70px";
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

   function Cactus(){
      this.c = ["17px", "34px", "51px", "68px"];
      this.element = document.createElement("div");
      this.element.className = "cactus";
      this.element.style.width = this.c[3];
      deserto.element.appendChild(this.element);
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

   function mplacar () {
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
         //Em caso de game over //clearInterval(gameLoop)
      }
   }
   init();
})();