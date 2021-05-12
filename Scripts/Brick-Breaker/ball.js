export default class Ball{
    constructor(){
        this.image = document.getElementById("img_ball")
    }

    draw(ctx){
        ctx.drawImage(this.image, 10, 10, 20, 16);
    }

    update(){
        
    }
}