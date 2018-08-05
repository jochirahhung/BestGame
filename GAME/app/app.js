var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

var app = {
    stage: null,
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
    fireRate: 0,
    bossRate: 15,
    assets: null,
    playerChar: null,
    enemy: null,
    bullets: [],
    enemy1Array: [],
    enemy2Array: [],
    enemy3Array: [],
    BossArray: [],
    debugLine: null,
    screen: null,
    setupCanvas: function() {
        var canvas = document.getElementById("game");
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
        this.stage = new createjs.Stage(canvas);
    },
    beginLoad: function() {
        manifest = [
            { src: "js/actor/actor.js" },
            { src: "js/utilities.js" },
            { src: "js/ui/ui.js" },
            { src: "js/ui/screen.js" }
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
        screen.graphics.beginStroke('#000').drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        app.stage.addChild(screen);

        this.stage.on("stagemousemove", function(event) {
            app.mousePos.x = Math.floor(event.stageX);
            app.mousePos.y = Math.floor(event.stageY);
        });

        this.playerChar = new Player("player", SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 25, 25, 25);

        this.debugLine = new createjs.Shape();
        this.debugLine.graphics.beginStroke('00f').moveTo(this.playerChar.pos.x, this.playerChar.pos.y).lineTo(app.mousePos.x, app.mousePos.y);
        this.stage.addChild(this.debugLine);

        this.stage.on("stagemousedown", function(event) {
            console.log("jkjkjk");
            if(app.fireRate <= 0) {
                app.bullets.push(new Bullet("Bullet", app.playerChar.pos.x, app.playerChar.pos.y, 5));
                app.fireRate = .5;
            }
        });

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;

        for(var i = 0; i < 3; i++){
            var x = Math.floor(Math.random() * SCREEN_WIDTH);
            var y = Math.floor(Math.random() * SCREEN_HEIGHT);
            app.enemy1Array.push(new Enemy("ball", x, y, 40));
        }
        for(var i = 0; i < 3; i++){
            var x = Math.floor(Math.random() * SCREEN_WIDTH);
            var y = Math.floor(Math.random() * SCREEN_HEIGHT);
            app.enemy2Array.push(new Enemy2("ball2", x, y, 10));
        }
        for(var i = 0; i < 3; i++){
            var x = Math.floor(Math.random() * SCREEN_WIDTH);
            var y = Math.floor(Math.random() * SCREEN_HEIGHT);
            app.enemy3Array.push(new Enemy3("ball3", x, y, 30));
        }

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
        if(app.fireRate > 0) {
            app.fireRate -= dt;
        }

        if(app.bossRate > 0) {
            app.bossRate -= dt;
        } else {
            var x = Math.floor(Math.random() * SCREEN_WIDTH);
            var y = Math.floor(Math.random() * SCREEN_HEIGHT);
            app.BossArray.push(new Boss("boss", x, y, 75, 75, 75));
            app.bossRate = 15;
        }
        
        for(var i = 0; i < app.BossArray.length; i++) {
            app.BossArray[i].update(dt);
        }
        for(var i = 0; i < app.enemy1Array.length; i++){
            app.enemy1Array[i].update(dt);
        }
        for(var i = 0; i < app.enemy2Array.length; i++){
            app.enemy2Array[i].update(dt);
        }
        for(var i = 0; i < app.enemy3Array.length; i++){
            app.enemy3Array[i].update(dt);
        }

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

// app.beginLoad();