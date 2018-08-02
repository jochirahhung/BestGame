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
    ball.graphics.beginStroke("#000").drawCircle(0, 0, r);
    ball.x = x;
    ball.y = y;

    app.stage.addChild(ball);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - app.enemy.pos.y, app.playerChar.pos.x - app.enemy.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        app.enemy.rotation = angleDeg;
        app.enemy.pos.x += Math.cos(angleRad) * 25 * dt;
        app.enemy.pos.y += Math.sin(angleRad) * 25 * dt;
        ball.x = app.enemy.pos.x;
        ball.y = app.enemy.pos.y;
    }

    this.onCollect = function() {
        app.stage.removeChild(ball);
        app.enemy = new Enemy(app.stage, "ball", 75, 75, 40);
    }
}
Enemy.prototype = Object.create(Actor.prototype);
Enemy.prototype.constructor = Enemy;

function Enemy2(parent, nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    var ball2 = new createjs.Shape();
    ball2.graphics.beginStroke("#000").drawCircle(0, 0, r);
    ball2.x = x;
    ball2.y = y;
    app.stage.addChild(ball2);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - app.enemy2.pos.y, app.playerChar.pos.x - app.enemy2.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        app.enemy2.rotation = angleDeg;
        app.enemy2.pos.x += Math.cos(angleRad) * 50 * dt;
        app.enemy2.pos.y += Math.sin(angleRad) * 50 * dt;
        ball2.x = app.enemy2.pos.x;
        ball2.y = app.enemy2.pos.y;
    }

    this.onCollect = function() {
        app.stage.removeChild(ball2);
        app.enemy2 = new Enemy2(app.stage, "ball2", app.SCREEN_WIDTH - 75, app.SCREEN_HEIGHT - 75, 10);
    }
}
Enemy2.prototype = Object.create(Actor.prototype);
Enemy2.prototype.constructor = Enemy2;

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

        if(areActorsColliding(this, app.enemy)) {
            console.log("Enemy 1 is colliding");
            app.enemy.onCollect();
        }

        if(areActorsColliding(this, app.enemy2)) {
            console.log("Enemy 2 is colliding");
            app.enemy2.onCollect();
        }

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

        if(areActorsColliding(this, app.enemy)) {
            console.log("Enemy 1 is colliding");
            this.onCollect();
            app.enemy.onCollect();
        }

        if(areActorsColliding(this, app.enemy2)) {
            console.log("Enemy 2 is colliding");
            this.onCollect();
            app.enemy2.onCollect();            
        }
    }

    this.onCollect = function() {
        app.stage.removeChild(bullet);
        app.bullets.splice( app.bullets.indexOf(this), 1 );
    }
}
Bullet.prototype = Object.create(Actor.prototype);
Bullet.prototype.constructor = Bullet;