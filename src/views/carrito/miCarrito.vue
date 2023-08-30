<template >
  <div class="miCarrito">
    <Navigator />
    <!---<RouteDir />-->
    <div class="mycart-body">
      <div class="mycart-cont">
        <!--<p class="dir">
          <a href="/">Home</a> > <a href="/">Tienda</a> >
          <span class="blue"><a href="/carrito">Carrito</a></span>
        </p>-->
        <div class="grid-mycart">
          <p class="titulo-p">MI CARRITO </p>
          <div class="empty-car-cont" v-if="carrito.items == ''">
            <p class="adv-empty">TU CARRITO AÚN ESTÁ VACÍO.</p>
            <div class="btn-return" @click="toStore()">
              <!--<img src="../../assets/carrito-i-w.svg" alt="cart" class="icon" />-->
              <p class="t">VOLVER A LA TIENDA</p>
            </div>
          </div>
          <div class="table-cart-cont" v-if="carrito.items !== ''">
            <div class="list-cart-cont">
              <div class="list-cart">
                <!--<div class="head-lc">
                  <p class="l1">PRODUCTO</p>
                  <p class="l2">CANTIDAD</p>
                  <p class="l3">PRECIO</p>
                </div>-->
                <div
                  v-for="(item, key) in update.items"
                  :key="key"
                  class="product-cart"
                >
                  <div @click="deleteItem(key)" class="close-btn">X</div>
                  <!-- enviar la key -->
                  <div class="pro-c-cont">
                    <div class="img-pro-cont">
                      <div class="img-c">
                        <img
                          :src="
                            urlpath.url +
                            '/ayn_Rqv/WW9-AGv/get-product-image/' +
                           isWebp(regexImg(item.item.image), item.item.image) 
                          "
                          alt="pro"
                          class="pro-img"
                        />
                      </div>
                      <div class="pro-info">
                        <p class="name-pro">
                          <b>{{ item.item.name }}</b>
                        </p>
                        <p class="cant-pro">{{ item.item.descrp }}</p>
                      </div>
                    </div>

                    <div class="c-pr-cont">
                      <div class="change-cant-cont">
                        <div
                          class="sign-c"
                          @click="item.cantidad -= 1 "
                          :class="{ eventBlock: item.cantidad == 1 }"
                        >
                          -
                        </div>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="num-pro"
                          v-model="item.cantidad"
                        />
                        <div class="sign-c" @click="item.cantidad += 1">+</div>
                      </div>
                      <p class="price-pro">
                        ${{ calcTotal(item.item.price, item.cantidad) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dflx"> 
                 <div class="btn-return uno" @click="toShop()">
                <p class="t">	
                   <span>&#10094;</span> IR A TIENDA</p>
              </div>
              <div class="btn-return" :class="{'inac' : upd == false}" @click="actualizarCarrito(update)">
                <!--<img src="../../assets/refresh.svg" alt="cart" class="icon" />-->
                <p class="t">ACTUALIZAR CARRITO</p>
              </div>
              </div>
             
            </div>
            <div class="miPedido-cont">
              <div class="header-mp">
                <p>MI PEDIDO</p>
              </div>
              <div class="miPedido-body">
                <div class="products-mp-c">
                  <div class="header-mp-c">
                    <p class="m1">Producto</p>
                    <p class="m2">Precio</p>
                  </div>
                  <div
                    v-for="(item2, key2) in carrito.items"
                    :key="key2"
                    class="product-mp"
                  >
                    <div class="c1">
                      <p class="titulo">
                        <b>{{ item2.item.name }}</b>
                      </p>
                      <p class="titulo">{{ item2.item.descrp }}</p>
                      <p class="titulo azul-span">
                        <b>x{{ item2.cantidad }}</b>
                      </p>
                    </div>
                    <div class="c2">
                      <p class="precio"> 
                          ${{ calcTotal(item2.item.price, item2.cantidad) }} 
                      </p>
                    </div>
                  </div>
                </div>
                <div class="totals-mp-c">
                  <div class="sb-mp">
                    <p class="gray">Subtotal</p>
                    <p class="precio">${{ carrito.subtotal }}</p>
                  </div>
                 <!-- <div class="sb-mp">
                    <p class="gray">Envio</p>
                    <p class="precio"> - ${{ carrito.envio }} </p>
                  </div> --->
                  <div class="sb-mp">
                    <p class="gray">Cupón</p>
                    <p class="precio">-${{ carrito.descupon }}</p>
                  </div>
                  <div class="cupon-cont">
                    <input
                      type="text"
                      name="cupon"
                      id="cupon"
                      placeholder="#CUPÓN"
                      class="cupon-txt"
                      v-model="cupon"
                    />
                    <input
                      @click="aplicarCupon(cupon)"
                      type="button"
                      class="cupon-btn"
                      value="APLICAR"
                    />
                  </div>
                  <div class="cupon-list">
                    <div
                      class="cupon-item dflx"
                      v-for="(cupon, index) in carrito.cupon"
                      :key="index"
                    >
                      <p>#{{ cupon.code }}</p>
                      <!--<img
                        src="../../assets/eliminar_cupon.svg"
                        alt="eliminar cupon"
                        @click="deleteCupon(cupon.code)"
                      />-->
                    </div> 
                  </div>
                </div>
                <div class="total-mp-c">
                  <p class="totale">Total</p>
                  <p class="total precio">${{ carrito.total }}</p>
                </div>
                <div class="btn-return" @click="toCheckout()">
                  <!--<img
                    src="../../assets/carrito-i-w.svg"
                    alt="cart"
                    class="icon"
                  />-->
                  <p class="t">CONTINUAR</p>
                </div>

              </div>
            </div>
          </div>

          <div v-if="status != ''" class="status_messages">
            <div v-if="status == 'success'" class="msg msg_success">
              <p>{{ message }}</p>
            </div>
            <div v-if="status == 'error'" class="msg msg_error">
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navigator from '../../components/items/Navigator.vue'; 
import Footer from '../../components/items/Footer.vue';
import RouteDir from "../../components/fixedItems/RouteDir.vue";
let urlpath = require("../../global/index");
import { mapActions } from "vuex";

export default {
  components: {
    Navigator,
    Footer,
    RouteDir,
  },
  data() {
    return {
      numPro: 1,
      urlpath: urlpath,
      status: "",
      message: "",
      cupon: "",
      cart: 
      localStorage.getItem("cart"),
      upd: false,
    };
  },
  async created() {
    await this.obtenerCarritos();
    await this.getIdentity();
  },
  computed: {
    carrito() {
      return this.$store.getters["carrito/getcar"];
    },
    update() {
      let data  = this.$store.getters["carrito/getupd"]; 
     
     
       if(Array.isArray(data.items)){
          for (var i=0; i<data.items.length; i++) {
           
           if(data.items[i].cantidad != this.carrito.items[i].cantidad){
            
            this.upd = true
            break
          }else{
            this.upd = false
          }
        }

      }
      return data
    },
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
  },
  methods: {
    ...mapActions("carrito", ["getCart"]),
    ...mapActions("carrito", ["getCartCopy"]),
    calcTotal(precio, cantidad) {
      let total = precio * cantidad;

      return total.toFixed(2);
    },
    async obtenerCarritos() {
      await this.getCart();
      await this.getCartCopy();
    },
    toStore() {
      return this.$router.push("/catalogo").catch((err) => {});
    },
    actualizarCarrito: async function (carrito) {
      let payload = {
        carrito,
      };
      let result = await this.$store.dispatch("carrito/editItemCrt", {
        option: "upt_item",
        item: payload,
      });

      if (result.status == "error") {
        this.status = "error";
        this.message =
          "Ha ocurrido un error al intentar actualizar el carrito."; // result.message;
        this.delStatus();
      } else {
        // success

        this.status = "success";
        this.message = "Carrito actualizado";
        this.delStatus();
        await this.obtenerCarritos();
      }
    },

    deleteItem: async function (index) {
      let payload = {
        index,
        _ctk: localStorage.getItem("_ctk"),
      };

      let result = await this.$store.dispatch("carrito/deleteItemCrt", {
        option: "del_item",
        item: payload,
      }); 
      if (result.status == "error") {
        this.status = "error";
        this.message = "Ha ocurrido un error al intentar eliminar el producto."; // result.message;
        this.delStatus();
      } else {
        // success

        this.status = "success";
        this.message = "Producto eliminado.";
        this.delStatus();
        this.wait()
        //await this.obtenerCarritos();
      }
    },

    aplicarCupon: async function (cupon) {
      //VDNQYUBWD6VNCM5OJ96X
      if (cupon != "") {
        let cliente = {
          sub: null,
          email: "",
        };
        if (this.identity?.sub) {
          cliente = this.identity;
        }

        let payload = {
          cupon,
          cliente,
          _ctk: localStorage.getItem("_ctk"),
        };
        let result = await this.$store.dispatch("carrito/editItemCrt", {
          option: "add_cupon",
          item: payload,
        });

        if (result.status == "error") {
          this.status = "error";
          this.message = result.message; // result.message;
          this.delStatus();
        } else {
          // success

          this.status = "success";
          this.message = "Cupón agregado con éxito.";
          this.delStatus();
          await this.obtenerCarritos();
        }
      }
    },
    deleteCupon: async function (cupon) {
      if (cupon != "") {
        let payload = {
          cupon,
          _ctk: localStorage.getItem("_ctk"),
        };
        let result = await this.$store.dispatch("carrito/deleteItemCrt", {
          option: "del_cupon",
          item: payload,
        });

        if (result.status == "error") {
          this.status = "error";
          this.message = result.message; // result.message;
          this.delStatus();
        } else {
          // success

          this.status = "success";
          this.message = "Cupón eliminado con éxito.";
          this.delStatus();
          await this.obtenerCarritos();
        }
      }
    },
    toShop(){
      return this.$router.push("/catalogo").catch((err) => {});
    },

    toCheckout: async function () {
      await this.obtenerCarritos();
      let payload = {
        carrito: this.carrito,
      };
      let result = await this.$store.dispatch("carrito/validateCrt", {
        option: "valid_cart",
        item: payload,
      });

      if (result.status == "error") {
        this.status = "error";
        this.message = result.message; // result.message;
        this.delStatus();
      } else {
        // success
        //si todo esta correcto redireccionar.
        localStorage.getItem('lastv')
        localStorage.setItem('lastv', 'car')
        return this.$router.push("/check-out").catch((err) => {});
      }
    },
       wait: function(){
            setTimeout(() => this.$router.go(), 200);
        },

    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },

    delStatus: function () {
      setTimeout(() => this.delMsgs(), 2000);
    },
    delMsgs: function () {
      this.status = "";
      this.message = "";
    },
    carItems(){
      localStorage.setItem("cart", this.update.items.length);
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
  },
  mounted() {
    this.carItems
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        let name = this.titulo;
        document.title = to.meta.title || `Mi Carrito - Agriga de México`;
      },
    },
  },
};
</script>
<style scoped>
.btn-return .icon {
  width: 1.094vw;
  height: 1.094vw;
}
.miCarrito {
  overflow: hidden;
}
.eventBlock {
  pointer-events: none;
  opacity: 0.5;
}
.mycart-cont {
  width: 76.875vw;
    margin: 29.236vw auto 7.222vw;
}
p.dir,
p.dir a {
  font-style: normal;
  font-weight: 400;
  font-size: 0.938vw;
  line-height: 194.5%;
  color: #bebebe;
  text-decoration-color: transparent;
}
span.blue a {
  color: #3ebdb1;
  text-decoration-color: #3ebdb1;
}
p.dir {
  margin: 0 0 4.635vw;
}
p.titulo-p {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
font-size: 2.778vw;
line-height: 2.778vw;
  color:#E42828;
  margin: 0;
}
.empty-car-cont {
  margin-top: 1.719vw;
  padding-top: 3.177vw;
  border-top: 1px solid gainsboro;
}
p.adv-empty {
font-family: 'Glory';
  margin: 0 0 3.177vw;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25vw;
  line-height: 1.771vw;
  color: #000000;
}
.btn-return {
  width: 15.573vw;
  height: 3.906vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  margin-right: 1vw;
    border: 0.1vw solid black;
}

