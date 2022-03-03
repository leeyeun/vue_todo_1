<template>
  <div id="app">
    <!-- <router-link to="/login">LoginPage</router-link> -->
    <!-- <h1>To Do List</h1> -->
    <div class="app-view">
      <NowTime v-on:todayProps="dayday"></NowTime>
      <TodoPage v-bind:daydata="newTodays"></TodoPage>
      <!-- <TodoPage>
        <router-view></router-view>
      </TodoPage> -->
    </div>
    
    <!-- <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter></TodoFooter>
    <LastTodo></LastTodo> -->
    
    
  </div>
</template>

<script>
/*eslint-disable */
import NowTime from './components/NowTime.vue';
// import TodoInput from './components/TodoInput.vue';
// import TodoList from './components/TodoList.vue';
// import TodoFooter from './components/TodoFooter.vue';
// import LastTodo from './components/LastTodo.vue';
import TodoPage from './components/TodoPage.vue';
export default {
  
  components: {
    NowTime,
    TodoPage
    // TodoInput,
    // TodoList,
    // TodoFooter,
    // LastTodo
  },
  data(){
    return{
      newTodays:""
    }
  },
  methods: {
    dayday(newToday){
      // console.log(newToday);
      this.newTodays = newToday;
    },

  }
  
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
.app-view{
  width: 1200px;
  display: flex;
  margin: 0 auto;
}
.NowTime-page{
  width: 50%;
  
}
.Todo-page{
  width: 50%;
}
</style>
