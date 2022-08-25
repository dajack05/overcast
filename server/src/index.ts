import cron from 'node-cron'

console.log("Hello World");

cron.schedule("* * * * * *",(now)=>{
    console.log("Hello From Node");
});