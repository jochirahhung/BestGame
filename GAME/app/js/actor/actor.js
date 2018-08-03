function Actor(nameString, x, y, r)
{
    this.name = nameString;
    this.pos = {x: x, y: y};

    this.boundsRadius = r;

}
Actor.prototype.update = function(dt)
{

};

function Enemy(parent, nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    var ball = new createjs.Shape();
    ball.graphics.beginStroke("#fffff").drawCircle(0, 0, r);
    ball.x = x;
    ball.y = y;

    app.stage.addChild(ball);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 25 * dt;
        this.pos.y += Math.sin(angleRad) * 25 * dt;
        ball.x = this.pos.x;
        ball.y = this.pos.y;
    }

    this.onCollect = function() {
        app.stage.removeChild(ball);
        app.enemy1Array.splice(app.enemy1Array.indexOf(this), 1);
        var x = Math.floor(Math.random() * app.SCREEN_WIDTH);
        var y = Math.floor(Math.random() * app.SCREEN_HEIGHT);
        // app.enemy1Array.push(new Enemy(app.stage, "ball", x, y, 40));
    }
}
Enemy.prototype = Object.create(Actor.prototype);
Enemy.prototype.constructor = Enemy;

function Enemy2(parent, nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    var ball2 = new createjs.Shape();
    ball2.graphics.beginStroke("#fffff").drawCircle(0, 0, r);
    ball2.x = x;
    ball2.y = y;

    app.stage.addChild(ball2);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 50 * dt;
        this.pos.y += Math.sin(angleRad) * 50 * dt;
        ball2.x = this.pos.x;
        ball2.y = this.pos.y;
    }

    this.onCollect = function() {
        app.stage.removeChild(ball2);
        app.enemy2Array.splice(app.enemy2Array.indexOf(this), 1);
        var x = Math.floor(Math.random() * app.SCREEN_WIDTH);
        var y = Math.floor(Math.random() * app.SCREEN_HEIGHT);
        app.enemy2Array.push(new Enemy2(app.stage, "ball2", x, y, 10));
    }
}
Enemy2.prototype = Object.create(Actor.prototype);
Enemy2.prototype.constructor = Enemy2;

function Enemy3(parent, nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    var ball3 = new createjs.Shape();
    ball3.graphics.beginStroke("#fffff").drawCircle(0, 0, r);
    ball3.x = x;
    ball3.y = y;

    app.stage.addChild(ball3);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 25 * dt;
        this.pos.y += Math.sin(angleRad) * 25 * dt;
        ball3.x = this.pos.x;
        ball3.y = this.pos.y;
    }

    this.onCollect = function() {
        app.stage.removeChild(ball3);
        app.enemy3Array.splice(app.enemy3Array.indexOf(this), 1);
        var x = Math.floor(Math.random() * app.SCREEN_WIDTH);
        var y = Math.floor(Math.random() * app.SCREEN_HEIGHT);
        app.enemy3Array.push(new Enemy3(app.stage, "ball3", x, y, 30));
    }
}
Enemy3.prototype = Object.create(Actor.prototype);
Enemy3.prototype.constructor = Enemy3;

function Player(nameString, x, y, width, height, r) {
    Actor.call(this, nameString, x, y, r);

    var player = new createjs.Shape();
    player.graphics.beginFill('#fffff').drawRect(0, 0, width, height);
    player.x = x;
    player.y = y;
    player.setBounds(0, 0, 25, 25);
    player.regX = width/2;
    player.regY = height/2;
    app.stage.addChild(player);  

    this.update = function(dt) {
        var angleRad = Math.atan2(app.mousePos.y - app.playerChar.pos.y, app.mousePos.x - app.playerChar.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        app.playerChar.rotation = angleDeg;
        if(app.keyboard.w.isPressed)
        {
            app.playerChar.pos.y -= 150 * dt;
        }
        
        if(app.keyboard.s.isPressed)
        {
            app.playerChar.pos.y += 150 * dt;
        }
        
        if(app.keyboard.d.isPressed) {
            app.playerChar.pos.x += 150 * dt;
        }
        
        if(app.keyboard.a.isPressed) {
            app.playerChar.pos.x -= 150 * dt;
        }

        app.enemy1Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                console.log("Enemy 1 is colliding");
                entry.onCollect();
            }
        }, this);
        

        app.enemy2Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                console.log("Enemy 2 is colliding");
                entry.onCollect();
            }
        }, this);

        app.enemy3Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                console.log("Enemy 3 is colliding");
                entry.onCollect();
            }
        }, this);

        player.x = app.playerChar.pos.x;
        player.y = app.playerChar.pos.y;
    }
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;

function Bullet(nameString, x, y, r) {
    Actor.call(this, nameString, x, y, r);

    var bullet = new createjs.Shape();
    bullet.graphics.beginFill('#00ff00').drawCircle(0, 0, r);
    app.stage.addChild(bullet);
    var angleRad = Math.atan2(app.mousePos.y - this.pos.y, app.mousePos.x - this.pos.x);
    var angleDeg = angleRad * 180 / Math.PI;
    app.playerChar.rotation = angleDeg;
    
    this.update = function(dt) {
        this.pos.x += Math.cos(angleRad) * 150 * dt;
        this.pos.y += Math.sin(angleRad) * 150 * dt;
        bullet.x = this.pos.x;
        bullet.y = this.pos.y;

        app.enemy1Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                console.log("Enemy 1 is colliding");
                this.onCollect();
                entry.onCollect();
            }
        }, this);

        app.enemy2Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                console.log("Enemy 2 is colliding");
                this.onCollect();
                entry.onCollect();
            }
        }, this);

        app.enemy3Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                console.log("Enemy 3 is colliding");
                this.onCollect();
                entry.onCollect();
            }
        }, this);
    }

    this.onCollect = function() {
        app.stage.removeChild(bullet);
        app.bullets.splice( app.bullets.indexOf(this), 1 );
    }
}
Bullet.prototype = Object.create(Actor.prototype);
Bullet.prototype.constructor = Bullet;