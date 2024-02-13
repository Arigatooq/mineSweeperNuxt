
<script setup lang="ts">

import { storeToRefs } from 'pinia';
import {ref, watch, onMounted} from 'vue'

 
const useRecord = useRecordsStore();
const {records} = storeToRefs(useRecord)
// const {localEasy} = storeToRefs(useRecord)
const localEasyShow = useRecord.localEasy

const sorted = useRecord.score
const sortedNormal = useRecord.scoreNormal
const sortedDifficult = useRecord.scoreDifficult
const sortedCustom = useRecord.scoreCustom


let showEasy = ref()
let showNormal = ref()
let showDifficult = ref()
let showCustom = ref()





const showEasyRef = () =>{
    showEasy.value = !showEasy.value
    showNormal.value = false
    showDifficult.value = false
    showCustom.value = false
};
const showNormalRef = () =>{
    showEasy.value = false
    showNormal.value = !showNormal.value
    showDifficult.value = false
    showCustom.value = false
};
const showDifficultRef = () =>{
    showEasy.value = false
    showNormal.value = false
    showDifficult.value = !showDifficult.value
    showCustom.value = false
};


// const LocalStorageEasy = localStorage.getItem("scoreEasy");
// const useLocalStorageEasy = JSON.parse(LocalStorageEasy)
// localStorage.removeItem(LocalStorageEasy)


// const LocalStorageNormal = localStorage.getItem("scoreNormal");
// const useLocalStorageNormal = JSON.parse(LocalStorageNormal)

// const LocalStorageDifficult = localStorage.getItem("scoreDifficult");
// const useLocalStorageDifficult = JSON.parse(LocalStorageDifficult)


</script>

<template>
      <div class="flex justify-center">
        <UiButton class="m-6" @click="showEasyRef">Easy</UiButton>
        <UiButton class="m-6" @click="showNormalRef">Normal</UiButton>
        <UiButton class="m-6" @click="showDifficultRef">Difficult</UiButton>
    </div>
    <div class="easy" v-show="showEasy">
        <p class="best_time">The best time to complete an easy mode</p>
        <div class="wrapper">
            <ul>
                <li v-for="record of sorted" :key="record">
                    <div class="record">
                        {{ record }}
                    </div> 
                </li>
            </ul>
        </div>
    </div>
    <div class="easy" v-show="showNormal">
        <p class="best_time">The best time to complete a normal mode</p>
        <div class="wrapper">
            <ul>
                <li v-for="record of sortedNormal" :key="record">
                    <div class="record">
                        {{ record }}
                    </div> 
                </li>
            </ul>
        </div>
    </div>
    <div class="easy" v-show="showDifficult">
        <p class="best_time">The best time to complete a difficult mode</p>
        <div class="wrapper">
            <ul>
                <li v-for="record of sortedDifficult" :key="record">
                    <div class="record">
                        {{ record }}
                    </div> 
                </li>
            </ul>
        </div>
    </div>
    <div class="easy" v-show="showCustom">
        <p class="best_time">The best time to complete a custom mode</p>
        <div class="wrapper">
            <ul>
                <li v-for="record of sortedCustom" :key="record">
                    <div class="record">
                        {{ record }}
                    </div> 
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .wrapper{
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    li{
        font-size: 35px;
    }
    h1{
        margin-top: 5px;
        text-align: center;
        font-size: 35px;
        color: blueviolet;
    }
    .record{
        text-align: center;
        color: #202937;
        margin: 5px;
        border: 1px solid #202937;
        padding: 10px;
    }
    .best_time{
        margin-left: 35%;
        bottom: 750px;
        left: 36.6%;
        color: whitesmoke;
        font-size: 30px;
        padding: 15px;
    }
</style>