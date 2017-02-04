(function (scope) {
    "use strict";

    var ICTJAM3 = scope.ICTJAM3;
    var Phaser = scope.Phaser;

    ICTJAM3.Game = function () {
    };

    ICTJAM3.Game.prototype = {
        create: function () {
            this.stateSave = new ICTJAM3.StateSaver();
            console.log(this.stateSave);
            var facing = 'left';
            var cursors;
            var map = this.add.tilemap('test_map');
            map.addTilesetImage('temp_tiles', 'temp_tiles');
            this.npc = [];
            this.chatBuddy;
            this.style = { font: "65px Arial", fill: "#ff0044", align: "center"  };

            this.mapLayer = map.createLayer('Tile Layer 1');

            this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'ok');
            this.npc['mom'] = this.add.sprite(this.world.centerX + 10, this.world.centerY + 10, 'mom');
            this.npc['mom'].talk = () => {
                var text = this.add.text(this.world.centerX, this.world.centerY, "Lucy, thank goodness you are ok!", this.style);
                console.log('screw you!');
            };
            this.sprite.anchor.setTo(0.5, 0.5);

            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.time.desiredFps = 30;

            this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.physics.enable(this.npc['mom'], Phaser.Physics.ARCADE);

            this.sprite.body.bounce.y = 0.2;
            this.sprite.body.collideWorldBounds = true;
            this.sprite.body.setSize(20, 32, 5, 16);
            this.sprite.body.drag.setTo(1000, 1000);

            this.cursors = this.input.keyboard.createCursorKeys();
            this.button = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        },

        update: function () {
            this.sprite.angle++;
            this.sprite.body.velocity.x = 0;

            this.physics.arcade.collide(this.sprite, this.npc['mom'], function (a, b) {a.chatBuddy = b; console.log('collide')});

            if (this.cursors.left.isDown)
            {
                this.sprite.body.velocity.x = -150;
                if (this.facing != 'left')
                {
                    this.sprite.animations.play('left');
                    this.facing = 'left';
                }
            }
            else if (this.cursors.right.isDown)
            {
                this.sprite.body.velocity.x = 150;
                if (this.facing != 'right')
                {
                    this.sprite.animations.play('right');
                    this.facing = 'right';
                }
            }
            if (this.cursors.up.isDown)
            {
                this.sprite.body.velocity.y = -150;
                if (this.facing != 'left')
                {
                    this.sprite.animations.play('left');
                    this.facing = 'left';
                }
            }
            if (this.cursors.down.isDown)
            {
                this.sprite.body.velocity.y = 150;
                if (this.facing != 'right')
                {
                    this.sprite.animations.play('right');
                    this.facing = 'right';
                }
            }
            if(this.button.isDown) {
                this.sprite.chatBuddy.talk();
            }
            if (this.facing != 'idle')
            {
                this.sprite.animations.stop();
                if (this.facing == 'left')
                {
                    this.sprite.frame = 0;
                }
                else
                {
                    this.sprite.frame = 5;
                }
                this.facing = 'idle';
            }
        }
    };
})(this);
