const canvasWidth = 800;
const canvasHeight = 800;
var gameOver = false;
var coffee;

function moveBetween(pos1,pos2,frames) {
    var yDiff = Math.floor((pos1[1] - pos2[1]) / frames)
    var xDiff = Math.floor((pos1[0] - pos2[0]) / frames)
    var positions = []
    for(var frame = 0; frame < frames; frame++){
        positions.push([pos1[0]+frame*xDiff,pos1[1] + frame*yDiff])
    }
    return positions

}



function addArr(arr1,arr2) { // adds two equal length arrays
    sumArr = []
    for(let i = 0; i < arr1.length; i++)
        sumArr.push(arr1[i]+arr2[i])
    return sumArr
}

function SQ(configStr) { // returns a gridSquare with specified walls

    nWall = configStr.includes("n") // put a bonus by putting b in
    eWall = configStr.includes("e") // SQ("nsb") makes a square with north and south walls and a bonus
    sWall = configStr.includes("s")
    wWall = configStr.includes("w")
    isBonus = configStr.includes("b") 
    isGoal = configStr.includes("g")   
    this.bonus = isBonus
    this.goal = isGoal
    this.walls = [nWall,eWall,sWall,wWall]
    this.wasBonus = false;
    if(this.bonus) {
        this.wasBonus = true;
    }



}
 // methods of level class

        
    
        
function sqLoc(loc) {
        
        var grid = this.grid

        return grid[loc[0]][loc[1]]
    }



function loc(arr,item) {
    //console.log("Searching for item " + item + " in " + arr)
    //console.log(item)
    for(let x = 0; x < arr.length; x++)
        for(let y = 0; y < arr[x].length; y++){
            
            if(arr[x][y] == item){

             
        
                return [x,y]

            }
        }
    console.log("DIDN'T FIND")
    console.log(item)
    console.log("didn't do a great job searchin")
    return [-1,-1]

}
var twod = [
[1,2,3],
[4,5,6],
[7,8,9]
]




// end methods of level class

function level() {
    this.grid = []
    
    this.sq = sqLoc
    this.loc = loc
    this.orig = []
    
    
        


 // i will finish the search
}





function index2D(arr,loc) {
    return arr[loc[0]][loc[1]]
}


var levelOne = new level();

levelOne.grid = [
    [   new SQ("wn"),   new SQ("nbs"),    new SQ("ne")],
    [   new SQ("w"),   new SQ("nb"),  new SQ("e") ],
    [   new SQ("ws"),   new SQ("se"),  new SQ("sewg")]
]

levelOne.orig = levelOne.grid.slice()

var levelTwo = new level();

levelTwo.grid = [
    [   new SQ("wne"),  new SQ("nwsb"), new SQ("n"), new SQ("nebs")],
    [   new SQ("w"),    new SQ("nbs"),  new SQ("es"), new SQ("new")],
    [   new SQ("ws"),   new SQ("nb"),   new SQ("n"),   new SQ("esb")],
    [   new SQ("wnsb"),  new SQ("s"),    new SQ("s"),   new SQ("seng")],
    ]

levelTwo.orig = levelTwo.grid.slice()
for(var x = 0; x < levelOne.grid.length; x++) {
    for(var y = 0; y < levelOne.grid[length]; y++) {
        console.log(levelOne.grid[x][y])
    }
}
var levelThree = new level();

levelThree.grid = [
    [   new SQ("nws"),  new SQ("nsb"), new SQ("en"), new SQ("ewg")],
    [   new SQ("wn"),    new SQ("nbs"),  new SQ("es"), new SQ("ew")],
    [   new SQ("ws"),   new SQ("nb"),   new SQ("n"),   new SQ("es")],
    [   new SQ("wnsb"),  new SQ("s"),    new SQ("s"),   new SQ("sebn")],
    ]

var levelFour = new level();

levelFour.grid = [
[ new SQ("new"), new SQ("news"), new SQ("newb") ],
[ new SQ("wb"),  new SQ("sn"), new SQ("se")],
[ new SQ("w"),  new SQ("ns"), new SQ("ebn")],
[ new SQ("sewb"), new SQ("wnsg"), new SQ("es")],
]

const levels = [levelOne,levelTwo,levelThree,levelFour]

var character = {
    stage : 0,

    yx    : [0,0],
    moves : 100,
    pos   : function() {

        return levels[this.stage].sq(this.yx)
    },
    score : 20



}
var coffee;



function setup() {
    coffee = loadImage("assets/coffee.png"); 
    var cnv = createCanvas(canvasWidth+1,canvasHeight+1);
    background(100,10,100);

   
}

