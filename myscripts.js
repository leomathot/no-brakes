
var canvas, ctx;
var bug = [];
var ppl = [];
var player = [];
var num_bugs = 10;
var num_ppl = 6;
var dead_bugs_count = 0;
var dead_ppl_count = 0;
var start_score = 50;
var level = 1;
var time = 61;
var pplVerticalVel = 3;
var pplHorizontalVel;
var bugsVerticalVel = 3;
var bugsHoizontalVel;
var left, right;
var horizontalMov = 0;
var verticalMov = 0;
var inverter= -1;
var leftKey = 0;
var rightKey = 0;
// loop 10 ms

// start
function start() {
    load();

}

function load() {
    canvas = document.getElementById("can");
    ctx = canvas.getContext("2d");
    // buttons
    left = document.getElementById("left");
    right = document.getElementById("right");
    // ppl
    for (var i = 0; i < num_ppl; i++) {
        ppl[i] = new Person();
    }
    // bugs
    for (var i = 0; i < num_bugs; i++) {
        bug[i] = new Bug();
    }
    // player
    player[0] = new Player();
    // actualization
    loop();
}

// timer
function countDown() {
  time--;
  if (time > 0) {
    setTimeout(countDown, 1000);
  }
}
countDown();

// create player
function Player() {
    this.x = 500;
    this.y = 800;
}

// player update
Player.prototype.update = function () {
    //arrow keys down
    document.onkeydown = function (e) {
                var key_code = e.which || e.keyCode;
                e.preventDefault();
                switch (key_code) {
                    case 37: //left arrow key
                        horizontalMov = -1.5;
                        break;
                    case 38: //up arrow key
                        verticalMov = -1.5;
                        break;
                    case 39: //right arrow key
                        horizontalMov = 1.5;
                        break;
                    case 40: //down arrow key
                        verticalMov = 1.5;
                        break;
                }
    }
    //arrow keys up
    document.onkeyup = function (e) {
                var key_code = e.which || e.keyCode;
                switch (key_code) {
                    case 37: //left arrow key
                        horizontalMov = 0;
                        break;
                    case 38: //up arrow key
                        verticalMov = 0;
                        break;
                    case 39: //right arrow key
                        horizontalMov = 0;
                        break;
                    case 40: //down arrow key
                        verticalMov = 0;
                        break;
                }
    }
    // screen touch
    // touchstart
    left.addEventListener("touchstart", function () {
        horizontalMov = -1.5;
    });
    right.addEventListener("touchstart", function () {
        horizontalMov = 1.5;
    });
    up.addEventListener("touchstart", function () {
        verticalMov = -1.5;
    });
    down.addEventListener("touchstart", function () {
        verticalMov = 1.5;
    });
    // touchend
    left.addEventListener("touchend", function () {
        horizontalMov = 0;
    });
    right.addEventListener("touchend", function () {
        horizontalMov = 0;
    });
    up.addEventListener("touchend", function () {
        verticalMov = 0;
    });
    down.addEventListener("touchend", function () {
        verticalMov = 0;
    });
    // movement
    // horizontal movement
    if (horizontalMov < 0 && this.x > 20) {
        this.x = this.x + (horizontalMov * 3); // left
    } else if (horizontalMov > 0 && this.x < 980) {
        this.x = this.x + (horizontalMov * 3); // right
    }
    // vertical movement
    if (verticalMov < 0 && this.y > 50) {
        this.y = this.y + (verticalMov * 3); // left
    } else if (verticalMov > 0 && this.y < 980) {
        this.y = this.y + (verticalMov * 3); // right
    }
}

// create people
function Person() {
    this.x = (canvas.width / 4) + Math.random() * canvas.width / 2;
    this.y = -200;
    sign = Math.sign(0.5 - Math.random());
    this.xvel = Math.random() * 2 * sign;
    this.yvel = Math.random() * pplVerticalVel + 2; // min=2 max=2+pplVerticalVel
    this.color = 0;
    this.status = "alive";
}

// people position and state update
Person.prototype.update = function () {
    // side bounce
    if (this.x > canvas.width - 30 || this.x < 30) {
        this.xvel = -this.xvel;
    }
    // keep moving
    this.x += this.xvel;
    this.y += this.yvel;
    // ppl death
    if ((this.x - player[0].x < 60 && this.x - player[0].x > -60) && (this.y - player[0].y < 190 && this.y - player[0].y > -40)) {
        // crash color
        ctx.fillStyle = '#ff0022';
        ctx.fillRect(this.x - 30, this.y - 30, 60, 95);
        // count + 1
        if (this.status == 'alive') {
            dead_ppl_count++;
        }
        // update status
        this.status = "dead";
        this.xvel = 0;
    }
    // reach lower limit => start again (alive)
    if (this.y > canvas.height + 50) {
        this.y = -150;
        sign = Math.sign(0.5 - Math.random()); // random sign
        this.xvel = Math.random() * 2 * sign;
        this.yvel = Math.random() * pplVerticalVel + 2; // min=2 max=2+pplVerticalVel
        this.status = "alive";
    }
}

