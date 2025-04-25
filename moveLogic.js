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
        if(myHead.y == gameState.board.height -1){
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
    
   

    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }
    
    // Choose a random move from the safe moves
    
    
    
    
    let tail = gameState.you.body[gameState.you.body.length-1]
    
    
    let nextMove
    let biggestSnake //= safeMoves[Math.floor(Math.random() * safeMoves.length)];
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    

       //feed mode/killmode
        for (let i = 0; i < gameState.board.snakes.length; i++) {
            if(gameState.you.body.length>gameState.board.snakes[i].length && gameState.board.snakes[i].name != "FlintonSteal") {
                biggestSnake = true
            }else{
                biggestSnake = false
            }
        }
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
    //         }else{
    //         nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    //         }
            
    // }
    
        // if(biggestSnake==false){
        //     console.log("feed mode");
            // if(gameState.you.health<50){
        for (let i = 0; i < gameState.board.food.length; i++) {
             if(myHead.x>gameState.board.food[i].x&& moveSafety.left == true){
                nextMove = "left"
            }
            if(myHead.x<gameState.board.food[i].x&& moveSafety.right == true){
                    nextMove = "right"
            }
            if(myHead.y>gameState.board.food[i].y&& moveSafety.down == true){
                nextMove = "down"
            }
            if(myHead.y<gameState.board.food[i].y&& moveSafety.up == true){
                nextMove = "up"
            }
            if(nextMove == undefined){
                nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
            }
        }
    // }else{
    //     if(myHead.x==tail.x-1){
    //         nextMove = "right"
    //     }
    //     if(myHead.)
    // }
  // }
   
   

    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };
}