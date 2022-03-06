<template>

  <div class="inputBox shadow">
      
      <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
      <span class="addContainer" v-on:click="addTodo">
          <i class="fa-solid fa-plus addBtn" addBtn></i>
      </span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => {
        return{
            newTodoItem :"",
        }
    },
    methods:{
        addTodo: function(){
            
            if(this.newTodoItem !== "") {
                const item = {todoText : this.newTodoItem}
                axios.post('http://localhost:8080/api/todo/insert',item)
                .then(() => {
                    console.log('todo: ', this.newTodoItem)
                    return window.location.replace('/');
                })
                .catch((error) => {
                    console.log(error);
                })
                
                this.clearInput();
            }else{
                alert('할 일을 입력하세요.');
                this.newTodoItem.focus();

            }
        },
        clearInput : function(){
            this.newTodoItem='';
        }
    }
}
</script>

<style>
    input:focus{
        outline: none;
    }
    .inputBox{
        background: white;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
        width: 52%;
        margin: 0 auto;
    }
    .inputBox input{
        width: 80%;
        border-style: none;
        font-size: 0.9rem;
    }
    .addContainer {
        float: right;
        background: linear-gradient(to right, #6478FB, #8763FB);
        display: block;
        width: 3rem;
        border-radius: 0 5px 5px 0;
    }
    .addBtn {
         color: white;
         vertical-align: middle;
    }
    /* @media (min-width : 300px) {
        .inputBox {
            width: 270px;
        }
    }  */
    @media (max-width: 300px){
        .inputBox {
            width: 270px;
        }
        input {
            width: 170px;
        }
    }
    @media (max-width : 520px){
        .inputBox {
            width: 97%;
        }
    }
</style>