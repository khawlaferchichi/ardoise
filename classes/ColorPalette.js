'use strict';

var ColorPalette  = function(pen)
{


    //Aura une propriété canvas qui correspond à son canvas (#color-palette)

    //Dans le constructeur de la classe, là vous pouvez créer le dégradé de couleurs
    //Initialiser les propriétés de ma classe

    this.canvas = document.getElementById('color-palette');
    this.context = this.canvas.getContext("2d");
    this.pen = pen;
    //dégradé
    var gradient;

    gradient = this.context.createLinearGradient(0,0, this.canvas.width,0);
    //color

    gradient.addColorStop(0,    'rgb(255,   0,   0)');
    gradient.addColorStop(0.15, 'rgb(255,   0, 255)');
    gradient.addColorStop(0.32, 'rgb(0,     0, 255)');
    gradient.addColorStop(0.49, 'rgb(0,   255, 255)');
    gradient.addColorStop(0.66, 'rgb(0,   255,   0)');
    gradient.addColorStop(0.83, 'rgb(255, 255,   0)');
    gradient.addColorStop(1,    'rgb(255,   0,   0)');
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // this.context.fill();
    //***************************************************************************
    // Dégradé blanc opaque -> transparent -> noir opaque vertical.
    gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height); //Dégradé blanc->noir du haut vers le bas


    gradient.addColorStop(0,   'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
    gradient.addColorStop(1,   'rgba(0,     0,   0, 1)');

    this.context.fillStyle = gradient; //'rgba(225,225,225,0.5)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //ajout de l'évt de type click
    this.canvas.addEventListener('click',this.onPickColor.bind(this));
};

ColorPalette.prototype.getMouseLocation = function(event)
{
    var rectangle = this.canvas.getBoundingClientRect(); // donne la position d'un elt
    var location = {
        x: event.clientX - rectangle.x,
        y: event.clientY - rectangle.y
    };

    return location;
};


ColorPalette.prototype.onPickColor = function(event)
{
    var pixel=  this.getMouseLocation(event);

    var palette = this.context.getImageData(pixel.x, pixel.y, 1, 1);

    console.log(palette.data);

    var color = {
        r: palette.data[0],
        g: palette.data[1],
        b: palette.data[2]
    };

    this.pen.color = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';

};
//github.com/FokkeZB
//
$(function() {
    var canvas = document.createElement("canvas");
    canvas.width = 14;
    canvas.height = 14;
    //document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.font = "14px FontAwesome";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("\uf002", 7, 7);
    var dataURL = canvas.toDataURL('image/png')
    $('#slate').css('cursor', 'url('+dataURL+'), auto');
});