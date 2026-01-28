class Leaf {
    constructor(parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.size = parameters.size;
        this.color = parameters.color;
        this.angle = parameters.angle;
        this.index = parameters.index;
        this.falling = false;
        this.fallingAngle = 0;
        this.fallingRotationDirection = 0;
        this.frameCountOffset = random(0, 1000);
    }

    fall() {
        if (this.y > height - 10) {
            this.falling = false;
            this.angle = this.fallingAngle;
            return;
        }

        if (this.falling) {
            let x = 100 * noise(0.005 * frameCount + this.frameCountOffset);
            this.x += map(x, 0, 100, -1, 1);
            this.y += 1;
        }
    }

    show() {
        push();
        translate(this.x, this.y);
        scale(this.size);

        if (this.falling) {
            this.fallingAngle =
                this.fallingAngle +
                radians(20) *
                    (deltaTime / 1000) *
                    this.fallingRotationDirection;
            rotate(this.fallingAngle);
        } else {
            rotate(this.angle);
        }

        fill(this.color);

        noStroke();
        beginShape();
        bezierVertex(50, 0);
        bezierVertex(0, 50);
        bezierVertex(0, 0);
        bezierVertex(-50, 0);
        endShape();

        noStroke();
        beginShape();
        bezierVertex(50, 0);
        bezierVertex(0, -50);
        bezierVertex(0, 0);
        bezierVertex(-50, 0);
        endShape();

        stroke(124, 63, 0);
        strokeWeight(2);
        line(-35, 0, 25, 0);
        line(-5, 0, 10, -20);
        line(-5, 0, 10, 20);
        line(10, 0, 25, 15);
        line(10, 0, 25, -15);

        pop();
    }
}
