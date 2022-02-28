<template>
  <div class="clearAllContainer">
      <span v-on:click="clearTodo()" class="clearAllBtn">Clear All</span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        clearTodo : function(){
           axios.get('http://localhost:8080/api/todo/delete/today')
           .then(() => {
                alert('전체 삭제되었습니다.');
                return window.location.replace('/');
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
    .clearAllContainer{
        width: 8.5rem;
        height: 50px;
        line-height: 50px;
        background-color: white;
        border-radius: 5px;
        margin: 0 auto;
    }
    .clearAllBtn{
        color: #e20303;
        display: block;
    }
</style>