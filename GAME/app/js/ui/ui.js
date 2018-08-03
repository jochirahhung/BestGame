var ui = {
    colors: {
        //add colors here...
    },

    titleFont: "Permanent Marker",
    defaultFont: "Eczar",
    secondaryFont: "Arial",

    makeBasicText: function(parent, text, size, x, y) {
        var textElement = new createjs.Text(text, size + " " + this.defaultFont, "rgb(0,0,0)");
        textElement.x = x;
        textElement.y = y;
        textElement.textAlign = "center";
        textElement.textBaseline = "middle";
        parent.addChild(textElement);

        return textElement;
    },

    makeTitleText: function(parent, text, size, x, y) {
        var textElement = new createjs.Text(text, size + " " + this.titleFont, "rgb(0,0,0)");
        textElement.x = x;
        textElement.y = y;
        textElement.textAlign = "center";
        textElement.textBaseline = "middle";
        parent.addChild(textElement);

        return textElement;
    },

    makeBasicButton: function(parent, text, x, y, callbackFunc) {
        var BUTTON_WIDTH = 200;
        var BUTTON_HEIGHT = 50;

        var buttonElement = new createjs.Container();
        buttonElement.x = x - BUTTON_WIDTH / 2;
        buttonElement.y = y;
        parent.addChild(buttonElement);

        var shape = new createjs.Shape();
        shape.graphics.beginFill("rgb(255,255,255)").drawRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
        buttonElement.addChild(shape);

        var text = this.makeBasicText(buttonElement, text, "14px", BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);

        buttonElement.on("mousedown", callbackFunc);

        return buttonElement;
    }
}