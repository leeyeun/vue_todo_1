<template>
  <div id="app">
    <h1>To Do List</h1>
    <NowTime></NowTime>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter></TodoFooter>
    <LastTodo></LastTodo>

    <!-- <div v-for="(value, i) in data" :key=i>
      <div>{{value.id}}</div>
      <div>{{value.todoText}}</div>
      <div>{{value.time}}</div>
    </div> -->
    
  </div>
</template>

<script>
// import Vue from 'vue';

import NowTime from './components/NowTime.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import LastTodo from './components/LastTodo.vue';
// import data from './data/index'

// import axios from 'axios';
// Vue.prototype.$axios = axios;
export default {
  // name: 'TodoList',
  // data() {
  //   return{
  //     data: data
  //   }
  // }
  components: {
    NowTime,
    TodoInput,
    TodoList,
    TodoFooter,
    LastTodo
  },
  // methods: {
  //   getList() {
  //     this.$axios
  //       .get('http://localhost:8080/todo/list')
  //       .then((res) => {
  //         console.log(res.data);
  //         // this.todoItems(res.data);
  //         // console.log(this.todoItems);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //   }
  // },
  // mounted() {
  //   this.getList();
  // }
  
  
}
</script>

<style>
body{
  text-align: center;
  background-color: #F6F6F6;
}
input{
  border-style: groove;
  width: 200px;
}
button{
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
h1{
        color: #2F3B52;
        font-weight: 900;
        margin: 2.5rem 0 1.5rem;
    }
ul{
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li{
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  /* margin: 0.5rem 0; */
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
}
@media (max-width : 520px) {
  li {
    width: 90%;
  }
}
@media (max-width : 300px) {
  li {
    width: 275px;
  }
}
</style>
