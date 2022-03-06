<template>
  <div>
    <div>list-day</div>
    <div>newpropss:{{newpropss}}</div>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
      <ul v-for="(newpropss) in newpropss" :key="newpropss.todoText">
        <li>
          <span>{{newpropss.time}}{{newpropss.todoText}}</span>
        </li>
      </ul>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
      <!-- <ul v-for="(days) in days" v-bind:key="days.time" >
        <div>
          <li class="dropdown">
            <span>{{days.time}}</span>
            
              <i class="fa-solid fa-angle-up upbtn" v-if=" toggleOnOff != false" v-on:click="getUpBtn" ></i>
              <i class="fa-solid fa-angle-down downBtn" v-on:click="getListDay(days)" v-else ></i>
            
          </li>
          <div class="dropdownList">
           
            <div  v-for="(dayList, index) in dayList" v-bind:key="dayList.todoText" v-if="days.time == dayList.time" class="drop-content" v-bind:class="{clickDropContent:!toggleOnOff}">
              
              <i class="fa-solid fa-check checkBtn"  v-bind:class="{checkBtnCompleted: dayList.completed}" v-on:click="toggleComplete(dayList,index)" ></i>
              <span v-bind:class="{textCompleted: dayList.completed}">{{dayList.todoText}}</span>
              
              <span class="removeBtn" v-on:click="removeTodo(dayList)">
                <i class="fa-solid fa-trash-can"></i>
              </span>
            </div>
          </div>
        </div>
      </ul> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['dddd','newpropss'],
  
  data: function(){
    return{
      lastTodo: [],
      days:[],
      dayList:[],
      toggleOnOff : false,
      propsList:[],
    }
  },
  
  methods : {
    //group by 날짜
     getDay(){
      axios.get('http://localhost:8080/api/todo/list/day')
      .then((res) => {
        // console.log(res.data);
        this.days = res.data;
        // console.log('days :',this.days);
        // console.log('id',this.todoItems.todoText);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    //select 일별 list
    getListDay(days){
      // console.log('dddd',dddd.time);
      axios.get(`http://localhost:8080/api/todo/list/day/select/${days.time}`)
      .then((res) => {
        // console.log('dayList:', res.data);
        this.dayList = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
      this.toggleOnOff = true;
    },
    // getPropsDay(){
    //   console.log('dddd',this.dddd);
    //   axios.get(`http://localhost:8080/api/todo/list/day/select/${this.dddd}`)
    //   .then((res) => {
    //     console.log('propslist!!:', res.data);
    //     // console.log('dddd',this.dddd);
    //     this.propsList = res.data;
    //     console.log('propsList',this.propsList);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // },

    getUpBtn(){
      this.toggleOnOff = false;
    },

    toggleComplete: function(dayList,i) {
      // console.log('completed',dayList.completed);
      // console.log('!completed',!dayList.completed);
      axios.post(`http://localhost:8080/api/todo/checkbox/ckeck/${dayList.id}`,{
        completed : !dayList.completed,
        id : dayList.id
      })
      .then(() => {
        // todoList.completed = true;
        this.dayList[i].completed = !dayList.completed;
        // console.log(dayList.completed);
      })
      .catch((error) => {
          console.log(error);
        })
    },
    removeTodo: function(dayList) {
      // console.log('id',dayList.id);
      alert(`선택한 글번호가 ${dayList.id} 맞습니까?`);
      axios.post(`http://localhost:8080/api/todo/delete/${dayList.id}`)
      .then(() => {
        alert('삭제되었습니다.');
        return window.location.replace('/');
      })
      .catch((error) => {
          console.log(error);
        })
    },

    
  },
  mounted(){
    this.getDay()
    // this.getPropsDay();
  }
}
</script>

<style>
.removeBtn{
    margin-left: auto;
    color: #de4343;
  }
  .downBtn{
    line-height: 45px;
    /* color: #bebfc0; */
    margin-left: auto;
  }
  .upbtn{
    line-height: 45px;
    margin-left: auto;
  }
  .drop-content {
    position: relative;
    z-index: 1;
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    /* margin: 0.5rem 0; */
    padding: 0 0.9rem;
    background: white;
    width: 50%;
    margin: 0 auto;
    margin-top: 10px;
  }
  .clickDropContent{
    display: none;
  }
  .dropdown{
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

  .checkBtnCompleted{
    color: #b3adad;
  }
  .textCompleted{
    text-decoration: line-through;
    color: #b3adad;
  }
  @media (max-width : 520px) {
  .drop-content {
    width: 90%;
  }
}
  
</style>