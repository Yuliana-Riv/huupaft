<template>
  <div class="Recetas">
    <div class="pd" v-if="tipsblogs !== 'No se encontraron coincidencias.'">
      <p class="tl">RECETAS Y TIPS</p>
      <p class="dscr">
        Tenemos un sabor distinto para cada personalidad, enseguida te
        compartimos las experiencias de algunos de nuestros clientes.
      </p>
      <section class="rec-mo">
        <a v-for="(r, i) in tipsblogs.slice(0, 2)" :key="i" :href="'/blog/'+r.url">
          <div class="rec-c">
            <img :src="srcImg(r.image)" alt="image" />
            <div class="info">
              <p class="name">{{ r.title }}</p>
              <p class="seemore">VER RECETA</p>
            </div>
          </div>
        </a>
        <a href="/blog"><div class="btnw">VER TODOS</div></a>
      </section>
      <section class="rec-pc">
        <a v-for="(r, i) in tipsblogs.slice(0, 4)" :key="i" :href="'/blog/'+r.url">
          <div class="rec-c">
            <div class="rci">
              <img :src="srcImg(r.image)" alt="image" />
            </div>
            <div class="info">
              <p class="name">{{ r.title }}</p>
              <p class="seemore">VER RECETA</p>
            </div>
          </div>
        </a>
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
      recetas: [
        {
          link: "",
          image: require("../../assets/not1.png"),
          title:
            "¿Eres muy fan del café? Te decimos cómo preparar nuestra variedad Extremo.",
        },
        {
          link: "",
          image: require("../../assets/not2.png"),
          title:
            "Estas son 5 deliciosas recetas de bebidas con café que no conocías.",
        },
        {
          link: "",
          image: require("../../assets/not3.png"),
          title:
            "Cold brew: receta y tips originales para que le saques el mejor provecho.",
        },
        {
          link: "",
          image: require("../../assets/not4.png"),
          title:
            "Cold brew: receta y tips originales para que le saques el mejor provecho.",
        },
      ],
    };
  },
  async created() {
    await this.getAllInfoBlo("blog");
  },
  computed: {
    tipsblogs() {
      let data = this.$store.getters["blog/data"];
     if(data == 'No se encontraron coincidencias.' ) {
      return data
     }
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].category_name == "TIPS Y RECETAS" && data[i].statusblog == 'VISIBLE') {
          arr.push(data[i]);
        }
      }
      return arr;
    },
  },
  methods: {
    ...mapActions("blog", ["getAllInfoBlo"]),

    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/blog-img/${img}`;
      return src;
    },
  },
};
</script>
<style>
.Recetas {
  width: 100%;
  background-image: url("../../assets/bk5.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.Recetas a{
  text-decoration-color: transparent;
}
.Recetas .pd {
  padding: 19.565vw 8.937vw 11.836vw;
}
.Recetas .tl {
  font-family: "PeaceSans";
  font-weight: 400;
  font-size: 9.662vw;
  line-height: 13.527vw;
  text-align: center;
  color: white;
  margin: 0 0 4.106vw;
}
.Recetas .dscr {
  width: 90%;
  margin: 0 auto 12.077vw;
  font-weight: 500;
  font-size: 4.831vw;
  line-height: 5.314vw;
  text-align: center;
  font-family: "Glory";
  color: white;
}
.Recetas .rec-mo {
  display: block;
}
.Recetas .rec-pc {
  display: none;
}
.Recetas .rec-c {
  width: 76.087vw;
  border: 0.1vw solid white;
  margin: 0 auto 4.589vw;
  transition: 0.5s;
}
.Recetas .rec-c img {
  width: 100%;
  height: 72.947vw;
  object-fit: cover;
}
.Recetas .rec-c .info {
  padding: 10.87vw 8.454vw;
}
.Recetas .rec-c .info .name {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 5.072vw;
  line-height: 117%;
  letter-spacing: 0.015em;
  color: #ffffff;
  margin: 0 0 7.246vw;
  text-transform: uppercase;
}
.Recetas .rec-c .info .seemore {
  margin: 0;
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 3.382vw;
  line-height: 3.865vw;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  color: #ffffff;
}
.Recetas .btnw {
  width: 58.696vw;
  height: 16.425vw;
  border: 0.1vw solid white;
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 5.797vw;
  line-height: 6.522vw;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
@media (min-width: 768px) {
  .Recetas .rec-pc {
    display: flex;
    /*justify-content: space-between;*/
  }
  .Recetas .rec-mo {
    display: none;
  }
  .Recetas {
    width: 100%;
    background-image: url("../../assets/bk5pc.png");
    background-size: cover;
  }
  .Recetas .pd {
    padding: 8.542vw 4.722vw 0;
  }
  .Recetas .tl {
    font-size: 3.472vw;
    line-height: 3.472vw;
  }
  .Recetas .dscr {
    font-size: 1.389vw;
    line-height: 119%;
    width: 43.056vw;
    margin: 0 auto 6.389vw;
  }
  .Recetas .rec-pc a {
    margin-right: 0.469vw;
    text-decoration-color: transparent;
  }
  .Recetas .rec-pc a:last-child{
    margin-right: 0vw;
  }
  .Recetas .rec-c {
    width: 21.875vw;
    height: 41.0123vw;
    margin: 0 auto 4.589vw;
  }
  .Recetas .rec-c .rci {
    width: 100%;
    height: 20.972vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Recetas .rec-c img {
    width: 100%;
    height: 20.972vw;
    transition: 0.5s;
  }
  .Recetas .rec-c:hover img {
    width: 110%;
    height: 25.972vw;
  }
  .Recetas .rec-c .info {
    padding: 3.194vw 2.708vw;
    height: 12vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .Recetas .rec-c .info .name {
    font-size: 1.458vw;
    margin: 0 0 2.083vw;
  }
  .Recetas .rec-c .info .seemore {
    font-size: 0.972vw;
    line-height: 1.111vw;
  }
}
</style>
