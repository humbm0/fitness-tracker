<template>

<div></div>
    
</template>
<script>
// import axios from 'axios'

export default {
  name: 'Strava',
  data () {
    return {
        user: null,
        activities: null
    }
  },
  mounted: function(){

    // let URL = "https://www.strava.com/api/v3/athlete"

    // let config = {
    //   headers: {
    //     Authorization: "Bearer bd14a3a4eeced738ff186b0a6a7a03fe4f28eb0e"
    //   }
    // }

    // axios.get(URL, config)
    //     .then((response) => {
    //         this.user = response.data;
    //         console.log(this.user);
    //         axios.get("https://www.strava.com/api/v3/athletes/"+this.user.id+"/stats", config)
    //           .then((response) => {
    //               this.activities = response.data;
    //               console.log(this.activities);
    //           })
    //           .catch(function (error) {
    //               console.log(error);
    //           });
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
  }
}
</script>
