<template>
  <div class="Ctz">
    <Navigator />
    <div class="hd-ctz">
      <div class="pd">
        <p class="tl">MAYOREO</p>
        <p class="sbtl">Café al mayoreo para tu empresa/negocio</p>
      </div>
    </div>
    <div class="bd-ctz">
      <div class="pd">
        <p class="tl">COTIZA HUUPA EN TU EVENTO</p>
        <p class="sbtl">
          ¿Tendrás una reunión con tus clientes? ¿Vas a invitar a tus amigos un
          cafecito?
        </p>
        <p class="sbtl">
          ¡Nosotros te ayudamos! Contamos con servicio de Coffee Break para tus
          reuniones, conferencias, fiestas o, simplemente, el café con los
          amigos.
        </p>
        <form>
          <input
            type="text"
            name=""
            id=""
            placeholder="NOMBRE COMPLETO"
            v-model="name"
          />
          <input
            type="email"
            name=""
            id=""
            placeholder="CORREO ELECTRÓNICO"
            v-model="email"
          />
          <p>
            Correo electrónico en uso, nos pondremos en contacto por este medio.
          </p>
          <section class="i2c">
            <input
              type="tel"
              name=""
              id=""
              placeholder="TELÉFONO"
              class="w50i"
              v-model="phone"
            />
            <section class="check-c">
              <div
                class="check"
                @click="
                  whatsapp == true ? (whatsapp = false) : (whatsapp = true)
                "
              >
                <div class="checked" v-if="whatsapp"></div>
              </div>
              <p>PREFIERO MENSAJES POR WHATSAPP</p>
            </section>
          </section>
          <p>
            De preferencia utilizar un número celular, nos pondremos en contacto
            por este medio.
          </p>
          <section class="i2c">
            <input
              type="date"
              name=""
              id=""
              placeholder="FECHA DEL EVENTO"
              class="w50i dateinp"
              v-model="date"
            />
            <input
              type="number"
              name=""
              id=""
              placeholder="NO. DE PERSONAS"
              class="w50i"
              v-model="people"
            />
          </section>
          <input
            type="text"
            name=""
            id=""
            placeholder="TIPO DE EVENTO"
            v-model="eventtype"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="DIRECCIÓN DEL EVENTO"
            v-model="address"
          />
          <textarea
            name=""
            id=""
            placeholder="DUDAS Y/O NOTAS"
            v-model="note"
          ></textarea>
          <div
            class="btn"
            @click="
              enviarMail(
                name,
                email,
                phone,
                whatsapp,
                date,
                people,
                eventtype,
                address,
                note
              )
            "
          >
            ENVIAR
          </div>
          <div v-if="this.status == 'success'">
            <p class="cart_msg cart_success">{{ this.msg }}</p>
          </div>
          <div v-if="this.status == 'error'">
            <p class="cart_msg cart_error">{{ this.msg }}</p>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navigator from "../components/items/Navigator.vue";
