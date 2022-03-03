<template>
  <div class="Todo-page">
        <!-- <router-view></router-view> -->
        <!-- <router-view></router-view> -->
        <!-- <router-view></router-view> -->
        <!-- <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFooter></TodoFooter> -->
        <div>{{today}}</div>
        <div>daydata:{{daydata}}</div>
        <TodoInput v-if="daydata"></TodoInput>
        <TodoList v-if="daydata"></TodoList>
        <LastTodo v-if="daydata" :dddd="daydata"></LastTodo>
        
        <TodoFooter v-if="daydata"></TodoFooter>
        <!-- <LastTodo></LastTodo> -->
  </div>
</template>

<script>
// import {router} from'../router/index';
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue';
import TodoFooter from '../components/TodoFooter.vue';
import LastTodo from '../components/LastTodo.vue';
import dayjs from 'dayjs';

export default {
    props: ['daydata'],

    components: {
        TodoInput,
        TodoList,
        TodoFooter,
        LastTodo,
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