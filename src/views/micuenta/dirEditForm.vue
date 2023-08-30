<template>
  <div class="Detalles">
    <div class="detalles-cont">
      <form
        @submit.prevent="submit(added.title, added.address, added.ref, added.zip, added.city, added.state, added.country)"
      >
        <div class="row-cont f-cont">
          <!--fila 1-->
          <div class="inputs-cont">
            <label for="">TITULO</label>
            <input
              type="text"
              v-model="added.title"
              name="name"
              id="name"
              class="input-blue two-i"
            />
          </div>
        </div>
        <div class="row-cont f-cont">
          <div class="inputs-cont">
            <label for="">DIRECCIÓN</label>
            <textarea
              name=""
              id="lastname"
              v-model="added.address"
              class="input-blue t-area"
            >
            </textarea>
          </div>
          <div class="inputs-cont">
            <label for="">REFERENCIAS</label>
            <textarea
              name=""
              id="lastname"
              v-model="added.ref"
              class="input-blue t-area"
            >
            </textarea>
          </div>
        </div>
        <div class="row-cont f-cont">
          <!--fila 2-->
          <div class="inputs-cont">
            <label for="">CÓDIGO POSTAL</label>
            <input
              type="text"
              v-model="added.zip"
              name="zip"
              id="zip"
              class="input-blue two-i"
            />
          </div>
          <div class="inputs-cont">
            <label for="">CIUDAD</label>
            <input
              type="text"
              v-model="added.city"
              name="city"
              id="city"
              class="input-blue two-i"
            />
          </div>
        </div>
        <div class="row-cont f-cont">
          <!--fila 2-->
          <div class="inputs-cont">
            <label for="">ESTADO</label>
            <input
              type="text"
              v-model="added.state"
              name="state"
              id="state"
              class="input-blue two-i"
            />
          </div>
          <div class="inputs-cont">
            <label for="">PAÍS</label>
            <input
              type="text"
              v-model="added.country"
              name="country"
              id="country"
              class="input-blue two-i"
            />
          </div>
        </div>
        <div class="row-cont right-l">
          <!--fila 5-->
          <input type="submit" value="CONFIRMAR" class="btn-submit" />
        </div>
      </form>
    </div>
      <div v-if="viewModal" class="modal_view">
        <div id="modal_add">
          <div class="body dflx">
            <h3>Dirección actualizada</h3>
            <img src="../../assets/add.png" alt="icono alerta" />
          </div>

          <div class="modal_add_btns dflx">
            <!--<p @click="Add()" class="otro">Aceptar</p>-->
            <p @click="toEdit()" class="editar">Editar</p>
            <p @click="back()" class="inicio">Inicio</p>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      viewModal:false,
      title: "",
      address: "",
      ref: "",
      zip: "",
      city: "",
      state: "",
      country: "",
    };
  },
  props:{
    ident:Number,
  },
  async created() {
    await this.getIdentity();
    let option = "address";
    let value = localStorage.getItem('idAdr');
    let payload = { 
      option: option,
      id: parseInt(value),
    };
    this.getInfoByIdAdr2(payload);
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
    added() {
      return this.$store.getters["address/data2"];
    },
  },
  methods: {
    ...mapActions("address", ["getInfoByIdAdr2"]),
    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },
    submit: async function (title, address, ref, zip, city, state, country) {

      let id= localStorage.getItem('idAdr');
      let data = {
        id: id,
        title: title,
        address: address,
        ref: ref,
        zip: zip,
        city: city,
        state: state,
        country: country,
      };

      this.status = "";
      this.msg = "";

      let result = await this.$store.dispatch("main/editItem", {
        option: "address",
        item: data,
      });

      if (result.status == "error") {
        this.status = "error";
        this.msg = result.message;
      } else {
        // success

        this.added = result.added;
        this.showModal();
      }
    },
    showModal: function () {
      this.viewModal = true;
    },
    closeModal: function () {
      this.viewModal = false;
      this.setAddedUsr("");
      this.setHistoryOptionUsr("Default");
    },
    Add: function () {
      this.status = "";
      this.message = "";
      this.title = "";
      this.address = "";
      this.ref = "";
      this.zip = "";
      this.city = "";
      this.state = "";
      this.country = "";
      this.viewModal = false;
      this.setAddedUsr("");
    },
    toEdit: function () {
      /*this.setHistoryOptionUsr("Edit");*/
      this.viewModal = false;
    },
    back: function () {
      setTimeout(() => this.$router.go(), 200);
    },
  },
};
</script>
<style scoped>
.detalles-cont{
    width: 70vw;
    margin: auto;
}
.f-cont {
  display: flex;
  justify-content: space-between;
}
.inputs-cont {
  display: flex;
  flex-direction: column;
}
.input-blue {
  height: 3.646vw;
  border: 1px solid #000000;
  font-family: "Glory";
  font-size: 1.042vw;
  line-height: 1.51vw;
  color: #929292;
}
.inputs-cont label,
.imagen-btn-c p {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 0.833vw;
  line-height: 0.99vw;
  color: #000000;
  margin: 0;
  padding-bottom: 0.781vw;
}
.two-i {
  width: 30.875vw;
}
.t-area {
  width: 30.875vw;
  height: 15.875vw;
  resize: none;
}
.three-i {
  width: 20.417vw;
}
.row-cont {
  margin-bottom: 3.021vw;
}
.titulo-f4 {
  font-family: "Intro Rust";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25vw;
  line-height: 1.51vw;
  color: #fe9128;
  margin: 0 0 2.24vw;
}
.imagen-profile {
  overflow: hidden;
  width: 5.156vw;
  height: 5.156vw;
  border-radius: 10vw;
  margin-right: 2.031vw;
}
.imagen-profile.pc {
  display: block;
}
.imagen-profile.mo {
  display: none;
}
.imagen-profile img {
  width: 100%;
  height: 100%;
}
.image-btn {
  width: 17.396vw;
  height: 3.698vw;
  background: #fe9128;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.image-btn .cam {
  width: 1.094vw;
  height: 0.99vw;
  padding-right: 1.042vw;
}
.image-btn span {
  font-family: "Intro Rust";
  font-style: normal;
  font-weight: 400;
  font-size: 0.833vw;
  line-height: 0.99vw;
  color: #ffffff;
}
.imagen-cont {
  display: flex;
  align-items: center;
}
.right-l {
  display: flex;
  justify-content: flex-end;
}
.btn-submit {
  width: 17.604vw;
  height: 4.167vw;
  border: .1vw solid black;
  background: white;
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 0.972vw;
  line-height: 0.972vw;
  color: #000000;
  margin-left: auto;
  cursor: pointer;
  letter-spacing: .1vw;
}

