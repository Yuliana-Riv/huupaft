<template>
  <div class="Blog">
    <Navigator />
    <div class="blog-c">
      <div class="h-blog">
        <div class="pd">
          <p>BLOG</p>
        </div>
      </div>
      <div class="b-blog">
        <div class="pd">
          <div class="CO1" v-if="blog !== 'No se encontraron coincidencias'">
            <section class="mocont">
              <SearchInput />
            </section>

            <!--BLOGS POR BUSQUEDA-->
            <div class="RO-c due" v-if="$route.name == 'BlogResults'">
              <p class="tl">
                Resultados de busqueda: '{{ $route.params.result }}':
              </p>
              <div
                class="ro-items"
                v-if="resultsblogs !== 'No se encontraron coincidencias.'"
              >
                <a
                  v-for="(b, i) in resultsblogs"
                  :key="i"
                  :href="'/blog/' + b.url"
                >
                  <div class="item c2">
                    <div class="pd2 imgco">
                      <img :src="srcImg(b.image)" alt="bk" class="bk" />
                      <p class="cat">{{ b.category_name }}</p>
                    </div>
                    <div class="pd2 infco">
                      <section class="info">
                        <section>
                          <p class="date">{{ b.dateblog }}</p>
                          <p class="title">{{ splitHTML(b.title) }}</p>
                        </section>
                        <p class="read">Leer más</p>
                      </section>
                    </div>
                  </div>
                </a>
              </div>
              <div v-else>
                <p class="noresult">No se encontraron coincidencias.</p>
              </div>
            </div>

            <!--BLOGS POR AUTORES-->
            <div class="RO-c due" v-if="$route.name == 'BlogAutores'">
              <p class="tl">Blogs por {{ $route.params.autor }}:</p>
              <div class="ro-items">
                <a
                  v-for="(b, i) in autorblogs"
                  :key="i"
                  :href="'/blog/' + b.url"
                >
                  <div class="item c2">
                    <div class="pd2 imgco">
                      <img :src="srcImg(b.image)" alt="bk" class="bk" />
                      <p class="cat">{{ b.category_name }}</p>
                    </div>
                    <div class="pd2 infco">
                      <section class="info">
                        <section>
                          <p class="date">{{ b.dateblog }}</p>
                          <p class="title">{{ splitHTML(b.title) }}</p>
                        </section>
                        <p class="read">Leer más</p>
                      </section>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <!--PÁGINA PRINCIPAL DE BLOG--->
            <section v-else-if="$route.name == 'Blog'">
              <!--LO MÁS RECIENTE-->
              <div class="RO-c item-lmr">
                <p class="tl">Lo más reciente</p>
                <div class="ro-items">
                  <a
                    v-for="(b, i) in blog.slice(0, 2)"
                    :key="i"
                    :href="'/blog/' + b.url"
                  >
                    <div
                      class="item"
                      :style="{
                        'background-image': 'url(' + srcImg(b.image) + ')',
                      }"
                    >
                      <div class="pd2">
                        <p class="cat">{{ b.category_name }}</p>
                        <section class="info">
                          <p class="date">{{ b.dateblog }}</p>
                          <p class="title">{{ b.title }}</p>
                        </section>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <!--TIPS Y RECETAS-->
              <div
                class="RO-c due"
                v-if="tipsblogs !== 'No se encontraron coincidencias.'"
              >
                <p class="tl">Tips y recetas</p>
                <div class="ro-items">
                  <a
                    v-for="(b, i) in tipsblogs.slice(0, 4)"
                    :key="i"
                    :href="'/blog/' + b.url"
                  >
                    <div class="item c2">
                      <div class="pd2 imgco">
                        <img :src="srcImg(b.image)" alt="bk" class="bk" />
                        <p class="cat">{{ b.category_name }}</p>
                      </div>
                      <div class="pd2 infco">
                        <section class="info">
                          <section>
                            <p class="date">{{ b.dateblog }}</p>
                            <p class="title">{{splitHTML(b.title) }}</p>
                          </section>
                          <p class="read">Leer más</p>
                        </section>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <!--SONORA-->
              <div
                class="RO-c due pc item-son"
                v-if="sonorablogs !== 'No se encontraron coincidencias.'"
              >
                <p class="tl">Sonora</p>
                <div class="ro-items">
                  <a :href="'/blog/' + sonorablogs[0].url">
                    <div
                      class="item"
                      :style="{
                        'background-image':
                          'url(' + srcImg(sonorablogs[0].image) + ')',
                      }"
                    >
                      <div class="pd2">
                        <p class="cat">{{ sonorablogs[0].category_name }}</p>
                        <section class="info">
                          <p class="date">{{ sonorablogs[0].dateblog }}</p>
                          <p class="title">{{ sonorablogs[0].title }}</p>
                        </section>
                      </div>
                    </div>
                  </a>
                  <a
                    v-for="(b, i) in sonorablogs.slice(1, 3)"
                    :key="i"
                    :href="'/blog/' + b.url"
                  >
                    <div class="item c2">
                      <div class="pd2 imgco">
                        <img :src="srcImg(b.image)" alt="bk" class="bk" />
                        <p class="cat">{{ b.category_name }}</p>
                      </div>
                      <div class="pd2 infco">
                        <section class="info">
                          <section>
                            <p class="date">{{ b.dateblog }}</p>
                            <p class="title">{{ splitHTML(b.title) }}</p>
                          </section>
                          <p class="read">Leer más</p>
                        </section>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>
          <div class="CO1 comming-soon" v-else>
            <p>En construcción</p>
          </div>
          <div class="CO2" v-if="blog !== 'No se encontraron coincidencias.'">
            <WidgetBlog />
          </div>
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
import WidgetBlog from "../components/items/WidgetBlog.vue";
import SearchInput from "../components/items/SearchInput.vue";
let urlpath = require("../global/index");
export default {
  components: {
    Navigator,
    Footer,
    WidgetBlog,
    SearchInput,
  },
  data() {
    return {
      urlpath: urlpath,
    };
  },
  async created() {
    let param = "";
    await this.getAllInfoBlo("blog");
    await this.getAllInfoCat("category");
    let payload1 = {
      option: "blog",
      search:
        this.$route.name == "BlogResults" ? this.$route.params.result : "",
    };
    await this.searchBlo3(payload1);
  },
  metaInfo() {
    return {
      title: "Blog",
      titleTemplate: "%s | Huupa",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content: "...",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    };
  },
  computed: {
    blog() {
      let data = this.$store.getters["blog/data"];
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].statusblog == "VISIBLE") {
          arr.push(data[i]);
        }
      }
      if (arr.length == 0) {
        return "No se encontraron coincidencias.";
      } else {
        return arr;
      }
    },
    tipsblogs() {
      let data = this.blog;
      if (data == "No se encontraron coincidencias") {
        return data;
      } else {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].category_name == "TIPS Y RECETAS") {
            arr.push(data[i]);
          }
        }
        if (arr.length == 0) {
          return "No se encontraron coincidencias.";
        }
        return arr;
      }
    },
    sonorablogs() {
      let data = this.blog;
      if (data == "No se encontraron coincidencias.") {
        return data;
      } else {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].category_name == "SONORA") {
            arr.push(data[i]);
          }
        }
        if (arr.length == 0) {
          return "No se encontraron coincidencias.";
        }
        return arr;
      }
    },
    autorblogs() {
      let data = this.blog;
      let arr = [];
      if (this.$route.name == "BlogAutores") {
        let search = this.$route.params.autor;
        for (let i = 0; i < data.length; i++) {
          let fullname = data[i].autor_name + " " + data[i].autor_lastname;
          if (fullname == search) {
            arr.push(data[i]);
          }
        }
      } else {
        arr = "No se encontraron coincidencias.";
      }

      return arr;
    },
    resultsblogs() {
      return this.$store.getters["blog/data3"];
    },
    categorias() {
      return this.$store.getters["category/data"];
    },
  },
  methods: {
    ...mapActions("blog", ["getAllInfoBlo"]),
    ...mapActions("blog", ["searchBlo3"]),
    ...mapActions("category", ["getAllInfoCat"]),

    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/blog-img/${img}`;
      return src;
    },

    splitHTML(texto) {
      let regex = /(<([^>]+)>)/ig;
      let textoS = texto.replace(regex, "");
      let maxLength = 100;
      let trimmedString = textoS.substr(0, maxLength);
      trimmedString = trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
      );
      return trimmedString + " ...";
    },
  },
};
</script>
<style>
.Blog .h-blog {
  background-image: url("../assets/bk6.png");
  background-size: 100%;
  background-position-y: bottom;
  padding-top: 51.449vw;
  padding-bottom: 14.493vw;
}
.Blog .h-blog p {
  font-weight: 400;
  font-size: 12.077vw;
  line-height: 13.285vw;
  font-family: "PeaceSans";
  color: white;
  text-align: center;
  margin: 0;
}
.Blog .b-blog .pd {
  padding: 14.976vw 12.077vw;
}
.Blog .RO-c .tl {
  font-weight: 400;
  font-size: 8.454vw;
  line-height: 8.454vw;
  font-family: "PeaceSans";
  text-transform: uppercase;
  color: black;
  margin: 14.976vw 0 5vw;
}
.Blog .noresult {
  font-weight: 400;
  font-size: 6.454vw;
  line-height: 6.454vw;
  font-family: "PeaceSans";
  text-transform: uppercase;
  color: #e22121;
  margin: 0 0 15vw;
}
.Blog .RO-c .item {
  width: 100%;
  height: 89.614vw;
  background-size: cover;
  display: flex;
  flex-direction: column;
  margin-bottom: 7.246vw;
  position: relative;
}
.Blog .RO-c .item.c2 {
  border: 0.1vw solid black;
  height: 75.604vw;
}

.Blog .RO-c .item.c2 .bk {
  position: absolute;
  width: 100%;
  height: 38.647vw;
  object-fit: cover;
  top: 0;
  left: 0;
}
.Blog .RO-c .item .cat {
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
.Blog .RO-c .item .info p.date {
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 4.348vw;
  line-height: 117%;
  letter-spacing: 0.015em;
  color: #e42828;
  margin: 0 0 1.5vw;
}
.Blog .RO-c .item .info p.title {
  font-family: "PeaceSans";
  text-transform: uppercase;
  font-style: normal;
  font-weight: 400;
  font-size: 4.831vw;
  line-height: 117%;
  color: white;
  letter-spacing: 0.015em;
  margin: 0;
}
.Blog .RO-c .item.c2 .info p.title {
  color: black;
}
.Blog .RO-c .item.c2 .info {
  height: 23vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.Blog .RO-c .ro-items a {
  text-decoration-color: transparent;
}
.Blog .RO-c .item .pd2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 6.28vw 5.314vw 7.729vw;
}
.Blog .mocont {
  display: block;
}
.Blog .RO-c.pc {
  display: none;
}
.Blog .RO-c .read {
  font-family: "Glory";
  margin: 0;
  font-weight: 700;
  font-size: 2.899vw;
  line-height: 117%;
  text-decoration-line: underline;
  color: #e42828;
}
.comming-soon p {
  font-size: 9vw;
  font-family: "PeaceSans";
  color: gray;
  margin: 17vw 0;
  text-align: center;
}
@media (min-width: 768px) {
  .comming-soon p {
    font-size: 2vw;
    margin: 8vw 0;
  }
  .Blog .RO-c.pc {
    display: block;
  }
  .Blog .mocont {
    display: none;
  }
  .Blog .h-blog {
    background-image: url("../assets/bk6pc.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 26.875vw;
    padding-bottom: 4.931vw;
  }
  .Blog .h-blog p {
    font-size: 3.472vw;
    line-height: 3.472vw;
  }
  .Blog .b-blog .pd {
    padding: 8.611vw 9.722vw 4.931vw 6.667vw;
    display: flex;
    justify-content: space-between;
  }
  .Blog .RO-c {
    width: 61.389vw;
    margin-bottom: 6.389vw;
  }
  .Blog .RO-c .tl {
    font-size: 1.536vw;
    line-height: 1.536vw;
    margin: 0 0 1.528vw;
  }
  .Blog .noresult {
    font-size: 1.736vw;
    line-height: 1.736vw;
  }
  .Blog .RO-c .item {
    width: 29.861vw;
    height: 100%;
    margin-bottom: 0;
  }
  .Blog .RO-c.item-son .item {
    margin: 0 1vw 0 0;
  }
  .Blog .RO-c.item-lmr .item {
    height: 20.972vw;
  }
  /**height: 20.972vw; */
  .Blog .RO-c .item .cat {
    font-size: 0.833vw;
    line-height: 117%;
    padding: 0.3vw 0.7vw;
  }
  .Blog .RO-c .item .pd2 {
    padding: 1.736vw;
  }
  .Blog .RO-c .item .info p.date {
    font-size: 0.833vw;
    line-height: 117%;
    margin: 0 0 0.5vw;
  }
  .Blog .RO-c .ro-items {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .Blog .RO-c.due .ro-items {
    justify-content: flex-start;
  }
  .Blog .RO-c .item .info p.title {
    font-size: 1.25vw;
    line-height: 117%;
  }
  .Blog .RO-c .ro-items a {
    margin: 0 0 1vw;
  }
  .Blog .RO-c .item.c2 {
    width: 14.306vw;
    height: fit-content;
    margin: 0 1vw 1vw 0;
  }
  .Blog .RO-c a:nth-child(4n) .item.c2 {
    margin: 0 0 1vw !important;
  }
  .Blog .RO-c .item.c2 .bk {
    height: 11.111vw;
  }
  .Blog .RO-c .item.c2 .info {
    height: fit-content;
  }
  .Blog .CO1 {
    width: fit-content;
  }
  .Blog .RO-c .read {
    font-size: 0.899vw;
    line-height: 117%;
  }
  .Blog .CO2 {
    width: 14.306vw;
  }
  .Blog .RO-c .item .pd2.infco {
    height: 13vw;
  }
  .Blog .RO-c .item .pd2.imgco {
    height: 7.611vw;
  }
}
</style>
