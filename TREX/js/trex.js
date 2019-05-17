(function(){
   const FPS = 300;
   const PROB_NUVEM = 2;
   var gameLoop;
   var deserto; 
   var dino;
   var nuvens = [];

   window.addEventListener("keydown", function(e){
      if(e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
      if(e.key == "ArrowDown" && dino.status == 0){dino.status = 3; dino.element.style.width = "60px";}
   });

   window.addEventListener("keyup", function(e){
      if(e.key == "ArrowDown"){dino.status = 0; dino.element.style.width = "42px";}
   });

   function init (){
      gameLoop = setInterval(run, 1000/FPS);
      deserto = new Deserto();
      dino = new Dino();
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
      this.element.style.backgroundPositionX = this.sprites[0];
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

   function run () {
      deserto.mover();
      dino.correr();
      if(Math.random() * 1000 <= PROB_NUVEM) nuvens.push(new Nuvem());
      nuvens.forEach(function(n){
         n.mover();
         if(parseInt(n.element.style.right) > 2000){
            var head = nuvens.shift();
            deserto.element'.removeChild(head);
         }
      });
      //Em caso de game over //clearInterval(gameLoop)
   }

   init();
})();