import Footer from "../components/items/Footer.vue";
export default {
  components: {
    Navigator,
    Footer,
  },
  data() {
    return {
      status: "",
      msg: "",
      name: "",
      email: "",
      phone: "",
      whatsapp: false,
      date: "",
      people: "",
      eventtype: "",
      address: "",
      note: "",
    };
  },
  metaInfo() {
    return {
      title: "Mayoreo",
      titleTemplate: "%s | Huupa",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content:
            "...",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    };
  },
  methods: {
    delStatus: function () {
      setTimeout(() => this.delMsgs(), 5000);
      /*this.close(), 3000);*/
    },
    delMsgs: function () {
      this.status = "";
      this.msg = "";
    },
    enviarMail: async function (
      name,
      email,
      phone,
      whatsapp,
      date,
      people,
      eventtype,
      address,
      note
    ) {
      this.msg = "";
      this.status = "";
      let filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (name == undefined || name == "" || name == null) {
        this.msg = "El campo nombre no es valido.";
        this.status = "error";
      } else if (email == undefined || email == "" || email == null) {
        this.msg = "El campo correo no es valido.";
        this.status = "error";
      } else if (!filter.test(email)) {
        this.msg = "El campo correo no tiene un formato valido.";
        this.status = "error";
      } else if (phone == undefined || phone == "" || phone == null) {
        this.msg = "El campo telefono no es valido.";
        this.status = "error";
      } else if (date == undefined || date == "" || date == null) {
        this.msg = "El campo fecha no es valido.";
        this.status = "error";
      } else if (people == undefined || people == "" || people == null) {
        this.msg = "El campo número de personas no es valido.";
        this.status = "error";
      } else if (
        eventtype == undefined ||
        eventtype == "" ||
        eventtype == null
      ) {
        this.msg = "El campo tipo de evento no es valido.";
        this.status = "error";
      } else if (address == undefined || address == "" || address == null) {
        this.msg = "El campo dirección de envío no es valido.";
        this.status = "error";
      } else if (note == undefined || note == "" || note == null) {
        this.msg = "El campo notas no es valido.";
        this.status = "error";
      } else {
        let data = {
          name: name,
          email: email,
          phone: phone,
          whatsapp: whatsapp,
          date: date,
          people: people,
          eventtype: eventtype,
          address: address,
          note: note,
        };
        let response = await this.$store.dispatch("admin/enviarCotizar", data);
      
        if (response.status == "success") {
          this.status = "success";
          this.msg = "Mensaje enviado con exito.";
          this.name = "";
          (this.email = ""),
            (this.phone = ""),
            (this.whatsapp = false),
            (this.date = ""),
            (this.people = ""),
            (this.eventtype = ""),
            (this.address = ""),
            (this.note = "");
          this.delStatus();
        } else {
          this.status = "error";
          this.msg =
            "Lo sentimos ha ocurrido un error al intentar entregar tu mensaje.";
        }
      }
    },
  },
};
</script>
<style>
p {
  margin: 0;
}
.Ctz .hd-ctz {
  background-image: url("../assets/bk6.png");
  background-size: 100%;
  background-position-y: bottom;
  padding-top: 13vw;
}
.Ctz .hd-ctz .pd {
  padding: 42.995vw 12.077vw 17.15vw;
}
.Ctz .hd-ctz .tl {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 12.077vw;
  line-height: 13.285vw;
  text-align: center;
  color: #ffffff;
}
.Ctz .hd-ctz .sbtl {
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 7.246vw;
  line-height: 8.213vw;
  text-align: center;
  letter-spacing: 0.05em;
  color: #ffffff;
  margin-top: 4.589vw;
}
.Ctz .bd-ctz {
  background-image: url("../assets/bkh1.png");
  background-size: 100% 160.145vw;
  /*background-position-y: bottom;*/
  background-position-y: 532vw;
  background-repeat: no-repeat;
}
.Ctz .bd-ctz .pd {
  padding: 23.188vw 10.145vw 180.435vw;
}
.Ctz .bd-ctz .tl {
  width: 60vw;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 7.246vw;
  line-height: 7.246vw;
  color: #000000;
  margin-bottom: 6.039vw;
}
.Ctz .bd-ctz .sbtl {
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 5.797vw;
  line-height: 6.522vw;
  letter-spacing: 0.05em;
  color: #000000;
  margin-bottom: 5.768vw;
}
.Ctz .bd-ctz .sbtl:last-of-type {
  margin-bottom: 13.768vw;
}
.Ctz .bd-ctz form input {
  border: 0.2vw solid #000000;
  width: 100%;
  height: 17.391vw;
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 5.797vw;
  line-height: 6.522vw;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  color: #000000;
  text-indent: 6.522vw;
  margin-bottom: 10.145vw;
}
.Ctz .bd-ctz form textarea {
  width: 100%;
  height: 56.522vw;
  resize: none;
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 5.797vw;
  line-height: 6.522vw;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  color: #000000;
  text-indent: 6.522vw;
}
.Ctz .bd-ctz form input::placeholder,
.Ctz .bd-ctz form textarea::placeholder {
  color: #000000;
}
.Ctz .bd-ctz form p {
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 5.797vw;
  line-height: 6.522vw;
  letter-spacing: 0.125em;
  color: #000000;
  margin-bottom: 10.145vw;
}
.Ctz .bd-ctz .check-c {
  display: flex;
  margin-bottom: 7.729vw;
}
.Ctz .bd-ctz .check-c .check {
  width: 11.836vw;
  height: 11.836vw;
  border: 0.2vw solid #000000;
  margin-right: 5.072vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.483vw;
}
.Ctz .bd-ctz .check-c .check .checked {
  width: 8.285vw;
  height: 8.285vw;
  /*background: #f2f2f2;*/
  background: #000000;
  border-radius: 0.483vw;
}
.Ctz .bd-ctz form .check-c p {
  width: 75%;
  font-weight: 600;
}
.Ctz .bd-ctz form .btn {
  width: 72.705vw;
  height: 16.425vw;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #000000;
  border: 0.23vw solid transparent;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 700;
  font-size: 5.797vw;
  line-height: 6.522vw;
  margin-top: 10.145vw;
  cursor: pointer;
  transition: 0.25s;
  letter-spacing:  0.125em;
}
.Ctz .bd-ctz form .btn:hover {
  border: 0.23vw solid #000000;
  color: #000000;
  background: white;
}
.Ctz .cart_msg {
  font-size: 4vw;
  margin-top: 8vw;
  border-radius: 4vw;
  padding: 3.5vw;
  width: fit-content;
  font-family: "Glory";
  position: absolute;
}
.Ctz .cart_msg.cart_error {
  background-color: #e42828;
}
.Ctz .cart_msg.cart_success {
  background-color: #2e7734;
}
@media (min-width: 768px) {
  .Ctz .cart_msg {
    font-size: 1vw;
    margin-top: 2vw;
    border-radius: 2vw;
    padding: 0.5vw;
  }
  .Ctz .hd-ctz {
    background-image: url("../assets/bk6pc.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 3.4vw;
  }
  .Ctz .hd-ctz .pd {
    padding: 22.708vw 37.014vw 8.889vw;
  }
  .Ctz .hd-ctz .tl {
    font-size: 3.472vw;
    line-height: 3.472vw;
  }
  .Ctz .hd-ctz .sbtl {
    font-size: 1.389vw;
    line-height: 1.528vw;
    margin-top: 0.972vw;
  }
  .Ctz .bd-ctz {
    background-image: url("../assets/bkh1pc.png");
    background-size: 45.48vw;
    background-position-y: 0;
    background-position-x: -1.622vw;
    background-repeat: no-repeat;
  }
  .Ctz .bd-ctz .tl {
    width: auto;
    font-size: 2.431vw;
    line-height: 2.431vw;
    margin-bottom: 0.833vw;
  }
  .Ctz .bd-ctz .sbtl {
    font-size: 1.111vw;
    line-height: 1.25vw;
    margin-bottom: 1.25vw;
  }
  .Ctz .bd-ctz .sbtl:last-of-type {
    margin-bottom: 2.083vw;
  }
  .Ctz .bd-ctz form input {
    height: 2.5vw;
    font-size: 0.972vw;
    line-height: 1.111vw;
    border: 0.1vw solid #000000;
    text-indent: 1.522vw;
    margin-bottom: 2.5vw;
    padding: 0;
  }
  .Ctz .bd-ctz form input.w50i {
    width: 20.139vw;
  }
  .Ctz .bd-ctz form input.w50i.dateinp {
    width: 17.39vw;
    text-indent: 0;
    padding: 0 1.5vw;
  }
  .Ctz .bd-ctz form p {
    font-size: 0.972vw;
    line-height: 1.111vw;
    margin-bottom: 1.111vw;
  }
  .Ctz .bd-ctz .i2c {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Ctz .bd-ctz form .check-c p {
    width: auto;
    margin: 0;
  }
  .Ctz .bd-ctz .check-c {
    margin-bottom: 2.3vw;
    align-items: center;
    width: 20.6vw;
  }
  .Ctz .bd-ctz .check-c .check {
    width: 1.389vw;
    height: 1.389vw;
    border-radius: 0.2483vw;
    border: 0.1vw solid #000000;
    margin-right: 0.372vw;
  }
  .Ctz .bd-ctz .check-c .check .checked {
    width: 0.972vw;
    height: 0.972vw;
    border-radius: 0.2483vw;
  }
  .Ctz .bd-ctz form textarea {
    height: 7.5vw;
    width: 100%;
    font-size: 0.972vw;
    text-indent: 1.522vw;
    line-height: 1.111vw;
    padding-top: 1.2vw;
  }
  .Ctz .bd-ctz form .btn {
    width: 13.889vw;
    height: 3.889vw;
    font-size: 0.972vw;
    line-height: 1.111vw;
    margin: 2.222vw auto 0 0;
  }
  .Ctz .bd-ctz .pd {
    padding: 7.431vw 11.25vw 6.806vw 45.764vw;
  }
}
</style>