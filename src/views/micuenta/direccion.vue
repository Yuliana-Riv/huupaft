<template>
  <div class="Direccion">
    <div class="address-form" v-if="addFrame == true || this.$route.params.name == 'agregar'" >
      <DireccionForm />
      <div class="btn-red" @click="addFrame = false && replaceUrl('')"><p>REGRESAR</p></div>
    </div>
    <div class="address-form" v-else-if="editFrame == true">
      <dirEditForm />
      <div class="btn-red" @click="editFrame = false"><p>REGRESAR</p></div>
    </div>
    <div class="tabla-dir" v-else>
      <div class="direction-tabla">
        <div class="head-tab">
          <div class="blue-tab">
            <div class="col-w-tab pc">
              <p>TÍTULO</p>
            </div>
            <div class="col-w-tab mo">
              <p>DIRECCIÓN</p>
            </div>
            <div class="col-w-tab pc">
              <p>CÓDIGO POSTAL</p>
            </div>
            <div class="col-w-tab pc">
              <p>CIUDAD</p>
            </div>
            <div class="col-w-tab pc">
              <p>ESTADO</p>
            </div>
            <div class="col-w-tab pc">
              <p>PAÍS</p>
            </div>
          </div>
          <div class="red-tab">
            <div class="col-w-tab">
              <p>EDITAR</p>
            </div>
            <div class="col-w-tab">
              <p>ELIMINAR</p>
            </div>
          </div>
        </div>
        <div v-if="address != 'No se encontraron coincidencias.'">
          <div class="product-tab" v-for="(adr, i) in address" :key="i">
            <div class="row-tab-1">
              <div class="col-w-tab">
                <p>{{ adr.title }}</p>
              </div>
              <div class="col-w-tab">
                <p>{{ adr.address }}</p>
              </div>
              <div class="col-w-tab">
                <p>{{ adr.zip }}</p>
              </div>
              <div class="col-w-tab">
                <p>{{ adr.city }}</p>
              </div>
              <div class="col-w-tab">
                <p>{{ adr.state }}</p>
              </div>
              <div class="col-w-tab">
                <p>{{ adr.country }}</p>
              </div>
            </div>
            <div class="row-tab-2">
              <div class="col-w-tab">
                <div
                  class="icon-ed-el"
                  @click="(editFrame = true), locale(adr.id)"
                >
                  <img src="../../assets/profile/ed1.svg" alt="icon" />
                </div>
              </div>
              <div class="col-w-tab">
                <div class="icon-ed-el" @click="showModal(adr.id)">
                  <img src="../../assets/profile/el1.svg" alt="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No se ha agregado ninguna dirección a su perfil.</p>
        </div>
      </div>
      <div class="btn-red" @click="addFrame = true && changeUrl('agregar')">
        <p>+ AGREGAR NUEVA DIRECCIÓN</p>
      </div>
    </div>

    <div v-if="viewModal" class="modal_view">
      <div id="modal_delete">
        <div class="body">
          <img src="../../assets/alert.png" alt="icono alerta" />
          <h3>
            ¿Estás seguro de
            <span
              >eliminar <br />
              este registro?</span
            >
          </h3>
        </div>

        <div class="modal_del_btns dflx">
          <p @click="eliminar()">Aceptar</p>
          <p @click="closeModal()">Cancelar</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import DireccionForm from "./direccionForm.vue";
