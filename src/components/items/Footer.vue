<template>
  <div class="Footer" id="Contacto">
    <div class="pd">
      <p class="tl">CONTÁCTANOS</p>
      <div class="form-c">
        <div class="info">
          <p>
            No pierdas la oportunidad de probar el mejor sabor de café de
            México.
          </p>
          <p>
            Ponte en contacto con nosotros para hacernos llegar tus comentarios
            y resolver cualquier duda.
          </p>
        </div>
        <div class="form">
          <section>
            <p class="tl-i">NOMBRE</p>
            <input type="text" name="name" id="name" v-model="name" />
          </section>
          <section>
            <p class="tl-i">CORREO</p>
            <input type="email" name="correo" id="correo" v-model="email" />
          </section>
          <section>
            <p class="tl-i">MENSAJE</p>
            <textarea name="mensaje" id="mensaje" v-model="mensaje"></textarea>
          </section>
          <section>
            <div class="btn" @click="enviarMail(name, email, mensaje)">
              ENVIAR MENSAJE
            </div>
            <div v-if="this.status == 'success'" class="porel">
              <p class="cart_msg cart_success">{{ this.msg }}</p>
            </div>
            <div v-if="this.status == 'error'" class="porel">
              <p class="cart_msg cart_error">{{ this.msg }}</p>
            </div>
          </section>
        </div>
      </div>
      <p class="copyright">© 2023 Huupa. Todos los derechos reservados.</p>
      <div class="dwn-menu">
        <a href="" class="logo"
          ><img src="../../assets/logo1.svg" alt="logo"
        /></a>
        <section class="md">
          <a href="/">Inicio</a>
          <!--<a href="">Nosotros</a>-->
          <a href="/catalogo">Tienda</a>
          <a href="/suscripcion">Suscripción</a>
          <a href="/mayoreo">Mayoreo</a>
          <a href="">Blog</a>
          <a href="#Contacto">Contacto</a>
        </section>
        <div class="sm-c">
          <a
            href="https://www.facebook.com/huupa.coffee"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="../../assets/fb1.svg" alt="fb"
          /></a>
          <a
            href="https://www.instagram.com/coffee.huupa/?igshid=YmMyMTA2M2Y%3D"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="../../assets/ig1.svg" alt="ig"
          /></a>
          <a
            href="https://www.youtube.com/@huupacoffee521"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="../../assets/yt1.svg" alt="yt"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      mensaje: "",
      status: "",
      msg: "",
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
    enviarMail: async function (name, email, mensaje) {
      this.msg = "";
      this.status = "";
      let filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (name == undefined || name == "" || name == null) {
        this.msg = "EL CAMPO NOMBRE ESTÁ VACIO.";
        this.status = "error";
      } else if (!filter.test(email)) {
        this.msg = "EL CAMPO CORREO NO TIENE UN FORMATO VALIDO.";
        this.status = "error";
      } else if (email == undefined || email == "" || email == null) {
        this.msg = "EL CAMPO CORREO ESTÁ VACIO.";
        this.status = "error";
      } else if (mensaje == undefined || mensaje == "" || mensaje == null) {
        this.msg = "EL CAMPO COMENTARIOS ESTÁ VACIO.";
        this.status = "error";
      } else {
        let data = {
          name: name,
          email: email,
          mensaje: mensaje,
        };
        let response = await this.$store.dispatch(
          "admin/enviarMailContacto",
          data
        );
        //console.log(response);
        if (response.status == "success") {
          this.status = "success";
          this.msg = "Mensaje enviado con exito.";
          this.name = "";
          (this.email = ""), (this.mensaje = "");
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
.Footer {
  background-image: url("../../assets/bk1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position-y: -0.31vw;
    background-color: black;
}
.Footer .pd {
  padding: 24.396vw 9.179vw 20.29vw;
  color: white;
}
.Footer .tl {
  font-weight: 400;
  font-size: 9.662vw;
  line-height: 116%;
  text-align: center;
  margin: 0;
  padding-bottom: 24.879vw;
  background-image: url("../../assets/linered.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 23.913vw;
  font-family: "PeaceSans";
}
.Footer .info p {
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 4.348vw;
  line-height: 157.9%;
  text-align: center;
  color: #ffffff;
  margin: 0 auto 4.348vw;
  width: 74vw;
}
.Footer .form section {
  margin-bottom: 8.623vw;
}
.Footer .form .tl-i {
  margin: 0 0 3.425vw;
  font-family: "Glory";
  font-style: normal;
  font-weight: 600;
  font-size: 4.831vw;
  line-height: 116%;
}
.Footer .form input {
  width: 100%;
  height: 18.693vw;
  font-weight: 600;
  font-size: 4.831vw;
  line-height: 116%;
}
.Footer .form textarea {
  width: 100%;
  height: 43.227vw;
  font-weight: 600;
  font-size: 4.831vw;
  line-height: 116%;
  resize: none;
}
.Footer .form .btn {
  width: 100%;
  height: 27.162vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e42828;
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 200;
  font-size: 5.797vw;
  line-height: 116%;
  cursor: pointer;
}
.Footer .form-c {
  padding-bottom: 145.894vw;
}
.Footer .copyright {
  display: none;
}
.Footer .dwn-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Footer .dwn-menu .logo img {
  width: 51.208vw;
}
.Footer .dwn-menu .md {
  margin: 19.324vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Footer .dwn-menu .md a {
  font-family: "Glory";
  font-style: normal;
  font-weight: 500;
  font-size: 4.831vw;
  line-height: 5.314vw;
  text-align: center;
  color: #ffffff;
  text-decoration-color: transparent;
  margin-bottom: 10.87vw;
}
.Footer .dwn-menu .md a:last-child {
  margin-bottom: 0;
}
.Footer .sm-c {
  width: 83%;
  display: flex;
  justify-content: space-between;
}
.Footer .sm-c img {
  width: 17.343vw;
}
.Footer .info {
  margin-bottom: 12.077vw;
}
.Footer .cart_msg {
  font-size: 4vw;
  margin: 8vw auto 0;
  border-radius: 0vw;
  padding: 3.5vw;
  width: fit-content;
  font-family: "PeaceSans";
  font-weight: 500;
}
.Footer .cart_msg.cart_error {
  background-color:#e42828;
}
.Footer .cart_msg.cart_success {
  background-color:#FFB800;
}
@media (min-width: 768px) {
  .Footer {
    background-image: url("../../assets/bk1pc.png");
    background-size: cover;
    background-position-y: 0;
  }
  .Footer .pd {
    /*padding: 10vw 7.569vw 2.778vw;*/
    padding: 10vw 7.569vw 1.778vw;
  }
  .Footer .tl {
    font-size: 3.472vw;
    line-height: 116%;
    padding-bottom: 11.389vw;
    background-image: url("../../assets/line1.svg");
    background-size: 4.931vw;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: 7vw;
  }
  .Footer .info p {
    font-size: 1.25vw;
    line-height: 157.9%;
    margin: 0 auto 1.348vw 0;
    width: 22.569vw;
    text-align: left;
  }
  .Footer .form-c {
    display: flex;
    justify-content: space-between;
    width: 74.236vw;
    margin: auto;
  }
  .Footer .form .tl-i {
    font-size: 1.111vw;
    line-height: 116%;
    margin: 0 0 0.833vw;
  }
  .Footer .form input {
    font-size: 1.111vw;
    width: 35.903vw;
    height: 4.444vw;
    padding: 0;
    text-indent: 1vw;
  }
  .Footer .form section {
    margin-bottom: 1.528vw;
  }
  .Footer .form textarea {
    font-size: 1.111vw;
    width: 35.903vw;
    height: 10.278vw;
    text-indent: 1vw;
    padding: 1.2vw 0 0;
  }
  .Footer .form .btn {
    font-size: 1.111vw;
    width: 35.556vw;
    height: 6.458vw;
  }
  .Footer .form-c {
    padding-bottom: 10.347vw;
  }
  .Footer .dwn-menu .logo img {
    width: 15.556vw;
  }
  .Footer .dwn-menu {
    padding-top: 4.826vw;
    border-top: 0.1vw solid #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .Footer .sm-c img {
    width: 3.438vw;
  }
  .Footer .sm-c {
    width: 14.132vw;
    display: flex;
    justify-content: space-between;
  }
  .Footer .dwn-menu .md {
    margin: 0;
    flex-direction: row;
    width: 32vw;
    justify-content: space-between;
  }
  .Footer .dwn-menu .md a {
    font-size: 1.111vw;
    line-height: 1.25vw;
    margin-bottom: 0;
    transition: 0.5s;
  }
  .Footer .dwn-menu .md a:hover {
    color: #e42828;
  }

  .Footer .copyright {
    font-family: "Glory";
    display: block;
    text-align: center;
    font-size: 1.111vw;
    line-height: 1.25vw;
    margin: 0 0 3.433vw;
  }
  .Footer .cart_msg {
    font-size: 0.833vw;
    margin : 2vw auto 0;
    border-radius: 0vw;
    /*padding: 1.042vw 2.917vw;*/
    padding: 1.042vw 0.917vw;
    position: absolute;
    left: 10vw;
  }
}
</style>