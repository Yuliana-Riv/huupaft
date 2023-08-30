<template>
  <div id="checkout_view">
    <div v-if="!viewModal">
      <form id="payment-form">
        <input type="hidden" name="token_id" id="token_id" />
        <input
          type="hidden"
          name="use_card_points"
          id="use_card_points"
          value="false"
        />
        <div class="pymnt-itm card active">
          <div class="pymnt-cntnt">
            <div class="card-expl dflx">
              <div class="box-card credit">
                <h4>Tarjetas de <span>crédito</span></h4>
                <img
                  src="../../assets/TDC.svg"
                  alt="Iconos tarjetas de crédito aceptadas."
                />
              </div>
              <div class="box-card debit">
                <h4>Tarjetas de <span> débito</span></h4>
                <img
                  src="../../assets/TDD.svg"
                  alt="Iconos tarjetas de débito aceptadas."
                />
              </div>
            </div>
            <div class="sctn-row">
              <div class="sctn-col grp1 l">
                <label>Nombre del titular</label
                ><input
                  v-model="name"
                  type="text"
                  placeholder="Como aparece en la tarjeta"
                  autocomplete="off"
                  data-openpay-card="holder_name"
                />
              </div>
              <div class="sctn-col grp1">
                <label>Número de tarjeta</label
                ><input
                  v-model="tarjeta"
                  type="text"
                  autocomplete="off"
                  data-openpay-card="card_number"
                  placeholder="4242424242424242"
                />
              </div>
            </div>
            <div class="sctn-row dflx">
              <div class="sctn-col grp2 l">
                <label>Fecha de expiración</label>
                <div class="dflx datain">
                  <div class="sctn-col half l">
                    <input
                      v-model="expmonth"
                      class="inp1"
                      type="text"
                      placeholder="MM"
                      data-openpay-card="expiration_month"
                    />
                  </div>
                  /
                  <div class="sctn-col half l">
                    <input
                      v-model="expyear"
                      class="inp2"
                      type="text"
                      placeholder="YY"
                      data-openpay-card="expiration_year"
                    />
                  </div>
                </div>
              </div>
              <div class="sctn-col grp3 cvv">
                <label>CVV</label>
                <div class="sctn-col half l">
                  <input
                    v-model="cvv"
                    type="text"
                    autocomplete="off"
                    data-openpay-card="cvv2"
                  />
                </div>
              </div>
            </div>
            <div class="openpay">
              <div class="logo dflx">
                <p>Transacciones realizadas vía:</p>
                <img src="../../assets/openpaylogo.svg" alt="Icono openpay" />
              </div>
              <div class="shield dflx">
                <img src="../../assets/security.svg" alt="Icono escudo." />
                <p>
                  Tus pagos se realizan de forma segura con encriptación de 256
                  bits
                </p>
              </div>
            </div>
            <div class="sctn-row btnr">
              <a v-if="wait == false" class="button rght" id="pay-button"
                >Pagar</a
              >
              <p v-if="wait" class="button rght" id="pay-button2">
                <img src="../../assets/Cargando0.gif" alt="cargando gif" />
              </p>
            </div>

            <p id="error_msg" v-if="status == 'error'">
              {{ message }}
            </p>
          </div>
        </div>
      </form>
    </div>

    <div v-else class="view-error">
      <div class="ve-cnt">
        <!--    <img class="" src="" alt="icono app"> icono app -->
        <div class="ve-body">
          <!--    <img src="">  icono triste -->
          <p>
            LO SENTIMOS HA OCURRIDO UN ERROR AL INTENTAR REALIZAR TU PAGO,
            INTENTALO DE NUEVO.
          </p>
        </div>
        <a v-on:click="refre()"
          ><p class=""><span>ACEPTAR</span></p></a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "checkout",
  data() {
    return {
      status: "",
      message: "",
      name: "",
      tarjeta: "",
      expmonth: "",
      expyear: "",
      cvv: "",
      wait: false,
      viewModal: false,
    };
  },
  /*
     4242424242424242
    */
  mounted() {
    $(document).ready(function () {
      OpenPay.setId("mmqzdzpyic8qil1awvaf");
      OpenPay.setApiKey("pk_8f4227a5597e4c94aa837bd33fe9b7d0");
      OpenPay.setSandboxMode(true);
      /* OpenPay.setId('m153lscp7j3hfbrapwqm');
            OpenPay.setApiKey('pk_9a72747ad861466da7dcca4297cdc600');
            OpenPay.setSandboxMode(true);*/
      //Se genera el id de dispositivo
      var deviceSessionId = OpenPay.deviceData.setup(
        "payment-form",
        "deviceIdHiddenFieldName"
      );

      $("#pay-button").on("click", function (event) {
        event.preventDefault();
        $("#pay-button").prop("disabled", true);
        OpenPay.token.extractFormAndCreate(
          "payment-form",
          sucess_callbak,
          error_callbak
        );
      });

      var sucess_callbak = function (response) {
        var token_id = response.data.id;

        $("#token_id").val(token_id);
        // $('#payment-form').submit();
        //ENVIAR a otra pagina.
        let isval = execute();

        if (isval.status == "success") {
          charge(deviceSessionId, token_id);
        } else {
          showMessage(isval.message);
        }

        //console.log(token_id)
        //console.log(deviceSessionId)
      };

      var error_callbak = function (response) {
        var desc =
          response.data.description != undefined
            ? response.data.description
            : response.message;
        let message = desc; //"ERROR [" + response.status + "] : " +
        showMessage(message);
        //console.log(message)
        $("#pay-button").prop("disabled", false);
      };
    });

    let showMessage = (error) => {
      this.status = "error";
      this.message = error;
      this.delStatus();
    };

    let charge = (deviceSessionId, token_id) => {
      this.wait = true;
      this.createCharge(deviceSessionId, token_id);
    };

    let execute = () => {
      return this.validar(
        this.name,
        this.tarjeta,
        this.expmonth,
        this.expyear,
        this.cvv
      );
    };
  },
  watch: {
    cvv: function (value) {
      let arr = value.split("");

      let str = "";
      let count = 0;
      for (const ctr of arr) {
        if (!isNaN(ctr) && count < 4 && ctr != " ") {
          str += ctr;
          count++;
        }
      }

      this.cvv = str;
    },

    expmonth: function (value) {
      let arr = value.split("");

      let str = "";
      let count = 0;
      for (const ctr of arr) {
        if (!isNaN(ctr) && count < 2 && ctr != " ") {
          let newstr = str + ctr;
          newstr = parseInt(newstr);
          if (newstr <= 12) {
            str += ctr;
            count++;
          }
        }
      }

      this.expmonth = str;
    },

    expyear: function (value) {
      let arr = value.split("");

      let str = "";
      let count = 0;
      for (const ctr of arr) {
        if (!isNaN(ctr) && count < 2 && ctr != " ") {
          str += ctr;
          count++;
        }
      }

      this.expyear = str;
    },
    tarjeta: function (value) {
      let arr = value.split("");

      let str = "";
      let count = 0;

      for (const ctr of arr) {
        if (!isNaN(ctr) && count < 16 && ctr != " ") {
          str += ctr;
          count++;
        }
      }

      this.tarjeta = str;
    },
  },
  computed: {
    payment() {
      return this.$store.getters["pasarela/getAdded"];
    },
  },
  methods: {
    ...mapActions("pasarela", ["setHistoryOptionPsl"]),
    ...mapActions("carrito", ["setCart"]),
    ...mapActions("pasarela", ["setAddedPsl"]),
    delStatus: function () {
      setTimeout(() => this.delMsgs(), 5000);
    },
    delMsgs: function () {
      this.status = "";
      this.message = "";
    },

    refre: function () {
      setTimeout(() => this.$router.go(), 200);
      this.setHistoryOptionPsl("Default");
    },
    createCharge: async function (device, source) {
      this.setHistoryOptionPsl("createCharge");
      let infopayment = this.payment;

      let data = {
        _ctk: infopayment._ctk,
        method: infopayment.method,
        shipping_option: infopayment.shipping_option,
        id_user: infopayment.id_user,
        name: infopayment.name,
        lastname: infopayment.lastname,
        email: infopayment.email,
        phone: infopayment.phone,
        address: infopayment.address,
        country: infopayment.country,
        state: infopayment.state,
        city: infopayment.city,
        postal_code: infopayment.postal_code,
        notes: infopayment.notes,
        facturar: infopayment.facturar,
        f_postal_code: infopayment.f_postal_code,
        f_country: infopayment.f_country,
        f_state: infopayment.f_state,
        f_city: infopayment.f_city,
        f_email: infopayment.f_email,
        f_phone: infopayment.f_phone,
        reason_social: infopayment.reason_social,
        fiscal_address: infopayment.fiscal_address,
        rfc: infopayment.rfc,
        terminos: infopayment.terminos,
        email_list: infopayment.email_list,
        source_id: source,
        device_session_id: device,
        carrier: infopayment.carrier,
      };
      //console.log(data);

      let result = await this.$store.dispatch("payment/addItemPym", {
        option: "payment",
        item: data,
      });

      //console.log(result)

      if (result.status != "success") {
        //console.log(result);
        this.viewModal = true;
      } else {
        //si todo es correcto.
        this.wait = false;
        this.setAddedPsl(result.result);
        this.setHistoryOptionPsl("Finalizando");
        let payload = {
          option: "set_cart",
          item: { id_cliente: null },
        };
        this.setCart(payload);
        // this.$router.push("/finalizado").catch(err => {});

        const url = result.result.receipt.body.payment_method.url;

        window.location.href = url;
      }
    },

    toThankYou: async function () {
      return this.$router.push("/finalizado").catch((err) => {});
    },
    validar(name, tarjeta, expmonth, expyear, cvv) {
      let srt = "";
      let count = 0;
      if (name == "") {
        srt += " El nombre es requerido.";
        count++;
      }

      if (tarjeta == "") {
        srt += " La tarjeta es requerida.";
        count++;
      }

      if (expmonth == "") {
        srt += " El mes es requerido.";
        count++;
      }

      if (expyear == "") {
        srt += " El año es requerido. ";
        count++;
      }

      if (cvv == "") {
        srt += " El cvv es requerido. ";
        count++;
      }

      if (count > 0) {
        // this.status='error'
        // this.message =srt
        return {
          status: "error",
          message: srt,
        };
      } else {
        return {
          status: "success",
          message: "",
        };
      }
    },
  },
};
</script>
<style scoped>
#checkout_view {
  width: 100%;
  margin: auto;
  /*margin-top: 5.384615384615385VW;*/
}

