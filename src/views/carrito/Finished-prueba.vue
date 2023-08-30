<template >
  <div class="Finished">
    <Navigator /> 

    <div v-if="charge_pending == true" class="finished-cont">
      <div v-if="!chargin">
        <div v-if="error == false" class="header">
          <p class="m1">Cargando...</p>
        </div>
        <div v-else class="header">
          <p class="m1">Error</p>
          <p class="m2">No se ha completado la transacción</p>
        </div>
      </div>
      <div v-else-if="chargin == 'CARGO PENDIENTE'" class="header">
        <p class="m1">Cargo pendiente</p>
        <p class="m2">Tu cargo esta en proceso de validación.</p>
      </div>
      <div v-else class="header">
        <p class="m1">NO No se ha podido completar la transacción</p>
        <p v-if="chargin == 'FALLIDO'" class="m2">Cargo fallido</p>
        <p v-if="chargin == 'CANCELADO'" class="m2">Cargo cancelado</p>
        <p v-if="chargin == '3D SECURE EXPIRADO'" class="m2">
          El proceso de validación ha expirado
        </p>
      </div>
    </div>
    <div v-else class="finished-cont">
      <div class="header">
        <p class="m1">¡Gracias!</p>
        <p class="m2">Tu pedido ha sido recibido</p>
      </div>
      <section class="coluno">
        <div class="rowCont f1">
          <div class="colCont">
            <p class="titulo">No. de pedido</p>
            <p>xxxxxxxxx</p>
          </div>
          <div class="colCont">
            <p class="titulo">Fecha</p>
            <p>xxxxxxxxx</p>
            <!-- formatear a  octubre 21, 2021 -->
          </div>
          <div class="colCont">
            <p class="titulo">Total</p>
            <p>$xxxxxxxxx</p>
          </div>
          <!---<div class="colCont">
            <p class="titulo">Método de pago</p>
            <p>{{ payment.method }}</p>
          </div>-->
        </div>
        <div
          class="rowCont f1 bill" 
        >
          <p class="titulo_H">Dirección de envío</p>
          <div class="colCont">
            <p class="titulo">Dirección</p>
            <p>xxxxxxxxx</p>
          </div>
          <div class="colCont">
            <p class="titulo">Ciudad</p>
            <p>xxxxxxxxx</p>
          </div>
          <div class="colCont">
            <p class="titulo">Estado</p>
            <p>xxxxxxxxx</p>
          </div>
          <div class="colCont">
            <p class="titulo">País</p>
            <p>xxxxxxxxx</p>
          </div>
          <div class="colCont">
            <p class="titulo">CP</p>
            <p>xxxxxxxxx</p>
          </div>
        </div>
      </section>

      <div class="rowCont">
        <div class="tabla-pedido">
          <div class="header-tab">Detalles del pedido</div>
          <div class="t-p-cont">
            <div class="rowCont">
              <div class="colCont">
                <div class="row-t sbtwn tw1">
                  <p class="titulo-1">Producto</p>
                  <p class="titulo-1">Precio</p>
                </div>
                <div 
                  class="row-t sbtwn"
                >
                  <div class="product-c">
                    <p>
                      <b>xxxxxxxxx</b>
                    </p>
                    <!-- <p>1 KG</p> -->
                    <p>
                      <span class="cant-p">x12</span>
                    </p>
                    <p>
                      <span class="cant-extra">xxxxxxxxx</span>
                    </p>
                  </div>
                  <p class="second-c rt">$xxxxxxxxx</p>
                </div>
                <div class="row-t sbtwn pricing-it uno">
                  <p class="titulo-2"><b>Subtotal</b></p>
                  <p class="second-c rt">$xxxxxxxxx</p>
                </div>
                <div class="row-t sbtwn pricing-it">
                  <p class="titulo-2 second-c"><b>Envío</b></p>
                  <p class="second-c rt">xxxxxxxxx</p>
                </div>
                <div class="row-t sbtwn pricing-it">
                  <p class="titulo-1 we-c">Total</p>
                  <p class="titulo-1 second-c totale">$xxxxxxxxx</p>
                </div>
              </div>
              <div class="colCont dp1">
                <div class=" fdc">
                  <p class="titulo-2 we-c mb2"><b>Método de pago</b></p>
                  <p class="second-c">xxxxxxxxx</p>
                </div>
              </div>
            </div>

            <div class="rowCont listRowCont">
              <!--v-if="validBilling(payment)"--->
              <div class="row-t">
                <p class="titulo-1 mb2">Razón social</p>
                <p>xxxxxxxxx</p>
              </div>
              <div class="row-t">
                <p class="titulo-1 mb2">Rfc</p>
                <p>xxxxxxxxx</p>
              </div>
              <div class="row-t">
                <p class="titulo-1 mb2">Dirección fiscal</p>
                <p>xxxxxxxxx</p>
              </div>
              <div class="row-t">
                <p class="titulo-1 mb2">Código postal</p>
                <p>xxxxxxxxx</p>
              </div>
              <div class="row-t">
                <p class="titulo-1 mb2">Correo electrónico</p>
                <p>xxxxxxxxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <Footer />
  </div>
