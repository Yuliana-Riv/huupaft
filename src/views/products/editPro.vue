<template >
  <div id="EditarProducto">
    <div id="bloques_sec" class="dflx">
      <a href="#Producto" @click="bloq = 1" :class="{ 'act-bloq': bloq == 1 }"
        >Producto</a
      >
      <a href="#Skydropx" @click="bloq = 7" :class="{ 'act-bloq': bloq == 7 }"
        >Skydropx</a
      >
      <a href="#Atributos" @click="bloq = 2" :class="{ 'act-bloq': bloq == 2 }"
        >Atributos</a
      >
      <a href="#Categorías" @click="bloq = 3" :class="{ 'act-bloq': bloq == 3 }"
        >Categorías</a
      >
      <a href="#Stock" @click="bloq = 4" :class="{ 'act-bloq': bloq == 4 }"
        >Stock</a
      >
      <a href="#Galería" @click="bloq = 5" :class="{ 'act-bloq': bloq == 5 }"
        >Galería</a
      >
      <a href="#Variantes" @click="bloq = 6" :class="{ 'act-bloq': bloq == 6 }"
        >Variantes</a
      >
    </div>

    <div class="form-content">
      <p id="Producto" class="subtitle">
        Producto
        <a @click="bloq = 1" href="#EditarProducto"
          ><img
            class="totop"
            src="../../assets/uparrow.svg"
            alt="ir al top de la vista."
        /></a>
      </p>

      <form
        @submit.prevent="
          submit(
            added.id,
            added.name,
            added.id_category,
            //added.id_brand,
            added.descrp,
            added.status,
            added.url,
            added.price,
            added.code,
            file1,
            added.skd_weight,
            added.skd_height,
            added.skd_width,
            added.skd_length
          )
        "
      >
        <div class="grup-form dflx">
          <!--nombre-->
          <div class="boxform">
            <label for="name" class="name">Nombre </label>
            <input
              v-model="added.name"
              type="text"
              id="name"
              name="name"
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9-.\s]{2,254}"
              required
              class="in1"
            />
          </div>

          <!--url-->
          <div class="boxform">
            <label for="url" class="url">URL</label>
            <input
              v-model="added.url"
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
            <label for="descrp" class="descrp">Descripción</label>
            <textarea
              v-model="added.descrp"
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
              v-model="added.category_name"
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
                          (added.category_name = prm.name),
                            (added.parent_cat_name = prm.parent_name),
                            (added.id_category = prm.id)
                        "
                      >
                        <!--parent_cat_name-->
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
            <label for="role" class="role">Marca</label>

            <input
              v-model="added.brand_name"
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
                        @click="
                          (added.brand_name = prm.name),
                            (added.id_brand = prm.id)
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
              v-model="added.price"
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
              v-model="added.code"
              type="text"
              id="name"
              name="code"
              required
              class="in1"
            />
          </div>
          <div class="boxform">
            <label for="role" class="role">Status </label>
            <div class="select-container">
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
                  {{ added.status }}
                </div>
              </label>
              <div class="options-cont" @click="closeSelect()">
                <div class="option-btn" @click="added.status = 'INACTIVO'">
                  INACTIVO
                </div>
                <div class="option-btn" @click="added.status = 'ACTIVO'">
                  ACTIVO
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--imagen-->
        <div class="grup-form dflx">
          <div class="boxform">
            <label>Imagen</label>
            <div class="dflx">
              <label class="filelabel" for="file1">
                <span>Seleccionar Archivo</span>
              </label>
              <label class="filelabelname tbl_item" for="file1">
                {{ added.image }}
              </label>
            </div>

            <input
              @change="previewFiles"
              :v-model="added.image"
              type="file"
              id="file1"
              name="uploadimg"
              class="fileinput"
            />
          </div>
        </div>

        <img
          class="img_item"
          v-if="validateIMG(added.image)"
          :src="
            urlpath.url + '/P6H_3Pm/bt7-EO4/get-product-image/' + added.image
          "
          alt=""
        />

        <hr class="hrdr" />
        <p id="Skydropx" class="subtitle">
          Datos requeridos por Skydropx
          <a @click="bloq = 1" href="#EditarProducto"
            ><img
              class="totop"
              src="../../assets/uparrow.svg"
              alt="ir al top de la vista."
          /></a>
        </p>

        <p class="msg_skydropx2">No acepta decimales.</p>
        <div class="grup-form dflx">
          <div class="boxform">
            <label for="skd_weight" class="skd_weight"
              >Peso <span>(KG)</span></label
            >
            <input
              v-model="added.skd_weight"
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
            <label for="skd_height" class="skd_height"
              >Altura <span>(CM)</span></label
            >
            <input
              v-model="added.skd_height"
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
            <label for="skd_width" class="skd_width"
              >Ancho <span>(CM)</span></label
            >
            <input
              v-model="added.skd_width"
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
            <label for="skd_length" class="skd_length"
              >Largo <span>(CM)</span></label
            >
            <input
              v-model="added.skd_length"
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
          <p @click="back()" class="btnRegresar">Regresar</p>
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
    </div>

    <div v-if="viewModal" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Producto actualizado</h3>
          <img src="../../assets/add.png" alt="icono alerta" />
        </div>

        <div class="modal_edit_btns dflx">
          <p @click="wait()" class="otro">Aceptar</p>
          <!-- <p  @click="back()" class="inicio">Inicio</p>-->
        </div>
      </div>
    </div>

    <div class="create_shipment">
      <form
        @submit.prevent="
          guardarClase(
            CATEGORY_ID,
            SUBCATEGORY_ID,
            consignment_note_class_code,
            descr_class
          )
        "
      >
        <div class="grup-data dflx">
          <label v-if="!added.skd_class" class="destacar2">Asignar</label>
          <label v-else class="destacar2">Editar</label>
          <p class="pdata destacar">clase</p>
        </div>
        <p v-if="added.skd_class" class="msg_text2">
          Actual:
          <span> {{ added.skd_class }} - {{ added.skd_class_descrp }}</span>
        </p>
        <p class="subtitle">Información requerida para envíos por Skydropx</p>

        <div v-if="message2" class="status_messages">
          <div class="msg msg_error">
            <p>{{ message2 }}</p>
          </div>
        </div>

        <div class="header-ts dflx">
          <div class="hsc1">
            <p class="ph1">Seleccionar la clase del producto</p>
          </div>
          <div class="hsc2">
            <p>{{ consignment_note_class_code }}</p>
          </div>
          <div class="hsc3" @click="showClass = !showClass">
            <p v-if="showClass == false">
              <img src="../../assets/abajo.svg" alt="flecha arrib" />
            </p>
            <p v-else>
              <img src="../../assets/arriba.svg" alt="flecha abajo" />
            </p>
          </div>
        </div>
        <p v-if="showClass" class="ph2">
          1. Index de categorías de productos establecidos por el SAT y exigidos
          para la carta de porte. <br />
          2. Index de subcategorías de productos establecidos por el SAT y
          demandados para el filtro de la carta de porte por Categoría. <br />
          3. Index de clases de productos establecidos por el SAT y exigidos
          para el filtro de la carta de porte por Subcategoría. La clase de
          producto es necesario para crear un envío.
        </p>

        <div v-if="showClass" class="tbl-ship2">
          <div class="cnt-box">
            <div class="box-pack2-hdr">
              <p>1. CATEGORÍA</p>
            </div>
            <div class="column-box">
              <div
                @click="CATEGORY_ID = cat.id"
                class="box-pack2"
                :class="{ 'active-box': CATEGORY_ID == cat.id }"
                v-for="(cat, key) in categories"
                :key="key"
              >
                <p>{{ cat.attributes.code }} - {{ cat.attributes.name }}</p>
              </div>
            </div>
          </div>
          <div class="cnt-box">
            <div class="box-pack2-hdr">
              <p>2. SUBCATEGORÍA</p>
            </div>
            <div class="column-box">
              <div
                @click="SUBCATEGORY_ID = sub.id"
                class="box-pack2"
                :class="{ 'active-box': SUBCATEGORY_ID == sub.id }"
                v-for="(sub, key) in subcategories"
                :key="key"
              >
                <p>{{ sub.attributes.code }} - {{ sub.attributes.name }}</p>
              </div>
            </div>
          </div>
          <div class="cnt-box">
            <div class="box-pack2-hdr">
              <p>3. CLASE</p>
            </div>
            <div class="column-box">
              <div
                @click="
                  (consignment_note_class_code = cla.attributes.code),
                    (descr_class = cla.attributes.name)
                "
                class="box-pack2"
                :class="{
                  'active-box':
                    consignment_note_class_code == cla.attributes.code,
                }"
                v-for="(cla, key) in classes"
                :key="key"
              >
                <p>{{ cla.attributes.code }} - {{ cla.attributes.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <button v-if="cargando == false" class="alta">Guardar</button>
        <p v-else class="btnRegresar">
          <img src="../../assets/skydropx/Cargando0.gif" alt="" />
        </p>

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

    <hr class="hrdr" />
    <p id="Atributos" class="subtitle">
      Agregar atributos
      <a @click="bloq = 1" href="#EditarProducto"
        ><img
          class="totop"
          src="../../assets/uparrow.svg"
          alt="ir al top de la vista."
      /></a>
    </p>

    <div v-if="messageError != ''" class="status_messages">
      <div class="msg msg_error">
        <p>{{ messageError }}</p>
      </div>
    </div>
    <div class="rows_tbl dflx">
      <div class="tblitems mtp">
        <p class="hrd_tbli">ATRIBUTO VALOR</p>
        <div class="bodytbl-items tbl_item">
          <div v-if="atributos.length > 0">
            <div v-for="(atributo, key) in atributos" :key="key">
              <div v-for="(value, key2) in atributo.values" :key="key2">
                <div v-if="includesItem(value3, value.valor)" class="dflx sp">
                  <p class="itemp">{{ atributo.name + ": " + value.valor }}</p>
                  <p class="cp addcp" @click="addValue(value.id)">&#43;</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No se encontraron coincidencias.</p>
          </div>
        </div>
        <div class="buscador-items dflx">
          <input
            v-model="value3"
            type="search"
            id="inputbusqueda"
            class="searching-it"
            :placeholder="'Búsqueda'"
          />
        </div>
      </div>

      <div class="tblitems mtp">
        <p class="hrd_tbli">AGREGADAS</p>
        <div class="bodytbl-items tbl_item">
          <div v-if="added.product_atributo_valores.length > 0">
            <div
              v-for="(item, key) in added.product_atributo_valores"
              :key="key"
              class="dflx sp"
            >
              <p class="itemp">
                {{ item.atributo + ": " + item.valor }}
              </p>
              <p class="cp" @click="(modalDelete = true), (itemDel = item.id)">
                &#10006;
              </p>
            </div>
          </div>
          <div v-else>
            <p>No se encontraron coincidencias.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- -->
    <hr class="hrdr" />
    <p id="Categorías" class="subtitle">
      Agregar más categorías
      <a @click="bloq = 1" href="#EditarProducto"
        ><img
          class="totop"
          src="../../assets/uparrow.svg"
          alt="ir al top de la vista."
      /></a>
    </p>

    <div class="grup-form dflx">
      <!--categoría-->
      <div class="boxform">
        <label for="role" class="role">Categoría</label>

        <input
          v-model="added.category_name"
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
                    @click="addprocat(added.id, prm.id)"
                  >
                    <!--parent_cat_name-->
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
          <!-- &#43; -->
          <div class="tblitems mtp">
            <p class="hrd_tbli">AGREGADAS</p>
            <div class="bodytbl-items tbl_item">
              <div
                v-if="
                  added.product_categories != 'Sin categorías extra' &&
                  added.product_categories != 'error'
                "
              >
                <div
                  v-for="(prm, key) in added.product_categories"
                  :key="key"
                  class="dflx sp"
                >
                  <p class="itemp">
                    <!--parent_cat_name-->
                    {{ prm.category_name }}
                  </p>
                  <p class="cp" @click="deleteprocat(prm.id)">&#10006;</p>
                </div>
              </div>
              <div v-else>
                <p>No se encontraron coincidencias.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="viewModal4" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Categoría agregada</h3>
          <img src="../../assets/add.png" alt="icono alerta" />
        </div>

        <div class="modal_edit_btns dflx">
          <p @click="viewModal4 = false" class="otro">Aceptar</p>
          <!-- <p  @click="back()" class="inicio">Inicio</p>-->
        </div>
      </div>
    </div>

    <div v-if="viewModal5" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Categoría eliminada</h3>
          <img src="../../assets/add.png" alt="icono alerta" />
        </div>

        <div class="modal_edit_btns dflx">
          <p @click="viewModal5 = false" class="otro">Aceptar</p>
          <!-- <p  @click="back()" class="inicio">Inicio</p>-->
        </div>
      </div>
    </div>

    <hr class="hrdr" />
    <p id="Stock" class="subtitle">
      Editar stock
      <a @click="bloq = 1" href="#EditarProducto"
        ><img
          class="totop"
          src="../../assets/uparrow.svg"
          alt="ir al top de la vista."
      /></a>
    </p>

    <form @submit.prevent="stockvar(added.id, stockvalue)">
      <div class="boxform">
        <label for="stock" class="name">Stock actual </label>
        <input
          v-model="stockvalue"
          type="number"
          id="stock"
          name="stock"
          required
          class="in1"
        />
      </div>
      <button class="alta" type="submit">Actualizar</button>
      <div v-if="status2 != ''" class="status_messages">
        <div v-if="status2 == 'success'" class="msg msg_success">
          <p>{{ message2 }}</p>
        </div>
        <div v-if="status2 == 'error'" class="msg msg_error">
          <p>{{ message2 }}</p>
        </div>
      </div>
    </form>

    <hr class="hrdr" />
    <p id="Galería" class="subtitle">
      Agregar galería
      <a @click="bloq = 1" href="#EditarProducto"
        ><img
          class="totop"
          src="../../assets/uparrow.svg"
          alt="ir al top de la vista."
      /></a>
    </p>

    <form @submit.prevent="agregarImagen(file2, added.id)">
      <div class="grup-form dflx">
        <div class="boxform">
          <label>Imagen</label>
          <div class="dflx">
            <label class="filelabel" for="file2">
              <span>Seleccionar Archivo</span>
            </label>
            <label class="filelabelname tbl_item" for="file2">
              {{ this.archivo2 }}
            </label>
          </div>

          <input
            @change="previewFiles2"
            type="file"
            id="file2"
            name="uploadimg1"
            required
            class="fileinput"
          />
          <button class="alta" type="submit">Subir</button>

          <div v-if="viewModalGaleria" class="modal_view">
            <div id="modal_edit">
              <div class="body dflx">
                <h3>Se ha agregado la imagen</h3>
                <img src="../../assets/add.png" alt="icono alerta" />
              </div>

              <div class="modal_edit_btns dflx">
                <p @click="closeModalGaleria()" class="inicio">Aceptar</p>
                <p @click="back()" class="inicio">Salir</p>
                <!-- -->
              </div>
            </div>
          </div>

          <div class="images_gallery Div_ImagesCenter">
            <!---
            <div class="row gallery_titles">
              <div class="gt1">
                <p>Visualización</p>
              </div>
              <div class="gt2">
                <p>Eliminar</p>
              </div>
            </div>-->

            <div
              class="grid-cont"
              v-if="added.imagenes != 'No se encontraron coincidencias'"
            >
              <div
                v-for="(item, key) in added.imagenes"
                class="item_gallery"
                :key="key"
              >
                <div class="row" v-if="item.type != 'primera'">
                  <div class="gt1">
                    <img
                      :src="
                        urlpath.url +
                        '/P6H_3Pm/bt7-EO4/get-product-image/' +
                        item.image
                      "
                      alt="image"
                    />
                  </div>
                  <div class="gt2">
                    <p
                      class="eliminar-gallery"
                      @click="eliminarImagen(item.id)"
                    >
                      &#10006;
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="mtrow msg_channels">
                <p>Este producto aun no tiene imagenes.</p>
              </div>
            </div>

            <div v-if="viewModal3" class="modal_view">
              <div id="modal_edit">
                <div class="body dflx">
                  <h3>Se ha eliminado la imagen de la galería</h3>
                  <img src="../../assets/add.png" alt="icono alerta" />
                </div>

                <div class="modal_edit_btns dflx">
                  <p @click="closeModal3()" class="inicio">Aceptar</p>
                  <p @click="back()" class="inicio">Salir</p>
                  <!-- <p  @click="back()" class="inicio">Inicio</p>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <hr class="hrdr" />
    <p id="Variantes" class="subtitle">
      Vincular Variantes
      <a @click="bloq = 1" href="#EditarProducto"
        ><img
          class="totop"
          src="../../assets/uparrow.svg"
          alt="ir al top de la vista."
      /></a>
    </p>

    <div v-if="messageError != ''" class="status_messages">
      <div class="msg msg_error">
        <p>{{ messageError }}</p>
      </div>
    </div>
    <div class="rows_tbl dflx mbtom">
      <div class="tblitems mtp">
        <p class="hrd_tbli">PRODUCTOS</p>
        <div class="bodytbl-items tbl_item">
          <div v-if="productos.length > 0">
            <div v-for="(producto, key) in productos" :key="key">
              <div
                v-if="
                  includesItem(value4, producto.name) ||
                  includesItem(value4, producto.code)
                "
                class="dflx sp"
              >
                <p class="itemp">
                  {{ producto.name + " - C. " + producto.code }}
                </p>
                <p class="cp addcp" @click="addVariante(producto.id)">&#43;</p>
                <!-- @click="addValue(value.id)" -->
              </div>
            </div>
          </div>
          <div v-else>
            <p>No se encontraron coincidencias.</p>
          </div>
        </div>
        <div class="buscador-items dflx">
          <input
            v-model="value4"
            type="search"
            id="inputbusqueda"
            class="searching-it"
            :placeholder="'Búscar por nombre o código'"
          />
        </div>
      </div>

      <div class="tblitems mtp">
        <p class="hrd_tbli">VINCULADOS</p>
        <div class="bodytbl-items tbl_item">
          <div v-if="added.product_variantes.length > 0">
            <div
              v-for="(item, key) in added.product_variantes"
              :key="key"
              class="dflx sp"
            >
              <p class="itemp">
                {{ item.producto.name + " - C. " + item.producto.code }}
              </p>
              <p
                class="cp"
                @click="(varianteAlert = true), (itemDel = item.id)"
              >
                &#10006;
              </p>
              <!--    -->
            </div>
          </div>
          <div v-else>
            <p>No se encontraron coincidencias.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- -->

    <!-- MODALES -->

    <div v-if="modalValue" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Valor agregado</h3>
          <img src="../../assets/add.png" alt="icono alerta" />
        </div>

        <div class="modal_edit_btns dflx">
          <p @click="modalValue = false" class="otro">Aceptar</p>
          <!-- <p  @click="back()" class="inicio">Inicio</p>-->
        </div>
      </div>
    </div>

    <div v-if="modalEliminado" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Valor eliminado</h3>
          <img src="../../assets/add.png" alt="icono alerta" />
        </div>

        <div class="modal_edit_btns dflx">
          <p @click="modalEliminado = false" class="otro">Aceptar</p>
          <!-- <p  @click="back()" class="inicio">Inicio</p>-->
        </div>
      </div>
    </div>
    <div v-if="modalDelete" class="modal_view">
      <div id="modal_delete">
        <div class="body">
          <img src="../../assets/alert.png" alt="icono alerta" />
          <h3>
            ¿Estás seguro de
            <span
              >eliminar <br />
              este valor?</span
            >
          </h3>
        </div>

        <div class="modal_del_btns dflx">
          <p @click="eliminarValor()">Aceptar</p>
          <p @click="(modalDelete = false), (itemDel = '')">Cancelar</p>
        </div>
      </div>
    </div>

    <div v-if="modalVariante" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Valor agregado</h3>
          <img src="../../assets/add.png" alt="icono alerta" />
        </div>

        <div class="modal_edit_btns dflx">
          <p @click="modalVariante = false" class="otro">Aceptar</p>
          <!-- <p  @click="back()" class="inicio">Inicio</p>-->
        </div>
      </div>
    </div>
    <div v-if="modalVarianteDel" class="modal_view">
      <div id="modal_edit">
        <div class="body dflx">
          <h3>Producto desvinculado</h3>
          <img src="../../assets/add.png" alt="icono alerta" />
        </div>

        <div class="modal_edit_btns dflx">
          <p @click="modalVarianteDel = false" class="otro">Aceptar</p>
          <!-- <p  @click="back()" class="inicio">Inicio</p>-->
        </div>
      </div>
    </div>
    <div v-if="varianteAlert" class="modal_view">
      <div id="modal_delete">
        <div class="body">
          <img src="../../assets/alert.png" alt="icono alerta" />
          <h3>
            ¿Estás seguro de
            <span
              >desvincular <br />
              este producto?</span
            >
          </h3>
        </div>

        <div class="modal_del_btns dflx">
          <p @click="eliminarVariante()">Aceptar</p>
          <p @click="(varianteAlert = false), (itemDel = '')">Cancelar</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
let urlpath = require("../../global/index");
import userService from "../../services/user.service";
export default {
  name: "EditPro",

  data() {
    return {
      urlpath: urlpath,
      status: "",
      message: "",
      status2: "",
      message2: "",
      name: "",
      id_category: 1,
      //id_brand: 1,
      descrp: "",
      status_prod: "",
      url: "",
      price: null,
      code: "",
      image: "",
      itemDel: "",
      modalDelete: false,
      modalEliminado: false,
      messageError: "",
      modalValue: false,

      modalVariante: false,
      modalVarianteDel: false,
      varianteAlert: false,
      /************************************************/
      /************************************************/
      /************************************************/
      /************************************************/
      id_parent: 1,
      cat_name: "NINGUNA",
      var_name: "NINGUNA",
      search_value: "",
      updsearchcli: "",
      search_value2: "",
      updsearchcli2: "",
      active: false,
      active2: false,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      archivo: "No se eligió archivo",
      archivo2: "No se eligió archivo",
      file1: null,
      file2: null,
      stockvalue: 0,
      stockid: 0,
      //MODAL

      viewModal: false,
      viewModal2: false,
      viewModal3: false,
      viewModal4: false,
      viewModal5: false,
      isdeleted: false,
      viewModalGaleria: false,

      dataCat: [],

      newData: [],

      bloq: 1,

      cargando: false,
      CATEGORY_ID: "",
      SUBCATEGORY_ID: "",
      consignment_note_class_code: "",
      showClass: false,
      descr_class: "",
    };
  },
  async created() {
    await this.getAllInfoCat("category");
    //await this.getAllInfoBnd("brand");
    await this.getAllInfoAtt("atributo");
    await this.getAllInfoMrr("product");

    await this.getCategories();

    let option = "stock_product";
    let id = this.added.id;
    let payload = {
      id: id,
      option: option,
    };
    await this.getInfoByIdStk(payload);
  },

  watch: {
    CATEGORY_ID: async function (value) {
      this.SUBCATEGORY_ID = "";
      this.consignment_note_class_code = "";
      const payload = {
        CATEGORY_ID: value,
      };
      await this.getSubcategories(payload);
    },
    SUBCATEGORY_ID: async function (value) {
      this.consignment_note_class_code = "";
      const payload = {
        SUBCATEGORY_ID: value,
      };
      await this.getClasses(payload);
    },
  },
  computed: {
    stockdata() {
      let arr = this.$store.getters["stock/data"];
      return arr[0];
    },
    productos() {
      let product = this.$store.getters["mirror/data"];
      if (!Array.isArray(product)) {
        return [];
      } else {
        const newarr = product.filter((item) => item.id != this.added.id); //quitar el producto actual
        let filt = []; //quitar los productos que ya estan agregados
        for (const producto of newarr) {
          const include = this.added.product_variantes.filter(
            (item) => item.producto.id == producto.id
          );
          if (include.length == 0) filt.push(producto);
        }
        return filt;
      }
    },
    atributos() {
      let arr = this.$store.getters["atributo/data"];
      if (!Array.isArray(arr)) {
        arr = [];
      }
      return arr;
    },
    added() {
      return this.$store.getters["product/getAdded"];
    },
    product() {
      return this.$store.getters["product/data"];
    },
    categorias() {
      return this.$store.getters["category/data"];
    },
    /*brand() {
      return this.$store.getters["brand/data"];
    },*/
    categories() {
      return this.$store.getters["shipment/categories"];
    },

    subcategories() {
      return this.$store.getters["shipment/subcategories"];
    },
    classes() {
      return this.$store.getters["shipment/classes"];
    },
  },
  methods: {
    ...mapActions("atributo", ["getAllInfoAtt"]),
    ...mapActions("stock", ["getInfoByIdStk"]),
    ...mapActions("product", ["getAllInfoPro"]),
    ...mapActions("product", ["setAddedPro"]),
    ...mapActions("product", ["setHistoryOptionPro"]),
    ...mapActions("category", ["getAllInfoCat"]),
    ...mapActions("category", ["setAddedCat"]),
    ...mapActions("category", ["setHistoryOptionCat"]),
    /*...mapActions("brand", ["getAllInfoBnd"]),
    ...mapActions("brand", ["setAddedBnd"]),
    ...mapActions("brand", ["setHistoryOptionBnd"]),*/
    ...mapActions("product", ["getInfoByIdPro"]),
    ...mapActions("mirror", ["getAllInfoMrr"]),
    ...mapActions("product", ["getInfoByIdPro"]),

    ...mapActions("shipment", ["getCategories"]),
    ...mapActions("shipment", ["getSubcategories"]),
    ...mapActions("shipment", ["getClasses"]),

    wait: function () {
      setTimeout(() => this.$router.go(), 200);
    },

    guardarClase: async function (
      CATEGORY_ID,
      SUBCATEGORY_ID,
      consignment_note_class_code,
      descr_class
    ) {
      if (!consignment_note_class_code || !descr_class) {
        this.message2 = "La clase del producto es requerida.";
        this.cargando = false;
        this.delStatus2();
        return null;
      }

      const data = {
        id: this.added.id,
        skd_class: consignment_note_class_code,
        skd_class_descrp: descr_class,
      };

      let result = await this.$store.dispatch("product/editItemPro", {
        option: "product_class",

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

    delStatus2: function () {
      setTimeout(() => this.delMsgs2(), 2000);
    },
    delMsgs2: function () {
      this.message2 = "";
      this.message3 = "";
    },

    prodSel(added, status) {
      if (status.length == 0) {
        return added;
      } else {
        return status;
      }
    },
    submit: async function (
      id,
      name,
      id_category,
      //id_brand,
      descrp,
      status,
      url,
      price,
      code,
      image,
      skd_weight,
      skd_height,
      skd_width,
      skd_length
    ) {
      this.status = "";
      this.message = "";
      let data = [];

      if (image == null) {
        data = {
          id: id,
          name: name,
          id_category: id_category,
          //id_brand: id_brand,
          descrp: descrp,
          status_prod: status,
          url: url,
          price: price,
          code: code,
          image: image,
          skd_weight,
          skd_height,
          skd_width,
          skd_length,
        };
      } else {
        data = new FormData();
        data.append("id", id);
        data.append("name", name);
        data.append("id_category", id_category);
        //data.append("id_brand", id_brand);
        data.append("descrp", descrp);
        data.append("status_prod", status);
        data.append("url", url);
        data.append("price", price);
        data.append("code", code);
        data.append("image", image);
        data.append("skd_weight", skd_weight);
        data.append("skd_height", skd_height);
        data.append("skd_width", skd_width);
        data.append("skd_length", skd_length);

        data.append("_method", "PUT");
      }
      let result = await this.$store.dispatch("product/editItemPro", {
        option: "product",

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
    stockvar: async function (id_product, stock) {
      this.status2 = "";
      this.message2 = "";
      let data = [];
      let result;
      if (this.added.stock == "Sin stock" || this.added.stock == "undefined") {
        let data = {
          id_product: id_product,
          stock: stock,
        };
        result = await this.$store.dispatch("stock/addItemAdr", {
          option: "stock",
          item: data,
        });
        location.reload();
      } else {
        let id = this.stockdata.id;
        let data = {
          id: id,
          id_product: id_product,
          stock: stock,
        };
        result = await this.$store.dispatch("stock/editItemStk", {
          option: "stock",
          item: data,
        });
      }
      this.status2 = result.status;
      if (result.status == "error") {
        this.status2 = "error";
        this.message2 = result.message;
        this.delStatus();
      } else {
        this.message2 = "Se ha actualizado el stock.";
        this.delStatus();
      }
    },
    addprocat: async function (id_product, id_category) {
      this.status = "";
      this.message = "";
      let data = [];
      let result;
      let id_pro = parseInt(id_product);
      let id_cat = parseInt(id_category);

      data = {
        id_product: id_pro,
        id_category: id_cat,
      };

      result = await this.$store.dispatch("product_cat/addItemProCat", {
        option: "product_cat",
        item: data,
      });
      this.dataCat = data;

      if (result.status == "error") {
        this.status2 = "error";
        this.message2 = result.message;
        this.delStatus();
      } else {
        this.showModal4();
        const payload = {
          option: "product",
          id: this.added.id,
        };

        const res = await this.getInfoByIdPro(payload);
        this.setAddedPro(res);
        this.delStatus();
      }
    },

    deleteprocat: async function (id) {
      let option = "product_cat";
      let result = await this.$store.dispatch("product_cat/deleteItemProCat", {
        option: option,
        id: id,
      });

      if (result.status == "error") {
        this.message2 =
          "Ha ocurrido un error al intentar eliminar la categoria.";
      } else {
        this.message2 = "";

        const payload = {
          option: "product",
          id: this.added.id,
        };

        const res = await this.getInfoByIdPro(payload);
        this.setAddedPro(res);
        this.showModal5();
        this.delStatus();
        //this.wait();
      }
    },
    agregarImagen: async function (image, idpro) {
      this.message_modal = "La imagen se guardo correctamente";
      this.message_btn = "AÑADIR OTRA";
      let id_product = idpro;
      this.status = "";
      this.message = "";

      if (image == null) {
        this.status = "error";
        this.msg = "Imagen no subida";
      } else {
        if (image.size > 1000000) {
          this.status = "error";
          this.message =
            "Tamaño de imagen no válido, sube imagenes menores a 1 MB.";
        } else {
          var data = new FormData();

          data.append("image", image);
          data.append("id_product", id_product);
          data.append("_method", "POST");

          this.status = "";
          this.message = "";

          let result = await this.$store.dispatch("product/addImagesProd", {
            option: "product/image",
            item: data,
          });

          if (result.status == "error") {
            this.status = "error";
            this.message = result.message;
          } else {
            // success
            this.showModalGaleria();
          }
        }
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
    delStatus: function () {
      setTimeout(() => this.delMsgs(), 2000);
    },
    delMsgs: function () {
      this.status = "";
      this.message = "";
      this.status2 = "";
      this.message2 = "";
      this.messageError = "";
    },

    showModal: function () {
      this.viewModal = true;
    },
    /***viewModalGaleria */
    showModalGaleria: function () {
      this.viewModalGaleria = true;
    },
    showModal2: function () {
      this.viewModal2 = true;
    },
    showModal3: function () {
      this.viewModal3 = true;
    },
    showModal4: function () {
      this.viewModal4 = true;
    },
    showModal5: function () {
      this.viewModal5 = true;
    },
    closeModal: function () {
      this.viewModal = false;
      this.setAddedCat("");
      this.setHistoryOptionCat("Default");
    },
    closeModal2: function () {
      this.viewModal2 = false;
    },
    closeModal3: async function () {
      this.viewModal3 = false;
      let producto = await this.getInfoByIdPro({
        option: "product",
        id: this.added.id,
      });
      this.setAddedPro(producto);
    },
    closeModal4: function () {
      this.viewModal4 = false;
    },
    closeModal5: function () {
      this.viewModal5 = false;
    },
    closeModalGaleria: async function () {
      this.viewModalGaleria = false;
      let producto = await this.getInfoByIdPro({
        option: "product",
        id: this.added.id,
      });
      this.setAddedPro(producto);
    },
    Edit: function () {
      this.viewModal = false;
      this.viewModalGaleria = false;
      this.viewModal2 = false;
      this.viewModal3 = false;
      this.viewModal4 = false;
      this.viewModal5 = false;
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
    previewFiles2(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file2 = files[0];
      this.archivo2 = this.file2.name;
    },
    agregarOtro: function () {
      this.wait();
    },
    toEdit: function () {
      this.viewModal2 = false;
      this.viewModal3 = false;
      location.reload();
      this.setHistoryOptionPro("Edit");
    },
    back: function () {
      setTimeout(() => this.$router.go(), 200);
    },

    addValue: async function (id) {
      this.messageError = "";
      const data = {
        id_product: this.added.id,
        id_atributo_valor: id,
      };

      let result = await this.$store.dispatch("product/addItemPro", {
        option: "product_value",
        item: data,
      });

      if (result.status == "error") {
        this.messageError = result.message;
        this.delStatus();
      } else {
        // success
        this.modalValue = true;
        const payload = {
          option: "product",
          id: this.added.id,
        };

        const res = await this.getInfoByIdPro(payload);
        this.setAddedPro(res);
      }
    },
    eliminarValor: async function () {
      this.modalDelete = false;
      let id = this.itemDel;
      this.messageError = "";

      let result = await this.$store.dispatch("atributo/deleteItemAtt", {
        option: "product_value",
        id: id,
      });

      if (result.status == "error") {
        this.messageError = result.message;
        this.delStatus();
      } else {
        // success
        const payload = {
          option: "product",
          id: this.added.id,
        };

        const res = await this.getInfoByIdPro(payload);
        this.setAddedPro(res);
        this.modalEliminado = true;
      }
    },

    addVariante: async function (id) {
      this.messageError = "";
      const data = {
        id_product: this.added.id,
        id_variante: id,
      };

      let result = await this.$store.dispatch("product/addItemPro", {
        option: "product_variante",
        item: data,
      });

      if (result.status == "error") {
        this.messageError = result.message;
        this.delStatus();
      } else {
        // success
        this.modalVariante = true;
        const payload = {
          option: "product",
          id: this.added.id,
        };

        const res = await this.getInfoByIdPro(payload);
        this.setAddedPro(res);
      }
    },
    eliminarVariante: async function () {
      this.varianteAlert = false;
      let id = this.itemDel;
      this.messageError = "";

      let result = await this.$store.dispatch("atributo/deleteItemAtt", {
        option: "product_variante",
        id: id,
      });

      if (result.status == "error") {
        this.messageError = result.message;
        this.delStatus();
      } else {
        // success
        const payload = {
          option: "product",
          id: this.added.id,
        };

        const res = await this.getInfoByIdPro(payload);
        this.setAddedPro(res);
        this.modalVarianteDel = true;
      }
    },

    eliminarImagen: async function (id) {
      let option = "product/image";
      let result = await this.$store.dispatch("product/deleteImageProd", {
        option: option,
        id: id,
      });

      if (result.status == "error") {
        this.section = "imagenes";
        this.msg = "Ha ocurrido un error al intentar eliminar la imagen.";
      } else {
        this.section == "";
        this.msg = "";
        this.showModal3();
        //this.wait();
      }
    },
    validateIMG: async function (img) {
      const result = await userService.validateIMG("get-product-image", img);
      return result;
    },

    valStock() {
      if (this.added.stock == "Sin stock" || this.added.stock == undefined) {
        this.stockvalue = 0;
      } else {
        this.stockvalue = this.added.stock;
      }
    },
  },
  mounted() {
    this.valStock();
  },
};
</script>
<style scoped>
@import "./style.css";

#EditarProducto label {
  color: var(--color-2);
  font-weight: 700;
  font-size: 0.7291666666666666vw;
  margin-bottom: 0.3vw;
}
.sp {
  justify-content: space-between;
}
#EditarProducto input,
#EditarProducto select {
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
  background-image: url("../../assets/arrowinput.svg");
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