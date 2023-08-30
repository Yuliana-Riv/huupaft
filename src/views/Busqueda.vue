<template>
  <div class="Bsq">
    <Navigator />
    <div class="busqueda-b">
      <div class="hd-ctz">
        <div class="pd">
          <p class="tl">Resultados de ''{{ this.$route.params.result }}''.</p>
        </div>
      </div>
      <div class="results-b">
        <div class="pd">
          <section v-if="data !== 'No se encontraron coincidencias'">
            <div class="B2">
              <div class="B2B" v-for="(item, key) in data" :key="key">
                
                <div
                  v-if="key < 8"
                  class="B2Item"
                  v-on:click="sendURL(item.url)"
                >
                  <img class="B2I1" src="../assets/catalogo/HCOF_DK.png" />
                  <p class="B2T1">{{ item.name }} <span>454gr</span></p>
                  <p class="B2T2">${{ item.price }} MXN</p>
                  <img
                    v-on:click="sendURL(item.url)"
                    class="B2I2"
                    src="../assets/catalogo/Car.svg"
                  />
                </div>
              </div>
            </div>
          </section>
          <section v-else>
            <p class="nores">No se encontraron resultados de ''{{ this.$route.params.result }}''.</p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Navigator from "../components/items/Navigator.vue";
import Footer from "../components/items/Footer.vue";
export default {
  components: {
    Navigator,
    Footer,
  },
  async created() {
    let payload1 = {
      option: "product",
      search: this.$route.params.result,
    };
    await this.searchPro(payload1);
  },
  metaInfo() {
    return {
      title: "Resultados de "+(this.$route.params.result),
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
    data() {
      let array = this.$store.getters["product/data"];
      return array;
    },
  },
  methods: {
    ...mapActions("product", ["searchPro"]),

        sendURL: function(url){  
          this.$router.push({ path: '/producto/'+url, replace: true }).catch((err) => {});
          window.scrollBy(0,0);
        }
  },
};
</script>
<style>
.Bsq .hd-ctz {
  background-image: url("../assets/bk6.png");
  background-size: 100%;
  background-position-y: bottom;
  padding-top: 13vw;
}
.Bsq .hd-ctz .pd {
  padding: 24.995vw 12.077vw 17.15vw;
}
.Bsq .hd-ctz .tl {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 12.077vw;
  line-height: 13.285vw;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
}
.Bsq .hd-ctz .sbtl {
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 7.246vw;
  line-height: 8.213vw;
  text-align: center;
  letter-spacing: 0.05em;
  color: #ffffff;
  margin-top: 4.589vw;
}
.Bsq .results-b p.nores {
    text-align: center;
    font-size: 7.1vw;
    font-family: 'PeaceSans';
    color: gray;
    padding: 10vw 2.2vw;
    margin: 0;
}
    .B2 {
        padding-top: 33.091787439613526VW;
        padding-bottom: 0;
    }
    .B2Item {
        text-align: center;
        margin-bottom: 16.425120772946862VW;
    }
    img.B2I1 {
        width: 64.00966183574879VW;
        height: auto;
        margin-bottom: 9.178743961352657VW;
    }
    p.B2T1 {
        width: 53.3816425120773VW;
        font-size: 4.3478260869565215VW;
        font-weight: 400;
        line-height: 4.3478260869565215VW;
        font-family: "PeaceSans";
        margin: auto;
        margin-bottom: 4vw;
        text-transform: uppercase;
    }
    p.B2T2 {
        width: fit-content;
        font-size: 3.864734299516908VW;
        font-weight: 400;
        font-family: var(--Glory);
        margin: auto;
        margin-bottom: 7.004830917874397VW;
    }
    img.B2I2 {
        width: 5.384057971014493VW;
        height: auto;
    }

    .B2F2 {
        width: 58.69565217391305VW;
        height: 16.425120772946862VW;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0.1vw solid var(--color-2);
        margin: auto;
        margin-bottom: 39.130434782608695VW;
    }
    .B2F2 p {
        font-size: 5.797101449275362VW;
        font-weight: 700;
        font-family: var(--Glory);
        letter-spacing: 0.125em;
        margin: 0vw;
    }
@media (min-width: 768px) {
  .Bsq .hd-ctz {
    background-image: url("../assets/bk6pc.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 3.4vw;
  }
  .Bsq .hd-ctz .pd {
    padding: 13.708vw 37.014vw 5.889vw;
  }
  .Bsq .hd-ctz .tl {
    font-size: 3.472vw;
    line-height: 3.472vw;
  }
  .Bsq .hd-ctz .sbtl {
    font-size: 1.389vw;
    line-height: 1.528vw;
    margin-top: 0.972vw;
  }
        .B2 {
            padding-top: 8.125VW;
            padding-bottom: 0;
            display: flex;
            width: 61.3vw;
            flex-flow: wrap;
            margin: auto;
        }
        .B2Item {
            margin: 0vw 1.5625VW;
            margin-bottom: 5VW;
        }
        img.B2I1 {
            width: 12.152777777777777VW;
            margin-bottom: 1.5277777777777777VW;
        }
        p.B2T1 {
            width: 10.381643VW;
            font-size: 0.9722222222222222VW;
            line-height: 0.9722222222222222VW;
            margin-bottom: 0.4861111111111111VW;
        }
        .B2T1 span {
            font-size: 0.6944444444444444VW;
            line-height: 0.6944444444444444VW;
        }
        p.B2T2 {
            font-size: 1.1111111111111112VW;
            margin-bottom: 1.5277777777777777VW;
        }
        img.B2I2 {
            width: 1.5479166666666666VW;
            cursor: pointer;
        }
        .B2F2 {
            width: 13.88888888888889VW;
            height: 3.888888888888889VW;
            margin-bottom: 10.694444444444445VW;
            cursor: pointer;
        }
        .B2F2 p {
            font-size: 0.9722222222222222VW;
        }
.Bsq .results-b p.nores { 
    font-size: 2.1vw; 
    padding: 4vw 2.2vw; 
}
}
</style>