.box-card:first-child {
  width: 48%;
  border-right: 0.5px solid #bebebe;
}

.box-card:last-child {
  padding-left: 3.435897vw;
}

.box-card {
  margin-bottom: 3.358974vw;
}

.card-expl h4 {
  font-family: "Glory";
  font-size: 1vw;
  color: var(--color-2);
  font-weight: 500;
  margin: 0vw;
  margin-bottom: 0.582051vw;
}
.card-expl h4 span {
  font-weight: 700;
}

.grp1 {
  margin-bottom: 0.530769vw;
}
.grp1 label {
  display: grid;
}

#payment-form label {
  font-size: 1.111vw;
  line-height: 1.25vw;
  color: var(--color-2);
  font-weight: 500;
  font-family: "Glory";
  margin-bottom: 0.91282vw;
  padding-left: 0;
}

.grp1 input {
  width: 100%;
  height: 2.525vw;
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 1.111vw;
  line-height: 1.25vw;
  color: var(--color-4);
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  border-radius: 10vw;
  margin-bottom: 0.469vw;
  text-indent: 1.2vw;
  padding: 0;
}
#payment-form input::placeholder {
  color: var(--color-4);
  font-style: italic;
  font-family: "Glory";
  font-size: 1.111vw;
  line-height: 1.25vw;
  font-weight: 400;
}

