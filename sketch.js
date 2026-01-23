let mode = "auto";
let branches = [];

function setup() {
    createCanvas(600, 700);

    branches.push(
        new Branch({
            x: width / 2,
            y: height,
            length: 350,
            angle: PI / 2,
            level: 0,
            speed: 10,
            angleCoeff: 5,
            lengthCoeff: 2.5,
        }),
    );
}

function draw() {
    background(0);

    if (mode === "manual") {
        noLoop();
    }

    branches.forEach((branch) => {
        branch.update();
        branch.show();
    });

    if (branches.at(-1).level > 6) {
        noLoop();
        return;
    }
}

function stepPlusOne() {
    mode = "manual";
    loop();
}

function stepRun() {
    mode = "auto";
    frameRate(60);
    loop();
}
