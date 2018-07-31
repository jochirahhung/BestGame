function Actor(nameString, x, y, r)
{
    this.name = nameString;
    this.pos = {x: x, y: y};

    this.boundsRadius = r;

}
Actor.prototype.update = function(dt)
{

};

function ball(parent, nameString, x, y, r){
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

        // this.onCollect = function() {
        //     app.stage.removeChild(this.ball);
        //     app.enemy = new ball(app.stage, "ball", 75, 75, 40);
        //     app.stage.addChild(app.enemy);
        // }
    }
}
ball.prototype = Object.create(Actor.prototype);
ball.prototype.constructor = ball;

function ball2(parent, nameString, x, y, r){
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
}
ball2.prototype = Object.create(Actor.prototype);
ball2.prototype.constructor = ball2;


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

        // if(app.keyboard.spacebar.isPressed) {
        //     app.bullet = new Bullet("bullet", app.playerChar.pos.x, app.playerChar.pos.y, 10);
        // }

        if(areActorsColliding(this, app.enemy)) {
            console.log("Enemy 1 is colliding");
            // app.enemy.onCollect();
        }

        if(areActorsColliding(this, app.enemy2)) {
            console.log("Enemy 2 is colliding");
            // app.enemy2.onCollect();
        }

        player.x = app.playerChar.pos.x;
        player.y = app.playerChar.pos.y;
    }
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;

function Bullet(nameString, x, y, r) {
    Actor.call(this, nameString, x, y, r);

    var bullet = new Shape();
    bullet.graphics.beginFill('#00ff00').drawCircle(x, y, r);
    app.stage.addChild(bullet);
    var angleRad = Math.atan2(app.playerChar.pos.y - app.bullet.pos.y, app.playerChar.pos.x - app.bullet.pos.x);
    var angleDeg = angleRad * 180 / Math.PI;
    app.playerChar.rotation = angleDeg;
    this.update = function(dt) {
        app.bullet.pos.x += Math.cos(angleRad) * 150 * dt;
        app.bullet.pos.y += Math.sin(angleRad) * 150 * dt;
        bullet.x = app.bullet.pos.x;
        bullet.y = app.bullet.pos.y;
    }
}
Bullet.prototype = Object.create(Actor.prototype);
Bullet.prototype.constructor = Bullet;