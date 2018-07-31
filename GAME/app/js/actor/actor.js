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
    ball.graphics.beginStroke("#").drawCircle(x, y, r);

    app.stage.addChild(ball);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - app.enemy.pos.y, app.playerChar.pos.x - app.enemy.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        app.enemy.rotation = angleDeg;
        app.enemy.pos.x += Math.cos(angleRad) * 150 * dt;
        app.enemy.pos.y += Math.sin(angleRad) * 150 * dt;
        ball.x = app.enemy.pos.x;
        ball.y = app.enemy.pos.y;
    }
}
ball.prototype = Object.create(Actor.prototype);
ball.prototype.constructor = ball;


function Player(nameString, x, y, width, height) {
    Actor.call(this, nameString, x, y, r = null);

    var player = new createjs.Shape();
    player.graphics.beginFill('#fffff').drawRect(0, 0, width, height);
    player.x = x;
    player.y = y;
    player.setBounds(0, 0, 25, 25);
    player.regX = 12.5;
    player.regY = 12.5;
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

        // use areActorsColliding for unit collision

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