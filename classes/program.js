'use strict';

var Program = function()
{
    //Initialiser les propriétés de ma classe
    this.pen= new Pen();
    // création d'une ardoise avec le crayon précédemment crée
    this.slate = new Slate(this.pen);
    //console.log(this.slate.canvas);
    this.palette = new ColorPalette(this.pen);
    //console.log(this.colorPalette);

};
Program.prototype.start = function()
{
    //Initialiser tous les événements
    $('.pen-size').on('click', this.onPickSize.bind(this));
    $('.pen-color').on('click', this.onPickColor.bind(this));
    $('#tool-rectangle-drawer').on('click', this.slate.drawRectangle.bind(this.slate));
    $('#tool-clear-canvas').on('click', this.slate.onErase.bind(this.slate));
    $('#tool-color-picker').on('click', this.onClickColorPicker.bind(this));
};

Program.prototype.onPickSize = function(event)
{
    this.pen.size = $(event.currentTarget).data('size'); // conflit entre les deux this
    console.log(this.pen.size);
};



Program.prototype.onPickColor = function(event)
{
    this.pen.color = $(event.currentTarget).data('color');
    //console.log(this.pen.color);
};


Program.prototype.onClickColorPicker = function()
{

    $('#color-palette').fadeToggle();

};