var app = {
    stage: null,
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
    gameState: 0,

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
            { src: "js/ui/screen.js" },
            { src: "js/actor/playerSettings.js"},
            { src: "js/settings.js" }
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

        app.setState(STATES.MAIN_MENU);

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;

        createjs.Ticker.addEventListener("tick", this.update);
        createjs.Ticker.framerate = FPS;   
    },
    update: function(event) {
        app.stage.update(event);
        var dt = event.delta / 1000;
        app.elapsedTime += dt;
        //state machine update (update as necessary)
        if (app.gameState === STATES.GAMEPLAY) {
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
                app.BossArray.push(new Boss("boss", x, 700, 75, 75, 35));
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
    },

    //state machine
    setState: function(newState) {
        this.gameState = newState;

        this.stage.removeChild(this.screen);

        console.log("SET STATES IS SETTING STATE TOO MUCH POSSIBLY");
        switch (newState) {
            case STATES.MAIN_MENU:
                this.screen = new LandingScreen(
                    //play button logic
                    function() {
                        app.setState(STATES.GAMEPLAY);
                    },
                    //instruction button logic
                    function() {
                        app.setState(STATES.INSTRUCTIONS);
                    }
                );
                // this.stage.addChild(this.screen);
                break;
            case STATES.GAMEPLAY:
                this.screen = new GameplayScreen();
                this.resetGame();
                break;
            case STATES.INSTRUCTIONS:
                this.screen = new InstructionScreen(
                    //back button logic
                    function() {
                        app.setState(STATES.MAIN_MENU);
                    }
                );
                break;
            case STATES.GAME_OVER:
                this.screen = new GameOverScreen(
                    //play again button logic
                    function() {
                        app.setState(STATES.GAMEPLAY);
                    },
                    //main menu button logic
                    function() {
                        app.setState(STATES.MAIN_MENU);
                    }
                );
                break;
            case STATES.WIN_SCREEN:
                this.screen = new WinScreen(
                    //play again button logic
                    function() {
                        app.setState(STATES.GAMEPLAY);
                    },
                    //main menu button logic
                    function() {
                        app.setState(STATES.MAIN_MENU);
                    }
                );
                break;
            default:
                console.log("ERROR: GAMESTATE DEFAULT CASE");
                break;
        }
        this.stage.addChild(this.screen);
    },

    resetGame: function() {
        this.playerChar = new Player("player", SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 25, 25, 25);

        this.debugLine = new createjs.Shape();
        this.debugLine.graphics.beginStroke('00f').moveTo(this.playerChar.pos.x, this.playerChar.pos.y).lineTo(app.mousePos.x, app.mousePos.y);
        this.stage.addChild(this.debugLine);

        this.stage.on("stagemousedown", function(event) {
            console.log("jkjkjk");
            if(app.fireRate <= 0) {
                app.bullets.push(new Bullet("Bullet", app.playerChar.pos.x, app.playerChar.pos.y, 5));
                app.fireRate = 1 - (thePlayer.specials.perception / 10);
            }
        });

        for(var i = 0; i < 4; i++){
            var randStart = Math.floor(Math.random() * 100);
            var randScreenPos = Math.floor(Math.random() * 100);
            if(randStart % 2 == 1) {
                if (randScreenPos % 2 == 1) {
                    var x = Math.floor(Math.random() * SCREEN_WIDTH);
                    app.enemy1Array.push(new Enemy("ball", x, SCREEN_HEIGHT + 100, 40));
                }
                else if (randScreenPos % 2 == 0) {
                    var x = Math.floor(Math.random() * SCREEN_WIDTH);
                    app.enemy1Array.push(new Enemy("ball", x, -100, 40));
                }
            }else if (randStart % 2 == 0) {
                if (randScreenPos % 2 == 1) {
                    var y = Math.floor(Math.random() * SCREEN_HEIGHT);
                    app.enemy1Array.push(new Enemy("ball", SCREEN_WIDTH + 100, y, 40));
                }
                else if (randScreenPos % 2 == 0) {
                    var y = Math.floor(Math.random() * SCREEN_HEIGHT);
                    app.enemy1Array.push(new Enemy("ball", -100, y, 40));
                }
            }
        }
        for(var i = 0; i < 2; i++){
            var randStart = Math.floor(Math.random() * 100);
            var randScreenPos = Math.floor(Math.random() * 100);
            if(randStart % 2 == 1) {
                if (randScreenPos % 2 == 1) {
                    var x = Math.floor(Math.random() * SCREEN_WIDTH);
                    app.enemy2Array.push(new Enemy2("ball2", x, SCREEN_HEIGHT + 100, 10));
                }
                else if (randScreenPos % 2 == 0) {
                    var x = Math.floor(Math.random() * SCREEN_WIDTH);
                    app.enemy2Array.push(new Enemy2("ball2", x, -100, 10));
                }
            }else if (randStart % 2 == 0) {
                if (randScreenPos % 2 == 1) {
                    var y = Math.floor(Math.random() * SCREEN_HEIGHT);
                    app.enemy2Array.push(new Enemy2("ball2", SCREEN_WIDTH + 100, y, 10));
                }
                else if (randScreenPos % 2 == 0) {
                    var y = Math.floor(Math.random() * SCREEN_HEIGHT);
                    app.enemy2Array.push(new Enemy2("ball2", -100, y, 10));
                }
            }
        }
        for(var i = 0; i < 3; i++){
            var randStart = Math.floor(Math.random() * 1);
            var randScreenPos = Math.floor(Math.random() * 1);
            if(randStart % 2 == 1) {
                if (randScreenPos % 2 == 1) {
                    var x = Math.floor(Math.random() * SCREEN_WIDTH);
                    app.enemy3Array.push(new Enemy3("ball3", x, SCREEN_HEIGHT + 100, 30));
                }
                else if (randScreenPos % 2 == 0) {
                    var x = Math.floor(Math.random() * SCREEN_WIDTH);
                    app.enemy3Array.push(new Enemy3("ball3", x, -100, 30));
                }
            }else if (randStart % 2 == 0) {
                if (randScreenPos % 2 == 1) {
                    var y = Math.floor(Math.random() * SCREEN_HEIGHT);
                    app.enemy3Array.push(new Enemy3("ball3", SCREEN_WIDTH + 100, y, 30));
                }
                else if (randScreenPos % 2 == 0) {
                    var y = Math.floor(Math.random() * SCREEN_HEIGHT);
                    app.enemy3Array.push(new Enemy3("ball3", -100, y, 30));
                }
            }
        }
    }
}