</template>
<script>
import Navigator from '../../components/items/Navigator.vue'; 
import Footer from '../../components/items/Footer.vue';
import RouteDir from "../../components/fixedItems/RouteDir.vue";
export default {
  components: {
    Navigator,
    Footer,
    RouteDir,
  },
  data(){
    return{
      chargin:'',
      payment:'',
       charge_pending:false,
       error:false,
    }
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
.finished-cont {
  width: 88.906vw;
  margin: 0 auto 17.396vw;
  padding-top: 21.875vw;
}
.tabla-pedido {
  width: 100%;
  border: 1px solid rgb(0, 0, 0);
}
.header p {
  text-align: center;
}
.header p.m1 {
  font-family: var(--tlFont);
  font-weight: 400;
  font-size: 2.083vw;
  line-height: 2.5vw;
  color: #E42828;
}
.header p.m2 {
  font-family: var(--tlFont);
  font-weight: 400;
  font-size: 2.083vw;
  line-height: 2.5vw;
  color: #E42828;
}
.rowCont {
  display: flex;
  justify-content: space-between;
}
.rowCont p {
  font-style: normal;
  font-weight: 400;
  font-size: 1.25vw;
  line-height: 1.771vw;
  font-family: var(--pFont);
  color: #8293a2;
}
.rowCont p.titulo_H {
  font-family: var(--tlFont);
  font-style: normal;
  font-weight: 400;
  font-size: 0.833vw;
  line-height: 0.99vw;
  color: #000000;
  text-align: left;
  padding-bottom: 0.625vw;
}
.colCont p.titulo {
  font-family: var(--pFont);
  font-style: normal;
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.51vw;
  text-align: center;
  /*text-decoration-line: underline;*/
  color: gray !important;
}
.f1 .colCont p {
  font-weight: 700;
  color:#E42828
;
}
.header-tab {
  height: 4.677vw;
  font-family: var(--tlFont);
  font-style: normal;
  font-weight: 400;
  font-size: 1.042vw;
  line-height: 1.25vw;
  text-align: center;
  color: #000000;
  background: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-left: 4.375vw;
}
.row-t {
  display: flex;
}
.row-t.sbtwn {
  justify-content: space-between;
}
.colCont {
  width: 100%;
}
p.titulo-1 {
  font-family: var(--pFont);
  font-style: normal;
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.51vw;
  color: #000000;
}
p.titulo-1:nth-child(2) {
  text-align: right;
}
.listRowCont {
  flex-direction: column;
  margin-top: 4.323vw;
  padding-top: 4.323vw;
  border-top: 1px solid black;
}
.listRowCont .titulo-1 {
  width: 8.844vw;
}
.f1 {
  text-align: center;
  margin: 0;
}
.mdl {
  padding: 0 2.604vw;
  margin: 0 2.604vw;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
.tabla-pedido .rowCont p {
  font-size: 0.781vw;
  line-height: 1.094vw;
  color: black;
}
.tabla-pedido .rowCont .cant-extra {
  font-size: 0.581vw;
  line-height: 1.094vw;
}
.t-p-cont {
  padding: 1.302vw 4.375vw 3.854vw;
}
.t-p-cont .colCont:first-of-type {
  padding-right: 7.344vw;
  margin-right: 3.073vw;
  border-right: 0.01vw solid black;
}
.orange {
  color: #fe9128 !important;
}
.we-c {
  width: 10vw;
}
.second-c {
  width: 7.448vw;
}
.tw1 {
  margin-bottom: 0.729vw;
}
.dp1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 13.344vw;
}
.listRowCont .row-t {
  margin-bottom: 0;
}
.cant-p {
  margin-top: 1.042vw !important;
}
.totale {
  font-size: 1.042vw !important;
}
.f1 .colCont {
  display: flex;
}
  .tabla-pedido .rowCont .pricing-it p.titulo-1.second-c.totale {
    color: #E42828;
    font-family: var(--tlFont);
    font-weight: 400;
}
@media (max-width: 768px) {
  .tw1 {
    margin-bottom: 0.729vw;
    font-size: 4.673vw;
  }
  .finished-cont {
    width: 82.009vw;
    /*margin: 14.252vw auto 20.093vw;*/
    margin: 0 auto 20.093vw;
    padding-top: 38.164vw;
  }
  .header p.m1 {
    font-size: 9.662vw;
    line-height: 11.594vw;
    text-align: left;
  }
  .header p.m2 {
    font-size: 9.662vw;
    line-height: 11.594vw;
    width: auto;
    text-align: left;
    margin: auto;
  }
  .rowCont {
    flex-direction: column;
  }
  .f1 {
    flex-direction: column;
    margin: 14.252vw 0 7.944vw;
  }
  .f1 .colCont {
    margin-bottom: 0;
  }
  .colCont p.titulo {
    font-size: 4.831vw;
    line-height: 5.607vw;
    margin-bottom: 4.206vw;
    text-align: left;
  }
  .rowCont p {
    font-size: 4.831vw;
    line-height: 4.944vw;
    width: 100%;
    text-align: left;
  }
  .header-tab {
    font-size: 4.831vw;
    line-height: 5.797vw;
    padding: 9.903vw 6vw 0;
    height: auto;
    justify-content: center;
  }
  .mdl {
    padding: 7.477vw 0 0;
    margin: 7.477vw 0 0;
    border-top: 1px solid black;
    border-left: none;
    border-right: none;
  }
  .t-p-cont {
    padding: 5.841vw;
  }
  .tabla-pedido .rowCont p,
  .tabla-pedido .rowCont .cant-extra {
    font-size: 4.505vw;
    line-height: 4.907vw;
  }
  .dp1 {
    margin-top: 6.763vw;
    padding-top: 6.542vw;
    border-top: 1px solid black;
    height: auto;
  }
  .second-c {
    width: 33vw;
  }
  .we-c {
    width: 24vw;
  }
  .totale {
    font-size: 5.607vw !important;
  }
  .listRowCont .titulo-1 {
    width: auto;
  }
  .listRowCont .row-t {
    margin-bottom: 2.804vw;
    flex-direction: column;
  }
  .listRowCont {
    margin-top: 9.179vw;
    padding-top: 9.179vw;
  }
  .row-t.sbtwn {
    margin-bottom: 3.738vw;
  }
  .row-t.sbtwn p:nth-child(2) {
    text-align: right;
  }
  .row-t.sbtwn .product-c p:nth-child(2) {
    text-align: left;
  }
  .finished-cont .header {
    padding-bottom: 7.971vw;
    border-bottom: 0.01vw solid gray;
  }
  p.titulo-2 b {
    font-weight: 500 !important;
  }
  .rowCont p.titulo_H {
    font-size: 5.433vw;
    line-height: 7.99vw;
    padding-bottom: 2.415vw;
    width: 100%;
  }
  .t-p-cont .colCont:first-of-type {
    border-right: 0;
  }
  .tabla-pedido .rowCont .pricing-it p {
    font-size: 5.607vw;
    line-height: 5.707vw;
  }
  .row-t.sbtwn.pricing-it { 
    margin-bottom: 1.208vw;
  }
  .row-t.sbtwn.pricing-it.uno {
    margin-top: 13vw;

  }
  .dp1 p.titulo-2 b {
    font-weight: 700 !important;
  }
  .product-c {
    width: 100%;
  }
  .mb2 {
    margin-bottom: 2vw !important;
  }
}
@media (min-width: 768px) {
  .finished-cont {
    display: flex;
    flex-wrap: wrap;
  }
  .finished-cont .header {
    display: flex;
    justify-content: center;
    padding-bottom: 1.823vw;
    margin-bottom: 5.573vw;
    border-bottom: 0.1vw solid gray;
    width: 100%;
  }
  .finished-cont .fcb {
    display: flex;
  }
  .rowCont.f1 {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 2.083vw;
    padding-left: 7.813vw;
    padding-right: 7.24vw;
    padding-bottom: 3.438vw;
    width: 14.792vw;
  }
  .f1 .colCont p {
    width: 7.552vw;
    text-align: left;
    font-size: 0.833vw;
  }
  .header p.m1 {
    margin-right: 0.4vw;
  }
  .product-c {
    width: 50%;
  }
  .second-c.rt {
    text-align: right;
  }
  .row-t {
    padding-bottom: 0.469vw;
  }
  .t-p-cont .colCont:first-of-type {
    width: 13.958vw;
  }
}
</style>