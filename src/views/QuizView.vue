<template>
    <div class="w-[600px] mx-auto">
        <form action="">
            <div class="mt-8  flex md:flex-row md:gap-0 gap-2 flex-col md:grid-cols-2">
                <div class="flex self-center md:max-w-[193px] flex-wrap gap-2 items-center">
                    <label v-for="i in 8" class="relative flex items-center rounded-full cursor-pointer">
                        <input type="checkbox" 
                        class="peer relative appearance-none w-10 h-10 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-custom-orange before:rounded-md before:w-10 before:h-10  before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-custom-orange checked:custom-orange checked:before:custom-orange"/>
                        <span class="absolute peer-checked:text-black transition-opacity opacity-100 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 text-lg -translate-x-2/4 peer-checked:opacity-100">{{ i }}</span>
                    </label>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <select class="h-10 p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer" placeholder="" name="" id="">
                        <option class="">kanji</option>
                        <option class="">hiragana</option>
                        <option class="">english</option>
                    </select>
                    <input type="text" class="h-10 p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer " placeholder="max 10">
                    <select class="h-10 p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer " name="" id="">
                        <option>hiragana</option>
                        <option>kanji</option>
                        <option>english</option>
                    </select>
                    <button class="h-10 p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Start</button>
                </div>
            </div>
        </form>
        <div class="mt-6 p-4 min-h-40 max-w-[600px] flex justify-center items-center border rounded-md bg-custom-bg border-blue-gray-200">
            <p class="text-5xl"></p>
        </div>

        <div class="grid md:mt-8 mt-4 grid-cols-2 gap-2">
            <button class="min-h-20 p-2 hover:bg-custom-orange/10 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Answer 1</button>
            <button class="min-h-20 p-2 hover:bg-custom-orange/10 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Answer 2</button>
            <button class="min-h-20 p-2 hover:bg-custom-orange/10 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Answer 3</button>
            <button class="min-h-20 p-2 hover:bg-custom-orange/10 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Answer 4</button>            
        </div>
        
    </div>
</template>