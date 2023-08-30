<template>
  <div class="miCuenta">
    <HeaderMenu />
    <div class="head-mc">
      <div class="head-mc-cont">
        <!--<p class="titulo">MI CUENTA</p>-->
        <div class="info-cuenta">
          <div class="info-text">
            <p class="titulo">
              ¡HOLA,<br class="mo" />
              {{ this.identity.fullname }}!
            </p>
            <p class="close">
              ¿No eres {{ this.identity.fullname }}?
              <a @click="cerrarSesion()">Cerrar Sesión</a>
            </p>
          </div>
          <!--urlpath.url()+'/P6H_3Pm/bt7-EO4/user-img/'+usuarios.image-->
          <!--<img :src="
                        url +
                        '/' +
                        endpointCodes.get +'/P6H_3Pm/bt7-EO4/user-img/'+this.identity.image" alt="user"
           class="user-img" v-if="this.identity.image !== null" />
          <img src="../../assets/profile/user.png" alt="user" class="user-img" v-else/>-->
        </div>
      </div>
      <div
        class="mi-cuenta-body"
        :class="{ 'p-mcb': this.$route.params.name == 'direccion' }"
      >
        <div class="nav-mc">
          <div class="nav-blue">
            <div
              class="nav-btn ic1"
              :class="{ 'blue-btn': this.$route.params.name == 'escritorio' }"
              @click="changeUrl('escritorio')"
            >
              ESCRITORIO
            </div>
            <div
              class="nav-btn ic2"
              :class="{ 'blue-btn': this.$route.params.name == 'pedidos' }"
              @click="changeUrl('pedidos')"
            >
              PEDIDOS
            </div>
            <div
              class="nav-btn ic3"
              :class="{
                'blue-btn':
                  this.$route.params.name == 'suscripcion' 
              }"
              @click="changeUrl('suscripcion')"
            >
              SUSCRIPCIÓN
            </div>
            <div
              class="nav-btn ic3"
              :class="{
                'blue-btn':
                  this.$route.params.name == 'direccion' ||
                  this.$route.params.name == 'agregar',
              }"
              @click="changeUrl('direccion')"
            >
              DIRECCIÓN
            </div>
            <div
              class="nav-btn ddlc ic4"
              :class="{
                'blue-btn': this.$route.params.name == 'detalles-de-la-cuenta',
              }"
              @click="changeUrl('detalles-de-la-cuenta')"
            >
              <span class="mo">DETALLES DE LA </span>
              <span>CUENTA</span>
            </div>
          </div>
          <div class="nav-btn exit-btn" @click="cerrarSesion()">
            <img src="../../assets/profile/door.svg" alt="door" /> SALIR
          </div>
        </div>
        <div class="tab-mc-cont">
          <div class="ct1" v-if="this.$route.params.name == 'escritorio'">
            <Escritorio />
          </div>
          <div class="ct1" v-if="this.$route.params.name == 'pedidos'">
            <Pedidos />
          </div>
          <div class="ct1" v-if="this.$route.params.name == 'suscripcion'">
            <suscripcionForm />
          </div>
          <div
            class="ct1"
            v-if="
              this.$route.params.name == 'direccion' ||
              this.$route.params.name == 'agregar'
            "
          >
            <Direccion :ident="this.identity.sub" />
          </div>
          <div
            class="ct1"
            v-if="this.$route.params.name == 'detalles-de-la-cuenta'"
          >
            <Detalles />
          </div>
        </div>
      </div>
    </div>

    <div v-if="viewModal" class="modal_view">
      <div id="modal_logout">
        <div class="body">
          <img src="../../assets/profile/logout.png" alt="icono alerta" />
          <h3><span>Cerrar Sesión</span></h3>
        </div>

        <div class="modal_log_btns dflx">
          <p @click="logout()">Aceptar</p>
          <p @click="cancelar()">Cancelar</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import HeaderMenu from "../../components/items/Navigator.vue";
import Footer from "../../components/items/Footer.vue";
import Escritorio from "./escritorio.vue";
import Pedidos from "./pedidos.vue";
import suscripcionForm from "./suscripcionForm.vue";
import Direccion from "./direccion.vue";
import Detalles from "./detalles.vue";

