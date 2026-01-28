class Branch {
    constructor(parameters) {
        this.xStart = parameters.x;
        this.yStart = parameters.y;
        this.xEnd = parameters.x;
        this.yEnd = parameters.y;
        this.length = parameters.length;
        this.angle = parameters.angle;
        this.level = parameters.level;
        this.speed = parameters.speed;
        this.angleCoeff = parameters.angleCoeff;
        this.lengthCoeff = parameters.lengthCoeff;
        this.thickness = parameters.thickness;
        this.color = parameters.color;
        this.currentLength = 0;
        this.finished = false;
        this.isLast = true;
    }

    update() {
        this.xEnd = this.xStart + this.currentLength * cos(this.angle);
        this.yEnd = this.yStart - this.currentLength * sin(this.angle);

        if (!this.finished) {
            this.currentLength += this.speed;

            if (this.currentLength >= this.length) {
                this.currentLength = this.length;
                this.finished = true;
                this.level += 1;

                this.xEnd = this.xStart + this.currentLength * cos(this.angle);
                this.yEnd = this.yStart - this.currentLength * sin(this.angle);

                this.lengthCoeff = this.lengthCoeff - random(0.01, 0.02);
                this.angleCoeff = this.angleCoeff - random(-0.5, 0.5);

                if (branches.at(-1).level < branchLimit) {
                    this.isLast = false;
                    branches.push(
                        new Branch({
                            x: this.xEnd,
                            y: this.yEnd,
                            length: this.length * this.lengthCoeff,
                            angle: this.angle - PI / this.angleCoeff,
                            level: this.level,
                            speed: random(this.speed - 2, this.speed + 2),
                            angleCoeff: this.angleCoeff,
                            lengthCoeff: this.lengthCoeff,
                            thickness: this.thickness - 3,
                            color: this.color,
                        }),
                    );
                    branches.push(
                        new Branch({
                            x: this.xEnd,
                            y: this.yEnd,
                            length: this.length * this.lengthCoeff,
                            angle: this.angle + PI / this.angleCoeff,
                            level: this.level,
                            speed: random(this.speed - 2, this.speed + 2),
                            angleCoeff: this.angleCoeff,
                            lengthCoeff: this.lengthCoeff,
                            thickness: this.thickness - 3,
                            color: this.color,
                        }),
                    );
                }
            }
        }
    }

    show() {
        stroke(this.color);
        strokeWeight(this.thickness);
        line(this.xStart, this.yStart, this.xEnd, this.yEnd);
    }
}
