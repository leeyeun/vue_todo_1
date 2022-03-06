<template>
    <div class="NowTime-page">
        <h2>Calendar</h2>
        <div>{{today}}</div>
        <!-- <div>{{toooday}}</div> -->
        <h2>
            <a href="#" v-on:click="onClickPrev(currentMonth)">◀</a>
            {{currentYear}}년 {{currentMonth}}월
            <a href="#" v-on:click="onClickNext(currentMonth)">▶</a>
        </h2>
        
        <div class="table table-hover" style="margin: 0 auto;">
            <div>
                <div class="weeks">
                    <div v-for="(weekName, index) in weekNames" :key="index"  class="weeksname">
                        {{weekName}}
                    </div>
                </div>
            </div>
            <div >
                <div v-for="(row, index) in currentCalendarMatrix" :key="index" style="display:flex">
                    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                    <div v-for="(day, index2) in row" :key="index2" class="allcolor" >
                        <!-- <div v-for="(propsList, index3) in propsList" :key="propsList.todoText"> -->
                            <div v-if="isToday(currentYear, currentMonth, day)" v-on:click="dayClick(currentYear, currentMonth, day)" class="rounded">
                                {{day}}
                            </div>
                            
                            <!-- <div v-else-if="groupdays.time" :class="{dateclicked:calenClick}" v-on:click="dayClick(currentYear, currentMonth, day)">
                                {{day}}
                                <i class="fa-solid fa-circle"></i>
                            </div>
                            <div v-else :class="{dateclicked:calenClick}" v-on:click="dayClick(currentYear, currentMonth, day)">
                                {{day}}
                                <i class="fa-solid fa-circle"></i>
                            </div> -->
                            <div v-else :class="{dateclicked:calenClick}" v-on:click="dayClick(currentYear, currentMonth, day)">
                                {{day}}
                                <!-- <i class="fa-solid fa-circle"></i> -->
                            </div>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div>propslist text</div>
        <!-- <div v-for="(propsList, index) in propsList" :key="propsList.todoText">
            <div>{{propsList.time}}</div>
        </div> -->
        <ul>
            <li v-for="(propsList) in propsList" :key="propsList.todoText" class="shadow">
                <span>{{propsList.time}}</span>
                <span>{{propsList.todoText}} </span>
            </li>
        </ul>
        <!-- <div>group by day</div>
        <ul>
            <li v-for="(groupdays) in groupdays" :key="groupdays.time">
                <span>{{groupdays.time}}</span>
            </li>
        </ul> -->
    </div>
  
</template>

