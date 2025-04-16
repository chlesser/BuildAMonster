class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.smileVisible = true;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.

        //body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_redC.png");
        //arms
        my.sprite.leftArm = this.add.sprite(this.bodyX - 100, this.bodyY, "monsterParts", "arm_redC.png");
        my.sprite.rightArm = this.add.sprite(this.bodyX + 100, this.bodyY, "monsterParts", "arm_redC.png");
        my.sprite.leftArm.flipX = true;
        //legs
        my.sprite.leftLeg = this.add.sprite(this.bodyX - 50, this.bodyY + 125, "monsterParts", "leg_redC.png");
        my.sprite.rightLeg = this.add.sprite(this.bodyX + 50, this.bodyY + 125, "monsterParts", "leg_redC.png");
        my.sprite.leftLeg.flipX = true;
        //Eye
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 75, "monsterParts", "eye_psycho_dark.png");
        //Mouth
        my.sprite.mouthSmile = this.add.sprite(this.bodyX, this.bodyY - 25, "monsterParts", "mouth_closed_happy.png");
        my.sprite.mouthFangs = this.add.sprite(this.bodyX, this.bodyY - 25, "monsterParts", "mouthF.png");
        my.sprite.mouthFangs.visible = false; // hide fangs by default
        //Ears
        my.sprite.leftEar = this.add.sprite(this.bodyX - 50, this.bodyY - 90, "monsterParts", "detail_white_ear.png");
        my.sprite.rightEar = this.add.sprite(this.bodyX + 50, this.bodyY - 90, "monsterParts", "detail_white_ear.png");
        my.sprite.leftEar.flipX = true;

        this.sKey = this.input.keyboard.addKey("S");
        this.fKey = this.input.keyboard.addKey("F");
        this.dKey = this.input.keyboard.addKey("D");
        this.aKey = this.input.keyboard.addKey("A");
    }

    

    update() {
        if(this.smileVisible) {
            this.my.sprite.mouthSmile.visible = true; // show smile
            this.my.sprite.mouthFangs.visible = false; // hide fangs
        } else {
            this.my.sprite.mouthSmile.visible = false; // hide smile
            this.my.sprite.mouthFangs.visible = true;  // show fangs
        }
        // Update the monster's position based on input
        if(this.sKey.isDown) {
            this.smileVisible = true; // show smile
        }
        else if(this.fKey.isDown) {
            this.smileVisible = false; // show fangs
        }
        if (this.dKey.isDown) {
            for(const elem in this.my.sprite) {
                this.my.sprite[elem].x += 2; // move right
            }
        }
        else if(this.aKey.isDown) {
            for(const elem in this.my.sprite) {
                this.my.sprite[elem].x -= 2; // move left
            }
        }
    }

}