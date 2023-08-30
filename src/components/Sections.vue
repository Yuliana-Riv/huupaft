<template>
  <div id="Sections">
    <HeaderSec />
    <div v-if="historyOption == 'Usuarios'">
      <Usuarios />
    </div>
    <div v-if="historyOption == 'Personalizacion'">
      <Perfil />
    </div>
    <div v-if="historyOption == 'Categorias'">
      <Categorias/>
    </div>
    <div v-if="historyOption == 'Productos'">
      <Productos/>
    </div>
    <div v-if="historyOption == 'Atributo'">
      <Atributo/>
    </div> 
    <div v-if="historyOption == 'Cupon'">
      <Cupon/>
    </div> 
    <div v-if="historyOption == 'global_params'">
      <Global_params/>
    </div> 
    <div v-if="historyOption == 'Pedidos'">
      <Pedidos/>
    </div> 
    <div v-if="historyOption == 'suscripciones'">
      <Suscripciones/>
    </div> 
    <div v-if="historyOption == 'BLOG'">
      <Blog />
    </div>  
    <div v-if="historyOption == 'TAG'">
      <Tag />
    </div>
    <div v-if="historyOption == 'colaboradores'">
      <Colab />
    </div>
    <div v-if="historyOption == 'Citas'">
      <Citas />
    </div>
    <div v-if="historyOption == 'Puntos'">
      <Puntos />
    </div>
   
  </div>
</template>
<script>
import { mapActions } from "vuex";

import HeaderSec from "../components/HeaderSec.vue";
import Usuarios from "../views/usuarios/usuarios.vue";
import Perfil from "../views/profile/profile.vue";


import Categorias from '../views/categorias/categorias.vue';
import Productos from '../views/products/productos.vue';
import Atributo from '../views/products/atributo.vue';
import Cupon from '../views/shopcar/cupon.vue';
import Global_params from '../views/global_params/globalparams.vue';
import Pedidos from '../views/pedidos/pedidos.vue';
import Suscripciones from '../views/suscripciones/suscripciones.vue';
import Blog from "../views/blog/blog.vue";
import Citas from "../views/clients_quotes/clients_quotes.vue";
import Tag from "../views/tag/tag.vue"; 
import Colab from "../views/colaboradores/colaboradores.vue";
import Puntos from "../views/sale_points/sale_points.vue";


export default {
  name: "Sections",
  components: {
    HeaderSec,
    Usuarios,
    Perfil,

    
    Categorias,
    Productos,
    Atributo,
    Cupon,
    Global_params,
    Pedidos,
    Suscripciones,
    Blog,
    Tag, 
    Colab,
    Citas,
    Puntos
  },

  data() {
    return {
      search_value: "",
      status: "",
      message: "",
      option: "Default",
    };
  },
  computed: {
    historyOption() {
      return this.$store.getters["main/getHistoryOption"];
    },
  },
  created() {
    let option = localStorage.getItem("nav");
    if (option != undefined && option != null && option != "") {
      this.option = option;
      this.setHistoryOptionMain(option);
    }
  },
  methods: {
    ...mapActions("main", ["setHistoryOptionMain"]),
    ...mapActions("main", ["getHistoryOption"]),
  },
};
</script>
<style scoped>
#Sections {
  background: var(--color-5);
  min-height: 59.25vw;
  width: 73.177083vw;
  margin-left: 4.166666666666666vw;
}

.proximamente p {
  color: var(--color-1);
  font-weight: 700;
  font-size: 5vw;
  margin-top: 11.5vw;
  margin-left: 15vw;
}
</style>
