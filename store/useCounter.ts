import { defineStore } from "pinia";

export const useCounter = defineStore('counter',{
    state:()=>({
        counter:0,
        name:"Daniel",
    }),

    getters:{
        doubleCount(state){
            return  state.counter * 2;
        }
    }
})