.inac {
 pointer-events: none;
  background-color: #909090;

}
.btn-return .t {
  font-family: "PeaceSans";
  font-style: normal;
  padding-left: 0.521vw;
font-weight: 500;
font-size: 0.972vw;
line-height: 1.111vw;
letter-spacing: 0.1vw;
  color: black;
}
.btn-return .t span {
  font-family: "Glory";
  font-style: normal;
  padding-right: 1vw;
font-weight: 700;
font-size: 0.972vw;
line-height: 1.111vw;
letter-spacing: 0.1vw;
  color: black;
}

.products-mp-c {
  border-bottom: 1px solid gainsboro;
  margin-bottom: 1.094vw;
}
/*****/
.table-cart-cont {
  display: flex;
  justify-content: space-between;
  margin-top: 1.719vw;
  padding-top: 3.177vw;
  border-top: 1px solid gainsboro;
}
.head-lc {
  display: flex;
}
.list-cart-cont {
  width: 47.24vw;
}
.head-lc p {
  font-style: normal;
  font-weight: 400;
  font-size: 0.833vw;
  line-height: 1.198vw;
  color: #909090;
  margin: 0;
}
.head-lc p.l1 {
  margin-left: 2.344vw;
}
.head-lc p.l2 {
  margin-left: 20.298vw;
}
p.l3 {
  margin-left: 6.865vw;
}
.list-cart {
  margin-bottom: 2vw;
  position: relative;
  left: -0.7vw;
}
.pro-c-cont {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 41.302vw;
  border: 0.5px solid #c4c4c4;
  padding: 2.292vw 1.51vw;
  position: relative;
  top: 0.833vw;
  left: 0.833vw;
  margin-bottom: 1.4583333333333333vw;
}
.img-pro-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
}
.c-pr-cont {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.pro-info {
  width: 16.25vw;
}
.img-c {
  width: 8.594vw;
}
.pro-img {
  width: 3.177vw;
  height: fit-content;
}
p.name-pro{
font-family: 'PeaceSans';
text-transform: uppercase;
font-weight: 400;
}
p.name-pro,
p.cant-pro {
  font-size: 0.972vw;
  line-height: 129.5%;
  color:#E42828;
  margin: 0;
}
.change-cant-cont {
  display: flex;
  align-items: center;
}
.sign-c {
  font-size: 1.267vw;
  line-height: 1.2vw;
  font-weight: 600;
  border-radius: 12vw;
  border: 0.052vw solid grey;
  height: 1.2vw;
  width: 1.2vw;
  margin: 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: grey;
}
.num-pro {
  font-family: "PeaceSans";
  margin: 0;
  font-weight: 700;
  font-size: 1.042vw;
  line-height: 146%;
  text-align: center;
  color: #25252d;
  width: 2.771vw;
  padding: 0;
  border: none;
}
p.price-pro {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 1.042vw;
  line-height: 129.5%;
  text-align: right;
  color: black;
}
.close-btn {
    height: 2.28vw;
    width: 2.28vw;
  font-size: 0.677vw;
  line-height: 0.833vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background:#E42828;
  border-radius: 2.604vw;
  color: white;
  position: absolute;
  z-index: 19;
  cursor: pointer;
}
.header-mp {
  width: 25.885vw;
  height: 4.219vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
}
.header-mp p {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25vw;
  line-height: 1.51vw;
  text-align: center;
  color: #ffffff;
  margin: 0;
}
.miPedido-body {
  padding: 2.5vw 2.74vw;
  width: 20.208vw;
  border-left: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
}
.header-mp-c {
  display: flex;
  justify-content: space-between;
}
.header-mp-c p {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 700;
  font-size: 0.938vw;
  line-height: 1.146vw;
  color: #25252d;
  text-transform: uppercase;
}
.product-mp {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.833vw;
}
.product-mp .titulo {
  margin: 0;
  font-family: "Glory";
  font-style: normal;
  font-size: 0.729vw;
  line-height: 0.885vw;
  color: #25252d;
}
.azul-span {
  color: #25252d !important;
}
.miPedido-body p.precio {
  margin: 0;
  font-family: "Glory";
  font-style: normal;
  font-size: 1.042vw;
  line-height: 1.25vw;
  text-align: right;
  color: black;
font-weight: 700;
}
.miPedido-body .total-mp-c p.precio{
  font-family: "PeaceSans";
color: #E42828;
font-size: 1.944vw;
line-height: 1.944vw;
font-weight: 400;
}
p.total.precio {
  font-weight: 700;
}
.sb-mp {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.417vw;
}
.sb-mp p.gray {
  margin: 0;
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 0.833vw;
  line-height: 0.99vw;
  color: #000000;
}
.cupon-cont {
  display: flex;
  margin-top: 1.146vw;
}
p.totale {
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  color: #25252d;
  margin: 0;
}
.cupon-txt {
  width: 13.177vw;
  height: 2.292vw;
  padding: 0 0vw 0 0.833vw;
  border: 1px solid #d3d3d3;
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 0.625vw;
  line-height: 0.781vw;
  color: #000000;
  border-radius: 0.25vw 0 0 0.25vw;
}
.cupon-btn {
  width: 7.188vw;
  height: auto;
  background:#E42828;
  border: none;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 500;
  font-size: 0.625vw;
  line-height: 0.781vw;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
}
.total-mp-c {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.302vw;
  padding-top: 1.302vw;
  border-top: 1px solid gainsboro;
}
.miPedido-body .btn-return {
  width: 16.597vw;
  margin-top: 1.563vw;
  background-color: #E42828;
  border:none;
  color:white;
  margin: 2.778vw auto 0;
}
.miPedido-body .btn-return .t { 
  color:white;
}

.cupon-item {
  background: #d9d9d9;
  width: fit-content;
  border-radius: 0.25vw 0.25vw 0.25vw 0.25vw;
  margin-bottom: 0.78125vw;
}
.cupon-item:first-child {
  margin-top: 1.1979166666666667vw;
}
.cupon-item p {
  padding-top: 0.3645833333333333vw;
  padding-bottom: 0.3125vw;
  padding-left: 0.6770833333333334vw;
  padding-right: 0.6322916666666667vw;
  color: #929292;
  font-size: 0.84vw;
  margin: 0vw;
  width: fit-content;
  overflow: auto;
}
.cupon-item img {
  margin-left: 3.354167vw;
  cursor: pointer;
}

@media (max-width: 768px) {
  .cupon-item {
    background: #d9d9d9;
    width: fit-content;
    border-radius: 1vw 1vw 1vw 1vw;
    margin-bottom: 3.78125vw;
  }
  .cupon-item:first-child {
    margin-top: 4.197917vw;
  }
  .cupon-item p {
    padding-top: 2.364583vw;
    padding-bottom: 2.3125vw;
    padding-left: 2.677083vw;
    padding-right: 2.632292vw;
    font-size: 2.84vw;
    width: fit-content;
  }
  .cupon-item img {
    margin-left: 3.354167vw;
    cursor: pointer;
  }

  p.dir,
  p.dir a {
    font-size: 4.348vw;
  }
  p.dir {
    margin: 0 0 25.845vw;
  }
  p.titulo-p {
    font-size: 9.662vw;
    line-height: 11.594vw;
    padding-bottom: 0;
    border-bottom:0;
    width: 100%;
    margin: auto;
  }
  .empty-car-cont {
    margin-top: 4.831vw;
    padding-top: 10.628vw;
  }
  p.adv-empty {
font-size: 4.348vw;
line-height: 4.831vw;
    margin: 0 0 11.111vw;
  }
  .btn-return {
    /*width: 69.860vw;*/
    width: 72.222vw;
    height: 16.425vw;
    justify-content: center;
letter-spacing: 0.6vw;
     
  }
  .btn-return .t {
    font-size: 3.382vw;
    line-height: 3.865vw;
    letter-spacing: 0.6vw;
    margin: 0;
    padding-left: 0;
  }
  .btn-return .icon {
    width: 3.623vw;
    height: auto;
  }
  .mycart-cont {
    width: 87.383vw;
    margin: 43.720vw auto 32.85vw;
  }
  /****/
  .pro-c-cont {
    height: fit-content;
    height: fit-content;
    /*width: 63.841vw;*/
    width: 75.604vw;
    padding: 2.174vw 4.348vw 5.314vw 3.623vw;
    top: 3.865vw;
    left: 3.865vw;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .table-cart-cont {
    margin-top: 7.971vw;
    padding-top: 0;
    flex-direction: column;
    border: none;
  }
  .list-cart-cont {
    width: 100%;
  }
  .close-btn {
    height: 7.729vw;
    width: 7.729vw;
    border-radius: 20vw;
    font-size: 4.677vw;
    line-height: 6.833vw;
  }
  .pro-img {
    padding-right: 6.763vw;
    width: 23.430vw;
  }
  p.name-pro,
  p.cant-pro {
    font-size: 4.348vw;
  }
  .img-pro-cont {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
  .c-pr-cont {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: row;
  }
  .img-c {
    width: auto;
  }
  .pro-info {
    width: auto;
   /* height: 22.464vw;*/
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5.072vw;
  }
  .num-pro {
    font-size: 5.607vw;
    width: 13.575vw;
  }
  .sign-c {
    font-size: 4.831vw;
    line-height: 5vw;
    height: 4.831vw;
    width: 4.831vw;
    border-radius: 24vw;
  }
  p.price-pro {
    font-size: 7.246vw;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
    /*margin-right: 2vw;*/
  }
  .change-cant-cont {
    /*margin-left: 22.464vw;*/
    margin-left: 0;
  }
  .list-cart {
    margin-bottom: 12vw;
    left: 0vw;
    width: fit-content;
    height: auto;
    margin: 0 auto;
    position: relative;
    left: -4vw;
  }
  .list-cart-cont .btn-return {
    margin: 8.645vw auto 0; 
  }
  .list-cart-cont .btn-return .t{ 
    font-size: 4.397vw;
    line-height: 4.522vw;
  }
  .list-cart-cont .btn-return.uno{
    display: none;
  }
  .header-mp {
    width: 100%;
    height: 19.565vw;
  }
  .header-mp p {
    font-size: 5.797vw;
    line-height: 5.797vw;
  }
  .miPedido-cont {
    margin-top: 11.594vw;
  }
  .miPedido-body {
    padding: 9.662vw 5.072vw;
    width: 76.7vw;
  }
  .header-mp-c p {
    font-size: 4.206vw;
    line-height: 5.314vw;
  }
  .product-mp .titulo {
    font-size: 4.206vw;
    line-height: 4.314vw;
    margin-bottom: 0;
  }
  .miPedido-body p.precio {
    font-size: 4.206vw;
    line-height: 5.14vw;
  }
  .miPedido-body .sb-mp p.precio {
font-family: 'PeaceSans';
font-weight: 400;
font-size: 4.348vw;
line-height: 4.348vw;
}
  .head-lc {
    display: none;
  }
  .sb-mp p.gray {
    font-size: 4.206vw;
    line-height: 5.14vw;
  }
  .totals-mp-c {
    border-top: 1px solid gainsboro;
    padding-top: 4.907vw;
  }
  p.totale {
    font-size: 3.382vw;
    line-height: 3.865vw;
  }
  .total-mp-c {
    margin-top: 4.206vw;
    padding-top: 4.206vw;
    border-top: 1px solid gainsboro;
  }
  .cupon-txt {
    width: 51.932vw;
    height: 12.077vw;
    font-size: 4.625vw;
    line-height: 5.781vw;
    color: #000000;
    border-radius: 1vw 0 0 1vw;
    text-indent: 4.401vw;
    font-family:sans-serif;
  }
  .cupon-txt::placeholder {
    color: #000000;
  }

  .cupon-btn {
    width: 28.019vw;
    font-size: 3.348vw;
    line-height: 111%;
  }
  .cupon-cont {
    margin-top: 4.439vw;
  }
  .miPedido-body .btn-return {
    margin-top: 9.346vw;
   width: 57.729vw;
   height: 13.527vw;
  }
  .miPedido-body .total-mp-c p.precio {
    font-size: 6.763vw;
    line-height: 6.763vw;
}
  .sb-mp {
    margin-bottom: 1.168vw;
  }
  .products-mp-c {
    border: none;
    margin-bottom: 5.314vw;
  }
}
</style>