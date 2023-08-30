<template>
  <div class="BlogPost">
    <Navigator />
    <div class="blogpost-body">
      <div class="h-blog">
        <div class="pd">
          <p>BLOG</p>
        </div>
      </div>
      <div class="bpost-c">
        <section class="widget-sec uno">
          <div class="widget-cont">
            <p class="routes-c">
              <a href="/">Home</a> →
              <a href="/blog">Blog</a>
              → <b>{{ blogurl.title }}</b>
            </p>
            <div class="blogpost-c">
              <img :src="srcImg(blogurl.image)" alt="post" class="post-img" />
              <div class="titulo-post">
                <p class="cat-p">{{ blogurl.category_name }}</p>
                <p class="titulo-p">{{ blogurl.title }}</p>
              </div>
              <p class="post-desc">{{ blogurl.descrp }}</p>

              <!-- cuerpo del blog -->
              <div
                v-for="(bloq, key) in blogurl.body"
                :key="key"
                class="bloq-item"
              >
                <div class="mbbloq">
                  <div
                    v-if="bloq.tipo == 'texto'"
                    v-html="bloq.texto"
                    class="S1F1"
                  ></div>
                </div>

                <div
                  v-if="bloq.tipo == 'video'"
                  v-html="bloq.video"
                  class="video"
                ></div>

                <div v-if="bloq.tipo == 'frase'" class="fraseSq">
                  <p
                    class="B2Mesage"
                    :class="{ B2Mesage2: bloq.tipo != 'frase' }"
                  >
                    “{{ bloq.frase.texto }}”.
                  </p>
                  <p class="B2Autor">/ {{ bloq.frase.firma }}</p>
                </div>

                <div v-if="bloq.tipo == 'frase_destacada'" class="mbbloq">
                  <p class="B4F5_P">"{{ bloq.frase_destacada }}"</p>
                </div>

                <img
                  v-if="bloq.tipo == 'imagen'"
                  :src="srcImg(bloq.imagen)"
                  alt="imagen bloque"
                />
                <div v-if="bloq.tipo == 'caja'" class="B2F1">
                  <div class="col-caja">
                    <div
                      v-if="bloq.caja[0].tipo == 'texto'"
                      v-html="bloq.caja[0].texto"
                      class="B3F1_P"
                    ></div>
                    <img
                      class="img-blog"
                      v-if="bloq.caja[0].tipo == 'imagen'"
                      :src="srcImg(bloq.caja[0].imagen)"
                      alt="imagen bloque"
                    />

                    <div v-if="bloq.caja[0].tipo == 'frase'" class="fraseSq">
                      <p class="B2Mesage">“{{ bloq.caja[0].frase.texto }}”.</p>
                      <p class="B2Autor">/ {{ bloq.caja[0].frase.firma }}</p>
                    </div>

                    <div v-if="bloq.caja[0].tipo == 'frase_destacada'">
                      <p class="B3F4_P">"{{ bloq.caja[0].frase_destacada }}"</p>
                    </div>
                  </div>

                  <div class="mlfcaja2 col-caja">
                    <div
                      v-if="bloq.caja[1].tipo == 'texto'"
                      v-html="bloq.caja[1].texto"
                      class="B3F1_P"
                    ></div>

                    <img
                      v-if="bloq.caja[1].tipo == 'imagen'"
                      :src="srcImg(bloq.caja[1].imagen)"
                      alt="imagen bloque"
                    />

                    <div v-if="bloq.caja[1].tipo == 'frase'" class="fraseSq">
                      <p class="B2Mesage">“{{ bloq.caja[1].frase.texto }}”.</p>
                      <p class="B2Autor">/ {{ bloq.caja[1].frase.firma }}</p>
                    </div>

                    <div v-if="bloq.caja[1].tipo == 'frase_destacada'">
                      <p class="B3F4_P">"{{ bloq.caja[1].frase_destacada }}"</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- tag -->
              <div
                class="blogpost-tags"
                v-if="blogurl.tags !== 'No se encontraron coincidencias.'"
              >
                <p v-for="(t, i) in blogurl.tags" :key="i">#{{ t.name }}</p>
              </div>

              <!-- author -->
              <div class="blogpost-author">
                <img src="../assets/autor.png" alt="autor" class="autor" />
                <div class="co1">
                  <p class="p1">
                    {{ blogurl.autor_name + " " + blogurl.autor_lastname }}
                  </p>
                  <a
                    :href="
                      '/blog-by-autor/' +
                      blogurl.autor_name +
                      ' ' +
                      blogurl.autor_lastname
                    "
                  >
                    <p class="link">
                      Más entradas de
                      {{ blogurl.autor_name + " " + blogurl.autor_lastname }}
                    </p>
                  </a>
                </div>
              </div>

              <!-- comparte 
              <div class="sm-blogpost">
                <p>Comparte esta entrada:</p>
                <img src="../assets/sm-1.svg" alt="sm" class="sm-i-share" />
                <img src="../assets/sm-2.svg" alt="sm" class="sm-i-share" />
                <img src="../assets/sm-3.svg" alt="sm" class="sm-i-share" />
                <img src="../assets/sm-4.svg" alt="sm" class="sm-i-share" />
              </div>
              -->
            </div>

            <section class="comments-sec">
              <div class="comments-box" v-if="addedCo == 'error'">
                <p class="comments">No hay comentarios.</p>
              </div>
              <div class="comments-box" v-else>
                <section
                  v-for="(a, i) in addedCo"
                  :key="i"
                  class="comment-i"
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-duration="700"
                >
                  <p class="user">
                    <b>{{ a.name }}</b>
                  </p>
                  <p class="comments">{{ a.comment }}</p>
                  <p class="date">
                    {{ a.dateblogc }} <span>{{ a.hourblogc }}</span>
                  </p>
                  <section class="edit-c" v-if="logisav == true">
                    <p
                      v-if="identity.email == a.email"
                      @click="(editco = a.id) && (comment = a.comment)"
                    >
                      Editar comentario
                    </p>
                  </section>
                </section>
              </div>
              <div
                class="pagination"
                v-if="arraylength > 3"
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-duration="700"
              >
                <img
                  src="../assets/prev-blog.png"
                  alt="prev"
                  @click="pageNum -= 1"
                  class="pointer"
                  :class="{ disabled: pageNum == 1 }"
                />
                <img
                  src="../assets/next-blog.png"
                  alt="next"
                  @click="pageNum += 1"
                  class="pointer"
                  :class="{ disabled: pageNum == totalPages }"
                />
              </div>
              <form
                @submit.prevent="
                  sendComment(blogurl.id, name, email, comment, tosave)
                "
              >
                <p class="tl3">DEJAR UN COMENTARIO</p>
                <div class="form-inputs" :class="{ hgt: closeU }">
                  <section v-if="!logisav">
                    <p
                      @click="closeLS()"
                      class="close pointer"
                      v-if="closeU == true"
                      data-aos="fade-zoom-in"
                      data-aos-easing="ease-in-back"
                      data-aos-duration="700"
                    >
                      Eliminar usuario
                    </p>
                    <section
                      data-aos="fade-zoom-in"
                      data-aos-easing="ease-in-back"
                      data-aos-duration="700"
                    >
                      <p>Nombre:</p>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nombre a mostrar"
                        class="inputs"
                        v-model="name"
                      />
                    </section>
                    <section
                      data-aos="fade-zoom-in"
                      data-aos-easing="ease-in-back"
                      data-aos-duration="700"
                    >
                      <p>Correo electrónico:</p>
                      <input
                        type="text"
                        name="email"
                        placeholder="Correo electrónico"
                        class="inputs"
                        v-model="email"
                      />
                    </section>
                  </section>

                  <section
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-duration="700"
                  >
                    <p :class="{ coblue: editco > 0 }">Tu comentario:</p>
                    <textarea
                      name="comentario"
                      placeholder="¿Qué te pareció este producto?"
                      class="txtarea"
                      :class="{ extw: logisav, bblue: editco > 0 }"
                      v-model="comment"
                    ></textarea>
                  </section>
                </div>
                <p
                  class="adv-1"
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-duration="700"
                  v-if="!logisav"
                >
                  Tu dirección de correo electrónico no será publicada.
                </p>
                <div
                  class="two-rows"
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-duration="700"
                >
                  <div class="check-cont dflx" v-if="!logisav">
                    <input type="checkbox" name="" v-model="tosave" />
                    <p>
                      Guardar mi nombre, correo electrónico y sitio web en este
                      navegador para la próxima vez que haga un comentario.
                    </p>
                  </div>

                  <input
                    type="submit"
                    value="ENVIAR MENSAJE"
                    class="send-comment"
                    v-if="editco == 0"
                  />
                  <input
                    type="button"
                    value="EDITAR"
                    class="send-comment editco"
                    v-else
                    @click="editValuation(editco, comment)"
                  />
                </div>
                <div v-if="status2 != ''" class="status_messages">
                  <div v-if="status2 == 'success'" class="msg msg_success">
                    <p>{{ message2 }}</p>
                  </div>
                  <div v-if="status2 == 'error'" class="msg msg_error">
                    <p>{{ message2 }}</p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </section>
        <section class="widget-sec dos">
          <WidgetBlog />
        </section>
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
let urlpath = require("../global/index");
export default {
  name: "Home",
  data() {
    return {
      status2: "",
      message2: "",
      name:
        localStorage.getItem("ctne") === null
          ? ""
          : localStorage.getItem("ctne"),
      email:
        localStorage.getItem("ctel") === null
          ? ""
          : localStorage.getItem("ctel"),
      closeU:
        localStorage.getItem("ctne") === null &&
        localStorage.getItem("ctel") === null
          ? false
          : true,
      comment: "",
      pageNum: 1,
      pageSize: 3,
      arraylength: 0,
      logisav: localStorage.getItem("tkn") === null ? false : true,
      tosave: false,
      editco: 0,
    };
  },
  components: {
    Navigator,
    Footer,
    WidgetBlog,
  },
  async created() {
    let payload = {
      option: "blog-url",
      url: this.$route.params.url,
    };
    await this.getInfoByUrlBlo(payload);
    let payload1 = {
      option: "blog/blog_comments",
      id: this.blogurl.id,
    };
    let res = await this.getInfoByIdBloCo(payload1);
    await this.setAddedBloCo(res);
    await this.getIdentity();
  },
  metaInfo() {
    return {
      title: this.blogurl.title,
      titleTemplate: "%s | Huupa",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content: this.blogurl.descrp,
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    };
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
    blogurl() {
      return this.$store.getters["blog/data"];
    },
    addedCo() {
      let array = this.$store.getters["blog_comment/getAdded"];
      if (array == "No se encontraron coincidencias.") {
        return "error";
      } else {
        let arr = array.slice(
          (this.pageNum - 1) * this.pageSize,
          this.pageNum * this.pageSize
        );
        this.arraylength = array.length;
        return arr;
      }
    },
    totalPages() {
      let total = Math.ceil(this.arraylength / this.pageSize);
      if (total < this.pageNum) {
        this.pageNum = 1;
      }
      return total;
    },
  },
  methods: {
    ...mapActions("blog", ["getInfoByUrlBlo"]),
    ...mapActions("blog", ["getInfoByIdBlo"]),
    ...mapActions("blog_comment", ["setAddedBloCo"]),
    ...mapActions("blog_comment", ["getInfoByIdBloCo"]),

    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },

    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/blog-img/${img}`;
      return src;
    },
    /*regexImg(txt) {
      let s = txt.split(".");
      return s[0] + ".webp";
    },*/
    isWebp(webpImg, pngImg) {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("chrome") > -1) {
        return webpImg; // Chrome
      } else if (ua.indexOf("firefox") > -1) {
        return webpImg; // Firefox
      } else if (ua.indexOf("opera") > -1) {
        return webpImg; // Opera
      } else if (ua.indexOf("safari") > -1) {
        return pngImg; // Safari
      }
    },
    sendComment: async function (id_blog, name, email, comment, tosave) {
      this.message2 = "";
      this.status2 = "";
      if (localStorage.getItem("tkn")) {
        name = this.identity.fullname;
        email = this.identity.email;
      }
      if (name == undefined || name == "" || name == null) {
        this.message2 = "El campo nombre no es valido.";
        this.status2 = "error";
      } else if (comment == undefined || comment == "" || comment == null) {
        this.message2 = "Escribe el comentario.";
        this.status2 = "error";
      } else if (email == undefined || email == "" || email == null) {
        this.message2 = "El campo correo no es valido.";
        this.status2 = "error";
      } else {
        let data = {
          name: name,
          id_blog: id_blog,
          email: email,
          comment: comment,
        };
        let response = await this.$store.dispatch("blog_comment/addItemBloCo", {
          option: "blog_comments",
          item: data,
        });

        if (tosave == true) {
          localStorage.setItem("ctne", name);
          localStorage.setItem("ctel", email);
          this.closeU = true;
        }

        if (response.status == "success") {
          this.status2 = "success";
          this.message2 = "Se agregó el comentario con éxito.";
          let payload1 = {
            option: "blog/blog_comments",
            id: this.blogurl.id,
          };
          const res = await this.getInfoByIdBloCo(payload1);
          await this.setAddedBloCo(res);
          if (
            localStorage.getItem("ctne") === null &&
            localStorage.getItem("ctel") === null
          ) {
            this.name = "";
            this.email = "";
          } else {
            this.name = localStorage.getItem("ctne");
            this.comment = localStorage.getItem("ctel");
          }
          (this.comment = ""), (this.valuation = 0), (this.tosave = false);
          this.delStatus();
        } else {
          this.status2 = "error";
          this.message2 =
            "Lo sentimos ha ocurrido un error al intentar enviar tu comentario.";
        }
      }
    },
    editValuation: async function (id, comment) {
      this.message2 = "";
      this.status2 = "";
      if (comment == undefined || comment == "" || comment == null) {
        this.message2 = "Escribe un comentario";
      } else {
        let data = {
          id: id,
          comment: comment,
        };
        let response = await this.$store.dispatch(
          "blog_comment/editItemBloCo",
          {
            option: "blog_comments",
            item: data,
          }
        );
        if (response.status == "success") {
          this.status2 = "success";
          this.message2 = "Se editó el comentario con éxito.";
          let payload1 = {
            option: "blog/blog_comments",
            id: this.blogurl.id,
          };
          const res = await this.getInfoByIdBloCo(payload1);
          await this.setAddedBloCo(res);
          (this.comment = ""), (this.editco = 0) /** , (this.tosave = false)*/;
          this.delStatus();
        } else {
          this.status2 = "error";
          this.message2 =
            "Lo sentimos ha ocurrido un error al intentar enviar tu comentario.";
        }
      }
    },
    closeLS() {
      localStorage.removeItem("ctne");
      localStorage.removeItem("ctel");
      this.name = localStorage.getItem("ctne");
      this.email = localStorage.getItem("ctel");
      this.closeU = false;
    },
  },
};
</script>
<style>
.BlogPost .tl3 {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 5.797vw;
  line-height: 7.971vw;
  text-transform: uppercase;
  color: #e21f1d;
}
.BlogPost .h-blog {
  background-image: url("../assets/bk6.png");
  background-size: 100%;
  background-position-y: bottom;
  padding-top: 51.449vw;
  padding-bottom: 14.493vw;
}
.BlogPost .h-blog p {
  font-weight: 400;
  font-size: 12.077vw;
  line-height: 13.285vw;
  font-family: "PeaceSans";
  color: white;
  text-align: center;
  margin: 0;
}
.bpost-c {
  width: 78.037vw;
  margin: 8vw auto;
}
.blogpost-body a {
  text-decoration-color: transparent;
}
.blogpost-c .post-img {
  width: 100%;
}
.bloq-item img {
  width: 100%;
}
.bpost-c .routes-c {
  margin: 0;
  padding-bottom: 10.28vw;
}
.bpost-c .routes-c,
.bpost-c .routes-c a {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 6.075vw;
  color: #e21f1d;
}
.titulo-post {
  margin: 4vw 0 0;
}
.titulo-post .cat-p {
  font-family: "Glory";
  font-weight: 700;
  font-size: 3.738vw;
  line-height: 5.374vw;
  color: #e21f1d;
  margin: 0;
}
.titulo-post .titulo-p {
  margin: 0;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 5.841vw;
  line-height: 7.009vw;
  color: #000000;
  margin-bottom: 6vw;
  text-transform: uppercase;
}
.titulo-post .post-desc {
  font-family: "Glory";
  font-weight: 700;
  font-size: 4.206vw;
  line-height: 6.075vw;
  margin: 6.308vw 0;
  color: #000000;
}
p.post-desc {
  font-weight: 700;
  font-size: 4.206vw;
  line-height: 6.075vw;
  font-family: "Glory";
  color: #000000;
}
.bloq-item p {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 3.738vw;
  line-height: 194.5%;
  color: #656565;
  margin: 1.308vw 0;
}
.fraseSq .B2Mesage {
  font-weight: 700;
  color: gray;
  margin-bottom: 0;
}
p.B3F4_P {
  font-weight: 700;
  color: gray;
}
p.B2Autor {
  margin-top: 1.5vw;
  color: #929292;
}
.blogpost-tags {
  display: flex;
  flex-wrap: wrap;
}
.blogpost-tags p {
  background: #c4c4c4;
  width: fit-content;
  font-weight: 400;
  font-size: 3.271vw;
  line-height: 7.009vw;
  color: #ffffff;
  padding: 0 3vw;
  margin: 0 4vw 0 0;
}
.sm-blogpost {
  margin: 9.813vw 0;
  padding-bottom: 14.953vw;
  border-bottom: 0.05vw solid gainsboro;
}
.sm-blogpost p {
  font-weight: 400;
  font-size: 3.738vw;
  line-height: 7.009vw;
  color: #777777;
  margin: 0 0 1.869vw;
  font-family: "Glory";
}
.sm-blogpost .sm-i-share {
  width: 11.682vw;
  height: 11.682vw;
  margin-right: 2vw;
}
.comments-box {
  margin: 0 0 9.813vw;
  padding-bottom: 16.589vw;
  border-bottom: 0.05vw solid gainsboro;
}
.comments-box .user {
  margin: 0;
  font-weight: 700;
  font-size: 4.206vw;
  line-height: 129.5%;
  color: #e21f1d;
}
.comments-box .date {
  margin: 0;
  font-weight: 400;
  font-size: 3.738vw;
  line-height: 159%;
  letter-spacing: 0.03em;
  color: #939393;
}
.comments-box .comments {
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 194.5%;
  margin: 1vw 0;
  color: #929292;
}
.form-inputs p {
  margin: 0;
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 5.206vw;
  line-height: 129.5%;
  color: #000000;
  margin: 0 0 2vw;
}
.form-inputs .inputs {
  height: 11.449vw;
  width: 100%;
  margin-bottom: 6.776vw;
  border: 0.05vw solid #000000;
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 194.5%;
  font-family: "Glory";
  text-indent: 4%;
  color: #929292;
}
.form-inputs .txtarea {
  width: 100%;
  height: 32.71vw;
  margin-bottom: 6.776vw;
  border: 0.05vw solid #000000;
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 194.5%;
  font-family: "Glory";
  text-indent: 4%;
  color: #929292;
  resize: none;
}
.form-inputs p.close {
  color: #da9090;
  font-family: "Glory";
  margin-bottom: 4vw;
}
.adv-1 {
  font-weight: 400;
  font-size: 3.738vw;
  line-height: 5.374vw;
  color: #929292;
  font-family: "Glory";
  margin: 0 0 8.178vw;
}
.check-cont {
  align-items: flex-start;
  margin-bottom: 8.879vw;
}
.check-cont p {
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 6.075vw;
  color: #929292;
  margin: 0;
  font-family: "Glory";
}
input.send-comment {
  width: 62.15vw;
  height: 15.7vw;
  border: none;
  background: #e21f1d;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 500;
  font-size: 4.206vw;
  line-height: 129.5%;
  text-align: center;
  color: #ffffff;
  margin: auto;
  cursor: pointer;
  text-transform: uppercase;
}
.two-rows {
  display: flex;
  flex-direction: column;
  align-items: center;
}
section.comment-i {
  padding-bottom: 0;
  margin-bottom: 0;
  border-bottom: none;
}
section.comment-i:nth-child(3n) {
  padding-bottom: 0;
  margin-bottom: 0;
  border-bottom: none;
}

.pagination {
  width: 37.383vw;
  margin: 13.785vw auto 0;
  display: flex;
  justify-content: space-between;
}
.pagination img {
  width: 14.72vw;
  height: 14.72vw;
}
.pagination img.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.widget-sec.uno {
  padding-bottom: 22vw;
}
.comment-i .edit-c p {
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 194.5%;
  margin: 1vw 0;
  color: #e21f1d;
  cursor: pointer;
}
.blogpost-author {
  background: #000000;
  border-radius: 0 0 4.167vw 4.167vw;
  padding: 7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10.386vw 0;
}
.blogpost-author p {
  margin: 0;
}
.blogpost-author img {
  width: 25.604vw;
}
.blogpost-author .p1 {
  font-weight: 400;
  font-size: 4.831vw;
  line-height: 4.831vw;
  text-align: center;
  color: #ffffff;
  font-family: "PeaceSans";
  text-transform: uppercase;
  margin: 4vw 0;
}
.blogpost-author .link {
  font-weight: 400;
  font-size: 3.865vw;
  line-height: 4.348vw;
  color: #f70017;
  text-align: center;
  transition: 0.5s;
}
.blogpost-author .link:hover {
  color: white;
}
  .bloq-item li {
    font-family: "Glory";
    font-style: normal;
    font-weight: 400;
    font-size: 3.738vw;
    line-height: 194.5%;
    color: #656565;
    margin: 2.308vw 0;
  }
  .bloq-item h4,.bloq-item h3{
    font-family: "Glory";
    font-style: normal;
    font-weight: 700;
    font-size: 3.738vw;
    line-height: 194.5%;
    color: #656565;
    margin: 0.308vw 0;
  }
  .bloq-item ol {
    margin: 0;
    padding-left: 6vw;
}
@media (max-width: 767px) {
}
@media (min-width: 768px) {
  .BlogPost .tl3 {
    font-size: 1.389vw;
    line-height: 1.944vw;
  }
  .BlogPost .h-blog {
    background-image: url("../assets/bk6pc.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 26.875vw;
    padding-bottom: 4.931vw;
  }
  .BlogPost .h-blog p {
    font-size: 3.472vw;
    line-height: 3.472vw;
  }
  .comment-i .edit-c p {
    font-size: 0.833vw;
    line-height: 1.198vw;
    color: #219176;
    margin: 0.3vw 0 1vw;
  }
  .bpost-c {
    display: flex;
    justify-content: space-between;
  }
  .bpost-c .routes-c {
    padding-bottom: 4.635vw;
  }
  .bpost-c .routes-c,
  .bpost-c .routes-c a {
    font-size: 0.938vw;
    line-height: 1.354vw;
  }
  .bpost-c {
    width: 74.688vw;
    margin: 3vw auto;
  }
  .titulo-post .cat-p {
    font-size: 0.729vw;
    line-height: 1.042vw;
  }
  .titulo-post .titulo-p {
    font-size: 1.563vw;
    line-height: 1.875vw;
    margin-bottom: 1.927vw;
  }
  .bpost-c .widget-sec.uno {
    width: 47.604vw;
  }
  p.post-desc {
    font-size: 1.111vw;
    line-height: 2.083vw;
  }
  .bloq-item p {
    font-size: 1.111vw;
    line-height: 2.083vw;
    margin: 0;
  }
  .bloq-item li {
    font-size: 1.111vw;
    line-height: 2.083vw;
    margin: 0;
}

  .bloq-item h4,.bloq-item h3{
    font-size: 1.111vw;
    line-height: 2.083vw;
    margin: 0;

  }

  .bloq-item ol {
    font-size: 1.111vw;
    line-height: 2.083vw;
    margin: 0;
    padding-left: 2vw;
}
  .bloq-item {
    display: flex;
    margin: 2vw 0;
  }
  .bloq-item img {
    width: 50%;
    margin: auto;
  }
  .B2F1 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .col-caja {
    width: 45%;
  }
  .bloq-item .col-caja img {
    width: 100%;
  }
  .blogpost-tags p {
    font-size: 0.729vw;
    line-height: 1.563vw;
    padding: 0 1vw;
    margin: 0 0.41vw 0 0;
  }
  .sm-blogpost p {
    font-size: 0.833vw;
    line-height: 1.563vw;
    margin-right: 0.833vw;
  }
  .sm-blogpost .sm-i-share {
    width: 1.615vw;
    height: 1.615vw;
    margin-right: 0.32vw;
  }
  .sm-blogpost {
    display: flex;
    margin: 1.927vw 0;
    padding-bottom: 2.396vw;
  }
  .comments-box {
    margin: 0 0 1.563vw;
    padding: 2.396vw 0 /* 1.563vw*/;
  }
  .comments-box .comments {
    font-size: 1.111vw;
    line-height: 2.083vw;
    color: #929292;
    margin: 0;
  }
  .comments-box .user {
    font-size: 1.111vw;
    line-height: 2.083vw;
  }
  .comments-box .date {
    font-size: 1.111vw;
    line-height: 2.083vw;
  }
  .form-inputs {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    height: auto;
  }
  .form-inputs p.close {
    margin-bottom: 0;
  }
  .form-inputs p {
    font-size: 1.111vw;
    line-height: 2.083vw;
    width: fit-content;
    margin: 0 0 0vw;
  }
  .form-inputs .inputs {
    width: 37.986vw;
    height: 2.552vw;
    font-size: 0.729vw;
    line-height: 194.5%;
    margin-bottom: 1.094vw;
  }
  .form-inputs .txtarea {
    width: 37.986vw;
    height: 7.292vw;
    font-size: 0.729vw;
    line-height: 194.5%;
    margin-bottom: 1.094vw;
  }
  .form-inputs.hgt {
    height: 12vw;
  }
  .adv-1 {
    font-size: 0.925vw;
    line-height: 0.985vw;
    margin: 0 0 1.51vw;
  }
  .two-rows {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .check-cont {
    align-items: flex-start;
    margin-bottom: 0;
    width: 24vw;
  }
  .check-cont p {
    font-size: 0.925vw;
    line-height: 0.985vw;
  }
  input.send-comment {
    width: 16.736vw;
    height: 3.542vw;
    font-family: "PeaceSans";
    font-style: normal;
    font-weight: 100;
    font-size: 1.111vw;
    line-height: 116%;
    text-align: center;
    color: #ffffff;
    margin: 0 0 0 auto;
  }
  .comments-sec form {
    width: 37.986vw;
    padding: 0 1.979vw 0 0;
  }
  section.comment-i {
    padding-bottom: 2.344vw;
    margin-bottom: 2.344vw;
    border-bottom: 0.05vw solid gainsboro;
  }
  .pagination {
    width: 6.383vw;
    margin: 0 auto 4vw;
    display: flex;
    justify-content: space-between;
  }
  .pagination img {
    width: 2.72vw;
    height: 2.72vw;
  }
  .extw {
    width: 37.986vw !important;
  }
  .widget-sec.uno {
    padding-bottom: 0;
  }
  .widget-sec.dos {
    width: 14.306vw;
  }
  .blogpost-author img {
    width: 6.25vw;
  }
  .blogpost-author {
    background: #000000;
    border-radius: 0 4.167vw 4.167vw 0;
    padding: 2vw;
    flex-direction: row;
    margin: 5.386vw 0;
    width: fit-content;
  }
  .blogpost-author .p1 {
    font-size: 1.389vw;
    line-height: 1.389vw;
    margin: 0 0 1vw;
  }
  .blogpost-author .link {
    font-size: 0.972vw;
    line-height: 1.111vw;
  }
  .blogpost-author .co1 {
    margin-left: 1.2vw;
  }
}
</style>
