<template>
<div class="container">
  <div class="row">
    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-5 pt-3 pb-3 bg-white from-wrapper">
      <div class="container">
        <h3>Register</h3>
        <hr>
        <form  @submit.prevent="register()">
          <div class="row">
            <div class="col-12 col-sm-6">
              <div class="form-group">
               <label for="firstname">First Name</label>
               <input type="text" class="form-control" name="firstname" id="firstname" v-model="firstname" value="">
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group">
               <label for="lastname">Last Name</label>
               <input type="text" class="form-control" name="lastname" id="lastname" value="" v-model="lastname">
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
               <label for="email">Email address</label>
               <input type="text" class="form-control" name="email" id="email" value="" v-model="email">
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group">
               <label for="password">Password</label>
               <input type="password" class="form-control" name="password" id="password" value="" v-model="password">
             </div>
           </div>
           <div class="col-12 col-sm-6">
             <div class="form-group">
              <label for="password_confirm">Confirm Password</label>
              <input type="password" class="form-control" name="password_confirm" id="password_confirm" value="" v-model="password_confirm">
            </div>
          </div>
          <Alert v-if="msg"  :msg="msg" :classAlert="classAlert"></Alert>
           
         
          </div>

          <div class="row">
            <div class="col-12 col-sm-4">
              <button type="submit" class="btn btn-primary">Register</button>
            </div>
            <div class="col-12 col-sm-8 text-right">
              <router-link to="/signin">Already have an account</router-link>
             
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  

</template>

<script>
import Alert from './cmps/Alert'
//import axios from "axios";
export default {
  data(){
    return{
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      password_confirm:'',
      msg:null,
      classAlert:null

    }
  },
  components:{
    Alert
    
  },
  methods:{
    register(){
      const form=new FormData();
      form.append("firstname",this.firstname);
      form.append("lastname",this.lastname);
      form.append("email",this.email);
      form.append("password",this.password);
      form.append("password_confirm",this.password_confirm);
     this.$guest.post('/register',form)
    // axios.post("http://localhost/user/register",form)
      .then(()=>{
      this.msg="You have been Successfully Registered";
      this.classAlert="success";
      this.firstname='';
      this.lastname='';
      this.email='';
      this.password='';
      this.password_confirm='';
      }).catch(err=>{
        this.msg=err.response.data.messages.error;
        //console.log(err);
       // this.msg="Some Errors";
      
        this.classAlert="danger";
        
      })
    }
  }

}
</script>

<style>

</style>