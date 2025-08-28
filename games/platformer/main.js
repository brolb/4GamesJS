// Game configuration
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var platforms;

var game = new Phaser.Game(config);

function preload ()
{
    // You can't load a solid color, so we'll create the square later.
}

function create ()
{
    // Set a solid background color
    this.cameras.main.setBackgroundColor('#333333');

    // Create the floor and platforms
    platforms = this.physics.add.staticGroup();

    // Create the floor
    platforms.create(400, 580, 'floor').setScale(2, 0.5).refreshBody();

    // Create the platforms
    platforms.create(600, 450, 'platform').setScale(0.5, 0.5).refreshBody();
    platforms.create(50, 300, 'platform').setScale(0.5, 0.5).refreshBody();
    platforms.create(750, 200, 'platform').setScale(0.5, 0.5).refreshBody();

    // You need to draw the platforms as a solid color.
    // In a real game, you would use images. Here's a workaround:
    this.add.rectangle(400, 580, 800, 20, 0x00ff00);
    this.add.rectangle(600, 450, 200, 20, 0x00ff00);
    this.add.rectangle(50, 300, 200, 20, 0x00ff00);
    this.add.rectangle(750, 200, 200, 20, 0x00ff00);

    // Create the red square (the player)
    // We create a graphics object and use it as a texture
    var graphics = this.add.graphics();
    graphics.fillStyle(0xff0000, 1);
    graphics.fillRect(0, 0, 50, 50);
    graphics.generateTexture('redSquare', 50, 50);
    
    player = this.physics.add.sprite(100, 450, 'redSquare');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Add collision between the player and the platforms
    this.physics.add.collider(player, platforms);

    // Get keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    // You'll need to get A, D, and Space keys specifically
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update ()
{
    // Player movement
    if (this.aKey.isDown)
    {
        player.setVelocityX(-160);
    }
    else if (this.dKey.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    // Player jump
    if (this.spaceKey.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}