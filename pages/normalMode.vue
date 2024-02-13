<script>
import { storeToRefs } from 'pinia';


const score = useRecordsStore()
const useLocalHormal = score.localNormal

  
class Game{
    constructor(x ,y){
        this.x = x;
        this.y = y;
        this.val = 0;
        this.is_mine = false;
        this.is_open  = false;
        this.flag = false;
    }
}

  export default{
    data: function(){
        return {

            mines: 40,
            width: 0,
            height: 0,
            map: [],
            options:{
                width: 0,
                height: 0,
                mines:  40,
            },
            state: "init",
            cells_opened: 0,
            flag_count: 0,
            flags: 0,
            diff: "",
         
            intervalId: null,

            allMin: 39,
            allSec: 60,
            minutes: 0,
            seconds: 0,
            timerRunning: false,
            timer: null,


        }
    },
   
    computed:{
        cells_closed(){
            return this.width * this.height - this.cells_opened;
        },
        

    },
  
   methods: {
    getStorage() {
      return JSON.parse(localStorage.getItem("scoreNormal"))
    },
    setStorage(useLocalHormal){
      localStorage.setItem("scoreNormal", JSON.stringify(useLocalHormal))
    },
    saveStorage(){
      let storageScore = this.getStorage()
      storageScore = JSON.parse(JSON.stringify(useLocalHormal))
      this.setStorage(storageScore)
    },






    updateParentData(newData) {
           this.showChooseCom = newData;
    },
    closeNormal(){
      this.showNormalGame = false;
      this.showChooseCom = true;
    },

    openNormalGame(){
        this.width = 16;
        this.height = 16;
        this.mines = 40;
        this.minutes = 40;
        this.seconds = 0;
        this.resetGame();
    },

    applyOptions(){
        for(let opt in this.options)
            this[opt] = this.options[opt];
            this.resetGame();
    },
    resetGame(){
        this.flag_count = 0;
        this.cells_opened = 0;
        this.state = 'init';
        this.clearSquare();
       
    },
    clearSquare(){
        this.map = [];
        for(let y = 0; y < this.height; y++){
                this.map.push([]);
            for(let x = 0; x < this.width; x++){
                this.map[y].push(new Game(x, y));
            }
        }

    },

    openAllCellsWin(){
        for (let y = 0; y < this.map.length; ++y)
           for (let x = 0; x < this.map[y].length; ++x){
            let cell = this.cell(x,y);
            if (cell.is_mine){
              cell.val = this.setCellFlag(cell, true)
            }
        }
    },
    restartGameNormal(){
        this.width = 16;
        this.height = 16;
        this.mines = 40;
        this.minutes = 40;
        this.seconds = 0;
        this.showNormalGame = true;
        this.showChooseCom = false;
      this.resetGame();
      this.stopTimer();
      this.startTimer();
    },
 
    pushMines(except_cell,){
        const cells_num = this.width * this.height;
        const except_n = except_cell.y * this.width + except_cell.x;
        let Coor = 0;
        let setMines = 0;


          while (setMines < this.mines){
            if (Coor !== except_n){
              this.cellLine(Coor).is_mine = true;
              setMines++;
            }
            Coor++
          }
                for ( let i = 0; i < cells_num - 1; ++i){
                      const target =  Math.floor(Math.random() * cells_num);
                      const cellN = this.cellLine(i);
                      const cellTarget = this.cellLine(target);
                      if (target !== except_n && i !== except_n){
                        const val = cellN.is_mine;
                        cellN.is_mine = cellTarget.is_mine;
                        cellTarget.is_mine = val;
                      } 
                }
    },
    cellLine(i){
        return this.cell(i % this.width, Math.floor(i/this.width));
    },
    cell(x, y){
        return (x >= 0 && y >= 0 && x < this.width && y < this.height)
          ? this.map[y][x]
          : null;
    },
    lostGame(){
        this.state = "lost";
        this.openAllCells();
        this.stopTimer();
    },
  
    winGame(){
        this.state = "win";
        this.openAllCellsWin();
        this.stopTimer();
        this.score();
        score.showNormalLocal()
        this.saveStorage()

    },
    score(){
          const allSeconds = ((this.allMin - this.minutes) * 60 + (this.allSec - this.seconds)) 
          score.pushSecondsNormal(allSeconds)
      },
   
    openAllCells(){
        for (let y = 0; y < this.map.length; ++y)
           for (let x = 0; x < this.map[y].length; ++x){
            let cell = this.cell(x,y);
            this.setCellOpen(cell)
            if (!cell.is_mine){
                cell.val = this.countMinesAround(cell);
            }
        }
    },
    countMinesAround(cell){
        return this.countCellAround(cell, friend => friend.is_mine)
    },
    countCellAround(cell, filter){
        let num = 0;
        this.searhAround(cell,
             friend => num += filter(friend) ? 1 : 0
        );
        return num;
    },

    searhAround(cell, callback){
        let friend;

        for (let dx = -1; dx < 2; ++dx)
             for (let dy = -1; dy < 2; ++dy){
                 if((dx || dy) && (friend = this.cell(cell.x+dx, cell.y+dy)))
                     callback(friend);
            }

    },
  
    clickCell(cell){
        this.init(cell);
        if(this.state === "play" && !cell.is_open){
            if (cell.is_mine){
                this.lostGame();
            } else {
                try{
                    this.openCell(cell);
                    if(parseInt(this.cells_closed) === parseInt(this.mines)){
                        this.winGame();
                    }
                }
                catch(e){
                    this.lostGame();
                }
                
            }
        }
    },
    setFlag(cell){
        this.init(cell);
        if(this.state === "play"){
            if(!cell.is_open){
                this.setCellFlag(cell, !cell.flag);
            }
        }
    },
    setCellFlag(cell, flag){
   
        if(flag !== cell.flag){
             cell.flag = flag;  
             this.flag_count += flag ? 1 : -1;
             this.mines += flag ? -1 : 1;
        }
      },
        
   
    openCell(cell){
        if (cell && !cell.is_open){
            this.setCellOpen(cell);
            if(cell.is_mine){
                throw "Boom"
            }
            if(cell.val === 0){
                this.searhAround(cell,
                     friend => this.openCell((friend))
                )
            }
        }
    },
    getNumberClass(val) {
        return {
          blue: val === 1,
          green: val === 2,
          red: val === 3,
          darkBlue: val === 4,
          brown: val === 5,
          turquoise: val === 6,
          black: val === 7,
          white: val === 8,
        }
    },
    setCellOpen(cell){
        if(!cell.is_open){
             cell.is_open = true; 
             this.cells_opened++;
             this.setCellFlag(cell, false);
             if(!cell.is_mine){
                 cell.val = this.countMinesAround(cell);
                }
        }
    },
    init(cell){
        if (this.state === "init"){
            this.state = "play";
            this.startTimer();
            this.pushMines(cell);
        }
    },
     cellClass(cell){
            return cell.is_open 
           ? ([cell.is_mine ? "mine" : "digit-" + cell.val ])
           : ["closed", cell.flag ? "flag" : "" ];
    },
      startTimer(){
        if (this.state === "play"){
          this.timerRunning = true;
            this.intervalId = setInterval(() => {
              if (this.seconds > 0) {
                this.seconds--;
              } else {
                if (this.minutes > 0) {
                  this.minutes--;
                  this.seconds = 59;
                } else {
                  clearInterval(this.intervalId);
                  this.timerRunning = false;
                }
              }
        }, 1000)}
        },
    stopTimer() {
        clearInterval(this.intervalId);
        this.timerRunning = false;
      },
    }
}
</script>


