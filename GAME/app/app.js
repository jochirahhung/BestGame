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
    bullet: null,
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

        this.stage.on("stagemousemove", function(event) {
            app.mousePos.x = Math.floor(event.stageX);
            app.mousePos.y = Math.floor(event.stageY);
            // console.log("AAAAAAAAAAAAAAAAAAAAA: ( " + app.mousePos.x + ", " + app.mousePos.y + ")");
        });

        // this.playerChar = new createjs.Shape();
        // this.playerChar.graphics.beginFill('#fffff').drawRect(0, 0, 25, 25);
        // this.playerChar.setBounds(0,0,25,25);
        // this.playerChar.regX = 12.5;
        // this.playerChar.regY = 12.5;
        // this.playerChar.x = this.SCREEN_WIDTH/2;
        // this.playerChar.y = this.SCREEN_HEIGHT/2;
        // this.stage.addChild(this.playerChar);  

        this.playerChar = new Player("player", app.SCREEN_WIDTH/2, app.SCREEN_HEIGHT/2, 25, 25);

        this.debugLine = new createjs.Shape();
        this.debugLine.graphics.beginStroke('00f').moveTo(this.playerChar.pos.x, this.playerChar.pos.y).lineTo(app.mousePos.x, app.mousePos.y);
        this.stage.addChild(this.debugLine);

        this.stage.on("stagemousedown", function(event) {
            console.log("jkjkjk");
        });

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;

        this.enemy = new ball(this.stage, "ball", 20, 20, 40);

        this.enemy2 = new ball2(this.stage, "ball2", 70, 20, 10);

        createjs.Ticker.addEventListener("tick", this.update);
        createjs.Ticker.framerate = this.FPS;   
    },
    update: function(event) {
        app.stage.update(event);
        var dt = event.delta / 1000;
        app.elapsedTime += dt;
        
        app.enemy.update(dt);
        app.enemy2.update(dt);
        app.debugLine.graphics.clear();
        app.debugLine.graphics.beginStroke('00f').moveTo(app.playerChar.pos.x, app.playerChar.pos.y).lineTo(app.mousePos.x, app.mousePos.y);
        var ROT_SPEED = 100;
        var MOVE_SPEED = 100;

        app.enemy.update(dt);
        app.playerChar.update(dt);
        app.bullet.update(dt);
        
        // var rotation = app.playerChar.rotation / 360 * 2 * Math.PI;

        // if(app.keyboard.w.isPressed)
        // {
        //     app.playerChar.y -= MOVE_SPEED * dt;
        // }
        
        // if(app.keyboard.s.isPressed)
        // {
        //     app.playerChar.y += MOVE_SPEED * dt;
        // }
        
        // if(app.keyboard.d.isPressed) {
        //     app.playerChar.x += MOVE_SPEED * dt;
        // }
        
        // if(app.keyboard.a.isPressed) {
        //     app.playerChar.x -= MOVE_SPEED * dt;
        // }

        // var angleRad = Math.atan2(app.mousePos.y - app.playerChar.y, app.mousePos.x - app.playerChar.x);
        // var angleDeg = angleRad * 180 / Math.PI;
        // app.playerChar.rotation = angleDeg;
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