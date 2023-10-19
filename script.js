const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d')
const gravity = 0.5;

canvas.width = 1024
canvas.height = 576

class player{
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 40
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw();
        if(this.height + this.position.y + this.velocity.y <=canvas.height){
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.velocity.y += gravity
        }
        else this.velocity.y=0;
        }
    }

    class platform{
        constructor(image,x,y){
            this.position={
                x,
                y
            }
            this.image = image
            this.width = image.width
            this.height = image.height
        }
        draw(){
            c.drawImage(image, this.position.x, this.position.y)
            // c.fillStyle = 'blue'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        }
        class GenericObject{
            constructor(image,x,y){
                this.position={
                    x,
                    y
                }
                this.image = image
                this.width = image.width
                this.height = image.height
            }
            draw(){
                c.drawImage(image, this.position.x, this.position.y)
                // c.fillStyle = 'blue'
                // c.fillRect(this.position.x, this.position.y, this.width, this.height)
            }
            }

        const image = new Image()
        image.src = './img/platform.png';

        const image1 = new Image()
        image1.src = './img/background.png';

        const Player = new player()
        const Platforms = [new platform(image, -1, 460), 
            new platform(image,image.width-3, 460)]

        const genericObjects= [new GenericObject({
            x:0,
            y:0,
            image: image1
        })
        ]
        
        const keys = {
        right:{
            pressed: false
        },
         left:{
            pressed: false
        }
    }
   
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle="white"
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((genericObject)=>{
        genericObject.draw()
    })
    Platforms.forEach((Platform) =>{
        Platform.draw()
    })
    Player.update()
    

    if (keys.right.pressed && Player.position.x<600){
        Player.velocity.x = 5;
    }else if(keys.left.pressed && Player.position.x>100){
        Player.velocity.x = -5;
    }else Player.velocity.x = 0;

    Platforms.forEach((Platform) =>{
    if(keys.right.pressed){
        Platform.position.x -= 5;
    }else if(keys.left.pressed){
        Platform.position.x += 5;
    }
})
 Platforms.forEach((Platform) =>{
    if (Player.position.y + Player.height <= Platform.position.y&&
        Player.position.y + Player.height + Player.velocity.y >= Platform.position.y&&
        Player.position.x + Player.width >= Platform.position.x&&
        Player.position.x <= Platform.position.x + Platform.width){
        Player.velocity.y = 0;
    }
})
}

animate()
addEventListener('keydown',({key})=>{
switch(key){
case 'a':
    console.log('left');
    keys.left.pressed = true;
    break;

case 'd':
    console.log('right');
    keys.right.pressed = true;
    break;

case 'w':
    console.log('up');
    Player.velocity.y -= 20;
    break;

case 's':
    console.log('down');
    break;
}
 })
addEventListener('keyup',({key})=>{
    switch(key){
    case 'a':
        console.log('left');
        keys.left.pressed = false;
        break;

    case 'd':
        console.log('right');
        keys.right.pressed = false;
        break;

    case 'w':
        console.log('up');
        Player.velocity.y = 0;
        break;

    case 's':
        console.log('down');
        break;
    }
    })