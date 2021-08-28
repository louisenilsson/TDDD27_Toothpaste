<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Toothpaste</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button> 
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item" >
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item" >
                    <router-link to="/about" class="nav-link">About</router-link>
                </li>
                <li class="nav-item" >
                    <router-link :to="{ name: 'appointments' }" class="nav-link" v-if="$auth.isAuthenticated">Booked Appointments</router-link>
                </li>
                </ul>
                <div id="navbar-collapse-02">
                <ul class="navbar-nav">
                    <li>
                        <button type="button" class="btn btn-primary" v-if="!$auth.isAuthenticated" @click="login">Log In</button>
                    </li>
                    <li class="nav-item" v-if="$auth.isAuthenticated">
                        <router-link class="nav-link" to="/profile" >
                        {{$auth.user.name}}      
                    </router-link>
                    </li>
                    <li>
                        <button type="button" class="btn btn-primary" v-if="$auth.isAuthenticated" @click="logout">Log Out</button>
                    </li>
                </ul>
                </div>
        </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
  // Handle login and logout with auth0
    methods:{
        login() {
            this.$auth.loginWithRedirect();
        },
        logout(){
            this.$auth.logout({
            returnTo: window.location.origin
            })
        }
    }

}
</script>

<style>
.fade-enter-active, .fade-leave-active {
      transition: opacity .5s
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
#navbar-collapse-02 {
    position: absolute;
    right: 10px;
}


</style>