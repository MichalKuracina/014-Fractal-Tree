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
        this.currentLength = 0;
        this.finished = false;
    }

    update() {
        // if (this.currentLength < this.length) {
        //     this.currentLength += 2;
        // }

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

                this.lengthCoeff = this.lengthCoeff - 0.2;
                this.angleCoeff = random(
                    this.angleCoeff - 0.5,
                    this.angleCoeff + 0.5,
                );

                branches.push(
                    new Branch({
                        x: this.xEnd,
                        y: this.yEnd,
                        length: this.length / this.lengthCoeff,
                        angle: this.angle - PI / this.angleCoeff,
                        level: this.level,
                        speed: this.speed,
                        angleCoeff: this.angleCoeff,
                        lengthCoeff: this.lengthCoeff,
                    }),
                );
                branches.push(
                    new Branch({
                        x: this.xEnd,
                        y: this.yEnd,
                        length: this.length / this.lengthCoeff,
                        angle: this.angle + PI / this.angleCoeff,
                        level: this.level,
                        speed: this.speed,
                        angleCoeff: this.angleCoeff,
                        lengthCoeff: this.lengthCoeff,
                    }),
                );
            }
        }

        // if (this.currentLength < 50) {
        //     this.finished = true;
        // }
    }

    show() {
        stroke(255);
        line(this.xStart, this.yStart, this.xEnd, this.yEnd);
    }
}
