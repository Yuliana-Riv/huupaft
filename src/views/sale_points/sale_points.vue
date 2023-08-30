<template>
  <div id="sale_points">
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

      <div class="tbl_sale_points">
        <div class="tbl_header dflx">
          <div class="tblh tblrad ">
            <p>PUNTO DE VENTA</p>
          </div>
          <div class="tblh">
            <p>CIUDAD</p>
          </div>
          <div class="tblh">
            <p>LINK</p>
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
              <div class="tbl_item ">
                <p>{{ item.name }}</p> 
              </div>
              <div class="tbl_item">
                <p>{{ item.city }}</p>
              </div>
              <div class="tbl_item">
               <a :href="item.link" target="_blank" rel="noopener noreferrer"><p>{{ item.link }}</p></a> 
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
      <!-- Agregar sale_points -->
      <AddSP />
    </div>
    <div v-if="historyOption == 'Edit'">
      <!-- Editar sale_points -->
      <EditSP />
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
              este sale_points?</span
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
import AddSP from "./addSP.vue";
import EditSP from "./editSP.vue";
let urlpath = require("../../global/index");

export default {
  name: "sale_points",
  components: {
    AddSP,
    EditSP,
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
    this.getAllInfoSP("sale_points");
  },

  updated() {
    if (this.search_value != this.updsearchcli) {
      this.updsearchcli = this.search_value;

      let option = "sale_points";

      let value = this.search_value;

      let payload = {
        option: option,
        search: value,
      };
      if (value != "") {
        this.$store.dispatch("sale_points/searchSP", payload);
      } else {
        this.getAllInfoSP("sale_points");
      }
    }
  },
  computed: {
    data() {
      let array = this.$store.getters["sale_points/data"];
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
      return this.$store.getters["sale_points/getHistoryOption"];
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
    ...mapActions("sale_points", ["getAllInfoSP"]),
    ...mapActions("sale_points", ["setHistoryOptionSP"]),
    ...mapActions("sale_points", ["setAddedSP"]),

    changeView(option, item) {
      this.item = item;
      this.setAddedSP(item);
      this.setHistoryOptionSP(option);
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

      let result = await this.$store.dispatch("sale_points/deleteItemSP", {
        option: "sale_points",
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
      let option = "sale_points";

      let payload = {
        option: option,
        search: value,
      };
      if (value != "") {
        this.$store.dispatch("sale_points/searchSP", payload);
      } else {
        this.getAllInfoSP("sale_points");
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
      let src = `${urlpath.url}/ayn_Rqv/WW9-AGv/sale_points-img/${img}`;

      //this.status_img(img)

      return src;
    },
  },
};
</script>
<style scoped>
.tbl_sale_points {
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
