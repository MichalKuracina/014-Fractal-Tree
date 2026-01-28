let branches = [];
let leaves = [];
const branchLimit = 10;
let fallingEnded = false;
let timer = 0;
let leavesTotal = 0;
let animationTimer = 0;

function setup() {
    createCanvas(1000, 700);

    branches.push(
        new Branch({
            x: width / 2,
            y: height,
            length: 250,
            angle: PI / 2,
            level: 0,
            speed: 15,
            angleCoeff: 4,
            lengthCoeff: 0.7,
            thickness: 20,
            color: color(86, 43, 0),
        }),
    );
}

function draw() {
    drawSun();

    branches.forEach((branch) => {
        branch.update();
        branch.show();
    });

    if (branches.at(-1).level > branchLimit) {
        drawLeaves();
        fallLeaves();

        fill(0, 77, 0);
        noStroke();
        rect(0, height - 10, width, 10);
    }

    leaves.forEach((leaf) => {
        leaf.fall();
        leaf.show();
    });

    fill(0, 77, 0);
    noStroke();
    rect(0, height - 10, width, 10);
}

function drawSun() {
    const x1 = 0;
    const y1 = 100;
    const x2 = (width * 2) / 3;
    const y2 = 50;
    const x3 = width + 100;
    const y3 = 350;
    const colorFrom = color(255, 200, 0);
    const colorTo = color(242, 221, 99);
    const backgroundFrom = color(128, 204, 255);
    const backgroundTo = color(255, 150, 0);

    let tMap = map(animationTimer, 0, leavesTotal * 1000 * 1.3, 0, 1);
    tMap = isFinite(tMap) && !isNaN(tMap) ? tMap : 0;

    let intermediateColor = lerpColor(backgroundFrom, backgroundTo, tMap);

    background(intermediateColor);

    intermediateColor = lerpColor(colorFrom, colorTo, tMap);

    let x = bezierPoint(x1, x2, x2, x3, tMap);
    let y = bezierPoint(y1, y2, y2, y3, tMap);

    animationTimer = millis();

    noStroke();
    fill(intermediateColor);
    ellipse(x, y, 150, 150);
}

function fallLeaves() {
    if (leaves.length < 1) {
        return;
    }

    if (millis() >= 1000 + timer) {
        let leavesToFall = leaves.filter((l) => {
            return l.y < height - 30 && l.falling === false;
        });

        if (leavesToFall.length > 0) {
            let randomLeafIndex = random(leavesToFall);
            leaves[randomLeafIndex.index].falling = true;
            leaves[randomLeafIndex.index].fallingRotationDirection = random([
                -1, 1,
            ]);
        }

        timer = millis();
    }

    if (
        leaves.every((l) => {
            return l.y > height - 30 && l.falling === false;
        })
    ) {
        console.log("eneded");
        noLoop();
        return;
    }
}

function drawLeaves() {
    if (leaves.length > 1) {
        return;
    }

    let leafIndex = 0;
    let branchEnds = branches.filter((b) => b.isLast === true);
    branchEnds.forEach((branch) => {
        for (let i = 0; i < 3; i++) {
            leaves.push(
                new Leaf({
                    x: random(branch.xEnd - 20, branch.xEnd + 20),
                    y: random(branch.yEnd - 10, branch.yEnd + 10),
                    size: random(0.2, 0.4),
                    color: color(34, 139, 34),
                    angle: random(PI),
                    index: leafIndex,
                }),
            );
            leafIndex++;
        }
    });

    leavesTotal = leaves.length;
}