<template>
     
      <div 
          :class="state"
          >
          <div class="flex items-center justify-center">
              <UiButton class="btn" @click="openNormalGame">Start</UiButton>
              <UiButton class="btn2" @click="restartGameNormal">Restart</UiButton>
             
          </div>
          <div class="all">

            <div class="container" >
              <div class="navbar">
             
              </div>
            </div>
            <div class="timer">
                  <p class="minesCounter">Mines: {{ mines }}</p>
                  {{minutes}}:
                  <div v-if="this.seconds >= 10">{{seconds}}</div>
                  <div v-else> 0{{ seconds }}</div>
                </div>
            <div class="game">
              <div   v-for="map_row of map" :key="map_row" class="row">
                <div v-for="cell of map_row" 
                :key="cell"
                class="cell"
                @mousedown.left="clickCell(cell)"
                @mousedown.right="setFlag(cell)"
                @contextmenu.prevent
                :style="{width: (65/width) + '%'}"
                :class="cellClass(cell, cell.count)"
                >
                <div v-if="cell.is_open && !cell.is_mine && cell.val" class="cellCenter"
                :class="getNumberClass(cell.val)"
                >
                {{cell.val}}
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</template>


<style scoped>
  *{
    margin: 0;
    padding: 0;
}
@media (max-width: 500px) {
  .buttons_custom{
    position: absolute;
    margin-top: 23px;
    margin-left: 130px;
  }

  @media (max-width: 1920px) and (min-width: 1920px){
    .square{
      height: 300px;
    }
  }
 
}
.btn2{
  width: 149px;
}
.timer{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.btn{
  width: 134px;
  margin-left: 10px;
  margin-right: 37px;
}
.game{
    position: relative;
    top: 20px;
    left: 183px;
}
.complexity__back:visited{
 color: black;
 text-decoration: none;
}
.container{
    max-width: 1080px;
    margin: 0 auto;
}
.all{
    max-width: 1080px;
    margin: 0 auto;
}


.navbar input{
   width: 40px;
   text-align: center;
}
.cell{
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #f1f5f9;
    position: relative;
    cursor: pointer;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    transition: 0.2;
    font-weight: bold;
}
.row{
    display: flex;
}
.cell::after{
    content: "";
    display: block;
    padding-bottom: 100%;
}
.cellCenter{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}
.fall{
    background: red;
}
.cell.mine{
  background-image: url(../public/mine.png);
}

.cell.closed{
  background-color: #9ca3af;
  box-shadow: inset  -1px 1px #9ca3af;
}
.cell.flag{
  background-image: url(../public/flag.jpg);

}

.cell.closed:hover{
    background-color: pink;
}
.blue {
    color: blue;
  }
  
  .green {
    color: green;
  }
  
  .red {
    color: red;
  }
  
  .darkBlue {
    color: darkblue;
  }
  
  .brown {
    color: brown;
  }
  
  .turquoise {
    color: turquoise;
  }
  
  .black {
    color: black;
  }
  
  .white {
    color: white;
  }
  


  .complexity__easy{
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    margin-top: 60%;
    text-align: center;
    font-size: 45px;
    border: 1px solid gray;
    width: 450px;

  }


  .timer{
  font-size: 45px;
  color: brown;
  display: flex;
  align-items: center;
  }
  .quasiton{
    background-color: blueviolet;
  }

 .minesCounter{
  margin-right: 75px;
  color: red;
  font-size: 35px;
 }
 .width{
  font-size: 25px;
 }
 .mines{
  font-size: 25px;
 }
 .height{
  font-size: 25px;
 }


</style>