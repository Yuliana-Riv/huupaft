<template >
  <div class="Pedidos">
    <div class="misPedidos"> <!---pedidos-->
      <div v-if="payment == 'No se encontraron coincidencias.'">
        Aún no tienes pedidos
      </div>
      <div class="mis-pedidos-cont" v-else>
        <div class="header-pd-head">MIS PEDIDOS</div>
        <div class="mis-pedidos-tabla">
          <div class="mpt-cont hdr">
            <div class="col-mpt"><b>No. de Pedido</b> </div>
            <div class="col-mpt"><b>Fecha</b> </div>
            <div class="col-mpt"><b>Status</b> </div>
          </div>
          <div
            class="mpt-cont tb-el"
            v-for="(pd, i) in payment"
            :key="i"
            @click="checkData(pd)"
          >
            <div class="flx-1" @click="active = true">
              <div class="col-mpt">
                <p class="txt-mo-mpt">No. de Pedido</p>
                <p>
                  {{ pd.pay_num }}
                </p>
              </div>
              <div class="col-mpt">
                <p class="txt-mo-mpt">Fecha</p>
                <p>
                  {{ pd.created_at }}
                </p>
              </div>
              <div class="col-mpt">
                <p class="txt-mo-mpt">Status</p>
                <p>
                  {{ pd.status }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="detalles-fixed"
      :class="{ activeDP: active == true }"
      @click="active = false"
    >
      <div class="detallesPedido" @click.stop="">
        <div class="detalles-cont" v-if="active == true">
          <div class="header-pd-head"><p>DETALLES DEL PEDIDO</p></div>
          <div class="detalle-tabla brd">
            <div class="detalles-t-cont">
              <div class="dpd-t-list hd">
                <div class="col-dpt">Producto</div>
                <div class="col-dpt">Precio</div>
              </div>
              <div class="fila-1">
                <div
                  class="dpd-t-list pr"
                  v-for="(pd, i) in checkedP.detail"
                  :key="i"
                >
                  <div class="col-dpt">
                    <p class="titulo-dpt">
                      {{ pd.name }}
                    </p>
                    <p class="var-dpt">
                      {{ pd.type }}
                    </p>
                    <p class="cantidad-dpt">x{{ pd.quantity }}</p>
                  </div>
                  <div class="col-dpt">
                    <p class="precio-dpt">${{ pd.subtotal }}</p>
                  </div>
                </div>
              </div>
              <div class="fila-2">
                <div class="dpd-t-list">
                  <p class="font-1"><b class="light">Subtotal</b></p>
                  <p class="alrth w-1 bldt">${{ checkedP.subtotal }}</p>
                </div>
                <div class="dpd-t-list">
                  <p class="font-1"><b class="light">Opción de envío</b></p>
                  <p class="alrth w-1 bldt">{{ checkedP.shipping_option }}</p>
                </div>
                <div class="dpd-t-list" v-if="checkedP.shipping_option == 'Ordena y Recoge' &&  checkedP.carrier !='NINGUNA' &&  checkedP.carrier !=''">
                  <p class="font-1"><b class="light">Sucursal a recoger</b></p>
                  <p class="alrth w-1 bldt">{{ checkedP.carrier }}</p>
                </div>
                <div class="dpd-t-list">
                  <p class="font-1"><b class="light">Envío</b></p>
                  <p class="alrth w-1 bldt">{{ checkedP.envio }}</p>
                </div>
              </div>
              <div class="fila-2">
                <div class="dpd-t-list">
                  <p class="font-1"><b class="light">Método de pago</b></p>
                  <p class="alrth w-1 bldt">{{ checkedP.method }}</p>
                </div> 
              </div>
              <div class="fila-2">
                <div class="dpd-t-list">
                  <p class="font-1"><b class="light">Total</b></p>
                  <p class="alrth w-1 bldt tlnum">${{ checkedP.total }}</p>
                </div> 
              </div>
              <div class="fila-2">
                <div class="dfl-dtp">
                  <p class="titulo-dtp">Id Orden</p>
                  <p>{{ checkedP.order_id }}</p>
                </div>
                <div v-if="checkedP.tracking_number !== null">
                  <div
                    class="dfl-dtp"
                    v-if="checkedP.tracking_number !== 'SIN ASIGNAR'"
                  >
                    <p class="titulo-dtp">Número de rastreo</p>
                    <p>{{ checkedP.tracking_number }}</p>
                  </div>
                </div>
              </div>
              <div
                class="fila-3"
                v-if="checkedP.billing !== 'No se encontraron coincidencias.'"
              >
                <div class="dfl-dtp">
                  <p class="titulo-dtp">Razón social</p>
                  <p>{{ checkedP.billing.reason_social }}</p>
                </div>
                <div class="dfl-dtp">
                  <p class="titulo-dtp">Rfc</p>
                  <p>{{ checkedP.billing.rfc }}</p>
                </div>
                <div class="dfl-dtp">
                  <p class="titulo-dtp">Dirección social</p>
                  <p>{{ checkedP.billing.fiscal_address }}</p>
                </div>
                <div class="dfl-dtp">
                  <p class="titulo-dtp">Código postal</p>
                  <p>{{ checkedP.billing.postal_code }}</p>
                </div>
                <div class="dfl-dtp">
                  <p class="titulo-dtp">Correo electrónico</p>
                  <p>{{ checkedP.billing.email }}</p>
                </div>
              </div>
            </div>
          </div>
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
      active: false,
      sumNum: 0,
      checkedP: [],
      checkedPedido: [],
      pedidos: [
        {
          pay_num: "000000001",
          created_at: "00 / 00 / 0000",
          status: "Procesando Pago",
          detail: [
            {
              name: "SMART BITES ADULTO",
              type: "1 KG",
              quantity: 1,
              subtotal: 799,
            },
            {
              name: "SMART BITES ADULTO",
              type: "1 KG",
              quantity: 1,
              subtotal: 599,
            },
          ],
          shipping_option: 'Ordena y Recoge',
          carrier:'d',
          subtotal: 799,
          envio: "Envío a domicilio",
          order_id: 111,
          tracking_number: 1432432,
          billing: 
              
          {metodoPago: "Transferencia Bancaria Directa",
              reason_social: "Legrafica Desarrollo y Diseño digital",
              rfc: "LDD170937478491",
              fiscal_address: "Gastón Madrid #157",
              postal_code: "83190",
              email: "belen@legrafica.mx",},
        },
        {
          pay_num: "000000002",
          created_at: "00 / 00 / 0000",
          status: "Entregado",
          detail: [
            {
              name: "SMART BITES ADULTO",
              type: "1 KG",
              quantity: 1,
              subtotal: 799,
            },
          ],
          subtotal: 799,
          envio: "Envió Gratuito",
          order_id: 111,
          shipping_option: 'Envío a domicilio',
          carrier:'d',
          tracking_number: 1432432,
          billing: 
              
          {metodoPago: "Transferencia Bancaria Directa",
              reason_social: "Legrafica Desarrollo y Diseño digital",
              rfc: "LDD170937478491",
              fiscal_address: "Gastón Madrid #157",
              postal_code: "83190",
              email: "belen@legrafica.mx",},
        },
      ],
    };
  },
  async created() {
    await this.getIdentity();
    let option1 = "payment/user";
    let value = this.identity.sub;
    let payload1 = {
      option: option1,
      id: value,
    };
    this.getInfoByIdPym(payload1);
  },
  computed: {
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },
    payment() {
      return this.$store.getters["payment/data"];
    },
  },
  methods: {
    ...mapActions("payment", ["getInfoByIdPym"]),

    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },
    checkData(data1) {
      this.checkedP = data1;
    },
    suma(num, p) {
      this.sumNum = num
        .map((item) => item.precio)
        .reduce((prev, curr) => prev + curr, 0);
      return p;
    },
  },
};
</script>
<style >
.mis-pedidos-tabla {
  overflow-y: scroll;
  height: 26vw;
  padding: 0 2.222vw;
}
.flx-1 {
  display: flex;
  width: 100%;
}
.Pedidos {
  display: flex;
  justify-content: space-between;
}
.misPedidos {
  width: 47.778vw;
}
.detallesPedido {
  width: 26.042vw;
}
.header-pd-head {
  width: 100%;
  height: 2.958vw;
  background: #000000;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
    font-size: 0.972vw;
    line-height: 0.972vw;
  text-align: center;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mpt-cont {
  display: flex;
  justify-content: space-between;
}
.col-mpt {
  width: 33.33%; 
}
.col-mpt.txtc {
  text-align: center;
}
.mpt-cont {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 0.938vw;
  line-height: 1.354vw;
  color: #000000;
  padding-bottom: 0.885vw; 
  padding-top: 2.083vw; 
}
.mpt-cont.hdr {
    height: 1.813vw;
  display: flex;
  align-items: center;
  padding-bottom: 0;
  border-bottom: 1px solid transparent;
}
.mpt-cont.tb-el {
  background-color: white;
  background-image: url("../../assets/profile/ojo-1.svg");
  background-size: 9.579vw;
  background-repeat: no-repeat;
  background-position-x: 62.383vw;
  background-position-y: 43.449vw;
  /*background-position-y: 36.449vw;*/
  transition: 0.5s;
  cursor: pointer;
  padding: 0;
}
.mpt-cont.tb-el:hover {
  background-color: rgb(198, 198, 198);
}
.detalle-tabla.brd {
  border-left: 1px solid #929292;
  border-right: 1px solid #929292;
  border-bottom: 1px solid #929292;
}
.detalle-tabla p.bldt {
    font-family: 'PeaceSans';
    font-weight: 400;
}
.detalle-tabla p.tlnum{
font-size: 1.111vw;
line-height: 1.111vw;
color: #E42828;
}
.detalles-t-cont {
  width: 20.292vw;
  margin: 0 auto;
  padding: 2.083vw 0;
}
.dpd-t-list {
  display: flex;
  justify-content: space-between;
}
.dpd-t-list.hd {
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 1.042vw;
  line-height: 1.25vw;
  color: #000000;
}
.detalle-tabla p {
  margin: 0;
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 0.972vw;
  line-height: 1.094vw;
  color: #000000;
}
p.font-1 {
  font-family: 'Glory';
}
.cantidad-dpt {
  padding-top: 0;
  padding-bottom: 1.458vw;
}
.fila-1 {
  padding-top: 0.99vw;
  border-bottom: 1px solid gray;
}
.fila-2 {
  padding: 1.528vw 0;
  border-bottom: 1px solid gray;
}
.fila-2 .dpd-t-list {
  padding-bottom: 0.833vw;
}
.fila-3 {
  padding-top: 1.458vw;
}
.dfl-dtp {
  padding-bottom: 0.625vw;
}
.dfl-dtp .titulo-dtp {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 0.938vw;
  line-height: 1.146vw;
  color: #000000;
}
.dpd-t-list.totale p {
  font-size: 1.25vw;
  line-height: 1.51vw;
}
.dpd-t-list.totale p.blue {
  color: #3ebdb1;
}
.dpd-t-list.totale p.orange {
  color: #fe9128;
}
.txt-mo-mpt {
  display: none;
}
@media (max-width: 768px) {
  .mis-pedidos-tabla {
    overflow-y: auto;
    height: auto;
  }
  .flx-1 {
    flex-direction: column;
  }
  .Pedidos {
    flex-direction: column;
  }
  .light {
    font-weight: 300;
  }
  .titulo-dpt {
    font-weight: 700 !important;
  }
  .misPedidos,
  .detallesPedido {
    width: 82.243vw;
  }
  .mpt-cont.hdr,
  .hdr {
    display: none;
  }
  .txt-mo-mpt {
    display: block;
    margin: 0;
  }
  .col-mpt.txtc {
    text-align: left;
  }
  .mpt-cont {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    font-size: 4.206vw;
    line-height: 6.075vw;
  }
  .mpt-cont.tb-el {
    margin: auto;
    padding: 5.841vw 10.28vw;
    width: 61.682vw;
  }
  .header-pd-head {
    height: 25.467vw;
    font-size: 7.009vw;
    line-height: 8.411vw;
  }
  .col-mpt {
    margin-top: 2.336vw;
    width: 100%;
  }
  .activeDP {
    pointer-events: all !important;
    opacity: 1 !important;
  }
  .detalles-fixed {
    pointer-events: none;
    opacity: 0;
    position: fixed;
    top: 0;
    z-index: 500;
    background: #4747477d;
    width: 100%;
    height: 100%;
    left: 0;
    overflow-y: scroll;
    transition: 0.5s;
  }
  .detallesPedido {
    background: white;
    margin: 17.056vw auto;
  }
  .detalles-t-cont {
    width: 68.458vw;
    padding: 6.075vw 0;
  }
  .dpd-t-list.hd {
    font-size: 4.673vw;
    line-height: 5.607vw;
  }
  .detalle-tabla p {
    font-size: 3.505vw;
    line-height: 4.907vw;
    font-weight: 500;
  }
  .alrth {
    text-align: left;
    font-weight: 500 !important;
  }
  .totale p {
    font-size: 5.607vw !important;
    line-height: 6.776vw !important;
  }
  .totale .alrth {
    font-family: "Intro Rust" !important;
  }
  .dfl-dtp {
    padding-bottom: 2.804vw;
  }
  .dfl-dtp .titulo-dtp {
    font-size: 4.206vw;
    line-height: 5.14vw;
  }
  .header-pd-head p {
    margin: 0;
    width: 48vw;
  }
  .w-1 {
    width: 37vw;
  }
  .fila-1 {
    padding-top: 6.542vw;
    padding-bottom: 6.542vw;
  }
  .fila-2 {
    padding: 7.477vw 0;
  }
  .fila-3 {
    padding-top: 6.542vw;
  }
  .fila-2 .dpd-t-list {
    padding-bottom: 5.607vw;
  }
}
</style>