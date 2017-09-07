var modeloPalabra = "<div class='panel panel-info'><div class='panel-heading'><b>{palabra}</b></div><div class='panel-body'><div class='media'><div class='media-left media-middle'><img class='media-object' src='{linkImagen}' width='64'></div><div class='media-body'>{descripcion}</div></div></div></div>"
var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function inicio() {
    letras.forEach(function(letra) {
        var templateBoton = '<li role="presentation"><a id="pestania{letra}" data-toggle="tab" href="#letra{letra}">{letra}</a></li>'
        $("#pestanias").append(templateBoton.replace(/{letra}/g, letra));

        $("#pestania" + letra).bind('click', function(e) {
            $(document).attr("title", "Glosario: " + e.target.innerHTML);
            cargarPalabras(e.target.innerHTML);
        });
    });

    $("#todas").bind('click', function(e) {
        $(document).attr("title", "Glosario: Todas");
        cargarPalabras();
    });

};

function cargarPalabras(letra) {
    var llavesPalabras = Object.keys(palabras);
    $("#palabras").empty();
    llavesPalabras = llavesPalabras.filter(function(palabra) {
        if (letra) {
            if (palabra.toLowerCase()[0] == letra.toLowerCase()) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    });
    $("#total").text("Total de palabras: " + llavesPalabras.length);

    llavesPalabras.forEach(function(palabra) {
        var palabra = palabras[palabra];
        var html = modeloPalabra.replace(/{palabra}/g, palabra[0]);
        html = html.replace(/{linkImagen}/g, "img/palabra.jpg");
        html = html.replace(/{descripcion}/g, palabra[1].replace(/\n/g, '<br>'));
        $("#palabras").append(html);
    }, this);
};

$(document).ready(function() {
    inicio();
    cargarPalabras();
});