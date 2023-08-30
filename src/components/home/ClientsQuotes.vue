<template>
  <div class="cliquo">
    <div class="pd" v-if="data !== 'No se encontraron coincidencias.'">
      <p class="tl">LO QUE PIENSAN NUESTROS CLIENTES</p>
      <p class="dscr">
        Tenemos un sabor distinto para cada personalidad, enseguida te
        compartimos las experiencias de algunos de nuestros clientes.
      </p>
      <div class="qo_slides">
        <section v-if="data.length == 1">
          <div class="cq-cont">
            <img :src="srcImg(data[0].image)" alt="cliente" class="ic" />
            <p class="quote">"{{ data[0].quote }}"</p>
            <p class="author">{{ data[0].fullname }}</p>
          </div>
        </section>
        <section v-else-if="data.length > 1">
          <carousel :perPage="1" navigationEnabled class="slmo">
            <slide v-for="(q, i) in data" :key="i">
              <div class="cq-cont">
                <img :src="srcImg(q.image)" alt="cliente" class="ic" />
                <p class="quote">"{{ q.quote }}"</p>
                <p class="author">{{ q.fullname }}</p>
              </div>
            </slide>
          </carousel>
          <carousel :perPage="3" navigationEnabled class="slpc">
            <slide v-for="(q, i) in data" :key="i">
              <div class="cq-cont">
                <img :src="srcImg(q.image)" alt="cliente" class="ic" />
                <p class="quote">"{{ q.quote }}"</p>
                <p class="author">{{ q.fullname }}</p>
              </div></slide
            >
          </carousel>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
let urlpath = require("../../global/index");
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      urlpath: urlpath,
    };
  },
  created() {
    this.getAllInfoCQ("clients_quotes");
  },
  computed: {
    data() {
      return this.$store.getters["clients_quotes/data"];
    },
  },
  methods: {
    ...mapActions("clients_quotes", ["getAllInfoCQ"]),
    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/clients_quotes-img/${img}`;

      //this.status_img(img)

      return src;
    },
  },
};
</script>
<style>
.cliquo {
  width: 100%;
  background-color: #000000;
}
.cliquo .pd {
  padding: 19.565vw 9.111vw 11.836vw;
}
.cliquo .tl {
  font-family: "PeaceSans";
  font-weight: 400;
  font-size: 7.246vw;
  line-height: 10.145vw;
  text-align: center;
  color: #ffffff;
  margin: 0 0 4.106vw;
}
.cliquo .dscr {
  width: 90%;
  margin: 0 auto 0;
  padding-bottom:  17.633vw;;
  font-weight: 500;
  font-size: 4.831vw;
  line-height: 5.314vw;
  text-align: center;
  font-family: "Glory";
  color: white;
}
.cliquo .ic {
  width: 30.918vw;
  height: 30.918vw;
  margin: 0 auto 5.072vw;
  display: flex;
}
.cliquo .quote {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 4.831vw;
  line-height: 127%;
  margin: 0 auto;
  color: white;
  text-align: center;
  width: 95%;
}
.cliquo .author {
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 4.831vw;
  line-height: 127%;
  text-align: center;
  color: #ffffff;
}
.cliquo .slmo {
  display: block;
}
.cliquo .slpc {
  display: none;
}
@media (min-width: 768px) {
  .cliquo .pd {
    padding: 12.292vw 8.958vw 0;
  }
  .cliquo .tl { 
    font-size: 2.778vw;
    line-height: 3.889vw;
    margin: 0 0 1.458vw;
  }
  .cliquo .dscr {
    font-size: 1.389vw;
    line-height: 119%;
    margin: 0 auto ;
    padding-bottom: 8.889vw;
    width: 43.056vw;
  }
  .cliquo .slpc {
    display: block;
  }
  .cliquo .slmo {
    display: none;
  }
  .cliquo .cq-cont {
    display: flex;
    width: 25.5vw;
    height: 10.736vw;
    flex-wrap: wrap;
    padding-bottom: 7.014vw;
  }
  .cliquo .ic {
    width: 8.889vw;
    height: 8.889vw;
    margin: 0 2.361vw 0 0;
  }
  .cliquo .quote {
    font-size: 1.25vw;
    line-height: 127%;
    width: 14.167vw;
    text-align: left;
    margin: 0;
    height: fit-content;
  }
  .cliquo .author {
    font-size: 1.25vw;
    line-height: 127%;
    margin: 0 0 0 11.25vw;
    height: fit-content;
  }
}
</style>
