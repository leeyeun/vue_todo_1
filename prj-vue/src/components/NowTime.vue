<template>
  <div>{{today}}</div>
</template>

<script>
import dayjs from 'dayjs';
export default {
    component : {
        dayjs,
    },
    data() {
        return {
            today : dayjs().format("YYYY-MM-DD"),
        }
    }
    // data(){
    //     return{
    //         time : {
    //             var date = new Date();

    //             var year =  date.getFullYear();
    //             var month =  date.getMonth();
    //             var day =  date.getDay();

    //             var now = year + '/'+month + '/' + day
    //             console.log(now)
    //             return now;
    //         }
            
    //     }
        
    // }
}
</script>

<style>

</style>