<template >
  <div id="AddCat">
    <div class="form-content">
      <form
        @submit.prevent="
          submit(
            name,
            id_category,
            //id_brand,
            descrp,
            url,
            price,
            code,
            file1,
            skd_weight, 
            skd_height, 
            skd_width, 
            skd_length, 
          )
        "
      >
        <div class="grup-form dflx">
          <!--nombre-->
          <div class="boxform">
            <label for="name" class="name">Nombre </label>
            <input
              v-model="name"
              type="text"
              id="name"
              name="name"
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9-.\s]{2,254}"
              required
              class="in1"
            />
          </div>

          <!--categoría-->
          <div class="boxform">
            <label for="url" class="url">URL </label>
            <input
              v-model="url"
              type="text"
              id="name"
              name="url"
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9-.\s]{2,254}"
              required
              class="in1 url-input"
            />
          </div>
        </div>

        <div class="grup-form dflx">
          <!--descripcion-->
          <div class="boxform">
            <label for="descrp" class="descrp">Descripción </label>
            <textarea
              v-model="descrp"
              id="name"
              name="descrp"
          
              required
              class="in1"
              style="resize: none"
            />
          </div>
        </div>

        <div class="grup-form dflx">
          <!--categoría-->
          <div class="boxform">
            <label for="role" class="role">Categoría</label>

            <input
              v-model="cat_name"
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
                        @click="(cat_name = prm.name),
                          (parent_cat_name = prm.parent_name), (id_category = prm.id)"
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
          </div>

          <!--brand-->
          <!--<div class="boxform">
            <label for="role" class="role">Marcas</label>

            <input
              v-model="bra_name"
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
                      brand != 'No se encontraron coincidencias.' &&
                      brand != 'error'
                    "
                  >
                    <div v-for="(prm, key) in brand" :key="key">
                      <p
                        v-if="includesItem2(value2, prm.name)"
                        class="itemp cp"
                        @click="(bra_name = prm.name), (id_brand = prm.id)"
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
                  v-model="value2"
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
          </div>-->
        </div>

        <div class="grup-form dflx">
          <!--precio-->
          <div class="boxform">
            <label for="price" class="price">Precio </label>
            <input
              v-model="price"
               type="number"
              id="name"
              name="price" 
              min="1" 
              step="any" 
              required
              class="in1"
            />
          </div>
          <!--codigo-->
          <div class="boxform">
            <label for="code" class="code">Codigo </label>
            <input
              v-model="code"
              type="text"
              id="name"
              name="code"

              required
              class="in1"
            />
          </div>

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
            />
          </div>
        </div>

        <hr class="hrdr">
          <p class="msg_skydropx">Datos requeridos por Skydropx</p>
          <p class="msg_skydropx2">No acepta decimales.</p>
          <div class="grup-form dflx">
         
          <div class="boxform">
            <label for="skd_weight" class="skd_weight">Peso <span>(KG)</span></label>
            <input
              v-model="skd_weight"
              type="number"
              id="skd_weight"
              name="skd_weight"
              min="0"
              step="1"
              pattern="^[0-9]+"
              required
            />
          </div>

          <div class="boxform">
            <label for="skd_height" class="skd_height">Altura <span>(CM)</span></label>
            <input
              v-model="skd_height"
              type="number"
              id="skd_height"
              name="skd_height"
              min="0"
              step="1"
              pattern="^[0-9]+"
              required
            />
          </div>

        

        </div>
         <div class="grup-form dflx">
         
          <div class="boxform">
            <label for="skd_width" class="skd_width">Ancho <span>(CM)</span></label>
            <input
              v-model="skd_width"
              type="number"
              id="skd_width"
              name="skd_width"
              min="0"
              step="1"
              pattern="^[0-9]+"
              required
            />
          </div>

          <div class="boxform">
            <label for="skd_length" class="skd_length">Largo <span>(CM)</span></label>
            <input
              v-model="skd_length"
              type="number"
              id="skd_length"
              name="skd_length"
              min="0"
              step="1"
              pattern="^[0-9]+"
              required
            />
          </div>

        

        </div>

        <!--regresar/guardar-->
        <div class="dflx">
          <p @click="wait()" class="btnRegresar">Regresar</p>
          <button class="alta" type="submit">Guardar</button>
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

      <div v-if="viewModal" class="modal_view">
        <div id="modal_add">
          <div class="body dflx">
            <h3>Producto agregado</h3>
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
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AddPro",
  data() {
    return {
      status: "",
      message: "",
      name: "",
      id_category: "",
      //id_brand: "",
      descrp: "",
      url: "",
      status: "INACTIVO",
      price: null,
      code: "N/A",
      image: "",
      skd_weight:0, 
      skd_height:0, 
      skd_width:0, 
      skd_length:0, 
      /************************************************/
      /************************************************/
      /************************************************/
      /************************************************/
      id_parent: 1,
      cat_name: "NINGUNA",
      bra_name: "NINGUNA",
      search_value: "",
      updsearchcli: "",
      search_value2: "",
      updsearchcli2: "",
      active: false,
      value1: "",
      value2: "",
      archivo: "No se eligió archivo",
      file1: null,

      //MODAL

      viewModal: false,
    };
  },
  created() {
    this.getAllInfoCat("category");
    //this.getAllInfoBnd("brand");
  },
  watch:{
    name(value){
        if(value){
             let ss =  value.replace(/[\u0300-\u036f-\s]/g, "-"); 
             this.url = ss.replace(/[^A-Za-zÁÉÍÓÚáéíóú0-9]+/g,"-")
        }
       
    }
  },
  updated() {
    if (this.search_value != this.updsearchcli) {
      this.updsearchcli = this.search_value;

      let option = "category";

      let value = this.search_value;

      let payload = {
        option: option,
        search: value,
      };
      if (value != "") {
        this.$store.dispatch("category/searchCat", payload);
      } else {
        this.getAllInfoIng("category");
      }
    }
    if (this.search_value2 != this.updsearchcli2) {
      this.updsearchcli2 = this.search_value2;

      //let option = "brand";

      let value = this.search_value;

      let payload = {
        option: option,
        search: value,
      };
      /*if (value != "") {
        this.$store.dispatch("brand/searchBnd", payload);
      } else {
        this.getAllInfoIng("brand");
      }*/
    }
  },
  computed: {
    categorias() {
      let allctg = this.$store.getters["category/data"];
      let result = [];
      let model;
      for (var i = 0; i < allctg.length; i++) {
        if (allctg[i].id == 1) {
          model = {
            id: allctg[i].id,
            id_parent: allctg[i].id_parent,
            name: "NINGUNA",
            parent_name: allctg[i].parent_name,
          };
        } else {
          model = {
            id: allctg[i].id,
            id_parent: allctg[i].id_parent,
            name: allctg[i].name,
            parent_name: allctg[i].parent_name,
          };
        }
        result.push(model);
      }

      return result;
    },
    /*brand() {
      let allctg = this.$store.getters["brand/data"];
      let result = [];
      let model;
      for (var i = 0; i < allctg.length; i++) {
        model = {
          id: allctg[i].id,
          name: allctg[i].name,
        };
        result.push(model);
      }

      return result;
    },*/
  },
  methods: {
    ...mapActions("product", ["getAllInfoPro"]),
    ...mapActions("product", ["setAddedPro"]),
    ...mapActions("product", ["setHistoryOptionPro"]),
    ...mapActions("category", ["getAllInfoCat"]),
    ...mapActions("category", ["setAddedCat"]),
    ...mapActions("category", ["setHistoryOptionCat"]),
    /*...mapActions("brand", ["getAllInfoBnd"]),
    ...mapActions("brand", ["setAddedBnd"]),
    ...mapActions("brand", ["setHistoryOptionBnd"]),*/
    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },
    submit: async function (
      name,
      id_category,
      //id_brand,
      descrp,
      url,
      price,
      code,
      image,
      skd_weight, skd_height, skd_width, skd_length, 
    ) {
      this.status = "";
      this.message = "";
      let data = [];

      if (image == null) {
        data = {
          name: name,
          id_category: id_category,
          //id_brand: id_brand,
          descrp: descrp,
          url: url,
          price: price,
          code: code,
          //image: image,
          skd_weight, skd_height, skd_width, skd_length, 
        };
      } else {
         data = new FormData();
        data.append("name", name);
        data.append("id_category", id_category);
        //data.append("id_brand", id_brand);
        data.append("descrp", descrp);
        data.append("url", url);
        data.append("price", price);
        data.append("code", code);
        data.append("image", image);
        data.append("skd_weight", skd_weight);
        data.append("skd_height", skd_height);
        data.append("skd_width", skd_width);
        data.append("skd_length", skd_length);
        data.append("_method", "POST");
      }
      let result = await this.$store.dispatch("product/addItemPro", {
        option: "product",
        item: data,
      });

      if (result.status == "error") {
        this.status = "error";
        this.message = result.message;
      } else {
        // success
        this.setAddedPro(result.added);
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

    includesItem2(search, name) {
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

    showModal: function () {
      this.viewModal = true;
    },
    closeModal: function () {
      this.viewModal = false;
      this.setAddedPro("");
      this.setHistoryOptionPro("Default");
    },
    Add: function () {
      this.status = "";
      this.message = "";
      this.name = "";
      (this.parent_name = ""), (this.id_parent = 1);

      this.id_category =''
      //this.id_brand =''
      this.cat_name ="NINGUNA"
      this.bra_name ="NINGUNA"
      this.descrp=''
      this.url=''
      this.price=''
      this.code=''
      this.image=null
      this.skd_weight =0
      this.skd_height=0,
      this.skd_width=0,
      this.skd_length=0

      this.viewModal = false;
      this.setAddedPro("");
    },
    toEdit: function () {
      this.setHistoryOptionPro("Edit");
      this.viewModal = false;
    },
    back: function () {
      setTimeout(() => this.$router.go(), 200);
    },
    previewFiles(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file1 = files[0];
      this.archivo = this.file1.name;
    },
  },
};
</script>
<style scoped>
.grup-form {
  align-items: flex-start;
}
#AddCat label {
  color: var(--color-2);
  font-weight: 700;
  font-size: 0.7291666666666666vw;
  margin-bottom: 0.3vw;
}

#AddCat input,
#AddCat select {
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