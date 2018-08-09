function addArr(arr1,arr2) { // adds two equal length arrays
    sumArr = []
    for(let i = 0; i < arr.length; i++)
        sumArr.push(arr1[i]+arr2[i])
    return sumArr
}

function sq(configStr) { // returns a gridSquare with specified walls

    nWall = configStr.includes("n") // put a bonus by putting b in
    eWall = configStr.includes("e") // sq("nsb") makes a square with north and south walls and a bonus
    sWall = configStr.includes("s")
    wWall = configStr.includes("w")
    isBonus = configStr.includes("b")    
    this.bonus = isBonus
    this.walls = [nWall,eWall,sWall,wWall]


}

function level() {
    this.grid = []

    function neighbors(gridSquare) {
        var north = [0,-1]
        var east  = [1, 0]
        var south = [0, 1]
        


    }


}

function loc2D(arr,item) {
    for(let x = 0; x < arr.length; x++)
        for(let y = 0; y < arr[x].length; y++)
            if(arr[x][y] == item)
                return [x,y]
    return [-1,-1]
}

function index2D(arr,loc) {
    return arr[loc[0]][loc[1]]
}


var levelOne = new level();

levelOne.grid = [
    [   new sq("wn"),   new sq("n"),    new sq("ne")],
    [   new sq("we"),   new sq("wsb"),  new sq("e") ],
    [   new sq("ws"),   new sq("sne"),  new sq("sew")]
]
/* representatin of levelOne
______
|    |
| |_ |
|__|_|  
*/





var northSouth = sq("bsn");

console.log(levelOne)


function setup() {
    createCanvas(1000,1000);
    background(100,10,100);
}