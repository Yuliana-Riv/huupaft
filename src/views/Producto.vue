<template>
  <div>
    <Navigator />
    <div class="B1">
      <p class="B1T1">TIENDA</p>
      <p class="B1T2">Un café para cada momento</p>
    </div>

    <div class="B2">
      <div class="B2B1">
        <div class="B2B1_F1" :class="{ lupa: drag == true }">
          <img
            @click="startDrag"
            @mousemove="doDrag"
            @touchstart="startDragT"
            @touchmove="doDragT"
            :src="
              imgsel == '' ? srcImg(data.imagenes[0].image) : srcImg(imgsel)
            "
          />
        </div>
        <div class="B2B1_F2">
          <div v-for="(item, key) in data.imagenes" :key="key">
            <div class="B2B1_F2B1">
              <img :src="srcImg(item.image)" @click="imgsel = item.image" />
            </div>
          </div>
        </div>
        <div class="B2B1_F1 zoomed" v-if="drag">
          <img
            :src="
              imgsel == '' ? srcImg(data.imagenes[0].image) : srcImg(imgsel)
            "
            :style="{ bottom: dragY + 'vw', right: dragX + 'vw' }"
            class="pc"
          />
          <img
            :src="
              imgsel == '' ? srcImg(data.imagenes[0].image) : srcImg(imgsel)
            "
            :style="{ bottom: dragYt + 'vw', right: dragXt + 'vw' }"
            class="mo"
          />
        </div>
        <!--<div class="showDK B2B1_F3">
          <img src="../assets/catalogo/HCOF_MV.png" />
        </div>--->
      </div>

      <div class="B2B2">
        <p class="B2B2_T1">{{ data.name }}</p>
        <p class="B2B2_T2">${{ data.price }} MXN</p>
        <p class="B2B2_T3">{{ data.descrp }}</p>
        <a href="#detallespedido"><p class="B2B2_T4">Más detalles</p></a>

        <div v-for="(item, key) in data.atributosFilt" :key="key">
          <p class="B2B2_T5">{{ item.atributo }}</p>
          <div class="B2B2_F6">
            <div
              v-for="(valor, key2) in item.values"
              :key="key2"
              v-on:click="
                (item.sel = valor),
                  (Categorias[key].sel = valor),
                  (Gramos = valor),
                  (Molido = item.sel),
                  findProd(item.atributo, valor, data)
              "
              class="B2B2_F6F"
              :class="{ B2B2_F6FRed: valor == Categorias[key].sel }"
            >
              <p>{{ valor }}</p>
            </div>
          </div>
        </div>

        <p class="B2B2_T5">OPCIÓN DE COMPRA</p>
        <div class="B2B2_F7">
          <div
            v-on:click="(selectM = 'Susnt'), (openWeeks = false)"
            class="B2B2_FF"
          >
            <div
              class="B2B2_F"
              :class="{ B2B2_FRed: selectM == 'Susnt' }"
            ></div>
          </div>
          <p>Comprar una vez</p>
        </div>

        <div class="B2B2_F8">
          <div class="B2B2_F8F">
            <div v-on:click="selectM = 'Sus'" class="B2B2_FF">
              <div
                class="B2B2_F"
                :class="{ B2B2_FRed: selectM == 'Sus' }"
              ></div>
            </div>
            <p class="B2B2_F8B2">suscripción</p>
            <img class="B2B2_F8B3" />
          </div>

          <div v-if="selectM == 'Sus'" class="B2B2_F8F2">
            <div class="BLine"></div>
            <div class="B2B2_F8F3" v-on:click="openWeeks = !openWeeks">
              <div class="B2B2_F8C">
                <p class="B2B2_F8T1">Frecuencia</p>
                <div class="B2B2_F8T2">
                  <p>{{ selectWeek }}</p>
                  <img src="../assets/product/RowDown.svg" />
                </div>
              </div>
              <div v-if="openWeeks">
                <div
                  v-on:click="selectWeek = item"
                  v-for="(item, key) in weeks"
                  :key="key"
                  class="B2B2_F8T"
                >
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
            <p class="B2B2_F8F4">
              Obtendrás 5% de descuento en cada orden recurrente
            </p>
          </div>
        </div>

        <p class="B2B2_T5">CANTIDAD</p>
        <div class="B2B2_F9">
          <img
            class="showMV"
            v-on:click="
              selectNumb > 1 ? (selectNumb = selectNumb - 1) : selectNumb
            "
            src="../assets/product/RestRed.svg"
          />
          <img
            class="showDK"
            v-on:click="
              selectNumb > 1 ? (selectNumb = selectNumb - 1) : selectNumb
            "
            src="../assets/product/RestBlack.svg"
          />
          <p>{{ selectNumb }}</p>
          <img
            class="showMV"
            v-on:click="selectNumb = selectNumb + 1"
            src="../assets/product/PlusRed.svg"
          />
          <img
            class="showDK"
            v-on:click="selectNumb = selectNumb + 1"
            src="../assets/product/PlusBlack.svg"
          />
        </div>

        <div class="B2B2_F10">
          <div class="B2B2_F10B1" @click="agregarItem(selectNumb)">
            <p>AGREGAR</p>
            <img src="../assets/catalogo/Car.svg" />
          </div>
          <div
            class="B2B2_F10B2"
            @mouseover="hover1 = true"
            @mouseleave="hover1 = false"
            @click="agregarItem2(selectNumb)"
          >
            <p>PAGAR</p>
          </div>
        </div>
        <div> <!--mensajes error/exito-->
          <p class="msg_suc" v-if="status =='success' && message !=''">
          {{ message }}
          </p>
          <p class="msg_err" v-if="status =='error' && message !=''">
            {{ message }}
          </p>
        </div>
      </div>
    </div>

    <div class="B3" id="detallespedido">
      <p class="B3T1">DETALLES DEL PRODUCTO:</p>
      <div class="B3B">
        <div class="B3B1">
          <div class="B3B1_B1">
            <p class="B3B1_B1T">Tostado</p>
            <p class="showMV">Oscuro</p>
            <p class="B3B1_B1T">Región</p>
            <p class="showMV">Chiapas</p>
            <p class="B3B1_B1T">Especie</p>
            <p class="showMV">Robusta</p>
            <p class="B3B1_B1T">Cafeína</p>
            <p class="showMV">Muy alto</p>
          </div>
          <div class="WLine"></div>
          <div class="showDK B3B1_B2">
            <p>Oscuro</p>
            <p>Chiapas</p>
            <p>Robusta</p>
            <p>Muy alto</p>
          </div>
        </div>
        <div class="B3B2">
          <p>
            Nuestra selección de café es de granos orgánicos de
            <span>Chiapas</span>, la tierra del café, de nuestro país un
            orgullo.
          </p>
          <p>
            Tostamos con leña de mezquite de <span>Sonora</span> (Huupa®) por su
            alta calidad de poder calorífico, ya que ésta resalta el aroma,
            cuerpo y sabor del café.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
