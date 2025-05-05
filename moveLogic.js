export default function move(gameState){
    let moveSafety = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    
    if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        moveSafety.left = false;
        
    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        moveSafety.right = false;
        
    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        moveSafety.down = false;
        
    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        moveSafety.up = false;
    }
    
    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    // gameState.board contains an object representing the game board including its width and height
    // https://docs.battlesnake.com/api/objects/board
   

    
   
    
        if(myHead.x == 0){
            moveSafety.left = false
            console.log("border left"); 
        }
        if(myHead.x == gameState.board.width-1){
            moveSafety.right = false
            console.log("border right");
        }
        if(myHead.y == 0){
            moveSafety.down = false
            console.log("border down");
        }
        if(myHead.y == gameState.board.height-1){
            moveSafety.up = false
            console.log("border up");
        }
    
    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
        for (let i = 0; i < gameState.you.body.length; i++) {
            if(myHead.y == gameState.you.body[i].y-1&& myHead.x== gameState.you.body[i].x){
                moveSafety.up = false
                console.log("unsafe move up");
            }
            if(myHead.x==gameState.you.body[i].x+1&&myHead.y==gameState.you.body[i].y){
                moveSafety.left = false
                console.log("unsafe move left");
            }
            if(myHead.y == gameState.you.body[i].y+1 && myHead.x == gameState.you.body[i].x){
                moveSafety.down = false
                console.log("unsafe move down");
            }
            if(myHead.x==gameState.you.body[i].x-1 && myHead.y==gameState.you.body[i].y){
                moveSafety.right =false
                console.log("unsafe move right");
            }
        }
        
        
    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    
    for (let i = 0; i < gameState.board.snakes.length; i++) {
        const snake = gameState.board.snakes[i];
        const enemyHead = snake.body[0];
        const enemyBody = snake.body
        //Dont collide with their head
        if (enemyHead.x == myHead.x && enemyHead.y === myHead.y + 1){
            moveSafety.up = false;
            console.log("Dont go up: enemy head");  
        }
        if (enemyHead.x == myHead.x && enemyHead.y === myHead.y - 1){
            moveSafety.down = false;
            console.log("Dont go down: enemy head");
        }
        if (enemyHead.x == myHead.x - 1 && enemyHead.y === myHead.y){
            moveSafety.left = false;  
            console.log("Dont go left: enemy head");          
        }
        if (enemyHead.x == myHead.x + 1 && enemyHead.y === myHead.y){
            moveSafety.right = false;  
            console.log("Dont go right: enemy head");          
        }
        //Avoid adjacent spots
        if (enemyHead.x == myHead.x && enemyHead.y === myHead.y + 2){
            moveSafety.up = false
            console.log("Avoid up: ememy head");
        }
        if (enemyHead.x == myHead.x && enemyHead.y === myHead.y - 2){
            moveSafety.down = false
            console.log("Avoid down: ememy head");                
        }
        if (enemyHead.x == myHead.x - 2 && enemyHead.y === myHead.y){
            moveSafety.left = false
            console.log("Avoid left: ememy head");
        }
        if (enemyHead.x == myHead.x + 2 && enemyHead.y === myHead.y){
            moveSafety.right = false
            console.log("Avoid right: ememy head");
        }
        //Avoid adjacent diagonal spots
        if (enemyHead.x == myHead.x - 1 && enemyHead.y === myHead.y - 1){
            moveSafety.down = false
            moveSafety.left = false
            console.log("Avoid down and left: enemy head");            
        }
        if (enemyHead.x == myHead.x + 1 && enemyHead.y === myHead.y + 1 ){
            moveSafety.right = false
            moveSafety.up = false
            console.log("Avoid right and up: enemy head");            
        }
        if (enemyHead.x == myHead.x - 1 && enemyHead.y === myHead.y + 1){
            moveSafety.up = false
            moveSafety.left = false
            console.log("Avoid up and left: enemy head");            
        }
        if (enemyHead.x == myHead.x + 1  && enemyHead.y === myHead.y - 1){
           moveSafety.right =false
           moveSafety.down = false
            console.log("Avoid down and right: enemy head");            
        }
    }


    for (let i = 0; i < gameState.board.snakes.length; i++) {//snake loop

        for (let n = 0; n < gameState.board.snakes[i].body.length; n++) {//snake coords loop
            
            if(myHead.y == gameState.board.snakes[i].body[n].y-1&&myHead.x== gameState.board.snakes[i].body[n].x ){
                moveSafety.up = false
                console.log("caution snake up");       
            }
            if(myHead.x==gameState.board.snakes[i].body[n].x+1&&myHead.y==gameState.board.snakes[i].body[n].y){
                moveSafety.left = false
                console.log("caution snake left");
            }
            if(myHead.y == gameState.board.snakes[i].body[n].y+1&& myHead.x == gameState.board.snakes[i].body[n].x){
                moveSafety.down = false
                console.log("caution snake down");
            }
            if(myHead.x==gameState.board.snakes[i].body[n].x-1 && myHead.y==gameState.board.snakes[i].body[n].y){
                moveSafety.right =false
                console.log("caution snake right");
            }
        }
    }
    const hazards = gameState.board.hazards;

    for (let i = 0; i < hazards.length; i++) {
        let hazard = hazards[i];
        if (hazard.x === myHead.x && hazard.y === myHead.y + 1) {
            moveSafety.up = false
            console.log("Avoid up: hazard");
        }
        if (hazard.x === myHead.x && hazard.y === myHead.y - 1) {
            moveSafety.down = false
            console.log("Avoid down: hazard");
        }
        if (hazard.x === myHead.x - 1 && hazard.y === myHead.y) {
            moveSafety.left = false
            console.log("Avoid left: hazard");
        }
        if (hazard.x === myHead.x + 1 && hazard.y === myHead.y) {
            moveSafety.right = false
            console.log("Avoid right: hazard");
        }
    }

    
   //dead ends
   

    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    let nextMove
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        if(myHead.x>gameState.board.food[0].x){
            nextMove = "left"
        }
        if(myHead.x<gameState.board.food[0].x){
                nextMove = "right"
        }
        if(myHead.y>gameState.board.food[0].y){
            nextMove = "down"
        }
        if(myHead.y<gameState.board.food[0].y){
            nextMove = "up"
        }
    }
    
    
    // Choose a random move from the safe moves
    
    
    
    

    
   let biggestSnake //= safeMoves[Math.floor(Math.random() * safeMoves.length)];
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    
    
    
      // feed mode/killmode
    //     for (let i = 0; i < gameState.board.snakes.length; i++) {
    //         if(gameState.you.body.length>gameState.board.snakes[i].length && gameState.board.snakes[i].name != "FlintonSteal") {
    //             biggestSnake = true
    //         }else{
    //             biggestSnake = false
    //         }
    //     }
    //     if(biggestSnake==true){
    //     console.log("kill mode");
       
    //         if(myHead.x>gameState.board.snakes[1].body[0].x&&moveSafety.left == true && gameState.board.snakes[1].body[1].y!=gameState.board.snakes[1].body[0].y){
    //             nextMove = "left"
    //         }
    //         if(myHead.x<gameState.board.snakes[1].body[0].x&&moveSafety.right == true&& gameState.board.snakes[1].body[1].y!=gameState.board.snakes[1].body[0].y){
    //             nextMove = "right"
    //         }
    //         if(myHead.y>gameState.board.snakes[1].body[0].y&&moveSafety.down == true && gameState.board.snakes[1].body[1].x!=gameState.board.snakes[1].body[0].x){
    //             nextMove = "down"
    //         }
    //         if(myHead.y<gameState.board.snakes[1].body[0].y&&moveSafety.up == true&& gameState.board.snakes[1].body[1].x!=gameState.board.snakes[1].body[0].x){
    //             nextMove = "up"
    //         }
    //         if(nextMove == undefined){
    //         nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    //         }  
    // }
    
      //f(biggestSnake==false){
        const tail = gameState.you.body[gameState.you.body.length - 1];
        if(gameState.you.body.length>5&&gameState.you.health>40){
            
            if(myHead.x<=tail.x&&moveSafety.right==true){
                nextMove = "right"
            }
            if(myHead.y<tail.y&&moveSafety.up==true){
                nextMove = "up"
            }
            if(myHead.x>=tail.x&&moveSafety.left==true){
                nextMove = "left"
            }
            if(myHead.y>tail.y&&moveSafety.down==true){
                nextMove = "down"
            }
            if(nextMove == undefined){
                nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
            }
        }else{

             if(myHead.x>gameState.board.food[0].x&& moveSafety.left == true){
                nextMove = "left"
            }
            if(myHead.x<gameState.board.food[0].x&& moveSafety.right == true){
                    nextMove = "right"
            }
            if(myHead.y>gameState.board.food[0].y&& moveSafety.down == true){
                nextMove = "down"
            }
            if(myHead.y<gameState.board.food[0].y&& moveSafety.up == true){
                nextMove = "up"
            }
            if(nextMove == undefined){
                nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
            }
        }
   // }
        


    // else{
    //     nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    // }


   
   

    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };
}