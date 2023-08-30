<template>
  <div class="Detalles">
    <div class="detalles-cont">
      <form
        @submit.prevent="
          submit(
            identity.sub,
            usuarios.name,
            usuarios.lastname,
            usuarios.email,
            usuarios.phone,
            usuarios.role,
            birthdate,
            file1,
            pass,
            passc
          )
        "
      >
        <div class="row-cont f-cont">
          <!--fila 1-->
          <div class="inputs-cont">
            <label for="">NOMBRE</label>
            <input
              type="text"
              name="name"
              id="name"
              class="input-blue two-i"
              v-model="usuarios.name"
            />
          </div>
          <div class="inputs-cont">
            <label for="">APELLIDO</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              class="input-blue two-i"
              v-model="usuarios.lastname"
            />
          </div>
        </div>
        <div class="row-cont f-cont">
          <!--fila 2-->
          <div class="inputs-cont">
            <label for="">TELÉFONO</label>
            <input
              type="text"
              name="phone"
              id="phone"
              class="input-blue three-i"
              v-model="usuarios.phone"
            /><!--three-i-->
          </div>
          <div class="inputs-cont">
            <label for="">CORREO ELECTRÓNICO </label>
            <input
              type="text"
              name="email"
              id="email"
              class="input-blue three-i"
              v-model="usuarios.email"
            />
          </div>
          <div class="inputs-cont">
            <label for="">FECHA DE NACIMIENTO <span>Actual: {{ usuarios.birthdate }}</span></label>
            <input
              type="date"
              name="email"
              id="email"
              class="input-blue three-i" 
              v-model="birthdate"
            />
          </div>
          <!--<div class="inputs-cont">
            <label for="">FECHA DE NACIMIENTO</label>
            <input
              type="text"
              name="birthdate"
              id="birthdate"
              class="input-blue three-i"
            />
          </div>-->
        </div>
        <div class="row-cont">
          <!--fila 3-->
          <div class="imagen-cont">
            <div class="imagen-profile pc">
              <img
                :src="
                  url + '/' + endpointCodes.get + '/user-img/' + usuarios.image
                "
                alt="photo"
                class=""
                v-if=" usuarios.image !== null"
              />
              <img
                src="../../assets/profile/user.png"
                alt="photo"
                class=""
                v-else
              />
            </div>
            <div class="imagen-btn-c">
              <p>IMAGEN</p>
              <div class="imagen-profile mo">
                <img
                  :src="
                    url +
                    '/' +
                    endpointCodes.get +
                    '/user-img/' +
                    usuarios.image
                  "
                  alt="photo"
                  class=""
                  v-if=" identity.image !== null"
                />
                <img
                  src="../../assets/profile/user.png"
                  alt="photo"
                  class=""
                  v-else
                />
              </div>
              <label class="fileimage" for="uploadimg">
                <div class="image-btn">
                  <!--<img
                    src="../../assets/profile/camera.svg"
                    alt="image"
                    class="cam"
                  />-->

                  <span>SELECCIONAR ARCHIVO</span>
                </div>
                {{ archivo }}
              </label>
              <input
                @change="previewFiles"
                type="file"
                id="uploadimg"
                name="uploadimg"
                class="fileinput"
              />
            </div>
          </div>
        </div>
        <div class="row-cont">
          <!--fila 4-->
          <p class="titulo-f4">CAMBIO DE CONTRASEÑA</p>
          <div class="f-cont">
            <!--<div class="inputs-cont">
              <label for="">CONTRASEÑA ACTUAL</label>
              <input
                type="text"
                name="password"
                id="password"
                class="input-blue three-i"
              />
            </div>-->
            <div class="inputs-cont">
              <label for="">NUEVA CONTRASEÑA</label>
              <input
                type="password"
                name="newpass"
                id="newpass"
                class="input-blue two-i"
                v-model="pass"
              />
            </div>
            <div class="inputs-cont">
              <label for="">CONFIRMAR NUEVA CONTRASEÑA</label>
              <input
                type="password"
                name="confpass"
                id="confpass"
                class="input-blue two-i"
                v-model="passc"
              />
            </div>
          </div>
        </div>
        <div class="row-cont right-l">
          <!--fila 5-->
          <input type="submit" value="CONFIRMAR" class="btn-submit" />
        </div>

        <div v-if="status != ''" class="status_messages">
          <div v-if="status == 'success'" class="msg msg_success">
            <p>{{ message }}</p>
          </div>
          <div v-if="status == 'error'" class="msg msg_error">
            <p>{{ message }}</p>
          </div>
        </div>

        <div v-if="viewModal" class="modal_view">
          <div id="modal_edit">
            <div class="body dflx">
              <h3>Item actualizado</h3>
              <img src="../../assets/add.png" alt="icono alerta" />
            </div>

            <div class="modal_edit_btns dflx">
              <p @click="wait()" class="otro">Aceptar</p>
              <!-- <p  @click="back()" class="inicio">Inicio</p>-->
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { url, endpointCodes } from "../../global/index";
export default {
  data() {
    return {
      status: "",
      message: "",
      archivo: "No se eligió archivo",
      file1: null,
      pass: "",
      viewModal: false,
      passc: "",
      birthdate:"",
      url: url,
      endpointCodes,
    };
  },
  async created() {
    await this.getIdentity();
    let option = "user";
    let value = this.identity.sub;
    let payload = {
      option: option,
      id: value,
    };
    await this.getInfoByIdUsr2(payload);
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
    usuarios() {
      return this.$store.getters["usuarios/data2"];
    },
  },
  methods: {
    ...mapActions("usuarios", ["getInfoByIdUsr2"]),

    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },
    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },
    /****id, name, lastname, email, phone, role, image, pass, passc*/
    submit: async function (
      id,
      name,
      lastname,
      email,
      phone,
      role,
      birthdate,
      image,
      pass,
      passc
    ) {
      this.status = "";
      this.message = "";
      let data = [];
      let result2;

      if (pass == "") {
        data = {
          id: id,
          name: name,
          lastname: lastname,
          email: email,
          phone: phone,
          role: role,
          birthdate: birthdate,
          image: image,
        };
      } else {
        if (pass === passc) {
          if (image == null) {
            data = {
              id: id,
              name: name,
              lastname: lastname,
              email: email,
              pass: pass,
              phone: phone,
              role: role,
              birthdate: birthdate,
              image: image,
            };
          } else {
            if (image.size > 5000000) {
              this.status = "error";
              this.message =
                "La imagen excede el tamaño maximo permitido de 1MB.";
              this.delStatus();
            } else {
              data = {
                id: id,
                name: name,
                lastname: lastname,
                email: email,
                pass: pass,
                phone: phone,
                birthdate: birthdate,
                role: role,
              };
              let imagedata = new FormData();
              imagedata.append("image", image);
              imagedata.append("_method", "PUT");

              result2 = await this.$store.dispatch("main/editImage", {
                id: data.id,
                item: imagedata,
                option: "user",
              });

              if (result2.status == "error") {
                this.status = "error";
                this.message = "tr " + result2.message;
              }
            }
          }
        } else {
          this.status = "error";
          this.message = "Contraseñas no coinciden";
        }
      }

      let result = await this.$store.dispatch("usuarios/editItemUsr", {
        option: "user",
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

    delStatus: function () {
      setTimeout(() => this.delMsgs(), 2000);
    },
    previewFiles(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file1 = files[0];
      this.archivo = this.file1.name;
    },

    showModal: function () {
      this.viewModal = true;
    },
  },
};
</script>
<style scoped>
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
  color: #000000;
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
.inputs-cont label span{
  font-family: "Glory";
}
.two-i {
  width: 40.208vw;
}
.three-i {
  width: 26.517vw;
}
.row-cont {
  margin-bottom: 3.021vw;
}
.titulo-f4 {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25vw;
  line-height: 1.51vw;
  color: #000000;
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
  background: #e42828;
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
  font-family: "Glory";
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
  border: 0.1vw solid black;
  background: white;
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 0.972vw;
  line-height: 0.972vw;
  color: #000000;
  margin-left: auto;
  cursor: pointer;
  letter-spacing: 0.1vw;
}
.fileimage {
    font-size: 1.2vw;
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
    width: 67.841vw;
    height: 16.589vw;
    background: #e42828;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-btn span {
    font-size: 4.206vw;
    line-height: 4.673vw;
  }
  .image-btn .cam {
    width: 4.907vw;
    height: 4.439vw;
    padding-right: 4.042vw;
  }
  .btn-submit {
    width: 100%;
    height: 18.692vw;
    font-size: 4.673vw;
    line-height: 5.607vw;
  }
}
</style>
