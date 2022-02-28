<template>
  <div>
      <ul>
        <li v-for="(todoList,index) in todoItems" v-bind:key="todoList.todoText" class="shadow">
          <!-- <i class="fa-solid fa-check checkBtn" v-on:click="toggleComplete(todoList)"></i>
          <i class="fa-solid fa-check checkBtn" v-on:click="toggleCLick(todoList)"></i> -->
          <i class="fa-solid fa-check checkBtn"  v-bind:class="{checkBtnCompleted: todoList.completed}" v-on:click="toggleComplete(todoList,index)"></i>
          <span v-bind:class="{textCompleted: todoList.completed}">{{todoList.todoText}}</span>
          <span class="removeBtn" v-on:click="removeTodo(todoList)">
            <i class="fa-solid fa-trash-can"></i>
          </span>
        </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: function(){
    return{
      todoItems: [],
      // completed : false
      
    }
  },
  
  methods : {
    getList() {
      axios
        .get('http://localhost:8080/api/todo/list')
        .then((res) => {
          // console.log(res.data);
          this.todoItems = res.data;
          // console.log('todo :',this.todoItems);
          // console.log('id',this.todoItems.todoText);
        })
        .catch((error) => {
          console.log(error);
        })
        // console.log('todoitems:',this.todoItems);
        
    },
    
    removeTodo: function(todoList) {
      // console.log('id',todoList.id);
      alert(`선택한 글번호가 ${todoList.id} 맞습니까?`);
      axios.post(`http://localhost:8080/api/todo/delete/${todoList.id}`)
      .then(() => {
        alert('삭제되었습니다.');
        return window.location.replace('/');
      })
      .catch((error) => {
          console.log(error);
        })
    },
    //클릭시 true
    toggleComplete: function(todoList,i) {
      // console.log('completed',todoList.completed);
      // console.log('!completed',!todoList.completed);
      axios.post(`http://localhost:8080/api/todo/checkbox/ckeck/${todoList.id}`,{
        completed : !todoList.completed,
        id : todoList.id
      })
      .then(() => {
        // todoList.completed = true;
        this.todoItems[i].completed = !todoList.completed;
        // console.log(todoList.completed);
      })
      .catch((error) => {
          console.log(error);
        })
    },
  },
  
  mounted(){
    this.getList();
  }
}
</script>

<style>
  .removeBtn{
margin-left: auto;
    color: #de4343;
  }
  .checkBtn{
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }
  .checkBtnCompleted{
    color: #b3adad;
  }
  .textCompleted{
    text-decoration: line-through;
    color: #b3adad;
  }
</style>