import { url, endpointCodes } from "../../global/index";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      miCuenta: 1,
      viewModal: false,
      url: url,
      endpointCodes,
    };
  },
  components: {
    HeaderMenu,
    Footer,
    Escritorio,
    Pedidos,
    Direccion,
    suscripcionForm,
    Detalles,
  },
  metaInfo() {
    return {
      title: "Mi Cuenta",
      titleTemplate: "%s | Agriga de México",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content: "Mi cuenta de Agriga de México.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    };
  },
  async created() {
    await this.getIdentity();
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
  },
  methods: {
    changeSec(num) {
      this.miCuenta = num;
    },
    changeUrl(num) {
      return this.$router.push("/mi-cuenta/" + num);
    },
    changeUrl2(num, id) {
      return this.$router.push("/mi-cuenta/" + num);
    },
    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },
    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },
    cerrarSesion() {
      this.viewModal = true;
    },
    cancelar() {
      this.viewModal = false;
    },
    logout: async function () {
      let response = await this.$store.dispatch("admin/logout");
      this.wait();
    },
  },
  /*watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                let name= this.titulo;
                document.title = to.meta.title || `Mi Cuenta - Agriga de México`;
            }
        },
  }*/
};
</script>
<style scoped>
.head-mc-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 22.917vw 17.031vw 0;
}
.info-cuenta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head-mc-cont .titulo {
  font-family: "Intro Rust";
  font-style: normal;
  font-weight: 400;
  font-size: 3.385vw;
  line-height: 4.063vw;
  text-align: center;
  color: #E42828;
  margin: 0;
}
.head-mc-cont .info-cuenta .titulo {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 1.563vw;
  line-height: 1.875vw;
  text-transform: uppercase;
  text-align: right;
  color: #E42828;
}
.head-mc-cont .info-cuenta .titulo br {
  display: none;
}
.head-mc-cont p.close {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 0.938vw;
  line-height: 1.354vw;
  text-align: center;
  color: #000000;
  margin: 0;
}
.head-mc-cont p.close a {
  color: #FFB800;
  cursor: pointer;
  text-decoration-color: transparent;
}
.info-text {
  padding-right: 0;
}
.mi-cuenta-body {
  /*padding: 3.281vw 3.611vw 3.281vw 8.611vw;*/
  padding:  3.281vw 8.611vw;
}
.p-mcb {
  padding: 3.281vw 7.448vw;
}
.nav-mc {
  display: flex;
  margin: 0 auto 3.438vw;
  justify-content: center;
}
.nav-blue {
  display: flex;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
}
.nav-btn {
  width: 13.394vw;
  height: 3.056vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #000000;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 1.042vw;
  line-height: 1.25vw;
  color: #000000;
  text-align: center;
  cursor: pointer;
  transition: 0.5s;
}
.nav-btn.blue-btn {
  background: #000000;
  color: white;
}
.nav-btn.ddlc {
  width: 16.302vw;
}
.nav-btn.exit-btn {
  background:#E42828;
  border: 1px solid #E42828;
  color: white;
  width: 13.394vw;
}
.nav-btn.exit-btn img {
  width: 0.729vw;
  padding-right: 0.469vw;
}
@media (max-width: 768px) {
  .head-mc-cont .titulo {
    font-size: 11.682vw;
    line-height: 14.019vw;
    margin-bottom: 7.009vw;
  }
  .head-mc-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    padding: 54.673vw 12.617vw 8.411vw;
    margin: 0 4vw;
    flex-direction: column;
    border-bottom: 1px solid #F0F0F0;
  }
  .info-cuenta {
    flex-direction: column-reverse;
  }
  .user-img {
    width: 32.477vw;
    height: 32.477vw;
    border-radius: 46.729vw;
  }
  .head-mc-cont .info-cuenta .titulo {
    font-size: 8.178vw;
    line-height: 9.813vw;
    text-align: center;
    margin: 3.738vw 0;
  }
  .head-mc-cont .info-cuenta .titulo br {
    display: block;
  }
  .head-mc-cont p.close {
    font-size: 5.607vw;
    line-height: 7.944vw;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .nav-mc {
    background: #fafafa;
    position: relative;
   z-index: 500;
     /*z-index: 2100;*/
    left: 0;
    bottom: 0;
    margin-bottom: 0;
    overflow: hidden;
    flex-direction: column;
    margin-bottom: 10.280vw;
  }
  .nav-btn.exit-btn{
    width: 100%;
  }
  .nav-btn.exit-btn img {
    width: 2.729vw; 
    padding-right: 4.469vw;
}
  /*.nav-btn.exit-btn {
    display: none;
  }*/
  .nav-blue { 
    flex-direction: column;
    border: none;
  }
  .nav-btn,
  .nav-btn.ddlc {
    width: 81.776vw;
    height: 10.280vw;
    font-size: 3.271vw;
    line-height: 3.271vw;
    font-family: "PeaceSans";
    align-items: center;  
    border: 1px solid #000000;
    border-bottom: none;
  }
  .nav-btn.ddlc .mo {
    display: none;
  }
  .nav-btn.ddlc{
    border-bottom: 1px solid #000000;
  }
  .mi-cuenta-body {
    padding: 14.72vw 8.611vw;
  }
  .nav-btn.blue-btn {
    background: rgb(0, 0, 0);
    color: white;
  }
  /* .ic1,
  .ic2,
  .ic3,
  .ic4 {
    background-size: 7.477vw;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: 4.439vw;
  }
  .ic1 {
    background-image: url("../../assets/profile/menu-1.svg");
  }
  .ic2 {
    background-image: url("../../assets/profile/menu-2.svg");
  }
  .ic3 {
    background-image: url("../../assets/profile/menu-3.svg");
  }
  .ic4 {
    background-image: url("../../assets/profile/menu--4.svg");
  }

  .nav-btn.blue-btn.ic1,
  .nav-btn.blue-btn.ic2,
  .nav-btn.blue-btn.ic3,
  .nav-btn.blue-btn.ic4 {
    background-size: 7.477vw;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: 4.439vw;
  }
  .nav-btn.blue-btn.ic1 {
    background-image: url("../../assets/profile/menu-h1.svg");
  }
  .nav-btn.blue-btn.ic2 {
    background-image: url("../../assets/profile/menu-h2.svg");
  }
  .nav-btn.blue-btn.ic3 {
    background-image: url("../../assets/profile/menu-h3.svg");
  }
  .nav-btn.blue-btn.ic4 {
    background-image: url("../../assets/profile/menu-h4.svg");
  }*/
}
@media (min-width: 768px) {
  .nav-btn span.mo {
    padding-right: 0.2vw;
  }
}
</style>