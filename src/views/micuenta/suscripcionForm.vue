<template>
  <div class="subsCont">
    <div class="pd">
      <div class="sub-item" :class="{'wpos':ispaused == true}">
        <p class="sub-dt">Suscrito desde <b> 07 | 02 | 2023</b></p>
        <p class="close">
          <img src="../../assets/cross.svg" alt="sub" /> Cancelar suscripción
        </p>
        <div class="twoitems">
          <div class="col-i dflx">
            <section class="dflx it2">
              <div class="inp-1">
                <p class="tl">Frecuencia</p>
                <div class="select">
                  <p class="first">SEMANAL</p>
                </div>
              </div>
              <div class="inp-1">
                <p class="tl">Producto</p>
                <div class="select">
                  <p class="first">HUUPA Extremo 250 gr.</p>
                </div>
                <div class="btn-b malf">ACTUALIZAR</div>
              </div>
              <p class="note">
                *Al actualizar tu producto, este se reflejara en la siguiente
                entrega programada.
              </p>
            </section>

            <div class="inp-1">
              <p class="tl">Forma de Pago</p>
              <div class="colpyb dflx">
                <div class="colpy">
                  <div
                    class="payform"
                    @click="
                      ispaused == true ? (ispaused = false) : (ispaused = true)
                    "
                  >
                    <div class="pd">
                      <p class="num-c">
                        <img src="../../assets/mastercard.svg" alt="pay" />
                        ****0000
                      </p>
                      <p class="tl">Cambiar tarjeta de crédito/débito</p>
                    </div>
                  </div>
                  <div class="btn-b w100 mact">PAUSAR SUSCRIPCIÓN</div>
                </div>
                <div class="colpy">
                  <div class="formchg" v-if="ispaused">
                    <div class="pd">
                      <p class="tl"><b>Cambiar</b> tarjeta de crédito/débito</p>
                      <div class="grid">
                        <input
                          type="text"
                          name=""
                          placeholder="Nombre"
                          class="w100"
                        />
                        <input
                          type="text"
                          name=""
                          placeholder="No. de Tarjeta"
                          class="w100"
                        />
                        <input
                          type="text"
                          name=""
                          placeholder="MM/YY"
                          class="w45"
                        />
                        <input
                          type="text"
                          name=""
                          placeholder="CVV"
                          class="w45"
                        />
                      </div>

                      <div class="btn-b mact">ACTUALIZAR</div>
                    </div>
                  </div>
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
export default {
  data() {
    return {
      ispaused: false,
    };
  },
};
</script>
<style>
.subsCont .sub-dt {
  font-family: "Glory";
  font-size: 0.972vw;
  line-height: 1.111vw;
}
.subsCont .close img {
  width: 1.389vw;
  margin-right: 0.417vw;
}
.subsCont .close {
  font-family: "Glory";
  font-size: 0.972vw;
  line-height: 1.111vw;
  color: #e42828;
  text-decoration-line: underline;
  display: flex;
  align-items: center;
}
.subsCont .tl {
  font-family: "Glory";
  font-weight: 700;
  font-size: 1.111vw;
  line-height: 119%;
}
.subsCont .inp-1 {
  margin-right: 2.847vw;
}
.subsCont .it2 .inp-1:nth-child(1) {
  width: 12.292vw;
}
.subsCont .it2 .inp-1:nth-child(2) {
  width: 17.431vw;
}
.subsCont .it2 .inp-1:nth-child(2) .btn-b {
  margin-top: 2.5vw;
}
.subsCont .select {
  width: 100%;
  height: 2.5vw;
  background-color: #f0f0f0;
  cursor: pointer;
}
.subsCont .it2 .inp-1:nth-child(1) .select {
  background-image: url("../../assets/arrow2.svg");
  background-repeat: no-repeat;
  background-size: 0.972vw;
  background-position-y: 1.25vw;
  background-position-x: 10.208vw;
}
.subsCont .it2 .inp-1:nth-child(2) .select {
  background-image: url("../../assets/arrow2.svg");
  background-repeat: no-repeat;
  background-size: 0.972vw;
  background-position-y: 1.25vw;
  background-position-x: 15.556vw;
}
.subsCont .payform {
  width: 18.889vw;
  height: 5.694vw;
  background: #fcfcfc;
  background-image: url("../../assets/arrow1.svg");
  background-repeat: no-repeat;
  background-size: 0.347vw;
  background-position-y: 2.361vw;
  background-position-x: 17.639vw;
  cursor: pointer;
}
.subsCont .payform img {
  width: 2.292vw;
}
.subsCont .payform .pd {
  padding: 1.389vw 0.972vw;
}
.subsCont .payform p {
  margin: 0;
}
.subsCont .payform .num-c {
  font-weight: 800;
  font-size: 0.972vw;
  line-height: 1.111vw;
  color: #5b5b5b;
}
.subsCont .payform .tl {
  font-size: 0.972vw;
  line-height: 1.111vw;
  color: #5b5b5b;
}
.subsCont .select .first {
  margin: 0;
  font-weight: 700;
  padding: 0.694vw 1.667vw;
}
.subsCont .select p {
  font-family: "Glory";
  font-size: 0.972vw;
  line-height: 1.111vw;
  font-weight: 400;
}
.subsCont .colpy {
  margin-right: 3.611vw;
}
.subsCont .colpy:nth-child(1) .btn-b {
  margin-top: 2.312vw;
}
.subsCont .btn-b {
  width: 13.889vw;
  height: 3.889vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1vw solid black;
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 0.972vw;
  line-height: 1.111vw;
  letter-spacing: 0.125em;
  margin: auto;
  cursor: pointer;
}
.subsCont .btn-b.malf {
  margin-right: 0;
}
.subsCont .btn-b.w100 {
  width: 100%;
}
.subsCont .formchg {
  width: 16.667vw;
  background-color: #fcfcfc;
  padding: 2.153vw 1.25vw;
}
.subsCont .formchg .btn-b {
  margin-top: 2.312vw;
}
.subsCont .formchg .tl {
  font-family: "Glory";
  font-style: normal;
  font-weight: 800;
  font-size: 0.972vw;
  line-height: 1.111vw;
  text-align: center;
  margin: 0 0 1.736vw;
}
.subsCont .formchg input {
  height: 2.257vw;
  padding: 0;
  font-size: 0.972vw;
  line-height: 1.111vw;
  border: 0.1vw solid black;
  border-radius: 0;
  text-indent: 0.82vw;
  margin-bottom: 0.61vw;
}
.subsCont .formchg input.w100 {
  width: 100%;
}
.subsCont .formchg input.w45 {
  width: 45%;
}
.subsCont .formchg .grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.subsCont .sub-item {
  padding-left: 3.542vw;
}
.subsCont .sub-item.wpos {
    width: 85vw;
}
.subsCont .it2 {
  width: 37.554vw;
  flex-direction: row;
  flex-wrap: wrap;
}
.subsCont .it2 .note {
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 0.972vw;
  line-height: 1.111vw;
  color: #000000;
  margin: 1.944vw 0 0;
}
@media (max-width: 768px) {
  .subsCont .it2 {
    flex-direction: column;
  }
  .subsCont .sub-dt {
    font-size: 4.673vw;
    line-height: 5.14vw;
    margin: 11.916vw 0 0;
  }
  .subsCont .close {
    font-size: 4.673vw;
    line-height: 5.14vw;
    margin: 2.1vw 0 7.477vw;
  }
  .subsCont .close img {
    width: 4.389vw;
    margin-right: 2.417vw;
  }
  .subsCont .col-i {
    flex-direction: column;
  }
  .subsCont .tl {
    font-family: "Glory";
    font-weight: 700;
    font-size: 4.206vw;
    line-height: 119%;
    margin: 4.439vw 0 1vw;
  }
  .subsCont .it2 .inp-1:nth-child(1),
  .subsCont .it2 .inp-1:nth-child(2) {
    width: 100%;
  }
  .subsCont .it2 {
    width: 100%;
  }
  .subsCont .select {
    width: 100%;
    height: 13.084vw;
  }
  .subsCont .select p {
    font-size: 4.206vw;
    line-height: 4.673vw;
  }
  .subsCont .select .first {
    padding: 4.439vw;
  }
  .subsCont .it2 .inp-1:nth-child(1) .select,
  .subsCont .it2 .inp-1:nth-child(2) .select {
    background-size: 4.972vw;
    background-position-y: 5.25vw;
    background-position-x: 70.208vw;
  }
  .subsCont .it2 .note {
    font-size: 4.206vw;
    line-height: 4.673vw;
    margin: 1.944vw 0 3.944vw;
  }
  .subsCont .btn-b {
    width: 65.421vw;
    height: 16.355vw;
    margin: 9.346vw auto !important;
    font-size: 4.206vw;
    line-height: 4.673vw;
  }
  .subsCont .colpyb {
    flex-direction: column;
  }
  .subsCont .payform {
    width: 78.037vw;
    height: 19.159vw;
  }
  .subsCont .payform img {
    width: 8.178vw;
  }
  .subsCont .payform .num-c {
    font-size: 4.206vw;
    line-height: 4.673vw;
  }
  .subsCont .payform .tl {
    font-size: 4.206vw;
    line-height: 4.673vw;
  }
  .subsCont .payform .pd {
    padding: 3.972vw;
  }
}
</style>
