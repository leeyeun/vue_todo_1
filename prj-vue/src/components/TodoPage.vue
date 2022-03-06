<template>
  <div class="Todo-page">
        <!-- <router-view></router-view> -->
        <!-- <router-view></router-view> -->
        <!-- <router-view></router-view> -->
        <!-- <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFooter></TodoFooter> -->
        <h2>To Do List</h2>
        <div>today:{{today}}</div>
        <!-- <div>daydata:{{daydata}}</div> -->
        <TodoInput v-if="newItem"></TodoInput>
        <TodoList v-if="newItem"></TodoList>
        <!-- <LastTodo v-if="newItem" :dddd="daydata" v-bind:newpropss="newItem"></LastTodo> -->
        <!-- <LastTodo v-if="newItem" v-bind:newpropss="newItem"></LastTodo> -->
        <TodoFooter v-if="newItem"></TodoFooter>
        <!-- <LastTodo></LastTodo> -->
  </div>
</template>

<script>
// import {router} from'../router/index';
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue';
import TodoFooter from '../components/TodoFooter.vue';
// import LastTodo from '../components/LastTodo.vue';
import dayjs from 'dayjs';

export default {
    props: ['daydata', 'newItem'],

    components: {
        TodoInput,
        TodoList,
        TodoFooter,
        // LastTodo,
    },
    data(){
        return{
            today : dayjs().format("YYYY-MM-DD"),
            ListAll : [],
            bindprops : this.daydata,
        }
    },
    methods: {
        
    },
    created(){
        console.log('daydata:', this.bindprops);
    },
}
</script>

<style>

</style>