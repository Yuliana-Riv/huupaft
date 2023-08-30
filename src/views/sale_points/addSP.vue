<template>
  <div id="AddBlo">
    <div class="form-content">
      <form @submit.prevent="submit(name, link, city, file1)">
        <div class="grup-form dflx">
          <div class="boxform">
            <label for="title" class="title">PUNTO DE VENTA </label>
            <input
              v-model="name"
              type="text"
              id="title"
              name="title"
              required
            />
          </div>
          <div class="boxform">
            <label for="descrp" class="descrp">LINK </label>
            <input
              v-model="link"
              type="text"
              id="descrp"
              name="descrp"
              required
            />
          </div>
        </div>

        <div class="boxform">
          <label for="descrp" class="descrp">CIUDAD </label>
          <input
            v-model="city"
            type="text"
            id="descrp"
            name="descrp"
            required
          />
          <div class="select-c">
            <p><b>Selecciona la ciudad:</b> </p>
            <p v-for="(d,i) in data" :key="i" class="pointer" @click="city = d.name">{{ d.name }}</p>
          </div>
        </div>
        <div class="grup-form dflx">
          <div class="boxform">
            <label>Portada</label>
            <div class="dflx">
              <label class="filelabel" for="uploadimg">
                <span>Seleccionar Archivo</span></label
              >
              <label class="filelabelname tbl_item" for="uploadimg">
                {{ archivo }}</label
              >
            </div>

            <input
              @change="previewFiles2"
              type="file"
              id="uploadimg"
              name="uploadimg"
              class="fileinput"
            />
          </div>
        </div>

        <div class="dflx">
          <p @click="wait()" class="btnRegresar">Regresar</p>
          <button class="alta" type="submit">Guardar</button>
        </div>
      </form>

      <div v-if="viewModal" class="modal_view">
        <div id="modal_add">
          <div class="body dflx">
            <h3>Entrada agregada</h3>
            <img src="../../assets/add.png" alt="icono alerta" />
          </div>

          <div class="modal_add_btns dflx">
            <p @click="Add()" class="otro">Aceptar</p>
            <p @click="toEdit()" class="editar">Editar</p>
            <p @click="back()" class="inicio">Inicio</p>
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
    <!--
  <p> {{name_imagen}}</p>
     <p>   {{image}}</p>

       <p>{{tipo}}</p>
       <p> {{body}}</p>
    

      <p> {{images}}</p>
-->
  </div>
</template>
<script>
import { mapActions } from "vuex";
let urlpath = require("../../global/index");

export default {
  data() {
    return {
      urlpath: urlpath,
      name: "",
      link: "",
      city: "",
      file1: null,
      archivo: "No se eligió archivo",
      editorOption: {
        modules: {},

        theme: "snow",
      },
      status: "",
      message: "",
      //selects
      active: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      active6: false,
      active7: false,

      viewModal: false,

      search_value: "",
      updsearchcli: "",
    };
  },
  created() {
    this.getAllInfoCat("category");
  },
  computed: {
    data() {
      let data = this.$store.getters["category/data"];
      let arr = []
      for (let i = 0; i < data.length; i++) {
        if(data[i].parent_name == 'CIUDAD'){
          arr.push(data[i])
        }
      }
      return arr;
    },
  },
  methods: {
    ...mapActions("sale_points", ["setAddedSP"]),
    ...mapActions("sale_points", ["setHistoryOptionSP"]),
       ...mapActions('category', ['getAllInfoCat']),

    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },
    submit: async function (name, link, city, file1) {
      this.status = "";
      this.message = "";

      let data = new FormData();
      data.append("name", name);
      data.append("link", link);
      data.append("city", city);
      data.append("image", file1);
      data.append("_method", "POST");
      let result = await this.$store.dispatch("sale_points/addItemSP", {
        option: "sale_points",
        item: data,
      });
      if (result.status == "error") {
        this.status = "error";
        this.message = result.message;
      } else {
        // success
        this.setAddedSP(result.added);
        this.showModal();
      }
    },

    delStatus: function () {
      setTimeout(() => this.delMsgs(), 2000);
    },
    closeSelect() {
      this.active = false;
      document.getElementById("select-ch").checked = false;
    },

    showModal: function () {
      this.viewModal = true;
    },
    closeModal: function () {
      this.viewModal = false;
      this.setAddedSP("");
      this.setHistoryOptionSP("Default");
    },
    Add: function () {
      this.status = "";
      this.message = "";
      this.name = "";
      this.link = "";
      this.city = "";
      this.file1 = null;

      this.viewModal = false;
      this.setAddedSP("");
    },
    toEdit: function () {
      this.setHistoryOptionSP("Edit");
      this.viewModal = false;
    },
    back: function () {
      setTimeout(() => this.$router.go(), 200);
    },

    delStatus: function () {
      setTimeout(() => this.delMsgs(), 2000);
    },
    delMsgs: function () {
      this.status = "";
      this.message = "";
    },

    previewFiles2(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file1 = files[0];
      this.archivo = this.file1.name;
    },

    srcImg: function (img) {
      let src = `${urlpath.url()}/Y4k_o1b/lw4-ufj/sale_points-img/${img}`;

      //this.status_img(img)

      return src;
    },
  },
};
</script>
<style>
.select-c p {
    font-size: .9vw;
    line-height: .9vw;
}
.opciones-bloque {
  min-height: 20vw;
}

