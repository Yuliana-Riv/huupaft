<template >
  <div id="EditCat">
    <div class="form-content">
      <form @submit.prevent="submit(added.name, added.id_parent)">
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
              class="in1"
            />
          </div>
          <div class="boxform">
            <label for="role" class="role">Categoría padre </label>
            <!-- <select id="select-role" v-model="added.id_parent" required name="role">
                                  <option
                                    v-for="(prm, key) in categorias"
                                    v-bind:key="key"
                                    v-bind:value="prm.id"
                                >
                                    {{ prm.name}}
                                </option>
                            
                            </select>-->

            <input
              v-model="added.parent_name"
              type="text"
              id="tipos"
              name="tipos"
              disabled
              required
            />

            <div class="content-tbl-items">
              <div class="tblitems">
                <div class="bodytbl-items tbl_item">
                  <div
                    v-if="
                      categorias != 'No se encontraron coincidencias.' &&
                      categorias != 'error'
                    "
                  >
                    <div v-for="(prm, key) in categorias" :key="key">
                      <p
                        v-if="includesItem(value1, prm.name)"
                        class="itemp cp"
                        @click="
                          (added.parent_name = prm.name),
                            (added.id_parent = prm.id)
                        "
                      >
                        {{ prm.name }}
                      </p>
                    </div>
                  </div>
                  <div v-else>
                    <p class="item cp">No se encontraron coincidencias.</p>
                  </div>
                </div>
              </div>
              <div class="buscador-items dflx">
                <input
                  v-model="value1"
                  type="search"
                  id="inputbusqueda"
                  class="form-control searching-it"
                  :placeholder="'Búsqueda'"
                />
                <div class="icon_buscar">
                  <img src="../../assets/Search.png" alt="icono buscar" />
                </div>
              </div>
            </div>

            <!--     <div class="select-container">
                                <input
                                    type="checkbox"
                                    name="select-ch"
                                    id="select-ch"
                                    v-model="active"
                                    :true-value="true"
                                    :false-value="false"
                                />
                                <label for="select-ch">
                                    <div id="select-role" :class="{ rounded: active }">
                                    {{added.parent_name }}
                                    </div>
                                </label>
                                <div  class="options-cont" @click="closeSelect()">
                                    <div v-for="(prm, key) in categorias" :key='key' class="option-btn" @click="added.id_parent = prm.id, added.parent_name =prm.name">{{prm.name}}</div>
                                </div>
                               
                                </div>-->
          </div>
        </div>

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

    <div v-if="viewModal" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Categoría actualizada</h3>
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
import { mapActions } from "vuex";
export default {
  name: "EditCat",

  data() {
    return {
      status: "",
      message: "",
      active: false,
      value1:"",
      viewModal: false,
    };
  },
  created() {
    this.getAllInfoCat("category");
  },
  computed: {
    added() {
      return this.$store.getters["category/getAdded"];
    },
    categorias() {
      return this.$store.getters["category/data"];
    },
  },
  methods: {
    ...mapActions("category", ["getAllInfoCat"]),
    ...mapActions("category", ["setAddedCat"]),
    ...mapActions("category", ["setHistoryOptionCat"]),
    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },
    ...mapActions("category", ["getInfoByIdCat"]),
    submit: async function (name, id_parent) {
      this.status = "";
      this.message = "";
      let category = {
        id: this.added.id,
        name: name,
        id_parent: id_parent,
      };

      let result = await this.$store.dispatch("category/editItemCat", {
        option: "category",
        item: category,
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

    includesItem(search, name) {
      if (search == "") {
        return true;
      }
      name = name.toLowerCase();
      search = search.toLowerCase();
      if (search == "") {
        return false;
      }
      return name.includes(search);
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
      this.setAddedCat("");
      this.setHistoryOptionCat("Default");
    },
    Edit: function () {
      this.viewModal = false;
    },
    back: function () {
      setTimeout(() => this.$router.go(), 200);
    },
  },
};
</script>
<style scoped>
#EditCat label {
  color: var(--color-2);
  font-weight: 700;
  font-size: 0.7291666666666666vw;
  margin-bottom: 0.3vw;
}

#EditCat input,
#EditCat select {
  height: 2.5vw;
  width: 14.716666666666668vw;
  border: 0.052083vw solid var(--color-2);
  border-radius: 0vw 1.5vw 1.5vw 0vw;
  color: var(--color-4);
  font-size: 0.7291666666666666vw;
  font-weight: 500;
  padding-left: 1.09375vw;
}

#select-role {
  height: 2.5vw;
  width: 13.716667vw;
  border: 0.052083vw solid var(--color-2);
  border-radius: 0vw 1.5vw 1.5vw 0vw;
  color: var(--color-4);
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