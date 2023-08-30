<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      colores: "",
    };
  },

  async created() {
    await this.getAllInfoClr("profile");

    this.colores = this.profiles;
    this.actualizarColores();
    
    let _ctk = localStorage.getItem('_ctk')
   
    if(!_ctk){
      let payload={
        option:'set_cart',
        item:{id_cliente:null}
      }
      this.setCart(payload)
    }

  },
  watch: {
    profiles() {
      this.actualizarColores();
    },
  },
  computed: {
    profiles() {
      return this.$store.getters["profile/data"];
    },
  },
  methods: {
    ...mapActions("colors", ["getAllInfoClr"]),
    ...mapActions("profile", ["getAllInfoPrf"]),
       ...mapActions("carrito", ["setCart"]),
    actualizarColores() {
      const arr = this.$store.getters["colors/data"];

      if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
          if (i == 0) {
            document.documentElement.style.setProperty(
              "--color-1",
              arr[i].code
            );
          } else if (i == 1) {
            document.documentElement.style.setProperty(
              "--color-2",
              arr[i].code
            );
          } else if (i == 2) {
            document.documentElement.style.setProperty(
              "--color-3",
              arr[i].code
            );
          } else if (i == 3) {
            document.documentElement.style.setProperty(
              "--color-4",
              arr[i].code
            );
          } else if (i == 4) {
            document.documentElement.style.setProperty(
              "--color-5",
              arr[i].code
            );
          } else if (i == 5) {
            document.documentElement.style.setProperty(
              "--color-6",
              arr[i].code
            );
          } else if (i == 6) {
            document.documentElement.style.setProperty(
              "--color-7",
              arr[i].code
            );
          }
        }
      }
    },
  },
};
</script>



<style>
@import "./css/default.css";

@import url("https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Sora:wght@100;200;300;400;500;600;700;800&family=Source+Sans+Pro:wght@300;400;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Glory:wght@100;200;300;400;500;600;700;800&display=swap");

@font-face {
  font-family: "PeaceSans";
  src: url("./assets/fonts/PeaceSans.otf");
  font-display: swap;
}

html {
  scroll-behavior: smooth;
}

:root {
  /** No eliminar los 7 colores */
  --color-1: #e21f1d;
  --color-2: #242424;
  --color-3: #a7a7a7;
  --color-4: #f5f5f5;
  --color-5: #ffffff;
  --color-6: #d9d9d9;
  --color-7: #ffffff;
  --color-8: #000000;
  --color-9: #F70017;
  --color-10: #E7E7E7;
  --color-11: #F2F2F2;

  --Sans: "Source Sans Pro", sans-serif;
  --Open_Sans: "Open Sans", sans-serif;
  --Sora: "Sora", sans-serif;
  --Mukta: "Mukta", sans-serif;
  --Glory: "Glory", sans-serif;
  

/**FINISHED  */
--co-btnMyCar: #005CB9;
  --co-fintlMyCar: #FF4713; 
  --tlFont:'PeaceSans';
  --pFont: 'Glory';
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0vw;
}

body {
  margin: 0vw;
}

html {
  scroll-behavior: smooth;
}

input:focus-visible {
  outline: none !important;
}

input,
textarea,
select {
  padding-left: 0.5vw;
  outline: none;
}

.dflx {
  display: flex;
}

.pointer {
  cursor: pointer;
}

.jcsb {
  justify-content: space-between;
}

.porel{
  position: relative;
}

.cliquo .VueCarousel-dot {
  width: 8.213vw!important;
  height: 8.213vw!important;
  padding: 2.5vw!important;
}
.VueCarousel-dot--active{
 background-color: #F70017!important; 
}

/** bloques admin */
#bloques_sec {
  margin-bottom: 2.5520833333333335VW;
}
#bloques_sec a{
  margin: 0vw;
width: 10.11VW;
  text-align: center;
  background:#4d4c4c;
  padding: 0.20833333333333334VW 0vw ; 
  color: white;
  font-family: 'Glory';
  font-style: normal;
  font-weight: 500;
  font-size: 0.7291666666666666VW;
  line-height:1.09375VW;
  text-align: center;
  text-transform: uppercase;
  transition: all 300ms;
  cursor: pointer;
  text-decoration: none;
}
#bloques_sec a.act-bloq{
  background:#E21F1D;
}
#bloques_sec a:hover{
  background:#E21F1D;
}
.rows_tbl > .tblitems > .bodytbl-items{
  height: 12vw;
}
.bodytbl-items {
     border: 0.052083vw solid var(--color-2);
    padding: 0.5vw;
    height: 5vw;
    font-size: .8vw;
    overflow: auto;
    background: var(--color-2);
    color: var(--color-5);
}
p.hrd_tbli{
  background: var(--color-1);
  color: var(--color-5);
  text-align: center;
  padding: .5vw 0vw ;
  margin: 0vw;
    font-size: .8vw;

}
textarea#name {
  width: 57.6vw;
  height: 6vw;
  border: 0.052083vw solid var(--color-2);
  border-radius: 0vw 1.5vw 1.5vw 0vw;
  color: var(--color-4);
  font-size: 0.7291666666666666vw;
  font-weight: 500;
  padding-left: 1.09375vw;
}
p.msg_skydropx{
  color: var(--color-1);
  font-size: 1vw;
  margin: 0vw;
  margin-top: 1vw;
  font-weight: 600;
}
p.msg_skydropx2{
  color: var(--color-4);
  font-size: .7vw;
   margin: 0vw;
   margin-bottom: 1vw;
}

p.msg_err{
  color:white;
  font-size: .7vw;
  margin: 0vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E21F1D;
  margin:  2vw 0vw;
  padding: .5vw;
  font-weight: 400;
  font-family: var(--Glory);
}
p.msg_suc{
  color:white;
  font-size: .7vw;
  margin: 0vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16c03b;
  margin:  2vw 0vw;
  padding: .5vw;
  font-weight: 400;
  font-family: var(--Glory);
}

@media (min-width: 768px) {
  .cliquo .VueCarousel-dot {
    width: 0.833vw!important;
    height: 0.833vw!important;
    padding: 0.5vw!important;
}
}
</style>