import dirEditForm from "./dirEditForm.vue";
export default {
  components: {
    DireccionForm,
    dirEditForm,
  },
  props: {
    boll: Boolean,
  },
  data() {
    return {
      viewModal: false,
      addFrame: false,
      editFrame: false,
      idU: 0,
      itemDel: 0,
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
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
    address() {
      return this.$store.getters["address/data"];
    },
  },
  methods: {
    ...mapActions("address", ["getInfoByIdAdr"]),
    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },
    locale(id) {
      localStorage.getItem("idAdr");
      localStorage.setItem("idAdr", id);
    },

    showModal: function (id) {
      this.itemDel = id;
      this.viewModal = true;
    },
    closeModal: function () {
      this.viewModal = false;
      this.itemDel = "";
    },

    changeUrl(num) {
   
      return this.$router.push("/mi-cuenta/direccion/" + num);
    },
    replaceUrl(num){
      return this.$router.push({path:"/mi-cuenta/direccion", replace:true});
    },
    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },

    delStatus: function () {
      setTimeout(() => this.delMsgs(), 2000);
      setTimeout(() => this.wait(), 500);
    },
    eliminar: async function () {
      let id = this.itemDel;
      this.status = "";
      this.message = "";
      
      let result = await this.$store.dispatch("main/deleteItem", {
        option: "address",
        id: id,
      });

      if (result.status == "error") {
        this.message = result.message;
        this.status = "error";
        this.delStatus();
      } else {
        this.status = "";
        this.message = "";
        this.wait();
      }
    },
  },
};
</script>
<style scoped>
.head-tab {
  height: 3.056vw;
}
.blue-tab {
  background: #000000;
  height: 100%;
}
.red-tab {
  background:#E42828;
  height: 100%;
}
.product-tab {
  height: 4.236vw;
  border-bottom: 1px solid #929292;
}
.col-w-tab {
  width: 10.4vw;
  text-align: center;
}
.direction-tabla {
  margin-bottom: 2.188vw;
}
.head-tab,
.blue-tab,
.red-tab,
.product-tab {
  display: flex;
  align-items: center;
}
.blue-tab,
.row-tab-1 {
  width: 64.375vw;
  display: flex;
  justify-content: space-around;
}
.red-tab,
.row-tab-2 {
  width: 20.313vw;
  display: flex;
  justify-content: space-around;
}
.row-tab-1,
.row-tab-2 {
  height: 100%;
  align-items: center;
}
.head-tab .col-w-tab p {
  margin: 0;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 0.972vw;
  line-height: 0.972vw;
  color: #ffffff;
}
.product-tab .col-w-tab p {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 1.146vw;
  line-height: 126.75%;
  text-align: center;
  color: #000000;
  margin: 0;
}
.icon-ed-el {
  width: 1.302vw;
  height: 1.302vw;
  cursor: pointer;
  margin: auto;
}
.icon-ed-el img {
  width: 100%;
  height: 100%;
}
.btn-red {
  cursor: pointer;
  width: 18.177vw;
  height: 3.698vw;
  background: #E42828;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "PeaceSans";
  font-size: 0.833vw;
  line-height: 0.99vw;
  letter-spacing: 0.03em;
  color: #ffffff;
  margin-left: auto;
}
.btn-red p {
  margin: 0;
}
@media (max-width: 768px) {
  .head-tab .col-w-tab.pc {
    display: none;
  }
  .red-tab {
    display: none;
  }
  .blue-tab {
    width: 100%;
  }
  .head-tab {
    height: 19.159vw;
  }
  .head-tab .col-w-tab p {
    font-size: 4.673vw;
    line-height: 5.607vw;
  }
  .col-w-tab {
    width: fit-content;
  }
  .head-tab .col-w-tab {
    margin-top: 0;
  }
  .product-tab {
    height: fit-content;
    flex-direction: column;
  }
  .row-tab-1 {
    flex-direction: column;
  }
  .product-tab .col-w-tab p {
    font-size: 5.14vw;
    line-height: 126.75%;
  }
  .icon-ed-el {
    width: 7.009vw;
    height: 7.009vw;
  }
  .col-w-tab {
    margin-top: 10.28vw;
  }
  .row-tab-2 .col-w-tab {
    margin-bottom: 10.514vw;
  }
  .row-tab-2 {
    width: 65%;
    justify-content: space-evenly;
  }
  .btn-red {
    width: 100%;
    height: 18.692vw;
    font-size: 4.673vw;
    line-height: 5.607vw;
  }
  .btn-red p {
    margin: 0;
    width: 50vw;
    text-align: center;
  }
  .direction-tabla {
    margin-bottom: 10.981vw;
  }
}
</style>