<template>
  <div>  
    <div class="jumbotron" id="booking-jumbo">
      <h2 class="display-4">Appointments</h2>
      <p class="lead">Here you can see your booked appointments and book a new appointment.</p>
      <hr class="my-4">
      <div>
        <h3>My appointments</h3>
        <div class="row">
        <div v-for="appointment in appointments" :key="appointment._id"  id="card-padding">
        <div class="col-4">
          <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                 
                    <p class="card-text"> <strong> Date:</strong> <br> {{appointment.date}}</p>                   
                    <p class="card-text"> <strong>Time:</strong> <br> {{appointment.time}}</p>
                    <button class="btn btn-outline-danger" @click.prevent="deleteAppointment(appointment._id)">Cancel Appointment</button>
                   
                </div>
          </div>
            </div>
        </div>
        </div>
        <NewAppointment/>
      </div>

    </div>
     <div id="happy-space">
      <footer>
         
      </footer>
  </div>
  </div>
</template>

<script>
import NewAppointment from "../components/NewAppointment";

export default {
  name: "appointments",
  components: {
    NewAppointment
  },
  data() {
    return {
      interval: null,
      appointments: []
    }
  },
  // Update data
  async created() {
    this.interval = setInterval(this.refreshData, 20)
  },
  methods: {
    // get appointment data for the inlogged user
    async refreshData(){
      let uri = 'http://localhost:4000/appointments'; 
      const token = await this.$auth.getTokenSilently();
      await this.axios.get(uri, {
        params:{
          email: this.$auth.user.email,
        },
        headers:{
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json'
        }
      }).then(response => {
          this.appointments = response.data;   
      });
    },
    // Cancel an appointment
    async deleteAppointment(id){
      let uri = `http://localhost:4000/appointments/delete/${id}`;
      const token = await this.$auth.getTokenSilently();

      this.axios.delete(uri, {
        params:{
          email: this.$auth.user.email,
        },
        headers:{
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json'
        }
      }).then(response => {
          this.appointments.splice(this.appointments.indexOf(response.id), 1);
      });
    }
  }
}
</script>

<style>
#card-padding{
  margin-top: 15px;
}
#booking-jumbo{
  background-color: #fff;
  
}
#happy-space{
  padding-bottom: 50vh
}
</style>