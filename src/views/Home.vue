<template>
<div>
  <div class="row">
      <div class="container">
        <div class="jumbotron">
            <h1 class="display-3">Toothpaste</h1>
            <p class="lead">Dental care with quality for the whole family!</p>
            <hr class="my-4">
            <p>
                We offer dental care with quality in a quiet environment where you can feel safe. We perform all kinds of dental care and hygienist treatments. Also aesthetic dentistry and teeth whitening. We work preventively to avoid future problems with dental health.
                We accept new patients.
                Welcome!
            </p>
        </div>
        </div>
              
      </div>
            <br>
            <div class="row justify-content-between">
            <div class="col-4">

            <div class="card text-center" style="width: 22rem; height: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Contact Info:</h5>
                    <p class="card-text"> <strong> Phone:</strong> <br> 012-345678</p>                   
                    <p class="card-text"> <strong>Email:</strong> <br> Toothpaste@email.com</p>
                    <p class="card-text"> <strong>Location:</strong>  <br> Toothpaste Street 27 <br> 272 27 TOOTHPASTE VILLAGE </p>
                </div>
            </div>
            </div>
            <div class="col-4">
            <div class="card text-center" style="width: 22rem; height: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Opening Hours:</h5>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                    <p class="card-text"> <strong> Monday - Friday: </strong> <br> 8:00-17:00</p>
                    <p class="card-text"> <strong>Saturday:</strong> <br> Closed</p>
                    <p class="card-text"> <strong>Sunday:</strong> <br> Closed</p>
                    </li>
                    </ul>
                </div>
            </div>
            </div>
          
            <div class="col-4">
                <div class="card text-center" style="width: 22rem; height: 18rem;">
 
                <div class="card-body">
                    <h5 class="card-title">Want to book an appointment?</h5>
                    <br>
                    <p class="card-text"> Now you can book your appointments online. </p>
                    <p class="card-text" v-if="!$auth.isAuthenticated">If you want to book an appointment you need to be logged in or create an account.</p>
                    <button type="button" class="btn btn-primary" v-if="!$auth.isAuthenticated" @click="login">Log In | Sign up</button>
                    <div v-if="$auth.isAuthenticated" id="card-foot">
                         <div class="btn btn-primary">
                            <router-link class="routerLink" to="/appointments">Go to my appointments</router-link>
                        </div>
                    </div>
                   
                </div>
            </div>
            </div>
            
            </div>
            <div class="happy-space">
                <footer></footer>
            </div>
            
  </div>
      
  
</template>
<script>
export default {
    methods:{
        login() {
            this.$auth.loginWithRedirect();
        }
    }
}
</script>

<style scoped>
ul{
    list-style-type:none;
}
.welcome-body{
    display: inline-block
    
}
.container{
    display: flex
}
.routerLink{
    color: white;
}
.routerLink:hover{
    text-decoration: none;
}
#card-foot{
    padding-top: 50px
}
template{
    background-color: #e0ecff;
  }
  .jumbotron{
    background-color: #ffffff;
  }
</style>