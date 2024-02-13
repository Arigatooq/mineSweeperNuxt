
export const useRecordsStore = defineStore('score', {
    state: () => ({
      records: [],

      localEasy: [].slice(0,10),
      recordsNormal: [],

      localNormal: [],
      recordsDifficult: [],

      localDifficult: [],
      recordCustom: [],
      
    }),
    getters: {
     
  
     scoreNormal(state:any){
      let score = []
      let minutes = 0
      let seconds = 0
      for (let i = 0; this.recordsNormal.length > i; i++){
        minutes = Math.floor(state.recordsNormal[i] / 60)
        seconds = state.recordsNormal[i] % 60
        score.push(`${minutes}:${seconds}`)
        state.localNormal.push(`Complete in: ${minutes} min, ${seconds} sec`)
      }
      return score.slice(0, 10).sort()
     },
     scoreDifficult(state:any){
      let score = []
      let minutes = 0
      let seconds = 0
      for (let i = 0; this.recordsDifficult.length > i; i++){
        minutes = Math.floor(state.recordsDifficult[i] / 60)
        seconds = state.recordsDifficult[i] % 60
        score.push(`${minutes}:${seconds}`)
        state.recordsDifficult.push(`Complete in: ${minutes} min, ${seconds} sec`)
      }
      return score.slice(0, 10)
     },
     scoreCustom(state:any){
      let score = []
      let minutes = 0
      let seconds = 0
      for (let i = 0; this.recordCustom.length > i; i++){
        minutes = Math.floor(state.recordCustom[i] / 60)
        seconds = state.recordCustom[i] % 60
        score.push(`${minutes}:${seconds}`)
      }
      return score.slice(0, 10)
     },





     
     
    },
    actions: {
      showEasyLocal(){
        let minutes = 0
        let seconds = 0
        for (let i = 0; this.records.length > i; i++){
          minutes = Math.floor(this.records[i] / 60)
          seconds = this.records[i] % 60
        }
        return this.localEasy.push(`Complete in: ${minutes} min, ${seconds} sec`)  && this.localEasy.slice(0,10)

      },
      showNormalLocal(){
        let minutes = 0
        let seconds = 0
        for (let i = 0; this.recordsNormal.length > i; i++){
          minutes = Math.floor(this.recordsNormal[i] / 60)
          seconds = this.recordsNormal[i] % 60
        }
        return this.localNormal.push(`Complete in: ${minutes} min, ${seconds} sec`)
      },
      showDifiicultLocal(){
        let minutes = 0
        let seconds = 0
        for (let i = 0; this.recordsDifficult.length > i; i++){
          minutes = Math.floor(this.recordsDifficult[i] / 60)
          seconds = this.recordsDifficult[i] % 60
         
        }
        return this.localDifficult.push(`Complete in: ${minutes} min, ${seconds} sec`)
      },
      
      pushSecond(Allseconds: never){
        this.records.push(Allseconds)
      },

      pushSecondsNormal(Allseconds: never){
        this.recordsNormal.push(Allseconds)
      },

      pushSecondsDifficult(Allseconds: never){
        this.recordsDifficult.push(Allseconds)
      },

      pushSecondsCustom(Allseconds: never){
        this.recordCustom.push(Allseconds)
      },













        }
  })