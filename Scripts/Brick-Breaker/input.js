export default class InputHandler{
    constructor(){
        document.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 37:
                alert("Move Left");
                break;

                case 39:
                    alert("Move Right");
                break;
            }
        });
    }
}

