import Vue from "vue"
import Router from "vue-router"
import Signin from "./Signin"
import Signup from "./Signup"
import Admin from "./Admin"
Vue.use(Router)
const router=new Router({
    routes:[
        {
            path:"/",
            component:Admin,
            name:"Home"
        },
        {
            path:"/signin",
            component:Signin,
            name:"Signin"
        },
        {
            path:"/signup",
            component:Signup,
            name:"Signup"
        }
    ],
    mode:"history"
})
export default router;