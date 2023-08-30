<template>
  <div class="Producto">
    <Navigator />
    <div class="head-nav-cont">
      <div class="nav-product">
        <div class="nav-pro-cont">
          <input type="checkbox" name="check" id="checknav" />
          <label for="checknav" class="label1">
            <div class="nav-btn">
              <p>CATEGORÍA</p>
              <img src="" alt="arrow" />
            </div>
          </label>

          <!--<div class="nav-free-send" v-if="gp && gp[0].free_shipping > 0 ">
            <img src="" alt="trailer" />
            <p>{{gp[0].texto}} ${{gp[0].free_shipping}}MXN</p>
          </div>-->
        </div>
      </div>
      <!--<div class="header-prod  pc" :style="{'background-image':'url('+isWebp(require(''), require(''))+')'}"></div>
      <div class="header-prod mo " :style="{'background-image':'url('+isWebp(require(''), require(''))+')'}"></div>-->
    </div>

    <div class="producto-body">
      <div class="pro-sec">
        <section class="producto-cont">
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-duration="700"
          >
            <div class="prod-image pc"></div>
            <carousel
              :perPage="3"
              navigationEnabled
              class="gallery-sl pc"
              v-if="data.imagenes && data.imagenes.length > 1"
              paginationActiveColor="#fe9128"
              paginationColor="#b1b1b1"
            >
              <slide
                class="gallery-item"
                v-for="(bnr, key) in data.imagenes"
                :key="key"
              >
              </slide>
            </carousel>
          </div>
          <div class="info-cont">
            <p
              class="titulo-info"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <!--TITULO-->
              {{ data.name }}
            </p>
            <p
              class="brand-info"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <!--MARCA-->
              Categoría {{ data.category_name }}
            </p>
            <p
              class="price-info"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <!--PRECIO-->
              ${{ data.price }}MXN
            </p>

            <div
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <div class="prod-image mo"></div>
              <carousel
                :perPage="3"
                navigationEnabled
                class="gallery-sl mo"
                v-if="data.imagenes && data.imagenes.length > 1"
                paginationActiveColor="#fe9128"
                paginationColor="#b1b1b1"
              >
                <slide
                  class="gallery-item"
                  v-for="(bnr, key) in data.imagenes"
                  :key="key"
                >
                </slide>
              </carousel>
            </div>

            <p
              class="descrp-info"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <!--INFORMACIÓN-->
              {{ data.descrp }}
            </p>

            <p class="message-error" v-if="this.messageError">
              {{ this.messageError }}
            </p>
            <!-- atributos -->
            <div
              class="atributos-cont"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
              v-for="(item, key) in data.atributosFilt"
              :key="key"
            >
              <div class="dflx">
                <p class="atributo">{{ item.atributo }}:</p>
                <div class="content-valor-select">
                  <p class="valor-select">{{ item.sel }}</p>
                </div>
              </div>
              <div class="dflx">
                <div v-for="(valor, key2) in item.values" :key="key2">
                  <p
                    class="pvalue"
                    :class="{ 'active-value': valor == item.sel }"
                    @click="
                      (item.sel = valor), findProd(item.atributo, valor, data)
                    "
                  >
                    {{ valor }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="cantidad-cont"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <p class="cnt">Cantidad:</p>
              <div class="cantidad-op-cont">
                <input type="checkbox" name="check" id="checkoptions" />
                <label for="checkoptions">
                  <div class="cant-select">
                    <div class="c-s-cont">
                      <p>{{ selectNumb }}</p>
                      <img src="" alt="flecha" />
                    </div>
                  </div>
                </label>
                <div class="number-selects" id="numbSel">
                  <div class="number-s-cont" @click="isfalse()">
                    <p v-for="i in 100" :key="i" @click="selectNumb = i">
                      {{ i }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="two-btn-cont">
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-duration="700"
              >
                <div class="add-cart" @click="agregarItem(selectNumb)">
                  <p>AGREGAR EL CARRITO</p>
                </div>
              </div>
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-duration="700"
              >
                <div
                  class="shop-cart"
                  @mouseover="hover1 = true"
                  @mouseleave="hover1 = false"
                  @click="agregarItem2(selectNumb)"
                >
                  <!-- --->
                  <img src="" alt="cart" v-if="hover1 == true" />
                  <img src="" alt="cart" v-else />
                  <p>COMPRAR AHORA</p>
                </div>
              </div>
            </div>

            <!-- Mensaje de error o exito. --->
            <div v-if="status != ''" class="status_messages">
              <div v-if="status == 'success'" class="msg msg_success">
                <p>{{ message }}</p>
              </div>
              <div v-if="status == 'error'" class="msg msg_error">
                <p>{{ message }}</p>
              </div>
            </div>
          </div>
        </section>
        <p
          class="comments-title"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-duration="700"
        >
          COMENTARIOS
        </p>
        <section class="comments-sec" id="comentarios">
          <div class="comments-box" v-if="addedCo !== 'error'">
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
              <div class="five-stars">
                <div
                  class="star-i small-star"
                  :class="{ active: a.valuation >= 1 }"
                ></div>
                <div
                  class="star-i small-star"
                  :class="{ active: a.valuation >= 2 }"
                ></div>
                <div
                  class="star-i small-star"
                  :class="{ active: a.valuation >= 3 }"
                ></div>
                <div
                  class="star-i small-star"
                  :class="{ active: a.valuation >= 4 }"
                ></div>
                <div
                  class="star-i small-star"
                  :class="{ active: a.valuation >= 5 }"
                ></div>
              </div>
              <p class="comments">{{ a.comment }}</p>
              <section class="edit-c" v-if="logisav == true">
                <p
                  v-if="identity.email == a.email"
                  @click="(editco = a.id) && (comment = a.comment)"
                >
                  Editar comentario
                </p>
              </section>
              <p class="date">
                {{ a.dateproduct }} <span>{{ a.hourproduct }}</span>
              </p>
            </section>
            <div
              class="pagination"
              v-if="arraylength > 3"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <img
                src=""
                alt="prev"
                @click="pageNum -= 1"
                class="pointer"
                :class="{ disabled: pageNum == 1 }"
              />
              <img
                src=""
                alt="next"
                @click="pageNum += 1"
                class="pointer"
                :class="{ disabled: pageNum == totalPages }"
              />
            </div>
          </div>
          <div
            class="comments-box"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-duration="700"
            v-else
          >
            <p class="comments">No hay comentarios.</p>
          </div>
          <form
            @submit.prevent="
              sendValuation(
                data.id,
                identity.fullname,
                identity.email,
                comment,
                valuation,
                tosave
              )
            "
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-duration="700"
            v-if="logisav == true"
          >
            <div class="form-inputs" :class="{ hgt: closeU }">
              <div
                class="valuation-c"
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-duration="700"
              >
                <p>TU PUNTUACIÓN*:</p>
                <div class="five-stars">
                  <div
                    class="star-i pointer"
                    :class="{ active: valuation >= 1 || hoverval >= 1 }"
                    @mouseover="hoverval = 1"
                    @mouseout="hoverval = 0"
                    @click="valuation = 1"
                  ></div>
                  <div
                    class="star-i pointer"
                    :class="{ active: valuation >= 2 || hoverval >= 2 }"
                    @mouseover="hoverval = 2"
                    @mouseout="hoverval = 0"
                    @click="valuation = 2"
                  ></div>
                  <div
                    class="star-i pointer"
                    :class="{ active: valuation >= 3 || hoverval >= 3 }"
                    @mouseover="hoverval = 3"
                    @mouseout="hoverval = 0"
                    @click="valuation = 3"
                  ></div>
                  <div
                    class="star-i pointer"
                    :class="{ active: valuation >= 4 || hoverval >= 4 }"
                    @mouseover="hoverval = 4"
                    @mouseout="hoverval = 0"
                    @click="valuation = 4"
                  ></div>
                  <div
                    class="star-i pointer"
                    :class="{ active: valuation >= 5 || hoverval >= 5 }"
                    @mouseover="hoverval = 5"
                    @mouseout="hoverval = 0"
                    @click="valuation = 5"
                  ></div>
                </div>
              </div>
              <section>
                <p
                  class="close pointer"
                  @click="closeLS()"
                  v-if="closeU == true"
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-duration="700"
                >
                  Eliminar usuario
                </p>
              </section>

              <!--<section
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-duration="700">
              <p>NOMBRE*:</p>
              <input
                type="text"
                name="name"
                placeholder="Nombre a mostrar"
                class="inputs"
                v-model="name"
              /></section>
              <section
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-duration="700">
              <p>CORREO ELECTRÓNICO*:</p>
              <input
                type="text"
                name="email"
                placeholder="Correo electrónico"
                class="inputs"
                v-model="email"
              /></section>-->
              <section
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-duration="700"
              >
                <p class="comments-p" :class="{ coblue: editco > 0 }">
                  COMENTARIO:
                </p>
                <textarea
                  name="comentario"
                  placeholder="¿Qué te pareció este producto?"
                  class="txtarea"
                  v-model="comment"
                  :class="{ bblue: editco > 0 }"
                ></textarea>
              </section>
            </div>
            <!--<p class="adv-1"
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-duration="700">
              Tu dirección de correo electrónico no será publicada.
            </p>-->
            <div
              class="two-rows"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <!--<div class="check-cont dflx">
                <input type="checkbox" name="" v-model="tosave" />
                <p>
                  Guardar mi nombre, correo electrónico y sitio web en este
                  navegador para la próxima vez que haga un comentario.
                </p>
              </div>-->

              <input
                type="submit"
                value="ENVIAR"
                class="send-comment"
                v-if="editco == 0"
              />
              <input
                type="button"
                value="EDITAR"
                class="send-comment editco"
                v-else
                @click="editValuation(editco, comment, valuation)"
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
          <div v-else class="not-logged-com">
            <div
              class="nlc-cont"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
            >
              <p>
                <b>¿Quieres hacer una reseña del producto?</b>
                <a href="/login">Inicia sesión aquí</a> o si no tienes una
                cuenta, <a href="/login">regístrate</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigator from "../components/items/Navigator.vue";
import Footer from "../components/items/Footer.vue";
let urlpath = require("../global/index");
import { mapActions } from "vuex";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "ProductoShop",
  data() {
    return {
      hover1: false,
      editco: 0,
      selectNumb: 1,
      urlpath,
      status: "",
      message: "",
      status2: "",
      message2: "",
      name:
        localStorage.getItem("sdel") === null
          ? ""
          : localStorage.getItem("sdel"),
      email:
        localStorage.getItem("sdel") === null
          ? ""
          : localStorage.getItem("sdel"),
      comment: "",
      valuation: 0,
      hoverval: 0,
      tosave: false,
      closeU:
        localStorage.getItem("sdne") === null &&
        localStorage.getItem("sdel") === null
          ? false
          : true,
      messageError: "",
      titlego: "",
      imagesel: "",
      pageNum: 1,
      pageSize: 3,
      arraylength: 0,
      logisav: localStorage.getItem("tkn") === null ? false : true,
    };
  },
  components: {
    Carousel,
    Slide,
    Navigator,
    Footer,
  },

  metaInfo() {
    return {
      title: this.data.name,
      titleTemplate: "%s | Huupa",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content: this.data.descrp,
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    };
  },
  async created() {
    let payload = {
      option: "product/url",
      url: this.$route.params.url,
    };
    await this.findByUrlPro(payload);

    let payload1 = {
      option: "product/product_val",
      id: 1,
    };
    let res = await this.getInfoByIdProVal(payload1);

    await this.setAddedProVal(res);
    await this.getIdentity();
    //await this.getAllInfoGlp('global_params')
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
    data() {
      let data = this.$store.getters["product/data"];
   
      this.titlego = data.name;
      return data;
    },
    addedCo() {
      let array = this.$store.getters["product_val/getAdded"];
      this.arraylength = array.length;
      if (array == "error") {
        return "error";
      } else {
        let arr = array.slice(
          (this.pageNum - 1) * this.pageSize,
          this.pageNum * this.pageSize
        );
        return arr;
      }
    },
    proId2() {
      let arr = this.$store.getters["product_val/data"];
      if (this.editco == 0) {
        return "error";
      } else {
        let added = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == this.editco) {
            added.push(arr[i]);
          }
        }
        return added;
      }
    },
    totalPages() {
      let total = Math.ceil(this.arraylength / this.pageSize);
      if (total < this.pageNum) {
        this.pageNum = 1;
      }
      return total;
    },
    gp() {
      let arr = this.$store.getters["global_params/data"];
      let filter = [];
      if (!Array.isArray(arr)) {
        return [];
      } else {
        filter = arr;
      }

      return filter;
    },
  },
  methods: {
    ...mapActions("product", ["findByUrlPro"]),
    ...mapActions("product", ["getInfoByIdPro"]),
    ...mapActions("product_val", ["setAddedProVal"]),
    ...mapActions("product_val", ["getInfoByIdProVal"]),
    ...mapActions("product_val", ["getAllInfoProVal"]),
    ...mapActions("global_params", ["getAllInfoGlp"]),

    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },

    isfalse() {
      let checkBox = document.getElementById("checkoptions");
      checkBox.checked = false;
    },

    agregarItem: async function (cantidad) {
      let payload = {
        item: this.data,
        _ctk: localStorage.getItem("_ctk"),
        cantidad,
      };

      let result = await this.$store.dispatch("carrito/editItemCrt", {
        option: "add_item",
        item: payload,
      });

      if (result.status == "error") {
        this.status = "error";
        this.message = result.message;
        this.delStatus();
      } else {
        // success
        this.$router.push("/carrito").catch((err) => {});
      }
    },
    //Mandar al checkout
    agregarItem2: async function (cantidad) {
      let payload = {
        item: this.data,
        _ctk: localStorage.getItem("_ctk"),
        cantidad,
      };

      let result = await this.$store.dispatch("carrito/editItemCrt", {
        option: "add_item",
        item: payload,
      });

      if (result.status == "error") {
        this.status = "error";
        this.message = result.message;
        this.delStatus();
      } else {
        // success
        this.$router.push("/check-out").catch((err) => {});
      }
    },

    delStatus: function () {
      setTimeout(() => this.delMsgs(), 2000);
    },
    delMsgs: function () {
      this.status = "";
      this.message = "";
      this.status2 = "";
      this.message2 = "";
      this.messageError = "";
    },
    findProd: async function (atributo, valor, data) {
      this.messageError = "";

      let secundarios = [];
      for (const item of data.atributosFilt) {
        if (item.atributo != atributo) {
          secundarios.push({
            atributo: item.atributo,
            valor: item.sel,
          });
        }
      }

   

      let encontrados = [];
      for (const item of data.product_variantes) {
        for (const atributos of item.producto.product_atributo_valores) {
          if (atributos.atributo == atributo && atributos.valor == valor) {
            encontrados.push(item.producto);
            break;
          }
        }
      }
      if (encontrados.length == 0) {
        const att = atributo.toLowerCase();
        this.messageError = `No hay mas variantes disponibles por el momento para ${att} ${valor}.`;
        this.delStatus();
        return null;
      }

      
      let coincidencias = [];
      let producto = encontrados[0];
      if (encontrados.length > 1) {
        for (const producto of encontrados) {
          let count = 0;
          for (const atributos of producto.product_atributo_valores) {
            for (const attsec of secundarios) {
              if (
                atributos.atributo == attsec.atributo &&
                atributos.valor == attsec.valor
              ) {
                count++;
                break;
              }
            }
          }
          coincidencias.push(count);
        }
    
        let encontrado = coincidencias[0];
        let index = 0;
        for (var i = 1; i < encontrados.length; i++) {
          if (coincidencias[i] > encontrado) {
            encontrado = coincidencias[i];
            index = i;
          }
        }

      

        producto = encontrados[index];
      }
  

      if (producto.id) {
        let payload = {
          option: "product",
          id: producto.id,
        };
        await this.getInfoByIdPro(payload);

        const url = "/producto/" + this.data.url;
        this.$router.push(url).catch((err) => {});
      }
    },
    sendValuation: async function (
      id_product,
      name,
      email,
      comment,
      valuation
    ) {
      this.message2 = "";
      this.status2 = "";
      if (valuation == undefined || valuation == "" || valuation == null) {
        this.message2 = "Califíca el producto.";
        this.status2 = "error";
      } else {
        let data = {
          name: name,
          id_product: id_product,
          email: email,
          comment: comment,
          valuation: valuation,
        };
        let response = await this.$store.dispatch("product_val/addItemProVal", {
          option: "product_val",
          item: data,
        });

       
        if (response.status == "success") {
          this.status2 = "success";
          this.message2 = "Se agregó el comentario con éxito.";
          let payload1 = {
            option: "product/product_val",
            id: this.data.id,
          };
          const res = await this.getInfoByIdProVal(payload1);
          await this.setAddedProVal(res);
          (this.comment = ""),
            (this.valuation = 0) /** , (this.tosave = false)*/;
          this.delStatus();
        } else {
          this.status2 = "error";
          this.message2 =
            "Lo sentimos ha ocurrido un error al intentar enviar tu comentario.";
        }
      }
    },
    editValuation: async function (id, comment, valuation) {
      this.message2 = "";
      this.status2 = "";
      if (valuation == undefined || valuation == "" || valuation == null) {
        this.message2 = "Califíca el producto.";
        this.status2 = "error";
      } else {
        let data = {
          id: id,
          comment: comment,
          valuation: valuation,
        };
        let response = await this.$store.dispatch(
          "product_val/editItemProVal",
          {
            option: "product_val",
            item: data,
          }
        );
        if (response.status == "success") {
          this.status2 = "success";
          this.message2 = "Se editó el comentario con éxito.";
          let payload1 = {
            option: "product/product_val",
            id: this.data.id,
          };
          const res = await this.getInfoByIdProVal(payload1);
          await this.setAddedProVal(res);
          (this.comment = ""),
            (this.valuation = 0),
            (this.editco = 0) /** , (this.tosave = false)*/;
          this.delStatus();
        } else {
          this.status2 = "error";
          this.message2 =
            "Lo sentimos ha ocurrido un error al intentar enviar tu comentario.";
        }
      }
    },

    regexImg(txt) {
      let s = txt.split(".");
      return s[0] + ".webp";
    },
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
    /*closeLS() {
      localStorage.removeItem("sdne");
      localStorage.removeItem("sdel");
      this.name = localStorage.getItem("sdne");
      this.email = localStorage.getItem("sdel");
      this.closeU = false;
    },*/
  },
  /*watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || `Tienda - Agriga de México`;
      },
    },
  },*/
};
</script>
<style>
p.pvalue {
  padding: 0vw 2vw;
  height: 2.552vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  cursor: pointer;
  border: 1px solid #fe9128;
  color: #fe9128;
  background: white;
  overflow: auto;

  margin-right: 0.2vw;
}
p.pvalue:hover {
  color: white;
  background: #fe9128;
}

