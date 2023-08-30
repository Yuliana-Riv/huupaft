<template >
  <div id="EditClb">
    <div class="form-content">
      <form
        @submit.prevent="
          submit(
            added.name,
            added.descrp,
            added.about,
            added.facebook,
            added.instagram,
            added.twiter,
            added.linkedin,
            added.email
          )
        "
      >
        <div class="grup-form dflx">
          <div class="boxform">
            <label for="name" class="name">Nombre </label>
            <input
              v-model="added.name"
              type="text"
              id="name"
              name="name"
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]{2,254}"
              required
            />
          </div>
          <div class="boxform">
            <label for="descrp" class="descrp">Descripción </label>
            <input
              v-model="added.descrp"
              type="text"
              id="descrp"
              name="descrp"
              required
            />
          </div>
          <div class="boxform">
            <label for="facebook" class="facebook">Facebook </label>
            <input
              v-model="added.facebook"
              type="text"
              id="facebook"
              name="facebook"
            />
          </div>
        </div>

        <div class="grup-form dflx">
          <div class="boxform">
            <label for="instagram" class="instagram">Instagram </label>
            <input
              v-model="added.instagram"
              type="text"
              id="instagram"
              name="instagram"
            />
          </div>
          <div class="boxform">
            <label for="twiter" class="twiter">Twiter </label>
            <input
              v-model="added.twiter"
              type="text"
              id="twiter"
              name="twiter"
            />
          </div>

          <div class="boxform">
            <label for="linkedin" class="linkedin">Linkedin </label>
            <input
              v-model="added.linkedin"
              type="text"
              id="linkedin"
              name="linkedin"
            />
          </div>
        </div>
        <div class="grup-form dflx">
          <div class="boxform">
            <label for="email" class="correo">Correo electrónico </label>
            <input v-model="added.email" type="text" id="email" name="email" />
          </div>
        </div>

        <label for="about" class="about">About </label>
        <vue-editor
          id="editor"
          class="quill-editor-about"
          :editorToolbar="toolbar()"
          v-model="added.about"
        >
        </vue-editor>

        <div class="dflx">
          <p @click="wait()" class="btnRegresar">Regresar</p>
          <button class="alta" type="submit">Editar</button>
        </div>

        <div v-if="status != ''" class="status_messages">
          <div v-if="status == 'success'" class="msg msg_success">
            <p>{{ message }}</p>
          </div>
          <div v-if="status == 'error'" class="msg msg_error">
            <p>{{ message }}</p>
          </div>
        </div>
      </form>
    </div>

    <hr class="hrhd" />

    <div class="dflx">
      <div class="form-img">
        <div class="grup-form dflx">
          <div class="boxform">
            <label>Imagen</label>
            <div class="dflx">
              <label class="filelabel" for="uploadimg">
                <span>Seleccionar Archivo</span></label
              >
              <label class="filelabelname tbl_item" for="uploadimg">
                {{ archivo }}</label
              >
            </div>

            <input
              @change="previewFiles"
              type="file"
              id="uploadimg"
              name="uploadimg"
              required
              class="fileinput"
            />
          </div>
        </div>

        <div class="dflx">
          <div @click="submitImg(file1)" class="btn_añadir2 dflx">
            <p>AGREGA <span> IMAGEN</span></p>
            <img src="../../assets/upload.png" alt="" />
          </div>
        </div>

        <div v-if="status2 != ''" class="status_messages">
          <div v-if="status2 == 'success'" class="msg msg_success">
            <p>{{ message2 }}</p>
          </div>
          <div v-if="status2 == 'error'" class="msg msg_error">
            <p>{{ message2 }}</p>
          </div>
        </div>
      </div>
      <div v-if="statusimg == 'success'" class="img-item">
        <img :src="this.srcImg(added.image)" alt="imagen colaborador" />
      </div>
    </div>

    <div v-if="viewModal" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Colaborador actualizado</h3>
          <img src="../../assets/add.png" alt="icono alerta" />
        </div>

        <div class="modal_edit_btns dflx">
          <p @click="wait()" class="otro">Aceptar</p>
          <!-- <p  @click="back()" class="inicio">Inicio</p>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { mapActions } from "vuex";