.grp2 {
  /* width: 57%; */
}

.grp3 {
  margin-left: 1.2999999999999994vw;
}

.grp2 input {
  width: 17.917vw;
  height: 2.525vw;
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 1.111vw;
  line-height: 1.25vw;
  color: var(--color-4);
  border: none;
  padding: 0;
  margin-bottom: 0;
}

.datain {
  font-size: 1.111vw;
  line-height: 1.25vw;
  background-color: #f5f5f5;
  color: var(--color-4);
  border-radius: 10vw;
  align-items: center;
}

input.inp1 {
  text-indent: 0.8vw;
  width: 2.6vw;
  margin-right: 0;
  background-color: transparent;
}
input.inp2 {
  width: 8.5vw;
  background-color: transparent;
}
.grp3 input {
  width: 11.175vw;
  height: 2.525vw;
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 0.625vw;
  line-height: 0.781vw;
  color: var(--color-2);
  border-radius: 10vw;
  background-color: #f5f5f5;
  border: none;
  margin-bottom: 0.469vw;
  padding: 0;
    text-indent: 1.2vw;
}

.openpay {
  width: 100%;
  border-bottom: 0.5px solid #bebebe;
  border-top: 0.5px solid #bebebe;
  margin-top: 1.351282vw;
  margin-bottom: 2.351282vw;
  padding-top: 0.58974vw;
  padding-bottom: 0.58974vw;
}

