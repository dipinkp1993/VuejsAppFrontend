<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
  <router-link class="navbar-brand" :to="(loggedIn?'/':'/signin')">{{brand}}</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto" v-if="!loggedIn">
        <MenuLink path="/signin" text="Sign In"></MenuLink>
         <MenuLink path="/signup" text="Sign Up"></MenuLink>
    </ul>
    <ul class="navbar-nav mr-auto" v-else>
        <MenuLink path="/" text="Home"></MenuLink>
        <li class="nav-item ">
        <a class="nav-link" @click.prevent="logout()">Logout</a>
      </li>
        
    </ul>
  </div>
 </div>
</nav>
</template>

<script>
 import MenuLink from "./MenuLink"
export default {
   
    props:['loggedIn'],
    components:{
        MenuLink
    },
    data(){
        return{
            brand:process.env.VUE_APP_APPNAME
        }
    },
    methods:{
        logout(){
            console.log("Logged Out")
        }

    }

}
</script>

<style>

</style>