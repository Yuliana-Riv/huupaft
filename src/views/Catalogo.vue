<template>
  <div>
    <Navigator />
    <div class="B1">
      <p class="B1T1">TIENDA</p>
      <p class="B1T2">Un café para cada momento</p>
    </div>
    <section v-if="data2 !== 'No se encontraron coincidencias'">
      <div class="B2">
        <div
          class="B2B"
          v-for="(item, key) in data2.slice(0, proco)"
          :key="key"
        >
          <div class="B2Item" v-on:click="sendURL(item.url)">
            <!--v-if="key < 8"--->
            <img class="B2I1" :src="srcImg(item.image)" />
            <p class="B2T1">{{ item.name }} <br> <span>454gr</span></p>
            <p class="B2T2">${{ item.price }} MXN</p>
            <img
              v-on:click="sendURL(item.url)"
              class="B2I2"
              src="../assets/catalogo/Car.svg"
            />
          </div>
        </div>
      </div>
      <div class="B2F2" @click="multi()" v-if="proco < data2.length">
        <p>VER MÁS</p>
      </div>
    </section>
    <section class="comming-soon" v-else>
      <p>En construcción</p>
    </section>

    <Footer />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navigator from "../components/items/Navigator.vue";
import Footer from "../components/items/Footer.vue";
let urlpath = require("../global/index");

export default {
  name: "Catalogo",
  data() {
    return {
      urlpath: urlpath,
      numb: 1,
      proco: 8,
    };
  },
  components: {
    Navigator,
    Footer,
  },
  async created() {
    await this.getAllInfoPro2("product");
  },
  metaInfo() {
    return {
      title: "Catálogo",
      titleTemplate: "%s | Huupa",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content:
            "...",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    };
  },
  computed: {
    data2() {
      let array = this.$store.getters["product/data2"];
      let arr = [];
      if (array == "No se encontraron coincidencias") {
        return array;
      } else {
        for (let i = 0; i < array.length; i++) {
          if (array[i].status == "ACTIVO") {
            arr.push(array[i]);
          }
        }
        return arr;
      }
    },
  },
  methods: {
    ...mapActions("product", ["getAllInfoPro2"]),
    multi() {
      ++this.numb;
      this.proco = this.numb * 8;
    },
    sendURL: function (url) {
      window.location.href = "producto/" + url;
    },

    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/get-product-image/${img}`;

      //this.status_img(img)

      return src;
    },
  },
};
</script>

<style scoped>
.showDK {
  display: none;
}

.B1 {
  width: 100%;
  height: 149.7584541062802vw;
  background-image: url("../assets/catalogo/BKMV.png");
  background-repeat: no-repeat;
  background-size: cover;
}
p.B1T1 {
  width: fit-content;
  font-size: 12.077294685990339vw;
  font-weight: 400;
  font-family: "PeaceSans";
  margin: auto;
  margin-bottom: 4.5893719806763285vw;
  color: var(--color-5);
  padding-top: 85.02415458937197vw;
}
p.B1T2 {
  width: 76.08695652173914vw;
  font-size: 7.246376811594203vw;
  font-weight: 500;
  font-family: var(--Glory);
  line-height: 8.115942028985508vw;
  margin: auto;
  color: var(--color-5);
  text-align: center;
}

.B2 {
  padding-top: 33.091787439613526vw;
  padding-bottom: 0;
}
.B2Item {
  text-align: center;
  margin-bottom: 16.425120772946862vw;
}
img.B2I1 {
  width: 64.00966183574879vw;
  height: auto;
  margin-bottom: 9.178743961352657vw;
}
p.B2T1 {
  width: 53.3816425120773vw;
  font-size: 4.3478260869565215vw;
  font-weight: 400;
  line-height: 4.3478260869565215vw;
  font-family: "PeaceSans";
  margin: auto;
  text-transform: uppercase;
  margin-bottom: 4vw;
}
p.B2T2 {
  width: fit-content;
  font-size: 3.864734299516908vw;
  font-weight: 400;
  font-family: var(--Glory);
  margin: auto;
  margin-bottom: 7.004830917874397vw;
}
img.B2I2 {
  width: 5.384057971014493vw;
  height: auto;
}

.B2F2 {
  width: 58.69565217391305vw;
  height: 16.425120772946862vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1vw solid var(--color-2);
  margin: auto;
  margin-bottom: 39.130434782608695vw;
}
.B2F2 p {
  font-size: 5.797101449275362vw;
  font-weight: 700;
  font-family: var(--Glory);
  letter-spacing: 0.125em;
  margin: 0vw;
}
.comming-soon p {
  font-size: 9vw;
  font-family: "PeaceSans";
  color: gray;
  margin: 17vw 0;
  text-align: center;
}

@media (min-width: 769px) {
  .comming-soon p {
    font-size: 2vw;
    margin: 8vw 0;
  }
  .showDK {
    display: block;
  }
  .showMV {
    display: none;
  }

  .B1 {
    height: 37.56944444444444vw;
    background-image: url("../assets/catalogo/BKDK.png");
  }
  p.B1T1 {
    font-size: 3.4722222222222223vw;
    margin-bottom: 0.9722222222222222vw;
    padding-top: 22.708333333333332vw;
  }
  p.B1T2 {
    width: fit-content;
    font-size: 1.3888888888888888vw;
    line-height: 1.5555555555555556vw;
  }

  .B2 {
    padding-top: 8.125vw;
    padding-bottom: 0;
    display: flex;
    width: 61.3vw;
    flex-flow: wrap;
    margin: auto;
  }
  .B2Item {
    margin: 0vw 1.5625vw;
    margin-bottom: 5vw;
    cursor: pointer;
  }
  img.B2I1 {
    width: 12.152777777777777vw;
    margin-bottom: 1.5277777777777777vw;
  }
  p.B2T1 {
    width: 10.381643vw;
    font-size: 0.9722222222222222vw;
    line-height: 0.9722222222222222vw;
    margin-bottom: 0.4861111111111111vw;
    transition: 0.5s;
  }
  .B2B:hover .B2T1 {
    color: #f70017;
  }
  .B2T1 span {
    font-size: 0.6944444444444444vw;
    line-height: 0.6944444444444444vw;
  }
  p.B2T2 {
    font-size: 1.1111111111111112vw;
    margin-bottom: 1.5277777777777777vw;
  }
  img.B2I2 {
    width: 1.5479166666666666vw;
    cursor: pointer;
  }
  .B2F2 {
    width: 13.88888888888889vw;
    height: 3.888888888888889vw;
    margin-bottom: 10.694444444444445vw;
    cursor: pointer;
  }
  .B2F2 p {
    font-size: 0.9722222222222222vw;
  }
}
</style>
