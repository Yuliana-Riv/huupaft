<template  >
  <div class="escritorio">
    <div class="escritorio-cont">
      <div class="colE">
        <div class="grid small" :class="{'he1':((payment == 'No se encontraron coincidencias.') || (payment == 'error'))&& payment.length >0}">
          <div class="gride-cont">
            <div>
              <img v-if="identity.image !== null" :src=" url + '/' + endpointCodes.get +'/user-img/'+identity.image" 
              alt="user" class="user-img" />
              <img v-else src="../../assets/profile/user.png" 
              alt="users" class="user-img" />

              <p class="titulo-g black">{{ identity.fullname }}</p>
              <p class="red">{{ identity.email }}</p>
              <p><b>Fecha de nacimiento</b></p>
              <p class="red">{{ usuarios.birthdate }}</p>
            </div>
            <!--<div class="mtop">
              <p>Fecha de nacimiento:</p>
              <p class="black">{{ userdata[0].fecha }}</p>
            </div>-->
            <div>
              <a href="/mi-cuenta/detalles-de-la-cuenta" class="go-to">Editar Perfil</a>
            </div>
          </div>
        </div>
        <div class="grid small he2" :class="{'wit': (wishlist !== 'No se encontraron coincidencias' && wishlist.length > 0) || (address !== 'No se encontraron coincidencias.' && address.length > 0)}">
          <div class="gride-cont">
            <div>
              <p class="titulo-g black mb">MIS DIRECCIONES</p>
              <p v-if="address  == 'No se encontraron coincidencias.'">
                Aún no se ha agregado una dirección.
              </p>
              <div
                class="direction-sq"
                v-else 
              >
                <p v-for="(dir, i) in address" :key="i">
                  {{ dir.address }} {{ dir.zip }}
                  {{ dir.city }}, {{ dir.state }}
                </p>
              </div>
            </div>
            <div>
              <a href="/mi-cuenta/direccion/agregar" class="go-to">Agregar</a>
            </div>
          </div>
        </div>
      </div>
      <div class="colE">
        <div class="grid big" :class="{'he1':((payment == 'No se encontraron coincidencias.') || (payment == 'error'))&& payment.length >0}">
          <div class="gride-cont">
            <div>
              <p class="titulo-g black mb">MIS PEDIDOS</p>
              <div class="tabla-pedidos">
                <div class="head-tb pc">
                  <p><b>No. de Pedido</b></p>
                  <p><b>Fecha</b></p>
                  <p><b>Status</b></p>
                </div>
                <div class="element-tb" v-if="(payment == 'No se encontraron coincidencias.') || (payment == 'error')">
                  <p>Aún no tienes pedidos.</p>
                </div>
                <div
                  v-else 
                  class="tb-scroll"
                >
                  <div
                    class="element-tb "
                    v-for="(dir, i) in payment"
                    :key="i"
                  >
                  <p class="mo">No. de Pedido</p>
                    <p>{{ dir.pay_num }}</p>
                  <p class="mo">Fecha</p>
                    <p>{{ dir.created_at }}</p>
                  <p class="mo">Status</p>
                    <p>{{ dir.status }}</p>
                  </div>

                </div>
              </div>
            </div>
            <div class="to-right">
              <a href="/mi-cuenta/pedidos" class="go-to">Ver más</a>
            </div>
          </div>
        </div>
        <div class="grid big he2" :class="{'wit': (wishlist !== 'No se encontraron coincidencias' && wishlist.length > 0) || (address !== 'No se encontraron coincidencias.' && address.length > 0)}">
          <div class="gride-cont">
            <div>
              <p class="titulo-g black mb">WISHLIST</p>
              <p v-if="wishlist == 'No se encontraron coincidencias'">
                Aún no tienes artículos en tu wishlist.
              </p>
              <div
                v-else 
                class="tb-scroll-x"
              >
                <div
                  class="element-tb-x"
                  v-for="(dir, i) in wishlist"
                  :key="i"
                >
                  <div class="sq-img">
                    <img :src="
                        url +
                        '/' +
                        endpointCodes.get + '/P6H_3Pm/bt7-EO4/get-product-image/' + dir.image" alt="product" class="prod-img" v-if="dir.image!=='undefined'" />
                  </div>
                  <p>
                    <b>{{ dir.name }}</b>
                  </p>
                  <p>${{ dir.price }}</p>
                </div>
              </div>
            </div>
            <div class="to-right">
              <a href="" class="go-to">Ver más</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { url, endpointCodes } from "../../global/index";