<script>
import dayjs from 'dayjs';
import moment from 'moment';
import axios from 'axios';
export default {
    // name: 'Calendar',
    component : {
        dayjs,
    },
    data() {
        
        return {
            calenClick : false,
            ListAll : [],
            propsList:[],
            groupdays:[],

            weekNames : ["월","화","수", "목", "금", "토", "일"],
            rootYear: 1904,
            rootDayOfWeekIndex: 4,
            currentYear : new Date().getFullYear(),
            currentMonth : new Date().getMonth() + 1,
            currentDay : new Date().getDate(),
            currentMonthStartWeekIndex : null,
            currentCalendarMatrix : [],
            endOfDay : null,
            memoDates: [],

            today : dayjs().format("YYYY-MM-DD"),
            toooday: moment().format('YYYY-MM-DD'),
            // dateeee : currentYear+'-'+currentMonth+'-'+day,
        }
    },
    mounted(){
        this.init();
        this.groupbyDay();
    },
    methods: {
        daylist(thisdate){
            axios.get(`http://localhost:8080/api/todo/list/day/select/${thisdate}`)
                .then((res) => {
                    console.log('propslist!!:', res.data);
                    console.log('thisdate:',thisdate);
                    this.propsList = res.data;
                    console.log('propsList',this.propsList);
                    
                })
                .catch((error) => {
                    console.log(error);
                })
                // this.propsList[i].splice(i,1);
        },
        dayClick(currentYear, currentMonth, day ){

            // var propsindex1 = propsList[index3].splice(index3, 1);
            // console.log('propsindex1',propsindex1);

            var thisdate = currentYear+'-'+currentMonth+'-'+day;
            // console.log('thisdate',thisdate);
            this.$emit('todayProps', thisdate);
            
            this.calenClick = !this.calenClick;
            // console.log(this.calenClick);
            // if(this.groupbyDay){
            //     console.log('ff', groupdays.time);
            // }
            console.log('groupdays',this.groupdays);
            console.log('time',this.groupdays.time);
            // axios
            //     .get('http://localhost:8080/api/todo/all')
            //     .then((res) => {
            //     // console.log(res.data);
            //     this.ListAll = res.data;
            //     // console.log('all:', this.ListAll);
            //     // console.log('todo :',this.todoItems);
            //     // console.log('id',this.todoItems.todoText);
            //     })
            //     .catch((error) => {
            //     console.log(error);
            //     })
            
            axios.get(`http://localhost:8080/api/todo/list/day/select/${thisdate}`)
                .then((res) => {
                    console.log('propslist!!:', res.data);
                    console.log('thisdate:',thisdate);
                    this.propsList = res.data;
                    console.log('propsList',this.propsList);
                })
                .catch((error) => {
                    console.log(error);
                })
            console.log('!!@@',this.propsList);
            this.$emit('propsList',this.propsList);
            
        },
        groupbyDay(){
            axios.get('http://localhost:8080/api/todo/list/day')
            .then((res) => {
                console.log(res.data);
                this.groupdays = res.data;
                // this.days = res.data;
                console.log('groupdays :',this.groupdays);
                // console.log('id',this.todoItems.todoText);
            })
            .catch((error) => {
                console.log(error);
            })
            // console.log('@@@@ :',this.groupdays);
        },
        
        // ddddddd(groupdays){
        //     console.log('time',groupdays.time);
        //     return groupdays.time;
        // },
        init : function(){
            this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
            this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
            this.initCalendar();
        },
        initCalendar: function(){
            this.currentCalendarMatrix = [];
            let day = 1;
            for(let i = 0; i< 6; i++){
                let calendarRow = [];
                for(let j = 0; j < 7; j++){
                    if(i==0 && j<this.currentMonthStartWeekIndex){
                        calendarRow.push("");
                    }
                    else if(day <= this.endOfDay){
                        calendarRow.push(day);
                        day++;
                    }
                    else{
                        calendarRow.push("");
                    }
                }
                this.currentCalendarMatrix.push(calendarRow);
                // console.log('@@',this.currentCalendarMatrix);
            }
        },
        getEndOfDay: function(year, month){
            switch(month){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                case 2:
                    if( (year%4 == 0) && (year%100 != 0) ||(year%400 == 0)){
                        return 29;
                    }
                    else{
                        return 28;
                    }
                default:
                    console.log("unknown month " + month);
                    return 0;

            }
        },
        getStartWeek: function(targetYear, targetMonth){
            let year = this.rootYear;
            let month = 1;
            let sumOfDay = this.rootDayOfWeekIndex;
            /*eslint-disable */
            while(true){
                if(targetYear > year){
                    for(let i = 0; i < 12; i++){
                        sumOfDay += this.getEndOfDay(year, month + i);
                    }
                    year++;
                }
                else if(targetYear == year){
                    if(targetMonth > month){
                        sumOfDay += this.getEndOfDay(year, month);
                        month++;
                    }
                    else if(targetMonth == month){
                        return (sumOfDay)%7;
                    }
                }
            }
        },
        onClickPrev : function(month){
            month--;
            if(month <= 0) {
                this.currentMonth = 12;
                this.currentYear -= 1;
            }
            else {
                this.currentMonth -= 1;
            }
            this.init();
        },
        onClickNext : function(month) {
            month++;
            if(month > 12) {
                this.currentMonth = 1;
                this.currentYear += 1;
            }
            else{
                this.currentMonth += 1;
            }
            this.init();
        },
        isToday : function(year, month, day){
            let date = new Date();
            return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate();
            
        }
        // getFirstAndLastDate(month, year) {
        //     const lastMonthLastDate = new Date(year, month, 0).getDate();
        //     const latsMonthLastDay = new Date(year, month, 0).getDay();
        //     const thisMonthLastDate = new Date(year, month+1, 0).getDate();
        //     const nextMonthFirstDay = new Date(year,month+1).getDay();
        //     return[this.lastMonthLastDate = lastMonthLastDate, this.latsMonthLastDay = latsMonthLastDay,
        //         this.thisMonthLastDate = thisMonthLastDate, this.nextMonthFirstDay = nextMonthFirstDay];
        // },
        // getDates(){
        //     const [lastMonthLastDate, latsMonthLastDay, thisMonthLastDate, nextMonthFirstDay] = 
        //     this.getFirstAndLastDate(this.crrentMonth, this.currentYear);
        // }
    }
}
</script>

<style>
.weeks{

    display: flex;
}
.weeksname{
    width: 60px;
    padding: 20px;
}
.allcolor{
    width: 60px;
    /* background-color: rgb(200, 221, 240); */
    padding:20px;
}
.rounded {
    /* -moz-border-radius:20px 20px 20px 20px; 
    border-radius:20px 20px 20px 20px;
    border:solid 1px #ffffff;
    background-color:#2b6bd1;
    padding:10px;
    color:#ffffff; */
    background-color: rgb(228, 205, 176);
    border-radius: 50%;
}
.dateclicked {
    /* background-color: #dadada;
    -moz-border-radius:20px 20px 20px 20px; 
    border-radius:20px 20px 20px 20px;
    border:solid 1px #ffffff;
    padding:10px;
    color:#ffffff; */
    color: red;
}
.thisday{
    border-right: 50%;
    background-color: red;
    width: 10px;
    height: 10px;
}
.circlesmall{
    color: black;
}
</style>