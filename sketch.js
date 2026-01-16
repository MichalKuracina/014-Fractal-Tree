let mode = "manual";

function setup() {
    createCanvas(900, 600, WEBGL);

    addButton();
}

function draw() {
    background(45, 170, 252);

    if (mode === "manual") {
        noLoop();
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