export default {
  data() {
    return {
      url: url,
      endpointCodes,
      userdata: [
        {
          nombre: "User123",
          correo: "user123@gmail.com",
          fecha: "11/11/1990",
          direcciones: [
            {
              direccion:
                "Av. Gastón Madrid #157-6 Col. San Benito 83190 Hermosillo, Sonora",
            },
            {
              direccion:
                "Av. Gastón Madrid #157-6 Col. San Benito 83190 Hermosillo, Sonora",
            },
            {
              direccion:
                "Av. Gastón Madrid #157-6 Col. San Benito 83190 Hermosillo, Sonora",
            },
          ],
          pedidos: [
            {
              numpedido: "0000001",
              fecha: "11/11/2022",
              status: "Procesando  Pago",
            },
            {
              numpedido: "0000002",
              fecha: "11/11/2021",
              status: "Entregado",
            },
          ],
          wishlist: [
            {
              image: require("../../assets/profile/sacaje1.png"),
              namepro: "SMART BITES ADULTO",
              cantidad: "1KG",
            },
            {
              image: require("../../assets/profile/sacaje1.png"),
              namepro: "SMART BITES ADULTO",
              cantidad: "1KG",
            },
            {
              image: require("../../assets/profile/sacaje1.png"),
              namepro: "SMART BITES ADULTO",
              cantidad: "1KG",
            },
          ],
        },
      ], 
    };
  },
  async created() {
    await this.getIdentity();
    let option = "address/user";
    let value = this.identity.sub;
    let payload = {
      option: option,
      id: value,
    };
    this.getInfoByIdAdr(payload);
    let option1 = "payment/user";
    let payload1 = {
      option: option1,
      id: value,
    };
    this.getInfoByIdPym(payload1);
    let option2 = "wishlist/customer";
    let payload2 = {
      option: option2,
      id: value,
    };
    this.getInfoByIdWish(payload2);
    let option3 = "user"; 
    let payload3 = {
      option: option3,
      id: value,
    };
    await this.getInfoByIdUsr2(payload3);
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
    address() {
      return this.$store.getters["address/data"];
    },
    payment() {
      return this.$store.getters["payment/data"];
    },
    wishlist() {
      return this.$store.getters["wishlist/data"];
    },
    usuarios() {
      return this.$store.getters["usuarios/data2"];
    },
  },
  methods: {
    ...mapActions("address", ["getInfoByIdAdr"]),
    ...mapActions("payment", ["getInfoByIdPym"]),
    ...mapActions("wishlist", ["getInfoByIdWish"]),
    ...mapActions("usuarios", ["getInfoByIdUsr2"]),


    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },
  },
};
</script>
<style scoped >
.grid.small {
  width: 27.361vw;
  height: 23.958vw;
  border: 1px solid #000000;
  margin-bottom: 1.094vw;
}
.grid.big {
  width: 50.556vw;
  height: 23.958vw;
  border: 1px solid #000000;
  margin-bottom: 1.094vw;
}
.grid.he1 {
  height:15.556vw;
}
.grid.he2 {
  height:10.278vw;
}
.grid.he2.wit{
  height: 19.514vw;
}
.escritorio-cont {
  display: flex;
  justify-content: space-between;
    width: 79vw;
    margin: auto;
}
.gride-cont {
  padding: 1.806vw 3.385vw;
  height:auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.grid p {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 0.972vw;
  line-height: 1.771vw;
  color: #000000;
  margin: 0;
}
.black {
  color: #000000 !important;
}
.red {
  color: #E21F1D!important;
}
p.titulo-g {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 1.302vw;
  line-height: 1.563vw;
  margin: 0;
  text-transform: uppercase;
}
p.titulo-g.mb {
    margin-bottom: 1.667vw;
}
a.go-to {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25vw;
  line-height: 1.771vw;
  text-decoration-line: underline;
  color:#FFB800;
}
.head-tb {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.469vw;
}
.grid .head-tb p {
    width: 33%;
}
.to-right {
  display: flex;
  justify-content: flex-end;
}
.direction-sq {
  overflow-y: scroll;
  height: fit-content;
}
.direction-sq p:nth-child(odd) {
  font-weight: 700 !important;
}
.direction-sq p:nth-child(even) {
  font-weight: 400 !important;
}
.direction-sq p {
  margin-bottom: 1.354vw !important;
}
.element-tb {
  display: flex; 
  padding-bottom: 0.885vw;
  margin-bottom: 0.885vw;
}
.element-tb .mo{
  display: none;
}
.element-tb p:nth-child(2) {
  width: 33%;
}
.element-tb p:nth-child(4) {
  width: 33%; 
}
.element-tb p:nth-child(6) {
  width: 33%;
}
.tb-scroll {
  height: 11vw;
  overflow: hidden;
  overflow-y: scroll;
}
.tb-scroll-x {
  width: 33.906vw;
  height: fit-content;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
}
.element-tb-x {
    width: 10.656vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 0.3vw;
}
.sq-img {
  width: 6.458vw;
  height: 6.979vw;
  border: 1.5px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.26vw;
}
.prod-img {
  width: 3.177vw;
  height: auto;
}
.element-tb-x p {
  font-size: 0.781vw !important;
  line-height: 1.181vw !important;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 11vw;
  text-align: center;
}

@media (max-width: 768px) {
  .grid.he2.wit {
    height: fit-content;
}
.escritorio-cont {
    flex-direction: column;
  }
  .grid.small,
  .grid.big {
    width: 79.439vw;
    height: auto;
    margin-bottom: 4.907vw;
  }
  .gride-cont {
    padding: 12.15vw 1.579vw 12.15vw 9.579vw;
    height: auto;
  }
  .user-img {
    width: 23.131vw;
    height: 23.131vw;
    border-radius: 33.131vw;
  }
  p.titulo-g {
    font-size: 5.841vw;
    line-height: 7.009vw;
  }
  .grid p, a.go-to {
    font-size: 5.607vw;
    line-height: 7.944vw;
  }
  .mtop {
    margin-top: 6.776vw;
    margin-bottom:7.944vw;
  }
  .direction-sq {
    margin: 5.607vw 0;
    height: 71.979vw;
}
.direction-sq p {
    margin-bottom: 6.754vw !important;
}
.head-tb.pc, .element-tb.pc{
  display: none;
}
.tb-scroll{
  height: 113.589vw;
}
.element-tb .mo{
  display: block;
  font-weight: 200;
}
.element-tb {
    flex-direction: column;
    border-bottom: none;
    padding-bottom: 4.673vw;
    margin-bottom: 4.673vw;
}
.element-tb p{
  font-weight: 700;
}
.element-tb p:nth-child(2),
.element-tb p:nth-child(4),
.element-tb p:nth-child(6) {
  width: auto;
  text-align: left;
}
a.go-to {
    margin-right: 7.477vw;
}
.tb-scroll-x {
    width: 66.906vw;
    height: 159vw;
    margin-top: 9.579vw;
    overflow: hidden;
    overflow-x: none;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
}
.element-tb-x {
    width: 100%;
    margin-bottom: 9.579vw;
}
.sq-img {
    width: 28.972vw;
    height: 31.308vw;
    margin-bottom: 5.140vw;
}
.prod-img {
    width: 14.252vw;
    height: auto;
}
.element-tb-x p {
    font-size: 3.505vw !important;
    line-height: 6.505vw !important;
    width: 44vw;
    margin: 0;
    text-overflow: unset;
    white-space: normal;
}
}
</style>