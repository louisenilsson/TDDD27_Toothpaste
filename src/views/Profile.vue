<template>
  <div>
    <div class="row">
        <div class="container">
            <div class="jumbotron" id="profile-jumbo">
                <div class="row justify-content-left">
                    <div class="col-2">
                        <img :src="$auth.user.picture" class="rounded-circle">
                    </div>
                    <div class="col-10" style="padding-top: 18px">
                        <h1 class="display-4">{{$auth.user.name}}</h1>
                    </div>
                </div>
                <hr class="my-4">
                <div class="row">
                    <div class="container" >
                        <p style="font-size: 20px"> <strong>Email:</strong>  {{$auth.user.email}}</p> 
                        <p style="font-size: 20px"> <strong>Username:</strong>  {{$auth.user.nickname}}</p> 
                        <p style="font-size: 20px" class="user-list"> <strong>Verified Email:</strong> 
                         <b-icon v-if="!$auth.user.email_verified" icon="x" scale="4" variant="danger" style="padding-left: 10px;"></b-icon> 
                         <b-icon v-if="$auth.user.email_verified" icon="check" scale="4" variant="success"  style="padding-left: 10px;"></b-icon>
                        
                        </p> 
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div id="profile-footer">
      <footer>
         
      </footer>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

#profile-jumbo{
    background-color: #ffffff;
  }
  #profile-footer{
  padding-bottom: 50vh
}

</style>