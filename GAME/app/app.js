var app = {
    stage: null,
    SCREEN_WIDTH: 800,
    SCREEN_HEIGHT: 600,
    FPS: 30,
    keyboard: {
        a : { keycode: 65, isPressed: false },
        w : { keycode: 87, isPressed: false },
        d : { keycode: 68, isPressed: false },
        s : { keycode: 83, isPressed: false },
        spacebar : { keycode: 32, isPressed: false }
    },
    mousePos: {
        x: 0,
        y: 0
    },

    assets: null,
    playerChar: null,
    enemy: null,
    bullets: [],
    enemy2: null,
    enemy3: null,
    debugLine: null,
    setupCanvas: function() {
        var canvas = document.getElementById("game");
        canvas.width = app.SCREEN_WIDTH;
        canvas.height = app.SCREEN_HEIGHT;
        this.stage = new createjs.Stage(canvas);
    },
    beginLoad: function() {
        manifest = [
            {
                src: "js/actor/actor.js"
            },
            {
                src: "js/utilities.js"
            }
        ];
        this.assets = new createjs.LoadQueue(true);

        this.assets.on("progress", function (event) { 
            // console.log(((event.loaded / event.total) * 100) + "%"); 
        });

        this.assets.on("complete", function (event) {
            app.init();
        });

        this.assets.loadManifest(manifest);
    },
    init: function() {
        this.setupCanvas();

        this.stage.enableMouseOver();

        var screen = new createjs.Shape();
        screen.graphics.beginStroke('#000').drawRect(0, 0, app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
        app.stage.addChild(screen);

        this.stage.on("stagemousemove", function(event) {
            app.mousePos.x = Math.floor(event.stageX);
            app.mousePos.y = Math.floor(event.stageY);
        });

        this.playerChar = new Player("player", app.SCREEN_WIDTH/2, app.SCREEN_HEIGHT/2, 25, 25, 25);

        this.debugLine = new createjs.Shape();
        this.debugLine.graphics.beginStroke('00f').moveTo(this.playerChar.pos.x, this.playerChar.pos.y).lineTo(app.mousePos.x, app.mousePos.y);
        this.stage.addChild(this.debugLine);

        this.stage.on("stagemousedown", function(event) {
            console.log("jkjkjk");
            app.bullets.push(new Bullet("Bullet", app.playerChar.pos.x, app.playerChar.pos.y, 5));
        });

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;

        this.enemy = new Enemy(this.stage, "ball", 75, 75, 40);

        this.enemy2 = new Enemy2(this.stage, "ball2", app.SCREEN_WIDTH - 75, app.SCREEN_HEIGHT - 75, 10);

        createjs.Ticker.addEventListener("tick", this.update);
        createjs.Ticker.framerate = this.FPS;   
    },
    update: function(event) {
        app.stage.update(event);
        var dt = event.delta / 1000;
        app.elapsedTime += dt;

        app.debugLine.graphics.clear();
        app.debugLine.graphics.beginStroke('00f').moveTo(app.playerChar.pos.x, app.playerChar.pos.y).lineTo(app.mousePos.x, app.mousePos.y);
        var ROT_SPEED = 100;
        var MOVE_SPEED = 100;

        app.playerChar.update(dt);
        app.enemy.update(dt);
        app.enemy2.update(dt);

        for(var i = 0; i < app.bullets.length; i++) {
            app.bullets[i].update(dt);
        }
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
            case app.keyboard.spacebar.keyCode:        app.keyboard.spacebar.isPressed = true; return false;
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
            case app.keyboard.spacebar.keyCode:        app.keyboard.spacebar.isPressed = false; return false;
        }
    }
}

app.beginLoad();