let urlpath = require("../global/index");
import { mapActions } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import Navigator from "../components/items/Navigator.vue";
import Footer from "../components/items/Footer.vue";

export default {
  name: "Producto",
  data() {
    return {
      drag: false,
      dragX: 0,
      dragY: 0,
      dragXt: 0,
      dragYt: 0,

      imgsel: "",

      urlpath: urlpath,
      selectM: "",
      cantidad: 1,
      selectWeek: "1 semana",
      weeks: ["4 semanas", "1 semana", "2 semanas", "3 semanas"],
      openWeeks: false,
      Gramos: "",
      Molido: "",
      Categorias: [],

      hover1: false,
      editco: 0,
      selectNumb: 1,
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
    Navigator,
    Footer,
    Carousel,
    Slide,
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
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
    data() {
      let data = this.$store.getters["product/data"];
      this.Categorias = [];
      this.titlego = data.name;
      if (data.product_atributo_valores) {
        this.orderCat(data.product_atributo_valores);
      }

      if (data.atributosFilt && this.Categorias.length == 0) {
        for (let item of data.product_atributo_valores) {
          let obj = {
            cat: item.atributo,
            sel: item.valor,
          };
          this.Categorias.push(obj);
        }
      }
     

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

    orderCat: function (atributos_C) {
      /*let catsN=[], cats=[];

            catsN.push(atributos_C[0].atributo)

            for(let item of atributos_C){
                
                if(!catsN.includes(item.atributo)){
                    catsN.push(item.atributo)
                }
            }

            for(let item of catsN){

                let obj={
                    atributo:item,
                    valores:[]
                }
                cats.push(obj)

                for(let item2 of atributos_C){
                    
                }

            }
          

            return cats;*/
    },

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

    startDrag() {
      this.drag = true;
      this.dragX = this.dragY = 0;
    },
    startDragT() {
      this.drag = true;
      this.dragXt = this.dragYt = 0;
    },
    stopDrag() {
      this.drag = false;
      this.dragX = this.dragY = "no";
    },
    doDrag(event) {
      if (this.drag) {
        this.dragX = event.offsetX * 0.06;
        this.dragY = event.offsetY * 0.06;
      }
    },
    doDragT(event) {
      if (this.drag) {
        let rect = event.target.getBoundingClientRect();
        
        let body = document.getElementsByTagName("body")[0];
        body.style.height = "100%";
        body.style.overflow = "hidden";
        this.dragXt = (event.touches[0].clientX - rect.left) * 0.242;
        this.dragYt = (event.touches[0].clientY - rect.top) * 0.242;
      }
    },
    stopDragT() {
      let body = document.getElementsByTagName("body")[0];
      this.drag = false;
      body.style.height = "auto";
      body.style.overflow = "auto";
      this.dragXt = this.dragYt = "no";
    },

    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/get-product-image/${img}`;
      //this.status_img(img)
      return src;
    },
  },
  mounted() {
    window.addEventListener("mouseup", this.stopDrag);
    window.addEventListener("touchend", this.stopDragT);
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
  background-image: url("../assets/product/BKMV.png");
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

.B2B1_F1 {
  width: 78.01932367149759vw;
  height: 78.01932367149759vw;
  margin: auto;
  border: 0.1vw solid var(--color-10);
  margin-top: 28.985507246376812vw;
}
.B2B1_F1 img {
  width: 100%;
}
.B2B1_F2 {
  display: flex;
  width: 83vw;
  justify-content: center;
  margin: auto;
  margin-top: 2.657004830917874vw;
  margin-bottom: 16.183574879227052vw;
}
.B2B1_F2B1 {
  width: 24.36473429951691vw;
  height: 24.36473429951691vw;
  margin: 0vw 1.2077294685990339vw;
  border: 0.1vw solid var(--color-10);
}
.B2B1_F2B1 img {
  width: 24.36473429951691vw;
  height: auto;
}

p.B2B2_T1 {
  font-size: 7.246376811594203vw;
  line-height: 7.246376811594203vw;
  font-weight: 400;
  font-family: "PeaceSans";
  margin: 0vw;
  margin-left: 15.70048309178744vw;
  text-transform: uppercase;
}
p.B2B2_T2 {
  font-size: 7.246376811594203vw;
  line-height: 8.623188405797103vw;
  font-weight: 700;
  font-family: var(--Glory);
  margin: 0vw;
  margin-top: 2.657004830917874vw;
  margin-left: 15.70048309178744vw;
}
p.B2B2_T3 {
  width: 77.29468599033817vw;
  font-size: 5.797101449275362vw;
  line-height: 8.115942028985508vw;
  font-weight: 400;
  font-family: var(--Glory);
  margin: auto;
  margin-top: 16.183574879227052vw;
}
p.B2B2_T4 {
  width: 77.29468599033817vw;
  font-size: 5.797101449275362vw;
  line-height: 6.898550724637681vw;
  font-weight: 400;
  font-family: var(--Glory);
  margin: auto;
  margin-top: 6.038647342995169vw;
  color: var(--color-9);
  text-decoration: underline;
  margin-bottom: 23.67149758454106vw;
}

p.B2B2_T5 {
  width: 77.29468599033817vw;
  font-size: 5.797101449275362vw;
  line-height: 6.898550724637681vw;
  font-weight: 500;
  font-family: "PeaceSans";
  margin: auto;
  margin-bottom: 6.038647342995169vw;
}

.B2B2_F6 {
  margin-bottom: 16.183574879227052vw;
}

.B2B2_F6F {
  display: flex;
  width: 72.94685990338165vw;
  height: 17.391304347826086vw;
  align-items: center;
  justify-content: center;
  border: 0.1vw solid var(--color-2);
  margin: auto;
  margin-bottom: 6.038647342995169vw;
  cursor: pointer;
}
.B2B2_F6F p {
  font-size: 5.797101449275362vw;
  line-height: 6.492753623188406vw;
  font-weight: 700;
  font-family: var(--Glory);
  margin: 0vw;
  letter-spacing: 0.125em;
  text-transform: uppercase;
}
.B2B2_F6FRed {
  color: var(--color-5);
  background-color: var(--color-9);
}

.B2B2_F8T {
  display: flex;
  width: 65.45893719806763vw;
  height: 10.978260869565219vw;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-11);
  margin: auto;
}
.B2B2_F8T p {
  font-size: 5.797101449275362vw;
  font-weight: 400;
  font-family: var(--Glory);
  margin: 0vw;
  margin-left: 5.572463768115942vw;
}

.B2B2_F7 p {
  width: 42.550725vw;
  font-size: 5.797101449275362vw;
  font-family: var(--Glory);
  font-weight: 700;
  line-height: 6.492753623188406vw;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  margin-left: 5.072463768115942vw;
}

.B2B2_F7 {
  width: 72.94685990338165vw;
  height: 23.67149758454106vw;
  display: flex;
  align-items: center;
  margin: auto;
  border: 0.1vw solid var(--color-8);
  margin-bottom: 2.657004830917874vw;
}

.B2B2_FF {
  width: 11.83574879227053vw;
  height: 11.83574879227053vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1vw solid var(--color-2);
  cursor: pointer;
  margin-left: 3.3816425120772946vw;
}
.B2B2_F {
  width: 8.28502415458937vw;
  height: 8.28502415458937vw;
  background-color: var(--color-11);
}
.B2B2_FRed {
  background-color: var(--color-9);
}

.BLine {
  width: 65.45893719806763vw;
  height: 0.1vw;
  background-color: var(--color-8);
  margin: auto;
  margin-bottom: 6.763285024154589vw;
}

.B2B2_F8F {
  display: flex;
  align-items: center;
  margin: 5.5vw 0vw;
}
.B2B2_F8 {
  width: 72.94685990338165vw;
  min-height: 23.67149758454106vw;
  margin: auto;
  border: 0.1vw solid var(--color-8);
  margin-bottom: 18.115942028985508vw;
}
p.B2B2_F8B2 {
  width: 42.550725vw;
  font-size: 5.797101449275362vw;
  font-family: var(--Glory);
  font-weight: 700;
  line-height: 6.492753623188406vw;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  margin: 0vw;
  margin-left: 5.072463768115942vw;
}

.B2B2_F8T2 p {
  font-size: 5.797101449275362vw;
  font-weight: 400;
  font-family: var(--Glory);
  margin: 0vw;
  margin-left: 5.572463768115942vw;
  cursor: pointer;
}
.B2B2_F8T2 img {
  width: 5.927536231884058vw;
  height: auto;
  margin-right: 5.572463768115942vw;
}

p.B2B2_F8T1 {
  font-size: 5.797101449275362vw;
  font-weight: 400;
  font-family: var(--Glory);
  margin: 0vw;
  margin-bottom: 2.657004830917874vw;
}

.B2B2_F8T2 {
  display: flex;
  width: 65.45893719806763vw;
  height: 10.978260869565219vw;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-11);
  margin: auto;
  margin-bottom: 6.896135265700483vw;
}

p.B2B2_F8F4 {
  width: 65.45893719806763vw;
  font-size: 4.3478260869565215vw;
  line-height: 4.869565217391305vw;
  font-weight: 400;
  font-family: var(--Glory);
  margin: auto;
  margin-bottom: 7.246376811594203vw;
}

.B2B2_F9 {
  display: flex;
  width: 72.94685990338165vw;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 8.937198067632849vw;
  margin-bottom: 16.183574879227052vw;
}
.B2B2_F9 img {
  width: 6.521739130434782vw;
  height: auto;
}
.B2B2_F9 p {
  font-size: 12.077294685990339vw;
  font-weight: 700;
  font-family: var(--Glory);
  margin: 0vw;
}

.B2B2_F10B1 {
  display: flex;
  width: 72.70531400966183vw;
  height: 16.425120772946862vw;
  align-items: center;
  justify-content: center;
  margin: auto;
  border: 0.1vw solid var(--color-8);
  margin-bottom: 6.038647342995169vw;
  cursor: pointer;
}
.B2B2_F10B1 p {
  font-size: 5.797101449275362vw;
  font-weight: 500;
  font-family: "PeaceSans";
  color: var(--color-8);
  letter-spacing: 0.125em;
  margin: 0vw;
  margin-right: 3.3816425120772946vw;
}
.B2B2_F10B1 img {
  width: 6.731884057971015vw;
  height: auto;
}

.B2B2_F10B2 {
  display: flex;
  width: 72.70531400966183vw;
  height: 16.425120772946862vw;
  align-items: center;
  justify-content: center;
  margin: auto;
  border: 0.1vw solid var(--color-8);
  background-color: var(--color-8);
  cursor: pointer;
}
.B2B2_F10B2 p {
  font-size: 5.797101449275362vw;
  font-weight: 500;
  font-family: "PeaceSans";
  color: var(--color-5);
  margin: 0vw;
  margin-right: 3.3816425120772946vw;
  letter-spacing: 0.125em;
}

.B3 {
  width: 88.16425120772948vw;
  margin: auto;
  text-align: center;
  background-color: var(--color-8);
  margin-top: 18.115942028985508vw;
  margin-bottom: 38.64734299516908vw;
  padding-bottom: 20.28985507246377vw;
}

p.B3T1 {
  font-size: 5.797vw;
  line-height: 119%;
  color: var(--color-9);
  letter-spacing: 0.06em;
  font-family: "PeaceSans";
  font-weight: 500;
  margin: 0vw;
  margin-bottom: 9.66183574879227vw;
  padding: 20.28985507246377vw 13vw 0;
  text-align: left;
}

.B3B1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60.14492753623188vw;
  height: 86.23188405797102vw;
  margin: auto;
  border: 0.1vw solid var(--color-5);
  margin-bottom: 11.83574879227053vw;
}
.B3B1 p {
  font-size: 5.797101449275362vw;
  color: var(--color-5);
  letter-spacing: 0.06em;
  font-family: var(--Glory);
  margin: 0vw;
}
p.B3B1_B1 {
  font-weight: 400;
  line-height: 6.898550724637681vw;
}
p.B3B1_B1T {
  font-weight: 700;
  line-height: 8.115942028985508vw;
  margin-top: 3.6231884057971016vw;
}

.B3B2 p {
  width: 62.07729468599034vw;
  font-size: 5.797101449275362vw;
  color: var(--color-5);
  font-weight: 400;
  font-family: var(--Glory);
  line-height: 8.115942028985508vw;
  margin: auto;
  margin-bottom: 7vw;
}
.B3B2 span {
  font-weight: 700;
  font-style: italic;
}
@media (max-width: 768px) {
  .B2B1_F1.zoomed {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 78vw;
    overflow: hidden;
    border-top: 0.63vw solid gray;
    background-color: white;
  }
  .B2B1_F1.zoomed img {
    position: relative;
    width: 160vw;
  }
  .B2B1_F1.zoomed img.pc {
    display: none;
  }
  .B2B1_F1.zoomed img.mo {
    display: block;
  }
}
@media (min-width: 769px) {
  .B2B1_F1 {
    cursor: pointer;
    background-color: white;
  }
  .B2B1_F1.lupa {
    cursor: zoom-in;
  }
  .B2B1_F1.zoomed {
    position: absolute;
    left: 42vw;
    top: 44vw;
    border: 0.2vw solid gray;
    overflow: hidden;
  }
  .B2B1_F1.zoomed img {
    position: relative;
    width: 60vw;
  }
  .B2B1_F1.zoomed img.pc {
    display: block;
  }
  .B2B1_F1.zoomed img.mo {
    display: none;
  }
  .showDK {
    display: block;
  }
  .showMV {
    display: none;
  }

  .B1 {
    height: 37.56944444444444vw;
    background-image: url("../assets/product/BKDK.png");
  }
  p.B1T1 {
    font-size: 3.4722222222222223vw;
    line-height: 3.4722222222222223vw;
    margin-bottom: 0.9722222222222222vw;
    padding-top: 22.708333333333332vw;
  }
  p.B1T2 {
    width: fit-content;
    font-size: 1.3888888888888888vw;
    line-height: 1.5555555555555556vw;
  }

  .B2 {
    display: flex;
    margin-top: 6.736111111111111vw;
    width: 100%;
  }
  .B2B1 {
    margin: 0vw 10.13888888888889vw;
  }
  .B2B1_F1 {
    width: 29.72222222222222vw;
    height: 29.72222222222222vw;
    margin-top: 0vw;
  }
  .B2B1_F1 img {
    width: 29.72222222222222vw;
    height: auto;
  }
  .B2B1_F2 {
    display: flex;
    width: 31.5vw;
    content-visibility: auto;
    justify-content: flex-start;
    margin: auto;
    margin-top: 1.3888888888888888vw;
    margin-bottom: 1.3888888888888888vw;
  }
  .B2B1_F2B1 {
    width: 14.097222222222221vw;
    height: 6.875000000000001vw;
    margin: 0vw 0.7638888888888888vw;
    text-align: center;
  }
  .B2B1_F2B1 img {
    width: auto;
    height: 6.875000000000001vw;
  }
  .B2B1_F3 {
    width: 29.72222222222222vw;
    height: 15.833333333333332vw;
    margin: auto;
    border: 0.1vw solid var(--color-10);
    margin-top: 0vw;
    text-align: center;
    content-visibility: auto;
    display: flex !important;
    align-items: center;
  }
  .B2B1_F3 img {
    width: 29.72222222222222vw;
    height: auto;
  }

  p.B2B2_T1 {
    font-size: 1.3888888888888888vw;
    line-height: 1.3888888888888888vw;
    margin-left: 0vw;
  }
  p.B2B2_T2 {
    font-size: 1.3888888888888888vw;
    line-height: 1.3888888888888888vw;
    margin-top: 0.2777777777777778vw;
    margin-left: 0vw;
  }
  p.B2B2_T3 {
    width: 38.263888888888886vw;
    font-size: 1.1111111111111112vw;
    line-height: 1.5555555555555556vw;
    margin-top: 2.7777777777777777vw;
  }

  p.B2B2_T4 {
    width: 38.263888888888886vw;
    font-size: 0.9722222222222222vw;
    line-height: 1.1569444444444446vw;
    margin-top: 0.9027777777777777vw;
    margin-bottom: 3.2638888888888893vw;
    cursor: pointer;
  }
  p.B2B2_T5 {
    width: 38.263888888888886vw;
    font-size: 1.1111111111111112vw;
    line-height: 1.5555555555555556vw;
    margin-bottom: 0.6944444444444444vw;
  }
  .B2B2_F6 {
    width: 39vw;
    margin: auto;
    margin-bottom: 0vw;
    display: flex;
  }
  .B2B2_F6F {
    width: 12.291666666666666vw;
    height: 2.5vw;
    margin-bottom: 2.9166666666666665vw;
  }
  .B2B2_F6F p {
    font-size: 0.9722222222222222vw;
    line-height: 1.0888888888888888vw;
  }

  .B2B2_F7 {
    width: 38.263888888888886vw;
    height: 2.5vw;
    margin-bottom: 0.625vw;
  }
  .B2B2_F {
    width: 0.9722222222222222vw;
    height: 0.9722222222222222vw;
    border-radius: 0.1388888888888889vw;
  }
  .B2B2_FF {
    width: 1.3888888888888888vw;
    height: 1.3888888888888888vw;
    margin-left: 0.9722222222222222vw;
    border-radius: 0.1388888888888889vw;
  }
  .B2B2_F7 p {
    width: 10.236111vw;
    font-size: 0.9722222222222222vw;
    line-height: 1.0888888888888888vw;
    margin-left: 1.875vw;
  }

  .B2B2_F8 {
    width: 38.263888888888886vw;
    min-height: 2.5vw;
    margin-bottom: 3.75vw;
  }
  .B2B2_F8F {
    margin: 0.4vw 0vw;
  }
  .B2B2_F8 p {
    width: 10.236111vw;
    font-size: 0.9722222222222222vw;
    line-height: 1.0888888888888888vw;
    margin-left: 1.875vw;
    cursor: pointer;
  }

  .BLine {
    width: 32.916666666666664vw;
    height: 0.01vw;
    margin-bottom: 0.8333333333333334vw;
    margin-left: 4.236111111111112vw;
  }

  .B2B2_F8C {
    display: flex;
    width: 27vw;
    align-items: center;
    margin-left: 4.236111111111112vw;
    margin-bottom: 0vw;
  }

  .B2B2_F8T2 {
    width: 8.819444444444445vw;
    height: 1.8055555555555554vw;
    margin-bottom: 0vw;
    margin-left: 1.1111111111111112vw;
  }
  p.B2B2_F8T1 {
    width: fit-content;
    font-size: 0.9722222222222222vw;
    margin-bottom: 0vw;
    margin-left: 0vw;
  }
  .B2B2_F8T2 img {
    width: 0.798611111111111vw;
    margin-right: 0.798611111111111vw;
  }
  .B2B2_F8T2 p {
    font-size: 0.9722222222222222vw;
    margin-left: 0.8333333333333334vw;
  }

  .B2B2_F8T {
    width: 8.819444444444445vw;
    height: 1.8055555555555554vw;
    margin-left: 9.35vw;
  }

  p.B2B2_F8F4 {
    width: 16.73611111111111vw;
    font-size: 0.6944444444444444vw;
    line-height: 0.7777777777777778vw;
    margin-top: 1.1805555555555556vw;
    margin-bottom: 1.5277777777777777vw;
    margin-left: 4.236111111111112vw;
  }

  .B2B2_F9 {
    width: 6.041666666666667vw;
    margin: 0vw;
    margin-top: 0.9027777777777777vw;
    margin-bottom: 3.958333333333333vw;
  }
  .B2B2_F9 img {
    width: 0.8333333333333334vw;
    cursor: pointer;
  }
  .B2B2_F9 p {
    font-size: 1.6666666666666667vw;
  }

  .B2B2_F10 {
    display: flex;
    width: fit-content;
    margin: 0vw;
  }
  .B2B2_F10B1 {
    width: 13.88888888888889vw;
    height: 3.888888888888889vw;
    margin-bottom: 0vw;
    margin-right: 1.4583333333333333vw;
  }
  .B2B2_F10B1 p {
    font-size: 0.9722222222222222vw;
    margin-right: 0.625vw;
  }
  .B2B2_F10B1 img {
    width: 1.3194444444444444vw;
  }
  .B2B2_F10B2 {
    width: 13.88888888888889vw;
    height: 3.888888888888889vw;
    margin-bottom: 0vw;
  }
  .B2B2_F10B2 p {
    font-size: 0.9722222222222222vw;
    margin-right: 0vw;
  }

  .B3 {
    width: 78.19444444444444vw;
    height: 21.805555555555557vw;
    margin-top: 7.152777777777778vw;
    margin-bottom: 8.26388888888889vw;
    padding-bottom: 0vw;
  }
  p.B3T1 {
    width: fit-content;
    font-size: 1.1111111111111112vw;
    margin-bottom: 1.25vw;
    padding: 3.888888888888889vw 0 0;
    margin-left: 7.291666666666667vw;
    text-align: left;
  }

  .B3B {
    display: flex;
    align-items: center;
    margin-left: 7.291666666666667vw;
  }
  .B3B1 {
    justify-content: flex-start;
    width: 22.63888888888889vw;
    height: 11.11111111111111vw;
    margin: 0.38vw;
  }
  .B3B1_B1 {
    margin-left: 2.2222222222222223vw;
  }
  p.B3B1_B1T {
    line-height: 1.3222222222222222vw;
    margin-top: 0vw;
    margin-bottom: 0.7638888888888888vw;
  }
  .B3B1 p {
    font-size: 1.1111111111111112vw;
  }
  .B3B1 p {
    line-height: 1.3222222222222222vw;
    margin: 0.38vw;
  }
  .WLine {
    width: 0.1vw;
    height: 8.680555555555555vw;
    background-color: var(--color-5);
    margin: 0vw 2.2222222222222223vw;
  }
  .B3B2 {
    width: fit-content;
    margin-left: 2.986111111111111vw;
  }
  .B3B2 p {
    width: 28.333333333333332vw;
    font-size: 1.1111111111111112vw;
    line-height: 1.5555555555555556vw;
    margin-bottom: 2vw;
    text-align: left;
  }
}
</style>
