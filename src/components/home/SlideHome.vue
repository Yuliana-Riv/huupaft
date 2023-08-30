<template>
  <div class="slide-c">
    <div class="slide-b" v-if="slide.length == 1">
      <div class="pd">
        <img :src="slide[0].coffeeimg" alt="coffee" class="coffee-i" />
        <section class="gridc">
          <p class="tl" v-html="slide[0].title"> </p>
          <p class="dscr">
            {{ slide[0].desc }}
          </p>

          <p class="btn" v-on:click="sendURL">VER CATÁLOGO</p>
        </section>
      </div>
      <div class="bk">
        <img :src="slide[0].imgmo" alt="mo" class="mo" />
        <img :src="slide[0].imgpc" alt="pc" class="pc" />
      </div>
    </div>
    <div v-else-if="slide.length > 1">
      <carousel :perPage="1" navigationEnabled>
        <slide v-for="(s, i) in slide" :key="i">
          <div class="slide-b">
            <div class="pd">
              <img :src="slide[0].coffeeimg" alt="coffee" class="coffee-i" />
              <section class="gridc">
                <p class="tl" v-html="s.title"> </p>
                <p class="dscr">
                  {{ s.desc }}
                </p>
                <p class="btn">VER CATÁLOGO</p>
              </section>
            </div>
            <div class="bk">
              <img :src="s.imgmo" alt="mo" class="mo" />
              <img :src="s.imgpc" alt="pc" class="pc" />
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      slide: [
        {
          title: "EL <span class='mx'>MEZQUITE</span> DE SONORA",
          desc: "Comprueba por qué su sabor es el más fregón de todo el mundo",
          coffeeimg: require("../../assets/coffee1.png"),
          imgmo: require("../../assets/bks1.png"),
          imgpc: require("../../assets/bks1pc.png"),
          link: "",
        },
      ],
    };
  },
  methods: {

    sendURL: function(){
      window.location.href='catalogo'
    }

  }
};
</script>
<style scoped>
.slide-c {
  padding-top: 13vw;
  height: 159vw;
  overflow: hidden;
}
.slide-c .bk {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
}
.slide-c .slide-b {
  position: relative;
}
.slide-c .bk img {
  width: 100%;
}
.slide-c .bk .mo {
  display: block;
}
.slide-c .bk .pc {
  display: none;
}
.slide-c .slide-b .pd {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 5;
  top: 0;
  left: 0;
  color: white;
  padding: 57.246vw 7.971vw 44.444vw 19.324vw;
}
.slide-c .slide-b .tl {
  font-family: "PeaceSans";
  font-weight: 400;
font-size: 9.662vw;
line-height: 13.527vw;
  text-align: right;
  color: #ffffff;
  margin: 0 0 4.106vw;
  width: 100%;
}
 .slide-c .slide-b ::v-deep(.tl > span.mx){
  color: #f70017!important;
}
.slide-c .slide-b .dscr {
  margin: 0;
  font-weight: 500;
  font-size: 4.831vw;
  line-height: 5.314vw;
  text-align: right;
  font-family: "Glory";
}
.slide-c .slide-b .btn {
  width: 58.696vw;
  height: 16.425vw;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "PeaceSans";
  color: #000000;
  background-color: white;
  margin-top: 6.763vw;
  font-weight: 500;
  font-size: 3.865vw;
  line-height: 5.314vw;
  letter-spacing: 0.125em;
  transition: .5s;
  cursor: pointer;
}
.slide-c .slide-b .btn:hover{
  color: #000000;
  background-color: white; 
}
.slide-c .coffee-i {
  display: none;
}
@media (min-width: 768px) {
  .slide-c .bk .mo {
    display: none;
  }
  .slide-c .bk .pc {
    display: block;
  }
  .slide-c {
    padding-top: 2.8vw;
    height: 49.861vw;
    overflow: hidden;
  }
  .slide-c .slide-b .pd {
    padding: 14.722vw 0 13.194vw 3.125vw;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .slide-c .slide-b .tl {
    font-size: 4.167vw;
    line-height: 5.139vw;
    margin-bottom: 0.903vw;
    text-align: left;
    width: 39.931vw;
  } 
  .slide-c .slide-b .dscr {
    font-size: 1.389vw;
    line-height: 1.528vw;
    text-align: left;
  }
  .slide-c .slide-b .btn {
    width: 13.889vw;
    height: 3.889vw;
    font-size: 0.972vw;
    line-height: 1.111vw;
    color: white;
    background: transparent;
    border: 0.1vw solid white;
    margin-top: 1.319vw;
  }
  .slide-c .coffee-i {
    display: block;
    width: 34.236vw;
  }
  .slide-c .gridc {
    margin-top: 3.75vw;
  }
}
</style>