function draw() {
    background(68,17,17)
    if(character.stage < levels.length) {
        drawLevel(levels[character.stage],true)
        fill(255)
        textSize(50);
        text(character.score,10,50)
    }
    if(gameOver){
        background(0)
        fill(255)
        textSize(50);
        text("You passed out from exhaustion",canvasWidth/4,canvasHeight/4,canvasWidth/2);
        
        
    }
    if(character.stage == levels.length){
        background(255)
        fill(0)
        textSize(50)
        text("You made it to work!",canvasWidth/4,canvasHeight/4,canvasWidth/2)
    }
}




function keyPressed() {

    if(keyCode == 82) { // r key, reset game
        resetGame()
        return 0;
    }

    var cellHeight = Math.floor((canvasHeight) / levels[character.stage].grid.length)
    var cellWidth = Math.floor((canvasWidth)/ levels[character.stage].grid[0].length)
    var firstPos = character.pos()
    console.log("WE GOT A KEYPRESS")
    
    if (keyCode === UP_ARROW) {
        if (!character.pos().walls[0]) {
            character.yx = [character.yx[0]-1,character.yx[1]];
            character.score -= 5;
            character.moves += 1
           
        }
    }
    else if (keyCode === RIGHT_ARROW){
        if (!character.pos().walls[1]){
            character.yx = [character.yx[0],character.yx[1]+1];
            character.moves += 1;
            character.score -= 5;
         
              
        }
    }
    else if (keyCode === DOWN_ARROW){
        if (!character.pos().walls[2]){
            character.yx = [character.yx[0]+1,character.yx[1]];
            character.moves += 1;
            character.score -= 5;
          
              
        }
    }
    else if (keyCode === LEFT_ARROW){
        if (!character.pos().walls[3]){
            character.yx = [character.yx[0],character.yx[1]-1];
            character.moves += 1;
            character.score -= 5;
            

        }
    }
    else{
        console.log('no arrow pressed')
    }
    
    if (character.pos().bonus){
        character.score += 15;
        character.pos().bonus = false;
    
        
    }

    if(character.pos().goal) {
        character.yx = [0,0]
        character.stage += 1
        character.moves = 0;
        character.score = 20;
    }
    
    if(character.score <= 0) {
        gameOver = true;
    }    

   
    

}

function floor(number) {
    return Math.floor(number)
}

function drawLevel(curLevel,drawChar) {
    var cellHeight = Math.floor((canvasHeight) / curLevel.grid.length)
    var cellWidth = Math.floor((canvasWidth)/curLevel.grid[0].length)
    if(cellHeight > cellWidth) {cellHeight = cellWidth} else {cellWidth = cellHeight}

    for(let y = 0; y < curLevel.grid.length; y++){
        for(let x = 0; x < curLevel.grid[y].length; x++) {
            noStroke()
            let tl = [x*cellWidth,y*cellHeight]
            let tr = [(x+1)*cellWidth,y*cellHeight]
            let bl = [x*cellWidth,(y+1)*cellHeight]
            let br = [(x+1)*cellWidth,(y+1)*cellHeight]
            var wallLocs = [
                [tl, tr],
                [tr, br],
                [br, bl],
                [bl, tl]
            ]
           
            var center = [floor(x*cellWidth + (0.5 *cellWidth)),floor(y*cellHeight+ (0.5*cellHeight))]
            
            fill(150,210,150)
            if(curLevel.grid[y][x].goal) {
                fill(100,100,130)
            }
            rect(x*cellWidth,y*cellHeight,cellWidth,cellHeight)
             // wall drawing
            stroke(50,50,50)
            strokeWeight(5)
            for(let wall = 0; wall < 4; wall++) {
                if(curLevel.grid[y][x].walls[wall])
                    line(...wallLocs[wall][0],...wallLocs[wall][1])

            }
            noStroke()
            if(curLevel.grid[y][x].bonus){
                fill(120,62,62)
                image(coffee,tl[0]+cellWidth/4,tl[1]+cellWidth/4,cellWidth/2,cellHeight/2)
                
            }
            if(character.pos() == curLevel.grid[y][x] && drawChar) {
                fill(0,0,0)
                ellipse(...center,cellWidth/3,cellHeight/3)
            }
        }
    }

}
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

console.log(character.pos())



function resetGame() {
    character.yx = [0,0]
    character.score = 20;
    character.moves = 0;
    character.stage = 0;
    for(var i = 0; i < levels.length; i++) {
        var level = levels[i]
        for(var y = 0; y < level.grid.length; y++)
            for(var x = 0; x < level.grid[y].length; x++) {
                level.grid[y][x].bonus = level.grid[y][x].wasBonus
            }       
    }
    gameOver = false;        
}



  