.logo p {
font-size: 0.972vw;
line-height: 1.181vw;
  margin-top: 1vw;
  width: 14vw;
  color: rgb(0, 0, 0);
  font-weight: 600;
}

.logo img {
    width: 9.653vw;
    height: 3.611vw;
  margin-left: 0vw;
  padding-top: 0vw;
}
.shield {
    margin-top: 0.625vw;
}
.shield p {
  color: rgb(0, 0, 0);
font-size: 0.972vw;
line-height: 1.181vw;
  margin-left: 0.5vw;
  width: 21vw;
  margin-top: 0vw;
}

.shield img {
  width: 1.948718vw;
  height: 1.487179vw;
  padding-top: 0.3vw;
}
.sctn-row.btnr{ 
    height: 5vw;
}
a#pay-button {
  background: var(--color-1);
  color: rgba(255, 255, 255, 1);
  cursor: pointer; 
  font-family: "Glory";
  font-style: normal;
  font-weight: 700;
  font-size: 0.833vw;
  line-height: 2.031vw;
  color: #ffffff; 
  padding: 1.5vw 6.667vw;
  letter-spacing: 0.2vw;
  text-align: center;
  text-transform: uppercase;
  margin: 0 0 0 4vw;
    position: relative;
    top: 1vw;

}

p#pay-button2 {
  background: var(--color-1);
  color: rgba(255, 255, 255, 1);
  font-size: 3.076923076923077vw;
  font-weight: 800;
  /* padding: 1vw 1vw; */
  /* margin-left: 25%; */
  text-align: center;
  padding: 0vw;
  margin: 0vw;
}
p#pay-button2 img {
  width: 5vw;
  height: 1.5vw;
  padding-top: 0vw;
}

.box-card img {
  width: 6.974359vw;
  height: 3.076923vw;
  padding-left: 0.5vw;
}

#error_msg {
  background: var(--color-7);
  color: rgba(255, 255, 255, 1);
  font-size: 0.76923vw;
  padding: 0.5vw;
  text-align: center;
  width: 90.4%;
  margin-top: 1.5vw;
}