let urlpath = require("../../global/index");
export default {
  name: "EditClb",
  components: {
    VueEditor,
  },
  data() {
    return {
      status: "",
      message: "",
      status2: "",
      message2: "",
      active: false,
      urlpath: urlpath,
      statusimg: "success",
      archivo: "No se eligió archivo",

      //MODAL
      file1: null,
      viewModal: false,
    };
  },
  created() {
    let payload = {
      id: this.added.id,
      option: "colaboradores",
    };
    this.getInfoByIdClb(payload);
  },
  computed: {
    added() {
      return this.$store.getters["colaboradores/getAdded"];
    },
    data() {
      return this.$store.getters["colaboradores/data"];
    },
  },
  methods: {
    ...mapActions("colaboradores", ["setAddedClb"]),
    ...mapActions("colaboradores", ["setHistoryOptionClb"]),
    ...mapActions("colaboradores", ["getInfoByIdClb"]),
    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },
    submit: async function (
      name,
      descrp,
      about,
      facebook,
      instagram,
      twiter,
      linkedin,
      email
    ) {
      this.status = "";
      this.message = "";
      let data = {
        id: this.added.id,
        name: name,
        descrp: descrp,
        about: about,
        facebook: facebook,
        instagram: instagram,
        twiter: twiter,
        linkedin: linkedin,
        email: email,
      };

      let result = await this.$store.dispatch("colaboradores/editItemClb", {
        option: "colaboradores",
        item: data,
      });

      if (result.status == "error") {
        this.status = "error";
        this.message = result.message;
      } else {
        // success
        this.showModal();
      }
    },
    closeSelect() {
      this.active = false;
      document.getElementById("select-ch").checked = false;
    },
    submitImg: async function (image) {
      this.status = "";
      this.msg = "";

      if (image != null) {
        if (image.size > 5000000) {
          this.status2 = "error";
          this.message2 = "La imagen excede el tamaño maximo permitido de 1MB.";
          this.delStatus();
        } else {
          //Creamos el formData
          var data = new FormData();
          //Añadimos la imagen seleccionada
          data.append("image", image);
          //Añadimos el método PUT dentro del formData
          // Como lo hacíamos desde un formulario simple _(no ajax)_
          data.append("_method", "PUT");
          //Enviamos la petición
          let result = await this.$store.dispatch("main/editImage", {
            id: this.added.id,
            item: data,
            option: "colaboradores",
          });
       

          if (result.status == "error") {
            this.status2 = "error";
            this.message2 = result.message;
            this.delStatus();
          } else {
            // success
            this.showModal();
          }
        }
      } else {
        this.status2 = "error";
        this.message2 = "Imagen no subida.";
        this.delStatus();
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
    },

    showModal: function () {
      this.viewModal = true;
    },
    closeModal: function () {
      this.viewModal = false;
      this.setAddedClb("");
      this.setHistoryOptionClb("Default");
    },
    Edit: function () {
      this.viewModal = false;
    },
    back: function () {
      setTimeout(() => this.$router.go(), 200);
    },
    toolbar: function () {
      if (this.tipo == "video") {
        return [["video"]];
      } else if (this.tipo == "imagen") {
        return [["image"]];
      } else {
        return [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["link"], // add's image support
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["clean"], // remove formatting button
        ];
      }
    },

    previewFiles(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file1 = files[0];
      this.archivo = this.file1.name;
    },

    srcImg: function (img) {
      let src = `${urlpath.url()}/c15_BjM/UQ7-CoE/colaboradores-img/${img}`;

      this.status_img(img);

      return src;
    },

    status_img: async function (img) {
      let payload = {
        option: "colaboradores",
        image: img,
      };
      let response = "";

      try {
        response = await this.$store.dispatch("main/getStatusImage", payload);
        if (response.data.status == "error") {
          this.statusimg = "error";
        } else {
          this.statusimg = "success";
        }
      } catch (err) {
        this.statusimg = "error";
      }
    },
  },
};
</script>
<style scoped>
#EditClb label {
  color: var(--color-2);
  font-weight: 700;
  font-size: 0.7291666666666666vw;
  margin-bottom: 0.3vw;
}

#EditClb input,
#EditClb select {
  height: 2.5vw;
  width: 14.716666666666668vw;
  border: 0.052083vw solid var(--color-2);
  border-radius: 0vw 1.5vw 1.5vw 0vw;
  color: var(--color-2);
  font-size: 0.7291666666666666vw;
  font-weight: 500;
  padding-left: 1.09375vw;
}

#select-role {
  height: 2.5vw;
  width: 13.716667vw;
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
</style>