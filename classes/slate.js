'use strict';

var Slate = function(pen)
{
    //Initialiser les propriétés de ma classe
    this.canvas= document.getElementById('slate');
    this.context= this.canvas.getContext("2d");
    this.pen = pen;

    //Création d'une propriété currentLocation

    this.currentLocation = {x: 0, y: 0};
    this.canDraw =false;

    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));


};

Slate.prototype.onMouseUp = function(event)
{
    this.currentLocation = this.getMouseLocation(event);

    this.canDraw = false; //On peut dessiner

};

Slate.prototype.onMouseLeave = function(event)
{
    this.canDraw = false;

}


//_______________________________________________quand la souris  bouge
Slate.prototype.onMouseMove = function(event)
{
    //console.log(event.clientX, event.clientY);

    //console.log(this.getMouseLocation(event));

    var location = this.getMouseLocation(event);

    if (this.canDraw == true)
    {

        // console.log({x:0, y:0});
        // Début du dessin.
        this.context.beginPath();

        // Dessine un trait entre les précédentes coordonnées de la souris et les nouvelles.
        this.context.moveTo(this.currentLocation.x, this.currentLocation.y);
        this.context.lineTo(location.x,location.y);

        // Fin du dessin.
        this.context.closePath();

        // Applique les changements dans le canvas.


        this.context.strokeStyle = this.pen.color;
        this.context.lineWidth = this.pen.size;
        this.context.stroke();

        //On met à jour currentLocation
        this.currentLocation = location;
    }

};

Slate.prototype.onMouseDown = function(event)
{
    this.currentLocation = this.getMouseLocation(event);
    //console.log(this.onMouseDown(event));
    this.canDraw= true;
};

//_________________________________________________dessine moi un mout.. non un rectangle
Slate.prototype.drawRectangle = function()
{
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.rect(0, 0, 550, 550);
    this.context.fillStyle = "white";
    this.context.fill();

    this.context.strokeStyle = this.pen.color;
    this.context.stroke();

};
//_________________________________________________localisation de la souris
Slate.prototype.getMouseLocation = function(event) {
    //Retourne la position de la souris dans le canvas
    //https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect
    var boundings = this.canvas.getBoundingClientRect(); // donne la position d'un elt
    var location = {
        x: event.clientX - boundings.x,
        y: event.clientY - boundings.y
    };
    return location;
};
// _________________________________________________________effacer

Slate.prototype.onErase = function(event)
{
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};