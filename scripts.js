
let canvas, ctx;
let bug = [];
let ppl = [];
let player = [];
let num_bugs = 10;
let num_ppl = 6;
let dead_bugs_count = 0;
let dead_ppl_count = 0;
let progress = 50;
let points = 0;
let level = 10;
let velRate = 1;
let vel = level * velRate;
let time = 61;
let left, right, up, down, leftUp, leftDown, rightUp, rightDown;
let horizontalMov = 0;
let verticalMov = 0;
let inverter= -1;
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
    up = document.getElementById("up");
    down = document.getElementById("down");
    leftUp = document.getElementById("left-up");
    leftDown = document.getElementById("left-down");
    rightUp = document.getElementById("right-up");
    rightDown = document.getElementById("right-down");
    // ppl
    let pplCount = [];
    while (pplCount.length < num_ppl) {
        ppl[pplCount.length] = new Person();
        pplCount.push(1);
    }
    // bugs
    let bgsCount = [];
    while (bgsCount.length < num_bugs) {
        bug[bgsCount.length] = new Bug();
        bgsCount.push(1);
    }
    // player
    player[0] = new Player();
    // updating
    loop();
}

// timer
// function countDown() {
//     console.log('loop')
//     setTimeout(countDown, 1000);
// }
// countDown();

// create player
function Player() {
    this.x = 500;
    this.y = 800;
}

