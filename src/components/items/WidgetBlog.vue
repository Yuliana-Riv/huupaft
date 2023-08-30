<template>
  <div class="WidgetB">
    <section class="pccont">
      <SearchInput />
    </section>

    <a href="/suscripcion" target="_blank" rel="noopener noreferrer" class="adv">
      <img src="../../assets/adv.png" alt="adv" />
    </a>
    <!--Más populares-->
    <div class="RO-c">
      <p class="tl">MÁS POPULARES</p>
      <div class="ro-items" v-if="blog">
        <a v-for="(b, i) in blog.slice(0, 2)" :key="i" :href="'/blog/' + b.url">
          <div class="item c2">
            <div class="pd2 imgco">
              <img :src="srcImg(b.image)" alt="bk" class="bk" />
              <p class="cat">{{ b.category_name }}</p>
            </div>
            <div class="pd2">
              <section class="info">
                <section>
                  <p class="date">{{ b.dateblog }}</p>
                  <p class="title">{{ b.title }}</p>
                </section>
                <p class="read">Leer más</p>
              </section>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import SearchInput from "../../components/items/SearchInput.vue";
import { mapActions } from "vuex";
let urlpath = require("../../global/index");

export default {
  components: {
    SearchInput,
  },
  async created() {
    await this.getAllInfoBlo2("blog");
  },

  computed: {
    blog() {
      let data = this.$store.getters["blog/data2"];
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].statusblog == "VISIBLE") {
          arr.push(data[i]);
        }
      }
      return arr;
    },
  },
  methods: {
    ...mapActions("blog", ["getAllInfoBlo2"]),

    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/blog-img/${img}`;
      return src;
    },
  },
};
</script>
<style>
.pccont {
  display: none;
}
.WidgetB .RO-c {
  display: none;
}
.WidgetB .adv img {
  width: 100%;
}

.WidgetB .RO-c .tl {
  font-weight: 400;
  font-size: 8.454vw;
  line-height: 8.454vw;
  font-family: "PeaceSans";
  color: black;
  margin: 14.976vw 0 5vw;
}
.WidgetB .RO-c .item {
  width: 100%;
  height: 89.614vw;
  background-size: cover;
  display: flex;
  flex-direction: column;
  margin-bottom: 7.246vw;
  position: relative;
}
.WidgetB .RO-c .item.c2 {
  border: 0.1vw solid black;
  height: 75.604vw;
}

.WidgetB .RO-c .item.c2 .bk {
  position: absolute;
  width: 100%;
  height: 38.647vw;
  object-fit: cover;
  top: 0;
  left: 0;
}
.WidgetB .RO-c .item .cat {
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 4.348vw;
  line-height: 117%;
  letter-spacing: 0.015em;
  color: #ffffff;
  margin: 0;
  border: 0.1vw solid white;
  width: fit-content;
  padding: 2vw 3vw;
  position: relative;
}
.WidgetB .RO-c .item .info p.date {
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 4.348vw;
  line-height: 117%;
  letter-spacing: 0.015em;
  color: #e42828;
  margin: 0 0 1.5vw;
}
.WidgetB .RO-c .item .info p.title {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 4.831vw;
  line-height: 117%;
  color: white;
  letter-spacing: 0.015em;
  margin: 0;
  text-transform: uppercase;
}
.WidgetB .RO-c .item.c2 .info p.title {
  color: black;
}
.WidgetB .RO-c .item.c2 .info {
  height: 23vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.WidgetB .RO-c .ro-items a {
  text-decoration-color: transparent;
}
.WidgetB .RO-c .item .pd2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 6.28vw 5.314vw 7.729vw;
}
.WidgetB .mocont {
  display: block;
}
.WidgetB .RO-c.pc {
  display: none;
}
.WidgetB .RO-c .read {
  font-family: "Glory";
  margin: 0;
  font-weight: 700;
  font-size: 2.899vw;
  line-height: 117%;
  text-decoration-line: underline;
  color: #e42828;
}

@media (min-width: 768px) {
  .pccont {
    display: block;
    margin-bottom: 1vw;
  }
  .WidgetB .RO-c {
    display: block;
  }
  .WidgetB .RO-c {
    width: 100% !important;
    margin-top: 2.292vw;
  }
  .WidgetB .RO-c .item.c2 {
    margin: 0 0 2vw !important;
  }
  .Blog .WidgetB .RO-c .tl {
    text-align: center;
  }
  .Blog .WidgetB .RO-c .ro-items {
    width: 100%;
    flex-direction: column;
  }
  .WidgetB .RO-c {
    width: 61.389vw;
    margin-bottom: 6.389vw;
  }

  .WidgetB .b-blog .pd {
    padding: 8.611vw 9.722vw 4.931vw 6.667vw;
    display: flex;
    justify-content: space-between;
  }
  .WidgetB .RO-c {
    width: 61.389vw;
    margin-bottom: 6.389vw;
  }
  .WidgetB .RO-c .tl {
    font-size: 1.536vw;
    line-height: 1.536vw;
    margin: 0 0 1.528vw;
  }
  .WidgetB .RO-c .item {
    width: 29.861vw;
    height: 20.972vw;
    margin-bottom: 0;
  }
  .WidgetB .RO-c .item .cat {
    font-size: 0.833vw;
    line-height: 117%;
    padding: 0.3vw 0.7vw;
  }
  .WidgetB .RO-c .item .pd2 {
    padding: 1.736vw;
  }
  .WidgetB .RO-c .item .info p.date {
    font-size: 0.833vw;
    line-height: 117%;
    margin: 0 0 0.5vw;
  }
  .WidgetB .RO-c .ro-items {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .WidgetB .RO-c.due .ro-items {
    justify-content: flex-start;
  }
  .WidgetB .RO-c .item .info p.title {
    font-size: 1.25vw;
    line-height: 117%;
  }
  .WidgetB .RO-c .item.c2 {
    width: 14.306vw;
    height: fit-content;
    margin: 0 1vw;
  }
  .WidgetB .RO-c .item.c2 .bk {
    height: 11.111vw;
  }
  .WidgetB .RO-c .item.c2 .info {
    height: fit-content;
  }
  .WidgetB .RO-c .read {
    font-size: 0.899vw;
    line-height: 117%;
  }
  .WidgetB .RO-c .item .pd2.imgco {
    height: 8vw!important;
}
}
</style>