// ppl print
Person.prototype.print = function(genre) {
    // female
    if (genre == 0) { 
        bodyColor = '#e864d4';
        armsColor = '#debb8c';
        legsColor = '#9d79a3';
        aliveColor = '#f5ce98';
        deadColor = '#D7220A';
        mouthColor = '#4a1a14';
        tongueColor = '#FF0000';
        hairColor = '#666666';
        eyesColor = '#000000';
    // male
    } else {
        bodyColor = '#5555cc';
        armsColor = '#debb8c';
        legsColor = '#627c8a';
        aliveColor = '#f2c794';
        deadColor = '#e34a17';
        mouthColor = '#4a1a14';
        tongueColor = '#FF0000';
        hairColor = '#777777';
        eyesColor = '#000000';
    }
     // body
     ctx.fillStyle = bodyColor;
     ctx.fillRect(this.x - 15, this.y + 20, 30, 20);
     //legs
     ctx.fillStyle = legsColor;
     ctx.fillRect(this.x - 15, this.y + 40, 10, 20);
     ctx.fillRect(this.x + 5, this.y + 40, 10, 20);
     ctx.fillRect(this.x - 15, this.y + 30, 30, 10);
     // arms
     ctx.fillStyle = armsColor;
     ctx.fillRect(this.x - 30, this.y + 20, 15, 10);
     ctx.fillRect(this.x + 15, this.y + 20, 15, 10);
     // head
     if (this.status == 'alive') {
         ctx.fillStyle = aliveColor; // alive
     } else if (this.status == 'dead') {
         ctx.fillStyle = deadColor; // dead
     }
     ctx.fillRect(this.x -20, this.y - 20, 40, 40);
     //
     if (genre == 0) {
        // hair
        ctx.fillStyle = hairColor;
        ctx.fillRect(this.x - 20, this.y - 25, 40, 10);
        ctx.fillRect(this.x - 25, this.y - 15, 5, 40);
        ctx.fillRect(this.x + 20, this.y - 15, 5, 40);
        // mouth
        ctx.fillStyle = mouthColor;
        ctx.fillRect(this.x - 10, this.y + 5, 20, 25);
        // tongue
        ctx.fillStyle = tongueColor;
        ctx.fillRect(this.x - 5, this.y + 20, 10, 7);
    } else {
        // hair
        ctx.fillStyle = hairColor;
        ctx.fillRect(this.x - 20, this.y - 20, 40, 5);
        // mouth
        ctx.fillStyle = mouthColor;
        ctx.fillRect(this.x - 10, this.y + 5, 20, 15);
        // tongue
        ctx.fillStyle = tongueColor;
        ctx.fillRect(this.x - 5, this.y + 17, 10, 3);
    }
     // eyes
     ctx.fillStyle = eyesColor;
     ctx.fillRect(this.x - 15, this.y - 10, 10, 10);
     ctx.fillRect(this.x + 5, this.y - 10, 10, 10);
}

// create bugs
function Bug() {
    this.x = (canvas.width / 4) + Math.random() * canvas.width / 2;
    this.y = -1000;
    sign = Math.sign(0.5 - Math.random());
    this.xvel = Math.random() * sign;
    this.yvel = Math.random() * bugsVerticalVel + 2;  // min=2 max=2+bugsVerticalVel
    this.color = 0;
    this.status = "alive";
}

// bugs position and state update
Bug.prototype.update = function () {
    // side bounce
    if (this.x > canvas.width - 30 || this.x < 30) {
        this.xvel = -this.xvel;
    }
    // keep moving
    this.x += this.xvel;
    this.y += this.yvel;
    // bug death
    if ((this.x - player[0].x < 60 && this.x - player[0].x > -60) && (this.y - player[0].y < 190 && this.y - player[0].y > -40)) {
        // crash color
        ctx.fillStyle = '#eeee00';
        ctx.fillRect(this.x - 30, this.y - 30, 60, 95);
        // count + 1
        if (this.status == 'alive') {
            dead_bugs_count++;
        }
        // update status
        this.status = "dead";
        this.xvel = 0;
    }
    // reach lower limit => start again (alive)
    if (this.y > canvas.height + 50) {
        this.y = -150;
        sign = Math.sign(0.5 - Math.random()); // random sign
        this.xvel = Math.random() * sign;
        this.yvel = Math.random() * bugsVerticalVel + 2; // min=2 max=2+bugsVerticalVel
        this.status = "alive";
    }
}