// player update
Player.prototype.update = function () {
    //arrow keys down
    document.onkeydown = function (e) {
                let key_code = e.which || e.keyCode;
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
                let key_code = e.which || e.keyCode;
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
    leftUp.addEventListener("touchstart", function () {
        horizontalMov = -1;
        verticalMov = -1;
    });
    leftDown.addEventListener("touchstart", function () {
        horizontalMov = -1;
        verticalMov = 1;
    });
    right.addEventListener("touchstart", function () {
        horizontalMov = 1.5;
    });
    rightUp.addEventListener("touchstart", function () {
        horizontalMov = 1;
        verticalMov = -1;
    });
    rightDown.addEventListener("touchstart", function () {
        horizontalMov = 1;
        verticalMov = 1;
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
    leftUp.addEventListener("touchend", function () {
        horizontalMov = 0;
        verticalMov = 0;
    });
    leftDown.addEventListener("touchend", function () {
        horizontalMov = 0;
        verticalMov = 0;
    });
    right.addEventListener("touchend", function () {
        horizontalMov = 0;
    });
    rightUp.addEventListener("touchend", function () {
        horizontalMov = 0;
        verticalMov = 0;
    });
    rightDown.addEventListener("touchend", function () {
        horizontalMov = 0;
        verticalMov = 0;
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
        this.x = this.x + (horizontalMov * 3) - vel / 20; // left
    } else if (horizontalMov > 0 && this.x < 980) {
        this.x = this.x + (horizontalMov * 3) + vel / 20; // right
    }
    // vertical movement
    if (verticalMov < 0 && this.y > 50) {
        this.y = this.y + (verticalMov * 3) - vel / 20; // up
    } else if (verticalMov > 0 && this.y < 950) {
        this.y = this.y + (verticalMov * 3) + vel / 20; // down
    }
}

// create people
function Person() {
    this.x = (canvas.width / 4) + Math.random() * canvas.width / 2;
    this.y = -100 - Math.random() * 400;
    sign = Math.sign(0.5 - Math.random()); // random sign
    this.xvel = (Math.random() * 2 + vel / 25) * sign; // 0.04-2.04 0.04-6
    this.yvel = 2 + Math.random() * 3 + Math.random() * (vel / 10); // 2-5.1 / 2-15
    this.status = "alive";
}

// people position and state update
Person.prototype.update = function () {
    // side bounce
    // second conditions just in case they get between the 30px limit and beyond
    if ((this.x > canvas.width - 30 && this.xvel > 0) || (this.x < 30 && this.xvel < 0)) {
        this.xvel = -this.xvel;
    }
    // keep moving
    this.x += this.xvel;
    this.y += this.yvel;
    // ppl death
    if ((this.x - player[0].x < 60 && this.x - player[0].x > -60) && (this.y - player[0].y < 190 && this.y - player[0].y > -40)) {
        // crash color
        ctx.fillStyle = '#db0f2e';
        ctx.fillRect(this.x - 30, this.y - 30, 60, 95);
        // count + 1
        if (this.status == 'alive') {
            dead_ppl_count++;
        }
        // update status
        this.status = "dead";
        this.xvel = 0;
        if (this.y < player[0].y + 30) {
        this.yvel = - 20 - vel / 10;
        } else {
            this.yvel = 20 + vel / 10;
        }
        if (this.x < player[0].x - 40) {
            this.yvel /= 2;
            this.xvel = - 10 - vel / 20;
        }
        if (this.x > player[0].x + 40) {
            this.yvel /= 2;
            this.xvel = 10 + vel / 20;
        }
    }
    // reaches lower limit or flies away => start again (alive)
    if (this.y > canvas.height + 50 || (this.y < - 100 && this.yvel < -0)) {
        this.y = -150;
        sign = Math.sign(0.5 - Math.random()); // random sign
        this.xvel = (Math.random() * 2 + vel / 25) * sign; // 0.04-2.04 0.04-6
        this.yvel = 2 + Math.random() * 3 + Math.random() * (vel / 10); // 2-5.1 / 2-15
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
    // this.x = (canvas.width / 4) + Math.random() * canvas.width / 2;
    // this.y = -500 - Math.random() * 500;
    // sign = Math.sign(0.5 - Math.random()); // random sign
    // this.xvel = (Math.random() + vel / 25) * sign; // 0.04-1.04 0.04-5
    // this.yvel = 2 + Math.random() * 3 + Math.random() * (vel / 10); // 2-5.1 / 2-15
    // this.status = "alive";
    this.x = [(canvas.width / 4) + Math.random() * canvas.width / 2];
    this.y = [-500 - Math.random() * 500];
    sign = Math.sign(0.5 - Math.random()); // random sign
    this.xvel = [(Math.random() + vel / 25) * sign]; // 0.04-1.04 0.04-5
    this.yvel = [2 + Math.random() * 3 + Math.random() * (vel / 10)]; // 2-5.1 / 2-15
    this.status = ["alive"];
}

// bugs position and state update
Bug.prototype.update = function () {

    // side bounce
    // second conditions just in case they get between the 30px limit and beyond
    // if ((this.x > canvas.width - 30 && this.xvel > 0) || (this.x < 30 && this.xvel < 0)) {
    //     this.xvel = -this.xvel;
    // }
    if ((this.x[0] > canvas.width - 30 && this.xvel[0] > 0) || (this.x[0] < 30 && this.xvel[0] < 0)) {
        this.xvel.push(this.xvel[0] * -1);
        this.xvel.shift();
    }

    // keep moving
    // this.x += this.xvel;
    // this.y += this.yvel;
    this.x.push(this.x[0] + this.xvel[0]);
    this.x.shift();
    this.y.push(this.y[0] + this.yvel[0]);
    this.y.shift();

    // bug death
    // if ((this.x - player[0].x < 60 && this.x - player[0].x > -60) && (this.y - player[0].y < 190 && this.y - player[0].y > -40)) {
    if ((this.x[0] - player[0].x < 60 && this.x[0] - player[0].x > -60) && (this.y[0] - player[0].y < 190 && this.y[0] - player[0].y > -40)) {

        // crash color
        ctx.fillStyle = '#52eb0c';
        // ctx.fillRect(this.x - 30, this.y - 30, 60, 95);
        ctx.fillRect(this.x[0] - 30, this.y[0] - 30, 60, 95);

        // add 1 bug dead
        // if (this.status == 'alive') {
        //     dead_bugs_count++;
        //     points++;
        // }
        if (this.status[0] == 'alive') {
            dead_bugs_count++;
            points++;
        }

        // update status
        // this.status = "dead";
        // this.xvel = 0;
        // if (this.y < player[0].y + 30) {
        // this.yvel = - 20 - vel / 10;
        // } else {
        //     this.yvel = 20 + vel / 10;
        // }
        // if (this.x < player[0].x - 40) {
        //     this.yvel /= 2;
        //     this.xvel = - 10 - vel / 20;
        // }
        // if (this.x > player[0].x + 40) {
        //     this.yvel /= 2;
        //     this.xvel = 10 + vel / 20;
        // }
        this.status.push("dead");
        this.status.shift();

        this.xvel.push(0);
        this.xvel.sift();

        if (this.y[0] < player[0].y + 30) {
        this.yvel.push(- 20 - vel / 10);
        this.yvel.shift();
        } else {
            this.yvel.push(20 + vel / 10);
            this.yvel.shift();
        }
        if (this.x[0] < player[0].x - 40) {
            this.yvel.push(this.yvel[0] / 2);
            this.yvel.shift();
            this.xvel.push(- 10 - vel / 20);
            this.xvel.shift();
        }
        if (this.x[0] > player[0].x + 40) {
            this.yvel.push(this.yvel[0] / 2);
            this.yvel.shift();
            this.xvel.push(10 + vel / 20);
            this.xvel.shift();
        }
    }

    // reaches lower limit or flies away => start again (alive)
    // if (this.y > canvas.height + 50 || (this.y < - 100 && this.yvel < -0)) {
    //     this.y = -150;
    //     sign = Math.sign(0.5 - Math.random()); // random sign
    //     this.xvel = (Math.random() + vel / 25) * sign; // 0.04-1.04 0.04-5
    //     this.yvel = 2 + Math.random() * 3 + Math.random() * (vel / 10); // 2-5.1 / 2-15
    //     this.status = "alive";
    if (this.y[0] > canvas.height + 50 || (this.y[0] < - 100 && this.yvel[0] < -0)) {
        this.y.push(-150);
        this.y.shift();

        sign = Math.sign(0.5 - Math.random()); // random sign

        this.xvel.push((Math.random() + vel / 25) * sign); // 0.04-1.04 0.04-5
        this.xvel.shift();
        this.yvel.push(2 + Math.random() * 3 + Math.random() * (vel / 10)); // 2-5.1 / 2-15
        this.yvel.shift();

        this.status.push("alive");
        this.status.shift();
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
    //  ctx.fillRect(this.x - 15, this.y + 20, 30, 20);
     ctx.fillRect(this.x[0] - 15, this.y[0] + 20, 30, 20);

     //legs
    //  ctx.fillRect(this.x - 15, this.y + 40, 10, 20);
    //  ctx.fillRect(this.x + 5, this.y + 40, 10, 20);
     ctx.fillRect(this.x[0] - 15, this.y[0] + 40, 10, 20);
     ctx.fillRect(this.x[0] + 5, this.y[0] + 40, 10, 20);

     // arms
     ctx.fillStyle = armsColor;
    //  ctx.fillRect(this.x - 20, this.y + 20, 10, 20);
    //  ctx.fillRect(this.x + 10, this.y + 20, 10, 20);
     ctx.fillRect(this.x[0] - 20, this.y[0] + 20, 10, 20);
     ctx.fillRect(this.x[0] + 10, this.y[0] + 20, 10, 20);

     // head
    //  if (this.status == 'alive') {
    //      ctx.fillStyle = aliveColor; // alive
    //  } else if (this.status == 'dead') {
    //      ctx.fillStyle = deadColor; // dead
    //  }
    //  ctx.fillRect(this.x -20, this.y - 20, 40, 40);
     if (this.status[0] == 'alive') {
         ctx.fillStyle = aliveColor; // alive
     } else if (this.status[0] == 'dead') {
         ctx.fillStyle = deadColor; // dead
     }
     ctx.fillRect(this.x[0] -20, this.y[0] - 20, 40, 40);

     // female hair
     if (genre == 0) {
        ctx.fillStyle = hairColor;
        // ctx.fillRect(this.x - 20, this.y - 25, 40, 10);
        // ctx.fillRect(this.x - 25, this.y - 15, 5, 40);
        // ctx.fillRect(this.x + 20, this.y - 15, 5, 40);
        ctx.fillRect(this.x[0] - 20, this.y[0] - 25, 40, 10);
        ctx.fillRect(this.x[0] - 25, this.y[0] - 15, 5, 40);
        ctx.fillRect(this.x[0] + 20, this.y[0] - 15, 5, 40);

    // male hair
    } else {
        ctx.fillStyle = hairColor;
        // ctx.fillRect(this.x - 20, this.y - 20, 40, 5);
        ctx.fillRect(this.x[0] - 20, this.y[0] - 20, 40, 5);
    }
     // eyes
     ctx.fillStyle = eyesColor;
    //  ctx.fillRect(this.x - 15, this.y - 10, 10, 10);
    //  ctx.fillRect(this.x + 5, this.y - 10, 10, 10);
     ctx.fillRect(this.x[0] - 15, this.y[0] - 10, 10, 10);
     ctx.fillRect(this.x[0] + 5, this.y[0] - 10, 10, 10);

     // mouth
     ctx.fillStyle = '#000000';
    //  ctx.fillRect(this.x - 4, this.y + 15, 8, 2);
     ctx.fillRect(this.x[0] - 4, this.y[0] + 15, 8, 2);

}

// loop
function loop() {
    // buckground
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#dbe08d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // people update
    for (let i = 0; i < num_ppl; i++) {
        ppl[i].update();
        if (i % 2 == 0) {
            ppl[i].print(1);
        } else {
            ppl[i].print(0);
        }
    }
    // bugs update
    for (let i = 0; i < num_bugs; i++) {
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
    // body 80 x 170
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
    document.getElementById("info-one").value = "People";
    document.getElementById("info-two").value = "Zombies";
    document.getElementById("info-three").value = "Progress";
    document.getElementById("info-four").value = "Time";
    document.getElementById("info-five").value = "Level";
    document.getElementById("info-six").value = "Points";
    // outputs
    document.getElementById("output-one").value = "(o o)  -"  + dead_ppl_count;
    document.getElementById("output-two").value = "(x x)  " + dead_bugs_count;
    document.getElementById("output-three").value = progress + dead_bugs_count - dead_ppl_count * 3;
    document.getElementById("output-four").value = time;
    document.getElementById("output-five").value = level;
    document.getElementById("output-six").value = points;

    // 
    setTimeout(loop, 10);
}  