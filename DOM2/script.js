function desenhar() {
    var board =  document.getElementById("graph")
    var barras = document.getElementsByClassName("barra");
    var dados =  document.getElementsByTagName("INPUT");
    var largura =  document.getElementById("largura")
    var i;

    for(i = 0; i < dados.length ;i++){
    	barras[i].style = "height:" + dados[i].value + "px; width:" + largura.value + "px;";
    }

}