// bugs print
Bug.prototype.print = function(genre) {
    // female
    if (genre == 0) {
        bodyColor = '#6e547d';
        armsColor = '#5b8c67';
        aliveColor = '#04c8d6';
        deadColor = '#438a86';
        hairColor = '#66784a';
        eyesColor = '#FFFFFF';
    // male
    } else {
        bodyColor = '#317a66';
        armsColor = '#3e9c70';
        aliveColor = '#1ACC0A';
        deadColor = '#0c7773';
        hairColor = '#8ca644';
        eyesColor = '#FFFFFF';
    }
     // body
     ctx.fillStyle = bodyColor;
     ctx.fillRect(this.x - 15, this.y + 20, 30, 20);
     //legs
     ctx.fillRect(this.x - 15, this.y + 40, 10, 20);
     ctx.fillRect(this.x + 5, this.y + 40, 10, 20);
     // arms
     ctx.fillStyle = armsColor;
     ctx.fillRect(this.x - 20, this.y + 20, 10, 20);
     ctx.fillRect(this.x + 10, this.y + 20, 10, 20);
     // head
     if (this.status == 'alive') {
         ctx.fillStyle = aliveColor; // alive
     } else if (this.status == 'dead') {
         ctx.fillStyle = deadColor; // dead
     }
     ctx.fillRect(this.x -20, this.y - 20, 40, 40);
     // female hair
     if (genre == 0) {
        ctx.fillStyle = hairColor;
        ctx.fillRect(this.x - 20, this.y - 25, 40, 10);
        ctx.fillRect(this.x - 25, this.y - 15, 5, 40);
        ctx.fillRect(this.x + 20, this.y - 15, 5, 40);
    // male hair
    } else {
        ctx.fillStyle = hairColor;
        ctx.fillRect(this.x - 20, this.y - 20, 40, 5);
    }
     // eyes
     ctx.fillStyle = eyesColor;
     ctx.fillRect(this.x - 15, this.y - 10, 10, 10);
     ctx.fillRect(this.x + 5, this.y - 10, 10, 10);
     // mouth
     ctx.fillStyle = '#000000';
     ctx.fillRect(this.x - 4, this.y + 15, 8, 2);

}

// loop
function loop() {
    // buckground
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#CCCCDD';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // people update
    for (var i = 0; i < num_ppl; i++) {
        ppl[i].update();
        if (i % 2 == 0) {
            ppl[i].print(1);
        } else {
            ppl[i].print(0);
        }
    }
    // bugs update
    for (var i = 0; i < num_bugs; i++) {
        bug[i].update();
        if (i % 2 == 0) {
            bug[i].print(1);
        } else {
            bug[i].print(0);
        }
    }
    // player update
    player[0].update();
    // tyres
    ctx.fillStyle = '#000000';
    ctx.fillRect(player[0].x - 45, player[0].y + 10, 20, 40);
    ctx.fillStyle = '#000000';
    ctx.fillRect(player[0].x + 25, player[0].y + 10, 20, 40);
    ctx.fillStyle = '#000000';
    ctx.fillRect(player[0].x - 47, player[0].y + 125, 20, 40);
    ctx.fillStyle = '#000000';
    ctx.fillRect(player[0].x + 27, player[0].y + 125, 20, 40);
    // front bumper
    ctx.fillStyle = '#EE0022';
    ctx.fillRect(player[0].x - 38, player[0].y - 4, 76, 20);
    // body 80 x 190
    ctx.fillStyle = '#EE0022';
    ctx.fillRect(player[0].x - 40, player[0].y, 80, 170);
    // strips
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(player[0].x - 20, player[0].y, 10, 170);
    ctx.fillRect(player[0].x + 10, player[0].y, 10, 170);
    // glasses
    ctx.fillStyle = '#555577';
    ctx.fillRect(player[0].x - 30, player[0].y + 50, 60, 85);
    // roof
    ctx.fillStyle = '#FF0011';
    ctx.fillRect(player[0].x - 30, player[0].y + 55, 60, 60);
    // back
    ctx.fillStyle = '#CC0011';
    ctx.fillRect(player[0].x - 40, player[0].y + 160, 80, 15);
    // back lights
    ctx.fillStyle = '#f79f2d';
    ctx.fillRect(player[0].x - 35, player[0].y + 165, 5, 7);
    ctx.fillRect(player[0].x + 30, player[0].y + 165, 5, 7);
    ctx.fillStyle = '#FF0011';
    ctx.fillRect(player[0].x - 25, player[0].y + 165, 10, 7);
    ctx.fillRect(player[0].x + 15, player[0].y + 165, 10, 7);
    // back bumper
    ctx.fillStyle = '#919a9e';
    ctx.fillRect(player[0].x - 39, player[0].y + 173, 78, 7);

    // info
    score = start_score + dead_bugs_count - dead_ppl_count * 3;
    document.getElementById("info-one").value = "People";
    document.getElementById("info-two").value = "Zombies";
    document.getElementById("info-three").value = "Points";
    document.getElementById("info-four").value = "Time";
    // outputs
    document.getElementById("output-one").value = "(o o)  -"  + dead_ppl_count;
    document.getElementById("output-two").value = "(x x)  " + dead_bugs_count;
    document.getElementById("output-three").value = score;
    document.getElementById("output-four").value = time;

    // 
    setTimeout(loop, 10);
}

  