p.active-value {
  color: white;
  background: #fe9128;
}

p.atributo {
  font-weight: 700;
  font-size: 0.781vw;
  line-height: 129.5%;
  text-align: center;
  color: #929292;
  padding-right: 0.885vw;
}
p.valor-select {
  font-weight: 400;
  font-size: 0.781vw;
  line-height: 129.5%;
  text-align: center;
  color: #929292;
  padding-right: 0.885vw;
}

a,
p {
  font-family: "Helvetica World Regular";
}
.nav-product {
  background: #fe9128;
  display: flex;
  justify-content: center;
  align-items: center;
}
input#checknav {
  display: none;
}
.nav-pro-cont {
  width: 100%;
  padding: 0.729vw 3.49vw;
  display: flex;
  justify-content: space-between;
}
.nav-free-send {
  display: flex;
  align-items: center;
}
.nav-free-send img {
  width: auto;
  height: 1.563vw;
  margin-right: 1.771vw;
}
.nav-free-send p {
  font-family: "Intro Rust";
  font-style: normal;
  font-weight: 400;
  font-size: 1.563vw;
  line-height: 99.5%;
  color: #ffffff;
  margin: 0;
}
.nav-options {
  display: flex;
  align-items: center;
  width: 37.76vw;
  justify-content: space-between;
  z-index: 9;
}
.nav-options a {
  font-weight: 700;
  font-size: 0.781vw;
  line-height: 194.5%;
  color: #ffffff;
  text-decoration-color: transparent;
  transition: 0.5s;
}
.nav-options a:hover {
  text-decoration-color: #ffffff;
}
.header-prod {
  width: 100%;
  height: 5.365vw;
  /*background-image: url("../assets/banner1.png");*/
  background-size: 100%;
  background-repeat: no-repeat;
}
.cant-select {
  display: flex;
  width: 3.49vw;
  height: 2.396vw;
  align-items: center;
  justify-content: center;
  /*justify-content: space-evenly;*/
  border: 1px solid gainsboro;
}
.c-s-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 2.083vw;
}
.number-selects {
  width: 3.49vw;
  height: 0;
  pointer-events: none;
  overflow: hidden;
  border: none;
  position: absolute;
  background: white;
  transition: 0.5s;
}
#checkoptions:checked ~ .number-selects {
  height: 10vw;
  border: 1px solid gainsboro;
  pointer-events: all;
}
.number-s-cont {
  overflow-y: scroll;
  height: 10vw;
}
.pro-sec {
  padding: 5.052vw 0 12.708vw;
  width: 75.677vw;
  height: auto;
  margin: auto;
}
.producto-cont {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.number-s-cont p {
  margin: 0;
  cursor: pointer;
  width: 100%;
  height: 2vw;
  font-weight: 400;
  font-size: 0.781vw;
  line-height: 129.5%;
  color: #929292;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: 0.5s;
}
.number-s-cont p:hover {
  background-color: rgb(227, 225, 225);
}
.cantidad-cont {
  display: flex;
  position: relative;
  z-index: 9;
}
.atributos-cont {
  position: relative;
  z-index: 9;
}
.cantidad-op-cont input {
  display: none;
}
.prod-image {
  width: 30.833vw;
  height: 36.094vw;
  border: 1.5px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.prod-image img {
  width: 17.396vw;
  height: auto;
}
.prod-image.pc,
.gallery-sl.pc {
  display: flex;
}
.prod-image.mo,
.gallery-sl.mo {
  display: none;
}
.info-cont {
  width: 40.365vw;
  height: auto;
  padding-top: 1.563vw;
}
p.titulo-info {
  margin: 0;
  font-family: "Intro Rust";
  font-style: normal;
  font-weight: 400;
  font-size: 2.083vw;
  line-height: 2.5vw;
  color: #000702;
}
p.brand-info {
  padding: 0.781vw 0;
  margin: 0;
  font-weight: 400;
  font-size: 0.781vw;
  line-height: 129.5%;
  color: #929292;
}
p.price-info {
  margin: 0;
  font-family: "Intro Rust";
  font-style: normal;
  font-weight: 400;
  font-size: 1.823vw;
  line-height: 129.5%;
  color: #3ebdb1;
}
p.descrp-info {
  font-weight: 400;
  font-size: 0.729vw;
  line-height: 194.5%;
  color: #929292;
  margin: 2.344vw 0;
  width: 33.281vw;
}
.cantidad-cont .cnt {
  font-weight: 700;
  font-size: 0.781vw;
  line-height: 129.5%;
  text-align: center;
  color: #929292;
  padding-right: 0.885vw;
}
.cant-select p {
  font-size: 0.781vw;
  color: #929292;
  margin: 0;
}
.cant-select img {
  width: 0.469vw;
  height: 0.469vw;
}
.two-btn-cont {
  padding-top: 3.073vw;
  display: flex;
  justify-content: space-between;
  width: 20.781vw;
}
.add-cart,
.shop-cart {
  width: 9.948vw;
  height: 2.552vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  cursor: pointer;
}
.add-cart p,
.shop-cart p {
  font-family: "Intro Rust";
  font-weight: 400;
  font-size: 0.521vw;
  line-height: 129.5%;
}
.add-cart {
  color: #fe9128;
  border: 1px solid #fe9128;
  background: white;
}
.add-cart:hover {
  color: white;
  background: #fe9128;
}
.shop-cart {
  color: #fe9128;
  background: white;
  border: 1px solid #fe9128;
}
.shop-cart:hover {
  color: white;
  background: #fe9128;
}
.shop-cart img {
  width: 0.781vw;
  height: 0.781vw;
  padding-right: 0.481vw;
}
.label1 {
  display: none;
}
.gallery-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gallery-item img {
  width: auto;
  height: 6vw;
  cursor: pointer;
}
.gallery-sl {
  padding-top: 1.4vw;
}

.comments-box {
  margin: 0 0 9.813vw;
  padding-bottom: 16.589vw;
  border-bottom: 0.05vw solid gainsboro;
}
.comments-box .user {
  margin: 0;
  font-size: 4.206vw;
  font-weight: 400;
  line-height: 129.5%;
  color: #000000;
  font-family: "Intro Rust";
  text-transform: uppercase;
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
  font-family: "Intro Rust";
  font-style: normal;
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 129.5%;
  color: #fe9128;
}
.form-inputs p.close {
  color: #da9090;
  font-family: "Helvetica World Regular";
  margin-bottom: 4vw;
}
.form-inputs .inputs {
  height: 11.449vw;
  width: 100%;
  margin-bottom: 6.776vw;
  border: 0.05vw solid #fe9128;
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 194.5%;
  font-family: "Helvetica World Regular";
  text-indent: 4%;
  color: #929292;
}
.form-inputs .txtarea {
  width: 100%;
  height: 32.71vw;
  margin-bottom: 6.776vw;
  border: 0.05vw solid #fe9128;
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 194.5%;
  font-family: "Helvetica World Regular";
  text-indent: 4%;
  color: #929292;
  resize: none;
}
.adv-1 {
  font-weight: 400;
  font-size: 3.738vw;
  line-height: 5.374vw;
  color: #929292;
  font-family: "Helvetica World Regular";
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
  font-family: "Helvetica World Regular";
}
input.send-comment {
  width: 62.15vw;
  height: 17.29vw;
  border: none;
  /*background-image: url('');*/
  background-color: #fe9128;
  text-indent: 8vw;
  background-size: 100%;
  background-repeat: no-repeat;
  font-family: "Intro Rust";
  font-style: normal;
  font-weight: 400;
  font-size: 2.336vw;
  line-height: 129.5%;
  text-align: center;
  color: #ffffff;
  margin: auto;
  cursor: pointer;
}
input.send-comment.editco {
  background-color: #219176;
  background-image: none !important;
  text-indent: 0;
}
.two-rows {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.valuation-c {
  margin: 4.206vw 0 5.07vw;
}
.valuation-c p {
  color: black;
}
.five-stars {
  display: flex;
}
.star-i {
  width: 11.916vw;
  height: 11.916vw;
  /*background-image: url("");*/
  background-size: 11.916vw;
  background-repeat: no-repeat;
  transition: 0.25s;
}
.star-i.active {
  /*background-image: url("") !important;*/
  background-size: 11.916vw;
}
.star-i.small-star,
.star-i.small-star.active {
  width: 4.673vw;
  height: 4.673vw;
  background-size: 4.673vw;
}
section.comment-i {
  padding-bottom: 9.813vw;
  margin-bottom: 9.813vw;
  border-bottom: 0.05vw solid gainsboro;
}
section.comment-i:nth-child(3n) {
  padding-bottom: 0;
  margin-bottom: 0;
  border-bottom: none;
}
.comment-i .edit-c p {
  font-weight: 400;
  font-size: 4.206vw;
  line-height: 194.5%;
  margin: 1vw 0;
  color: #219176;
  cursor: pointer;
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
p.comments-title {
  font-size: 5.14vw;
  line-height: 5.14vw;
  margin: 0 0 11.449vw;
  text-align: center;
  font-family: "Intro Rust";
}
.not-logged-com {
  width: 38vw;
}
.not-logged-com p {
  font-weight: 400;
  font-size: 0.729vw;
  line-height: 194.5%;
  color: #929292;
  margin: 2.344vw 0;
  width: 33.281vw;
}
.not-logged-com p a {
  color: var(--oro);
}
@media (max-width: 768px) {
  .label1 {
    display: block;
  }
  .head-nav-cont {
    display: flex;
    flex-direction: column-reverse;
  }
  .header-prod {
    height: 22.879vw;
    /*background-image: url("../assets/banner2.png");*/
  }
  .producto-cont {
    flex-direction: column-reverse;
    padding: 11.594vw 0 27.778vw;
  }
  .prod-image.pc,
  .gallery-sl.pc {
    display: none;
  }
  .prod-image.mo,
  .gallery-sl.mo {
    display: flex;
  }
  p.titulo-info {
    font-size: 5.314vw;
    line-height: 6.28vw;
  }
  .info-cont {
    width: 100%;
    padding-top: 0;
  }
  p.brand-info {
    padding: 3.382vw 0;
    font-size: 3.14vw;
  }
  p.price-info {
    font-size: 6.28vw;
  }
  .prod-image {
    margin-top: 13.285vw;
    width: 100%;
    height: 93.478vw;
  }
  .prod-image img {
    width: 43.396vw;
    height: auto;
  }
  p.descrp-info {
    font-size: 3.382vw;
    margin: 12.802vw 0;
    width: 100%;
  }
  .cantidad-cont .cnt {
    font-size: 3.623vw;
    padding-right: 1.885vw;
  }
  .cant-select {
    width: 16.184vw;
    height: 11.111vw;
  }
  .c-s-cont {
    width: 5.607vw;
  }
  #checkoptions:checked ~ .number-selects {
    height: 39vw;
    pointer-events: all;
  }
  .number-s-cont {
    height: 39vw;
  }
  .number-selects {
    width: 16.184vw;
  }
  .cant-select p {
    font-size: 2.781vw;
  }
  .number-s-cont p {
    height: 6vw;
    font-size: 2.781vw;
  }
  .cant-select img {
    width: 1.469vw;
    height: 1.469vw;
  }
  .two-btn-cont {
    padding-top: 17.633vw;
    width: 100%;
    flex-direction: column;
  }
  .add-cart,
  .shop-cart {
    width: 100%;
    height: 16.425vw;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    cursor: pointer;
  }
  .add-cart p,
  .shop-cart p {
    font-family: "Intro Rust";
    font-weight: 400;
    font-size: 2.415vw;
    line-height: 129.5%;
  }
  .shop-cart img {
    width: 3.781vw;
    height: 3.781vw;
    padding-right: 3.481vw;
  }
  .add-cart {
    margin-bottom: 1.932vw;
  }
  .nav-btn {
    display: flex;
    align-items: center;
    border-bottom: 1px solid transparent;
    transition: 0.5s;
  }
  .nav-btn:hover {
    border-bottom: 1px solid white;
  }
  .nav-btn p {
    font-weight: 700;
    font-size: 2.899vw;
    line-height: 194.5%;
    color: #ffffff;
    margin: 0;
    padding-right: 0.8vw;
  }
  .nav-btn img {
    width: 1.932vw;
    height: 1.932vw;
  }
  .nav-pro-cont {
    padding: 2.899vw 7.246vw;
  }
  .nav-options {
    width: 100%;
    position: absolute;
    flex-direction: column;
    background: #fe9128;
    margin-top: 8vw;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: 0.5s;
  }
  #checknav:checked ~ .nav-options {
    opacity: 1;
    pointer-events: all;
  }
  .nav-options a {
    font-weight: 700;
    font-size: 2.781vw;
    line-height: 214.5%;
  }
  .nav-free-send img {
    width: auto;
    height: 4.831vw;
    margin-right: 2.171vw;
  }
  .nav-free-send p {
    font-size: 2.899vw;
  }
  .nav-free-send {
    width: 46vw;
  }
  .gallery-item img {
    height: 16vw;
  }
  p.atributo {
    font-size: 2.781vw;
  }
  p.valor-select {
    font-size: 2.781vw;
  }
  p.pvalue {
    padding: 0vw 6vw;
    height: 9.552vw;
    margin-right: 3.2vw;
  }
  .not-logged-com {
    width: 100%;
  }
  .not-logged-com p {
    font-size: 3.182vw;
    margin: 12.802vw 0;
    width: 100%;
    text-align: center;
  }
  .not-logged-com p b {
    font-size: 3.782vw;
  }
  .header-prod.mo {
    display: block;
  }
  .header-prod.pc {
    display: none;
  }
}

@media (min-width: 768px) {
  .header-prod.mo {
    display: none;
  }
  .header-prod.pc {
    display: block;
  }
  .comments-sec {
    width: fit-content;
    display: flex;
    flex-direction: row-reverse;
  }
  .comments-box {
    width: 38.125vw;
    margin: 0 0 1.563vw;
    padding: 2.396vw 0 1.563vw 3.073vw;
    border-bottom: 0;
    border-left: 0.05vw solid gainsboro;
  }
  .comments-box .comments {
    font-size: 0.833vw;
    line-height: 1.198vw;
    color: #929292;
    margin: 0;
  }
  .comments-box .user {
    font-size: 0.833vw;
    line-height: 129.5%;
  }
  .comments-box .date {
    font-size: 0.729vw;
    line-height: 159%;
  }
  .comments-box .date span {
    margin-left: 0.781vw;
  }
  .form-inputs {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    height: auto;
  }
  .form-inputs.hgt {
    height: auto;
  }
  /*.comments-p {
    margin-top: 1.3vw !important;
  }*/
  .form-inputs p {
    font-size: 0.729vw;
    line-height: 129.5%;
    width: fit-content;
  }
  .form-inputs p.close {
    margin-bottom: 0;
  }
  .form-inputs .inputs {
    width: 29.635vw;
    height: 2.552vw;
    font-size: 0.729vw;
    line-height: 194.5%;
    margin-bottom: 1.094vw;
  }
  .form-inputs .txtarea {
    width: 29.635vw;
    height: 7.292vw;
    font-size: 0.729vw;
    line-height: 194.5%;
    margin-bottom: 1.094vw;
  }
  .adv-1 {
    font-size: 0.625vw;
    line-height: 0.885vw;
    margin: 0 0 1.51vw;
  }
  .two-rows {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .check-cont {
    align-items: flex-start;
    margin-bottom: 0;
    width: 29.635vw;
  }
  .check-cont p {
    font-size: 0.625vw;
    line-height: 0.885vw;
  }
  input.send-comment {
    width: 8.646vw;
    height: 2.552vw;
    font-family: "Intro Rust";
    font-style: normal;
    font-weight: 400;
    font-size: 0.525vw;
    line-height: 129.5%;
    text-align: center;
    color: #ffffff;
    margin: auto;
    text-indent: 1.52vw;
  }
  .comments-sec form {
    padding: 0 3.073vw 0 0;
  }
  .valuation-c {
    display: flex;
    align-items: center;
    margin: 0 0 0.4vw 0;
  }
  .valuation-c p {
    margin-right: 0.42vw;
  }
  .five-stars {
    display: flex;
  }
  .star-i {
    width: 1.042vw;
    height: 1.042vw;
    background-size: 1.042vw;
  }
  .star-i.active {
    background-size: 1.042vw;
  }
  .star-i.small-star,
  .star-i.small-star.active {
    width: 1.042vw;
    height: 1.042vw;
    background-size: 1.042vw;
  }
  section.comment-i {
    padding-bottom: 2.344vw;
    margin-bottom: 2.344vw;
    border-bottom: 0.05vw solid gainsboro;
  }
  .comment-i .edit-c p {
    font-size: 0.833vw;
    line-height: 1.198vw;
    color: #219176;
    margin: 0.3vw 0 1vw;
  }
  .pagination {
    width: 6.383vw;
    margin: 0 auto 0;
    display: flex;
    justify-content: space-between;
  }
  .pagination img {
    width: 2.72vw;
    height: 2.72vw;
  }
  p.comments-title {
    font-size: 1.823vw;
    line-height: 1.823vw;
    margin: 5vw 0 2.5vw;
  }
}
</style>
