<template>
  <!-- Button to open the modal -->
  <div>
    <b-container fluid>
      <b-row id="new-appointment">
        <b-col col sm="12" md="12" lg="9" xl="9" class="p-2">
            <b-button variant="primary" v-b-modal.modal-prevent-closing>New Appointment</b-button>
        </b-col>
      </b-row>
    </b-container>

    <!-- The modal with the form -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Book An Appointment"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      >
      <form ref="form" @submit.prevent="addAppointment">
        <b-form-group
          label="Select a date"
          label-for="date-input"
          invalid-feedback="Date is required"
          :state="dateState">
          <b-form-datepicker id="datepicker-dateformat" 
            :date-disabled-fn="dateDisabled"
            :min="min"
            :max="max"
            :date-format-options="{ weekday: 'long', day: 'numeric',month: 'long', year: 'numeric'}"
            v-model="appointment.date"
            required>
          </b-form-datepicker>
        </b-form-group>
        <b-form-group 
          v-if="this.appointment.date != ''"
          label="Select a time"
          label-for="time-input"
          invalid-feedback="Time is required"
          :state="timeState">
          <b-form-radio-group class="pt-2" 
            :options="printTimes(tempArray)"  
            v-model="appointment.time"
            required>
          </b-form-radio-group>
        </b-form-group>
      </form>
      <template #modal-footer="{ok}">
      <!-- Emulate built in modal footer ok and cancel button actions -->
     
      <b-button variant="success" @click="ok()">
        Book Appointment
      </b-button>
    </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "newAppointment",
  data(){
    // Start from todays date
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 6)

    return {
      afterSubmit: false,
      min: minDate,
      max: maxDate,
      interval: null,
      tempArray: [],
      dateState:null,
      timeState:null,
      appointment:{
        date: '',
        email: this.$auth.user.email,
      }
    }
  },
  // makes the data updated without refreshing page
  async mounted(){
    this.interval = setInterval(this.refreshTimes, 50)
  },
  methods: {
    // Get every booked appointment from database
    async refreshTimes(){
      let uri = 'http://localhost:4000/appointments/all'
      const token = await this.$auth.getTokenSilently();
        
      await this.axios.get(uri, {
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
      }).then(response => {
          this.tempArray = response.data
      })
    },
    // Checks if date and time is entered
    checkFormValidity() {
      if(this.appointment.date === ''){
        this.dateState = false
        return false
      } else {
        this.dateState = true
      }
      if(this.appointment.time === ''){
        this.timeState = false
        return false
      } else {
        this.timeState = true
      }
        
      return true
    },
    // Reset the entered values when closing the modal
    resetModal() {
      this.appointment.date = ''
      this.appointment.time = ''
      this.dateState = null
      this.timeState = null
    },
    // Prevent from closing if the values are not valid
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.addAppointment()
    },
    // Submit the form and add the new appointment to the database
    async addAppointment(){
      if(!this.checkFormValidity()){
        return
      } 

      let uri = 'http://localhost:4000/appointments/add';
      const token = await this.$auth.getTokenSilently();

      this.axios.post(uri, JSON.stringify(this.appointment), {
        headers:{
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json'
        }
      })

      // "close" the modal
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })

      // reset values after submit
      this.appointment.date = ''
      this.appointment.time = ''
    },
    // Disable weekends
    dateDisabled(ymd, date) {
      const weekday = date.getDay()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6
    },
    // Find available times and print them out
    printTimes(tempArray){
      var times = ['8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'] 
      
      for(var i = 0; i < tempArray.length; i++){
        if(this.appointment.date == tempArray[i].date){
          for(var j = 0; j < times.length; j++){
            if(times[j] == tempArray[i].time){
              delete times[j]
            }
          }   
        }
      } 
      return times
    }
  }
}
</script>

<style>
#new-appointment{
  padding-top: 20px
}

</style>
