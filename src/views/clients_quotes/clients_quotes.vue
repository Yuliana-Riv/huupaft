<template>
  <div id="clients_quotes">
    <div v-if="historyOption == 'Default'">
      <div class="dflx">
        <p class="noitems">
          No. de items
          <span v-if="data != 'No se encontraron coincidencias.'">{{
            data.length
          }}</span>
          <span v-else>0</span>
        </p>

        <div class="select-container">
          <input
            type="checkbox"
            name="select-ch"
            id="select-ch"
            v-model="active"
            true-value="true"
            false-value="false"
          />
          <label for="select-ch">
            <div id="select-items" :class="{ rounded: active }">
              Items por página: {{ itemsPerPage }}
            </div>
          </label>
          <div class="options-cont" @click="closeSelect()">
            <div
              class="option-btn"
              v-bind:value="6"
              @click="itemsPerPage = '6'"
            >
              6
            </div>
            <div
              class="option-btn"
              v-bind:value="12"
              @click="itemsPerPage = '12'"
            >
              12
            </div>
            <div
              class="option-btn"
              v-bind:value="18"
              @click="itemsPerPage = '18'"
            >
              18
            </div>
            <div
              class="option-btn"
              v-bind:value="24"
              @click="itemsPerPage = '24'"
            >
              24
            </div>
          </div>
        </div>
        <div class="buscador dflx">
          <input
            v-model="search_value"
            type="search"
            id="input-search"
            class="form-control"
            :placeholder="'Búsqueda'"
          />
          <div class="icon_buscar">
            <img
              @click="search(search_value)"
              src="../../assets/Search.png"
              alt="icono buscar"
            />
          </div>
        </div>
      </div>

      <div @click="changeView('Add', '')" class="btn_añadir dflx">
        <p>AGREGAR</p>
        <img src="../../assets/add.png" alt="" />
      </div>

      <div class="tbl_clients_quotes">
        <div class="tbl_header dflx">
          <div class="tblh tblrad tlarg">
            <p>CITA</p>
          </div>
          <div class="tblh">
            <p>AUTOR</p>
          </div>
          <div class="tblh">
            <p>IMAGEN</p>
          </div>
          <div class="tblh2">
            <p>EDITAR</p>
          </div>
          <div class="tblh2 tblh2r">
            <p>BORRAR</p>
          </div>
        </div>

        <div tbl_content>
          <div
            v-if="data != 'No se encontraron coincidencias.' && data != 'error'"
          >
            <div
              class="tbl_items dflx"
              v-for="(item, key) in filteredItems"
              :key="key"
            >
              <div class="tbl_item tlarg">
                <p>{{ item.quote }}</p> 
              </div>
              <div class="tbl_item">
                <p>{{ item.fullname }}</p>
              </div>
              <div class="tbl_item">
                <img :src="srcImg(item.image)" alt="img" class="img">
              </div>

              <div class="icon_editar">
                <img
                  @click="changeView('Edit', item)"
                  src="../../assets/i_editar.png"
                  alt="icono editar"
                />
              </div>
              <div class="icon_eliminar">
                <img
                  @click="showModal(item.id)"
                  src="../../assets/i_eliminar.png"
                  alt="icono eliminar"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <p class="snu">Aun no hay registros.</p>
          </div>
        </div>
      </div>

      <div id="navigate-buttons" class="mlf">
        <div class="dflx">
          <button @click="prev" id="btn-prev" class="btn-navigate">
            <img src="../../assets/Left.png" alt="icono anterior" />
          </button>
          <p class="num-pages">{{ currentPage }} / {{ totalPages }}</p>
          <button @click="next" id="btn-next" class="btn-navigate">
            <img src="../../assets/Right.png" alt="icono siguiente" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="historyOption == 'Add'">
      <!-- Agregar clients_quotes -->
      <AddCQ />
    </div>
    <div v-if="historyOption == 'Edit'">
      <!-- Editar clients_quotes -->
      <EditCQ />
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
      <div id="modal_delete">
        <div class="body">
          <img src="../../assets/alert.png" alt="icono alerta" />
          <h3>
            ¿Estás seguro de
            <span
              >eliminar <br />
              este clients_quotes?</span
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
import AddCQ from "./addCQ.vue";
import EditCQ from "./editCQ.vue";
let urlpath = require("../../global/index");