/* QUILL EDITOR */
.quill-editor,
.quill-editor-imagen,
.quill-editor-video {
  margin-bottom: 3vw;
  margin-top: 1vw;
}
.quill-editor {
  width: 53.65vw;
}
.quill-editor-imagen,
.quill-editor-video {
  width: 27.65vw;
}

.tbl1,
.tbl2 {
  width: 20vw;

  margin-right: 1vw;
}

p.et1 {
  width: 15vw;
  cursor: default;
}
p.elim {
  cursor: pointer;
  color: var(--color-3) !important;
}

.bodytbl {
  height: 10vw;
  overflow: auto;
  padding: 1vw;
  background: var(--color-2);
}
p.etiqueta {
  color: var(--color-5);

  font-size: 0.6vw;
}

.hdreti {
  background: var(--color-1);
  padding: 0.5vw 1vw;
  color: var(--color-5);
  font-weight: 600;
  font-size: 0.8vw;
}

#AddBlo label {
  color: var(--color-2);
  font-weight: 700;
  font-size: 0.7291666666666666vw;
  margin-bottom: 0.3vw;
}

#AddBlo input,
#AddBlo select {
  height: 2.5vw;
  width: 13.716666666666668vw;
  border: 0.052083vw solid var(--color-2);
  border-radius: 0vw 1.5vw 1.5vw 0vw;
  color: var(--color-2);
  font-size: 0.7291666666666666vw;
  font-weight: 500;
  padding-left: 1.09375vw;
  padding-right: 1vw;
  margin-right: 2vw;
}

#select-role {
  height: 2.5vw;
  width: 14.716667vw;
  border: 0.052083vw solid var(--color-2);
  border-radius: 0vw 1.5vw 1.5vw 0vw;
  color: var(--color-2);
  font-size: 0.7291666666666666vw;
  font-weight: 500;
  padding-left: 1.09375vw;
  display: flex;
  align-items: center;
  background-image: url("../../assets/blueflecha.svg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 12.6vw;
}
#select-role.rounded {
  border-radius: 0vw 1.5vw 0vw 0vw;
  border-left: 0.052083vw solid var(--color-2);
  border-right: 0.052083vw solid var(--color-2);
  border-top: 0.052083vw solid var(--color-2);
  border-bottom: 0;
}
#select-ch:checked ~ .options-cont {
  display: flex;
  position: absolute;
  padding: 0.573vw 1.25vw;
  flex-direction: column;
  background-color: white;
  width: 12.3vw;
  border-left: 0.052083vw solid var(--color-2);
  border-right: 0.052083vw solid var(--color-2);
  border-top: 0;
  border-bottom: 0.052083vw solid var(--color-2);
}
#select-ch:checked ~ .options-cont,
#select-ch2:checked ~ .options-cont,
#select-ch3:checked ~ .options-cont,
#select-ch4:checked ~ .options-cont,
#select-ch5:checked ~ .options-cont,
#select-ch6:checked ~ .options-cont,
#select-ch7:checked ~ .options-cont {
  display: flex;
  position: absolute;
  padding: 0.573vw 1.25vw;
  flex-direction: column;
  background-color: white;
  width: 13.32vw;
  border-left: 0.052083vw solid var(--color-2);
  border-right: 0.052083vw solid var(--color-2);
  border-top: 0;
  border-bottom: 0.052083vw solid var(--color-2);
}

.buscador input {
  width: 15.312500000000002vw;
  border: none !important;
  border-radius: none !important;
  height: 1.5625vw !important;
  color: #8d8d8d;
}
.mtbtn {
  margin-left: 16vw !important;
  margin-top: 1.4vw;
  margin-left: 16vw;
}

.optionsbl {
  margin-top: 1vw;
}

.col1 {
  width: 5vw;
  text-align: center;
}
.col2 {
  width: 5vw;
  text-align: center;
}
.col3 {
  overflow: auto;
  width: 56vw;
}
.cl3t {
  text-align: center;
}

.col3 p {
  padding-left: 1vw;
}
.col4 {
  width: 5vw;
  text-align: center;
}

.header-bc p {
  margin-right: 1px;
  color: aliceblue;
  background: var(--color-2);
  margin-bottom: 0vw;
  font-weight: 600;
  padding: 0.5vw 0vw;
}

.bloq-item {
  border-bottom: 0.2vw solid var(--color-2);
  color: var(--color-2);
}

.bloq-item h2:hover {
  color: var(--color-1);
}

.bloques-cont {
  width: 71vw;
  margin-bottom: 5vw;
}

h2.cp {
  cursor: pointer;
}
.caja1,
.caja2 {
  width: 50%;
}

.col3 img {
  width: 72%;
  padding: 0.5vw 3.5vw;
}

.col3 iframe {
  padding: 0.5vw 3.5vw;
}
</style>