/** modal error */
.ModalOut {
  width: 67.6923076923077vw;
  height: 97.94871794871794vw;
  background-color: #ffffff;
  border-radius: 7.6923076923076925vw;
  position: absolute !important;
  /*margin-left: 16vw;
    margin-top: 59vw;*/
}
.MContent2 {
  width: 51.7948717948718vw;
  height: 40.897436vw;
  border: 0.6vw solid #f54c49;
  border-radius: 7.6923076923076925vw;
  text-align: center;
  margin-left: 7vw;
}
.MContent2 img {
  width: 11.025641025641026vw;
  height: 11.025641025641026vw;
  margin-top: 4.615384615384616vw;
}
.MContent2 p {
  width: 41vw;
  margin-inline: auto;
  font-size: 3.076923076923077vw;
  color: #215675;
  line-height: 3.6923076923076925vw;
  font-weight: 600;
}
p.GH {
  font-size: 3.5897435897435894vw;
  color: #215675;
  font-weight: 500;
  text-align: center;
  margin-top: 8.461538461538462vw;
}
.GH span {
  font-weight: 800;
}

@media (max-width: 768px) {
  .card-expl h4 {
    padding-left: 2vw;
    font-size: 3.6vw;

    margin: 0vw;
    margin-bottom: 0.582051vw;
  }
  .box-card.credit {
    padding-right: 1.5vw;
  }

  .box-card img {
    width: 27.974359vw;
    height: 18.076923vw;
    /* padding-left: 0.5vw; */
  }

  #payment-form label {
    font-size: 4vw;
    line-height: 4vw;
    margin-bottom: 1.91282vw;
  }
.grp1 {
    margin-bottom: 3.530769vw;
}
  .grp1 input {
    width: 100%;
    height: 9.719vw;

    font-size: 3.625vw;
  }

  #payment-form input::placeholder {
    font-size: 3.625vw;
  }
.grp3 {
    margin-left: 3.3vw;
}
  input.inp1 { 
    width: 10.5vw;
    margin-right: 0.5vw;
    text-indent: 5.2vw;
  }
  input.inp2 {
    width: 18.5vw;
  }

  .grp2 input,
  .grp3 input {
    height: 9.719vw;
    font-size: 3.625vw;
  }

  .grp3 input {
    width: 33.7vw;
  }

  .openpay {
    width: 100%;
    border-bottom: 0.5px solid #bebebe;
    border-top: 0.5px solid #bebebe;
    margin-top: 7.351282vw;
    margin-bottom: 11.351282vw;
    padding-top: 3.58974vw;
    padding-bottom: 3.58974vw;
  }

  .logo p  {
    font-size: 3vw;
    line-height: 3vw;
    color: rgb(0, 0, 0);
    font-weight: 600;
    margin-top: 3vw;
    width: auto;
  }

  .logo img {
    width: 24.717949vw;
    height: 10.205128vw;
    margin-left: 0;
    padding-top: 0vw;
  }
.shield {
    margin-top: 3.625vw;
}
  .shield p {
    color: rgb(0, 0, 0);
    font-size: 2.87vw;
    line-height: 3.7vw;
    margin-left: 0.5vw;
    width: 90%;
    margin-top: 0vw;
  }

  .shield img {
    width: 9.948718vw;
    height: 9.487179vw;
    padding-top: 0vw;
  }

  a#pay-button {
    font-size: 3.833vw;
    margin:0 0 0 6vw;
    padding: 4.5vw 21.739vw;
    position: relative;
    top: 4vw;
  }
.sctn-row.btnr {
    height: 16vw;
}
  p#pay-button2 {
    padding: 5.5vw 28.3vw;
  }
  p#pay-button2 img {
    width: 18vw;
    padding-top: 0vw;
    height: 4vw;
  }

  #error_msg {
    font-size: 2.76923vw;
    padding: 0.5vw;

    width: 99%;
    margin-top: 6.5vw;
  }
  .datain {
    font-size: 4.111vw;
    line-height: 6.25vw; 
}
}
</style>