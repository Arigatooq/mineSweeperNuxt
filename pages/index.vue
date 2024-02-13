<template>
    <div class="menu">
                 <div class="container">
                        <NuxtLink
                            v-for="item in MENU_DATA"
                            :key="item.name"
                            :to="item.url"
                            class="flex items-center justify-center w-full">
                               <UiButton >Play</UiButton>
                         </NuxtLink>
             </div>
         </div>
 </template>
 
 <script setup lang="ts">
 import {MENU_DATA} from '@/components/menu.data';
  
 </script>
   
 <style>
 *{
   text-decoration: none;
 }
 .menu__play:visited{
   color: black;
   text-decoration: none;
 }
 .menu__leader_board:visited{
   color: black;
   text-decoration: none;
 }
  .menu__choose{
       margin-top: 1cm;
       height: 770px;
       width: 100%;
      
     }
     .menu__buttons{ 
       height: 400px;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
       align-items:center;
     }
     .menu__play{
       font-family: Arial, Helvetica, sans-serif;
       cursor: pointer;
       margin-top: 60%;
       text-align: center;
       font-size: 45px;
       border: 1px solid gray;
       width: 450px;
   
     }
     .menu__leader{
       font-family: Arial, Helvetica, sans-serif;
       cursor: pointer;
       margin-top: 5%;
       text-align: center;
       font-size: 45px;
       border: 1px solid gray;
       width: 450px;
     }
     .menu__leader_board{
       margin-top: 1cm;
       height: 770px;
       width: 100%;
      
     }
     .menu__leader_board{ 
       height: 400px;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
       align-items:center;
     }
     .menu__leader_board{
       font-family: Arial, Helvetica, sans-serif;
       cursor: pointer;
       margin-top: 60%;
       text-align: center;
       font-size: 45px;
       border: 1px solid gray;
       width: 450px;
       color: black;
   
     }
     .menu__leader_board{
       font-family: Arial, Helvetica, sans-serif;
       cursor: pointer;
       margin-top: 5%;
       text-align: center;
       font-size: 45px;
       border: 1px solid gray;
       width: 450px;
       color: black;
     }
 </style>