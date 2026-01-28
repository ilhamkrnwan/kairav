<template>
    <div class="font-mono">
      
      <div class="bg-white rounded-md bg-gray-800 shadow-lg">
        <div class="md:flex px-4 leading-none max-w-4xl">
          <div class="flex-none ">
           <img
            src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
            alt="pic"
            class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
          />           
          </div>

          <div class="flex-col text-gray-300">
   
            <p class="pt-4 text-2xl font-bold">Joker (2020)</p>
            <hr class="hr-text" data-content="">
            <div class="text-md flex justify-between px-4 my-2">
              <span class="font-bold">2h 2min | Crime, Drama, Thriller</span>
              <span class="font-bold"></span>
            </div>
            <p class="hidden md:block px-4 my-4 text-sm text-left">In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker. </p>
            
            <p class="flex text-md px-4 my-2">
              Rating: 9.0/10 
              <span class="font-bold px-2">|</span>
              Mood: Dark
            </p>
            
            <div class="text-xs">
              <button type="button" class="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline">TRAILER</button>
              
              <button type="button" class="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline">IMDB</button>
              
              <button type="button" class="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline">AMAZON</button>
            </div>
<!--             <p>ICON BTNS</p> -->
          
          </div>
        </div>
        <div class="flex justify-between items-center px-4 mb-4 w-full">
          <div class="flex">
          <i class="material-icons mr-2 text-red-600">favorite_border</i>
          <i class="material-icons text-blue-600">remove_red_eye</i>
          </div>
          <div class="flex">
            <i class="material-icons ml-2 text-yellow-600">sentiment_very_satisfied</i>
            <i class="material-icons ml-2 text-yellow-600">sentiment_neutral</i>
            <i class="material-icons ml-2 text-yellow-600">sentiment_very_dissatisfied</i>
             <i class="material-icons ml-2 text-yellow-600">star_outline</i>
            <i class="material-icons ml-2 text-yellow-600">star_half</i>
            <i class="material-icons ml-2 text-yellow-600">star</i>           
            
          </div>
        </div>          
      </div>
    </div>
</template>
<style>
@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap');

.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
}
.hr-text:before {
  content: "";
  background: linear-gradient(to right, transparent, #818078, transparent);
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
}
.hr-text:after {
  content: attr(data-content);
  position: relative;
  display: inline-block;
  color: black;
  padding: 0 0.5em;
  line-height: 1.5em;
  color: #818078;
  background-color: #fcfcfa;
}
</style>