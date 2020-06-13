<template>
  <div class="row">
    <div class="col-12 mt-5 pt-3 pb-3 bg-white from-wrapper">
      <h3>Post</h3>
      <hr />
      <form @submit.prevent="save()">
        <div class="row">
          <div class="col-12 col-sm-8">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="firstname">Title</label>
                  <input type="text" class="form-control" name="title" id="title" v-model="title" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="content">Content</label>
                  <textarea
                    type="text"
                    class="form-control"
                    name="content"
                    rows="7"
                    id="content"
                    v-model="content"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <img class="img-fluid" :src="imgPreview" alt />
            <div class="form-group mt-3">
              <input
                type="file"
                @change="updatePreview($event)"
                ref="featured_image"
                class="form-control-file" id="avatar"
              />
            </div>
          </div>
          <alert v-if="msg" :msg="msg" :classAlert="classAlert"></alert>
        </div>

        <div class="row">
          <div class="col-12">
            <hr />
            <button type="submit" class="btn btn-primary">{{(post_id ? 'Update' : 'Create')}}</button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <button @click.prevent="cancel()" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="posts.length > 0" class="col-12 mt-5 pt-3 pb-3 bg-white from-wrapper">
      <h3>Posts</h3>
      <hr />
      <PostItem
        @delete="deletePost"
        @edit="getPost"
        v-for="(post, index) in posts"
        :key="post.post_id"
        :index="index"
        :post="post"
        :imgPlaceholder="imgPlaceholder"
      ></PostItem>
    </div>
  </div>
</template>

<script>
import Alert from "./cmps/Alert"
import PostItem from "./cmps/PostItem";
export default {
  data(){
    return{
    msg:null,
    classAlert:null,
    post_id:null,
    post_index: null,
    posts: [],
    title: "",
    content: "",
    image: "",
    imgPlaceholder: "https://via.placeholder.com/300"
    }

  },
   computed: {
    imgPreview() {
      return this.image == "" ? this.imgPlaceholder : this.image;
    }
  },
  components:{
    Alert,PostItem
  },
  methods:{
    save(){
       if (this.post_id) {
        this.update();
      } else {
        this.create();
      }

    },
    create(){
      const form = new FormData();
      form.append("title", this.title);
      form.append("description", this.content);
      form.append("featured_image", this.$refs.featured_image.files[0]);
      this.$api
        .post("/blog", form)
        .then(res => {
          this.msg = "Post has been created";
          this.classAlert = "success";
          this.posts.unshift(res.data);
          this.cancel(true);
        })
        .catch(err => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });

    },
    update(){

    },
    get(){
      this.$api
        .get("/blog")
        .then(res => {
          this.posts = res.data;
        })
        .catch(err => {
          console.log(err.response);
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });

    },
    getPost(){

    },
    delete(){

    },
    updatePreview(event){
     const file = event.target.files[0];
     this.image = URL.createObjectURL(file);

    },
     cancel(alertShow=false) {
      this.post_index = null;
      this.post_id = null;
      this.title = "";
      this.content = "";
      this.image = "";
      document.getElementById("avatar").value='';
    
     if (!alertShow) {
        this.msg = null;
        this.classAlert = null;
      }
     
    }
  },
  created(){
    this.get();
  }

}
</script>

<style>

</style>