export default {
  name: "clients_quotes",
  components: {
    AddCQ,
    EditCQ,
  },
  data() {
    return {
      urlpath: urlpath,
      status: "",
      message: "",
      item: "",
      search_value: "",
      updsearchcli: "",
      currentPage: 1,
      itemsPerPage: 12,
      active: false,
      viewModal: false,
      itemDel: "",
      radius: false,
      destacados: [],
    };
  },
  created() {
    this.getAllInfoCQ("clients_quotes");
  },

  updated() {
    if (this.search_value != this.updsearchcli) {
      this.updsearchcli = this.search_value;

      let option = "clients_quotes";

      let value = this.search_value;

      let payload = {
        option: option,
        search: value,
      };
      if (value != "") {
        this.$store.dispatch("clients_quotes/searchCQ", payload);
      } else {
        this.getAllInfoCQ("clients_quotes");
      }
    }
  },
  computed: {
    data() {
      let array = this.$store.getters["clients_quotes/data"];
      let encontrados = [];
      for (const item of array) {
        if (item.orden != "NA") {
          encontrados.push(item);
        }
      }
      this.destacados = encontrados;
      return array;
    },
    historyOption() {
      return this.$store.getters["clients_quotes/getHistoryOption"];
    },

    //Paginacion
    allItems() {
      return Object.keys(this.data).map((pid) => this.data[pid]);
    },
    filteredItems() {
      return this.allItems.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    },
    totalPages() {
      let total = Math.ceil(this.allItems.length / this.itemsPerPage);
      if (total < this.currentPage) {
        this.currentPage = 1;
      }
      return total;
    },
  },
  methods: {
    ...mapActions("clients_quotes", ["getAllInfoCQ"]),
    ...mapActions("clients_quotes", ["setHistoryOptionCQ"]),
    ...mapActions("clients_quotes", ["setAddedCQ"]),

    changeView(option, item) {
      this.item = item;
      this.setAddedCQ(item);
      this.setHistoryOptionCQ(option);
    },

    activeRadius() {
      this.radius ? (this.radius = false) : (this.radius = true);
    },

    showModal: function (id) {
      this.itemDel = id;
      this.viewModal = true;
    },
    closeModal: function () {
      this.viewModal = false;
      this.itemDel = "";
    },

    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },

    delStatus: function () {
      setTimeout(() => this.delMsgs(), 2000);
      setTimeout(() => this.wait(), 500);
    },
    delMsgs: function () {
      this.status = "";
      this.message = "";
    },

    eliminar: async function () {
      let id = this.itemDel;
      this.status = "";
      this.message = "";

      let result = await this.$store.dispatch("clients_quotes/deleteItemCQ", {
        option: "clients_quotes",
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
    closeSelect() {
      document.getElementById("select-ch").checked = false;
      this.active = false;
    },

    search: async function (value) {
      let option = "clients_quotes";

      let payload = {
        option: option,
        search: value,
      };
      if (value != "") {
        this.$store.dispatch("clients_quotes/searchCQ", payload);
      } else {
        this.getAllInfoCQ("clients_quotes");
      }
    },

    // botones de paginacion.
    next() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prev() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    srcImg: function (img) {
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/clients_quotes-img/${img}`;

      //this.status_img(img)

      return src;
    },
  },
};
</script>
<style scoped>
.tbl_clients_quotes {
  margin-top: 1.9791666666666665vw;
  width: 66.4vw;
}

.tbl_items {
  border-bottom: 1px solid var(--color-4);
}

.tbl_item {
  overflow: auto;
}
.tbl_item .img{
  width: 5vw;
  display: flex;
  margin: 2vw auto;
}
.tblh {
  width: 10.78125vw;
  height: 2.5vw;
  background: var(--color-2);
  border-right: 1px solid var(--color-5);
}
.tblh2 {
  width: 2.5vw;
  height: 2.5vw;
  background: var(--color-3);
  border-right: 1px solid var(--color-5);
}
.tblh p {
  padding-left: 1.3541666666666667vw;
  color: var(--color-5);
  font-size: 0.7291666666666666vw;
  font-weight: 500;
}
.tblh2 p {
  padding-top: 0.5vw;
  padding-left: 0.3vw;
  color: var(--color-5);
  font-size: 0.46875vw;
  font-weight: 700;
}

.icon_editar,
.icon_eliminar {
  width: 2.5vw;
  height: 2.5vw;
}

.icon_editar img,
.icon_eliminar img {
  width: 0.8vw;
  height: 0.8vw;
  padding-top: 0.9vw;
  padding-left: 0.6vw;
  cursor: pointer;
}
.tblrad {
  border-radius: 1.5vw 0vw 0vw 1.5vw;
}

.tblh2r {
  border-radius: 0vw 0.5vw 0.5vw 0vw;
}

.tbl_item {
  width: 10.78125vw;
}
.tbl_item p {
  padding-left: 1.3541666666666667vw;
  color: var(--color-2);
}
.tbl_item a {
  /*padding-left: 1.3541666666666667vw;*/
  color: var(--color-2);
  transition: 0.5s;
}
.tbl_item a:hover {
  color: var(--color-6);
}

.mlf {
  margin-left: 61.5vw !important;
}

.tlarg {
  width: 29vw !important;
}
.tlarg section {
  padding-left: 2vw;
  padding-top: 0.5vw;
}
</style>
