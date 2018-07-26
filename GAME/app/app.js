var app = {
    stage: null,
    SCREEN_WIDTH: 800,
    SCREEN_HEIGHT: 600,
    FPS: 30,
    keyboard: {
        a : { keycode: 65, isPressed: false },
        w : { keycode: 87, isPressed: false },
        d : { keycode: 68, isPressed: false },
        s : { keycode: 83, isPressed: false }
    },
    mousePos: {
        x: 0,
        y: 0
    },

    assets: null,


    playerObject: null,
    setupCanvas: function() {
        var canvas = document.getElementById("game");
        canvas.width = app.SCREEN_WIDTH;
        canvas.height = app.SCREEN_HEIGHT;
        this.stage = new createjs.Stage(canvas);
    },
    beginLoad: function() {
        manifest = [
            {
                src: "js/actor/actor.js",
            },
        ];
        this.assets = new createjs.LoadQueue(true); 

        this.assets.on("complete", function (event) {
            app.init();
        });

        this.assets.loadManifest(manifest);
    },
    init: function() {
        this.setupCanvas();

        this.stage.enableMouseOver();

        this.stage.on("stagemousemove", function(event) {
            app.mousePos.x = Math.floor(event.stageX);
            app.mousePos.y = Math.floor(event.stageY);
            console.log("AAAAAAAAAAAAAAAAAAAAA: ( " + app.mousePos.x + ", " + app.mousePos.y + ")");
        });

        this.stage.on("stagemousedown", function(event) {
            app.handleMouseDown(event);
        });

        createjs.Ticker.addEventListener("tick", this.update);
        createjs.Ticker.framerate = this.FPS;   
    },
    update: function(event) {
        app.stage.update(event);
        var dt = event.delta / 1000;
        app.elapsedTime += dt;
        this.playerObject = new ball(this.stage, "ball", 0, 0, 2);

    },
    handleKeyDown: function(event)
    {
        if(!evt){ var evt = window.event; }

        switch(evt.keyCode) {
            case app.keyboard.a.keycode:        app.keyboard.a.isPressed = true; return false;
            case app.keyboard.w.keycode:        app.keyboard.w.isPressed = true; return false;
            case app.keyboard.d.keycode:        app.keyboard.d.isPressed = true; return false;
            case app.keyboard.s.keycode:        app.keyboard.s.isPressed = true; return false;
            case app.keyboard.j.keycode:        app.keyboard.j.isPressed = true; return false;
            case app.keyboard.k.keyCode:        app.keyboard.k.isPressed = true; return false;
        }
    },
    handleKeyUp: function(event)
    {
        if(!evt){ var evt = window.event; }

        switch(evt.keyCode) {
            case app.keyboard.a.keycode:        app.keyboard.a.isPressed = false; return false;
            case app.keyboard.w.keycode:        app.keyboard.w.isPressed = false; return false;
            case app.keyboard.d.keycode:        app.keyboard.d.isPressed = false; return false;
            case app.keyboard.s.keycode:        app.keyboard.s.isPressed = false; return false;
            case app.keyboard.j.keycode:        app.keyboard.j.isPressed = false; return false;
            case app.keyboard.k.keyCode:        app.keyboard.k.isPressed = false; return false;
        }
    }
}