@media (max-width: 768px) {
  .f-cont {
    flex-direction: column;
  }
  .two-i,
  .three-i {
    width: 100% !important;
  }
  .input-blue {
    height: 18.925vw;
    font-size: 5.607vw;
    line-height: 7.944vw;
  }
  .inputs-cont label,
  .imagen-btn-c p,
  .titulo-f4 {
    font-size: 5.607vw;
    line-height: 6.776vw;
    margin-bottom: 3.738vw;
  }
  .inputs-cont {
    margin-bottom: 8.411vw;
  }
  .titulo-f4 {
    margin-top: 19.393vw;
    margin-bottom: 10.047vw;
  }
  .imagen-profile.pc {
    display: none;
  }
  .imagen-profile.mo {
    display: block;
    margin: 5.607vw 0;
  }
  .imagen-profile {
    width: 34.346vw;
    height: 34.346vw;
    border-radius: 39.346vw;
    margin-right: 0;
  }
  .imagen-btn-c {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  .image-btn {
    width: 80.841vw;
    height: 16.589vw;
    background: #fe9128;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-btn span {
    font-size: 3.738vw;
    line-height: 4.439vw;
  }
  .image-btn .cam {
    width: 4.907vw;
    height: 4.439vw;
    padding-right: 4.042vw;
  }
  .t-area  {
    width: 100%;
    height: 45.875vw;
    resize: none;
}
.btn-submit{
  width: 100%;
    height: 18.692vw;
    font-size: 4.673vw;
    line-height: 5.607vw;
}
}
</style>