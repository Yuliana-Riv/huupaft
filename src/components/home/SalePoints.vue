<template>
  <div class="SPoints">
    <div class="pd">
      <p class="tl">¿DÓNDE NOS ENCUENTRAS?</p>
      <div class="cities-c">
        <div
          class="sel"
          v-for="(c, i) in data"
          :key="i"
          @click="click(c.name)"
          :class="{ act: selcity == c.name }"
        >
          {{ c.name }}
        </div>
      </div>
      <section v-if="selcity !== ''">
        <div class="spoints-c" v-if="data2 !== 'No se encontraron coincidencias.'">
          <a v-for="(a, j) in data2" :key="j" :href="a.link" class="point" target="_blank" rel="noopener noreferrer">
            <img :src="srcImg(a.image)" :alt="a.name" />
          </a>
        </div>
        <div class="spoints-c" v-else>
          <p class="grtl">MUY PRONTO EN TU CIUDAD.</p>
        </div>
      </section>
      <section v-else>
        <div class="spoints-c">
          <p class="grtl">SELECCIONA LA CIUDAD</p>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
let urlpath = require("../../global/index");
export default {
  data() {
    return {
      urlpath: urlpath,
      cities: [
        {
          city: "Hermosillo",
        },
        {
          city: "San Carlos",
        },
        {
          city: "Puerto Peñasco",
        },
      ],
      points: [
        {
          city: "Hermosillo",
          points: [
            {
              name: "Santovalle",
              image: require("../../assets/pro1.png"),
            },
            {
              name: "Taste",
              image: require("../../assets/pro2.png"),
            },
            {
              name: "Mandadito",
              image: require("../../assets/pro3.png"),
            },
            {
              name: "Super del Norte",
              image: require("../../assets/pro4.png"),
            },
            {
              name: "Coyotas",
              image: require("../../assets/pro5.png"),
            },
          ],
        },
        {
          city: "San Carlos",
          points: [
            {
              name: "Santovalle",
              image: require("../../assets/pro1.png"),
            },
          ],
        },
        {
          city: "Puerto Peñasco",
          points: [
            {
              name: "Super del Norte",
              image: require("../../assets/pro4.png"),
            },
          ],
        },
      ],
      selcity: "",
      selarr: [],
    };
  },

  created() {
    this.getAllInfoCat("category");
    this.getAllInfoSP("sale_points");
  },
  computed: {
    data() {
      let data = this.$store.getters["category/data"];
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].parent_name == "CIUDAD") {
          arr.push(data[i]);
        }
      }
      return arr;
    },
    data2() {
      let array = this.$store.getters["sale_points/data"];
      let arr = []
      for (let i = 0; i < array.length; i++) { 
        if (array[i].city == this.selcity) {
          arr.push(array[i])
        }
      }
      if(arr.length == 0){
        return 'No se encontraron coincidencias.'
      }
      return arr;
    },
  },
  methods: {
    ...mapActions("category", ["getAllInfoCat"]),
    ...mapActions("sale_points", ["getAllInfoSP"]),
    click(val) {
      let arr = this.points;
      this.selcity = val;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == val) {
          this.selarr = arr[i];
        }
      }
    },

    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/sale_points-img/${img}`;

      //this.status_img(img)

      return src;
    },
  },
};
</script>
<style>
.SPoints .pd {
  padding: 30.918vw 20.531vw;
}
.SPoints .tl {
  font-family: "PeaceSans";
  font-weight: 400;
  font-size: 7.246vw;
  line-height: 10.145vw;
  text-align: center;
  color: #000000;
  margin: 0 0 9.179vw;
}
.SPoints .sel {
  width: 100%;
  height: 16.425vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 500;
  font-size: 4.348vw;
  line-height: 4.831vw;
  text-align: center;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  margin-bottom: 8.937vw;
}
.SPoints .sel.act {
  background-color: #f70017;
  color: white;
}
.SPoints .point img {
  max-width: 45.894vw;
  min-width: 29.952vw;
  margin: 0 auto 8.937vw;
  display: flex;
  filter: grayscale(1);
  transition: 0.5s;
}
.SPoints .point:hover img {
  filter: grayscale(0);
}
.SPoints .grtl {
  font-family: "PeaceSans";
  font-weight: 400;
    font-size: 7.246vw;
    line-height: 10.145vw;
  text-align: center;
  color: #bbbbbb;
  margin: 25vw 0 0;
}
@media (min-width: 768px) {
  .SPoints .pd {
    padding: 10vw 10.764vw 12.222vw;
  }
  .SPoints .tl {
    font-size: 3.472vw;
    line-height: 3.472vw;
    margin: 0 auto 3.542vw;
  }
  .cities-c {
    display: flex;
    margin: auto;
    width: 68%;
  }
  .SPoints .sel {
    background: transparent;
    height: auto;
    font-size: 0.972vw;
    line-height: 1.111vw;
    margin-bottom: 0;
    cursor: pointer;
    transition: 0.5s;
  }
  .SPoints .sel:hover {
    color: #f70017;
  }
  .SPoints .sel.act {
    background: transparent;
    color: #f70017;
  }
  .SPoints .spoints-c {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 6.875vw;
  }
  .SPoints .point img {
    max-width: 12.222vw;
    min-width: 7.222vw;
    margin: 0 3.854vw 0;
    display: flex;
  }
  .SPoints .grtl {
    font-size: 2.662vw;
    line-height: 2.662vw;
    margin: 0;
    width: 100%;
  }
}
</style>