<template>
  <div class="suscripcion">
    <Navigator />

    <div>
      <div class="B1">
        <p class="B1F1">NO TE QUEDES SIN CAFÉ</p>
        <p class="B1F2">
          Café tostado a la leña, directo a la puerta de tu casa
        </p>
        <a href="/catalogo">
          <div class="B1F3"><p>suscribirse</p></div>
        </a>
      </div>

      <div class="B2">
        <div class="B2B1"> 
          <p>BENEFICIOS DE SUSCRIPCIÓN</p>
          <ul>
            <li>Descuentos en ordenes recurrentes</li>
            <li>Siempre tendrás café a la mano</li>
            <li>Envíos a todo Sonora*</li>
            <li>Escoge la frecuencia de envío</li>
            <li>Selecciona la variedad de tu preferencia</li>
            <li>Cancela en cualquier momento</li>
          </ul>
          <a href="/catalogo">
            <div class="B2B1_F3 showDK"><p>suscribirse</p></div>
          </a>
        </div>

        <div class="B2B2">
          <div class="B2B2_F1">
            <img class="showDK" src="../assets/sus/Coffe_DK.png" />
            <img class="showMV" src="../assets/sus/Coffe_MV.png" />
            <div class="B2B2_F1B2">
              <p class="B2T1">Selecciona tus productos</p>
              <p class="B2T2">Escoge tu café favorito de nuestro catálogo.</p>
              <p class="B2T2">Puedes verlo <a href="/catalogo">aquí</a></p>
            </div>
          </div>
          <div class="B2B2_F2">
            <img class="showDK" src="../assets/sus/Screen_DK.png" />
            <img class="showMV" src="../assets/sus/Screen_MV.png" />
            <div class="B2B2_F2B2">
              <p class="B2T1">Haz tu pedido</p>
              <p class="B2T2">Sigue los pasos para procesar tu orden.</p>
              <p class="B2T2">Tu orden llegará a la brevedad.</p>
            </div>
          </div>
        </div>
        <div class="B2B3">
          <div class="B2B3_F1">
            <img class="showDK" src="../assets/sus/Box_DK.png" />
            <img class="showMV" src="../assets/sus/Box_MV.png" />
            <div class="B2B3_F1B1">
              <p class="B2T1">A tu gusto</p>
              <p class="B2T2">Selecciona los gramos y tipo de molido.</p>
              <p class="B2T2">
                Escoge la frecuencia con la que quieres recibir tu café.
              </p>
            </div>
          </div>
          <div class="B2B3_F2">
            <img class="showDK" src="../assets/sus/Done_DK.png" />
            <img class="showMV" src="../assets/sus/Done_MV.png" />
            <div class="B2B3_F1B2">
              <p class="B2T1">¡Listo!</p>
              <p class="B2T2">Tu café está en camino</p>
              <p class="B2T2">
                Disfruta tu café tostado a la leña desde la comodidad de tu
                casa.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="B3">
        <div class="B3B1">
          <p class="B3B1T">PREGUNTAS FRECUENTES</p>
          <div
            class="B3B1_F B3B1_F2"
            :class="{ ext: pfr == 1 }"
            @click="pfr == 1 ? (pfr = 0) : (pfr = 1)"
          >
            <section>
              <div class="hdr">
                <p>Frecuencia de envío</p>
                <img
                  :src="
                    pfr == 1
                      ? require('../assets/sus/Minus.svg')
                      : require('../assets/sus/Plus.svg')
                  "
                />
              </div>
              <div class="txtc">
                <p>
                  Tú puedes elegir el tiempo de suscripción para recibir tu café
                  Huupa. Al tener tu suscripción tendrás la opción de escoger la
                  frecuencia de envío, ya sea semanal, mensual, anual, ¡como
                  gustes!
                </p>
              </div>
            </section>
          </div>
          <div
            class="B3B1_F B3B1_F3"
            :class="{ ext: pfr == 2 }"
            @click="pfr == 2 ? (pfr = 0) : (pfr = 2)"
          >
            <section>
              <div class="hdr">
                <p>¿Cuánto cuesta el envío?</p>
                <img
                  :src="
                    pfr == 2
                      ? require('../assets/sus/Minus.svg')
                      : require('../assets/sus/Plus.svg')
                  "
                />
              </div>
              <div class="txtc">
                <p>
                  El envío de tu Huupa a cualquier parte del país es de $180
                  MXN.
                </p>
              </div>
            </section>
          </div>
          <div
            class="B3B1_F B3B1_F4"
            :class="{ ext: pfr == 3 }"
            @click="pfr == 3 ? (pfr = 0) : (pfr = 3)"
          >
            <section>
              <div class="hdr">
                <p>¿Cuándo recibiré mi orden?</p>
                <img
                  :src="
                    pfr == 3
                      ? require('../assets/sus/Minus.svg')
                      : require('../assets/sus/Plus.svg')
                  "
                />
              </div>
              <div class="txtc">
                <p>
                  Nuestro objetivo es que nuestros productos lleguen a su
                  destino en un lapso de 5 días hábiles; de lo contrario, se te
                  notificará al respecto.
                </p>
              </div>
            </section>
          </div>
          <div
            class="B3B1_F B3B1_F5"
            :class="{ ext: pfr == 4 }"
            @click="pfr == 4 ? (pfr = 0) : (pfr = 4)"
          >
            <section>
              <div class="hdr">
                <p>¿Puedo hacer cambios en mi suscripción?</p>
                <img
                  :src="
                    pfr == 4
                      ? require('../assets/sus/Minus.svg')
                      : require('../assets/sus/Plus.svg')
                  "
                />
              </div>
              <div class="txtc">
                <p>
                  ¡Claro! Al ingresar a tu cuenta, podrás cambiar la frecuencia
                  de envío, hacer cambios en tu dirección o detalles de pago,
                  así como cambiar el tipo de café que prefieres. Nota: podrás
                  hacer los cambios necesarios 24 horas después de tu último
                  pedido realizado.
                </p>
              </div>
            </section>
          </div>
          <div
            class="B3B1_F B3B1_F6"
            :class="{ ext: pfr == 5 }"
            @click="pfr == 5 ? (pfr = 0) : (pfr = 5)"
          >
            <section>
              <div class="hdr">
                <p>¿Puedo pausar mi suscripción?</p>
                <img
                  :src="
                    pfr == 5
                      ? require('../assets/sus/Minus.svg')
                      : require('../assets/sus/Plus.svg')
                  "
                />
              </div>
              <div class="txtc">
                <p>
                  Sí, puedes acceder a tu cuenta y pausar tu suscripción.
                  Después podrás volver a acceder en cualquier momento para
                  reactivarla cuando desees.
                </p>
              </div>
            </section>
          </div>
        </div>
        <div class="B3B2">
          <img class="showDK" src="../assets/sus/Leña_DK.png" />
          <img class="showMV" src="../assets/sus/Leña_MV.png" />
        </div>
      </div>

      <div></div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navigator from "../components/items/Navigator.vue";
import Footer from "../components/items/Footer.vue";

export default {
  name: "Suscripcion",
  data() {
    return {
      pfr: 0,
    };
  },
  metaInfo() {
    return {
      title: 'Suscripción',
      titleTemplate: "%s | Huupa",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content: '...',
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    };
  },
  components: {
    Navigator,
    Footer,
  },
};
</script>

<style scoped>
.showDK {
  display: none;
}
.suscripcion a {
    text-decoration-color: transparent;
}
.B1 {
  width: 100%;
  height: 177.77777777777777vw;
  background-image: url("../assets/sus/BKMV.png");
  background-repeat: no-repeat;
  background-size: cover;
}
p.B1F1 {
  width: 78.26086956521739vw;
  font-size: 9.66183574879227vw;
  font-weight: 400;
  font-family: "PeaceSans";
  line-height: 13.285024154589372vw;
  margin: auto;
  color: var(--color-5);
  margin-left: 14.009661835748794vw;
  padding-top: 73.67149758454107vw;
}
p.B1F2 {
  width: 76.08695652173914vw;
  font-size: 7.246376811594203vw;
  font-weight: 500;
  font-family: var(--Glory);
  line-height: 8.115942028985508vw;
  margin: auto;
  color: var(--color-5);
  margin-top: 2.898550724637681vw;
  margin-left: 14.009661835748794vw;
  letter-spacing: 0.05em;
}
.B1F3 {
  display: flex;
  width: 58.69565217391305vw;
  height: 16.425120772946862vw;
  background-color: var(--color-5);
  align-items: center;
  justify-content: center;
  margin-left: 14.009661835748794vw;
  margin-top: 9.178743961352657vw;
  text-transform: uppercase;
  transition: .5s;
}
.B1F3 p {
  font-size: 4.3478260869565215vw;
  font-weight: 500;
  line-height: 4.869565217391305vw;
  margin: 0vw;
  color: var(--color-2);
  font-family: "PeaceSans";
  transition: .5s;
}
.B1F3:hover{
  background-color: white;
}
.B1F3:hover p{
  color: black;
}
.B2B1 p {
  font-size: 8.454106280193237vw;
  font-family: "PeaceSans";
  line-height: 8.454106280193237vw;
  font-weight: 400;
  margin-left: 14.009661835748794vw;
}
.B2B1 ul {
  width: 68.84057971014492vw;
  padding: 0vw;
  margin-left: 21.256038647342994vw;
  margin-bottom: 22.464vw;
}
.B2B1 li {
  font-size: 5.797101449275362vw;
  font-family: var(--Glory);
  line-height: 8.115942028985508vw;
  font-weight: 400;
}

.B2B2 {
  margin-left: 14.009661835748794vw;
}
.B2B2_F1 {
  margin-bottom: 14.009661835748794vw;
}
.B2B2_F1 img {
  width: 22.463768115942027vw;
  height: auto;
  margin-bottom: 10.144927536231885vw;
}
p.B2T1 {
  width: 76.08695652173914vw;
  font-size: 7.246376811594203vw;
  font-family: var(--Glory);
  font-weight: 700;
  line-height: 8.623188405797103vw;
  margin: 0vw;
  margin-bottom: 2vw;
}
p.B2T2 {
  width: 76.08695652173914vw;
  font-size: 5.797101449275362vw;
  font-family: var(--Glory);
  font-weight: 400;
  line-height: 6.898550724637681vw;
  margin: 0vw;
  margin-bottom: 5vw;
}
.B2T2 a {
  font-size: 5.797101449275362vw;
  font-family: var(--Glory);
  font-weight: 700;
  line-height: 6.898550724637681vw;
  margin: 0vw;
  text-decoration: underline;
  color: black;
}
.B2B2_F2 {
  margin-bottom: 14.009661835748794vw;
}
.B2B2_F2 img {
  width: 24.995169082125603vw;
  height: auto;
  margin-bottom: 10.144927536231885vw;
}

.B2B3_F1 {
  margin-bottom: 14.009661835748794vw;
}
.B2B3_F1 img {
  width: 22.236714975845413vw;
  height: auto;
  margin-bottom: 10.144927536231885vw;
}
.B2B3_F2 {
  margin-bottom: 36.231884057971016vw;
}
.B2B3_F2 img {
  width: 22.144927536231886vw;
  height: auto;
  margin-bottom: 10.144927536231885vw;
}

.B2B3 {
  margin-left: 14.009661835748794vw;
}

.B3B1 {
  background-color: var(--color-8);
  padding-bottom: 12.560386473429952vw;
}

.B3B1 p {
  font-size: 4.830917874396135vw;
  font-weight: 700;
  line-height: 6.521739130434782vw;
  color: var(--color-5);
  margin: 0vw;
}
p.B3B1T {
  width: 43.23671497584541vw;
  font-family: "PeaceSans";
  font-size: 8.454106280193237vw;
  font-weight: 400;
  line-height: 8.454106280193237vw;
  color: var(--color-9);
  margin: auto;
  margin-bottom: 10.144927536231885vw;
  padding-top: 16.045893719806763vw;
}
.B3B1_F img {
  width: 3.864734299516908vw;
  height: auto;
  margin-right: 4.876811594202899vw;
}
.B3B1_F {
  display: flex;
  width: 71.49758454106279vw;
  height: 19.082125603864732vw;
  /* align-items: center;
  justify-content: space-between;*/
  border: 0.1vw solid var(--color-5);
  margin: auto;
  margin-bottom: 3.6231884057971016vw;
  overflow: hidden;
  cursor: pointer;
  transition: 0.5s;
}
.B3B1_F.ext {
  height: 79.082125603864732vw;
}
.B3B1_F.B3B1_F3.ext {
  height: 56.082126vw;
}
.B3B1_F.B3B1_F5.ext {
  height: 95.082126vw;
}
.B3B1_F .hdr {
  display: flex;
  width: 71.49758454106279vw;
  height: 19.082125603864732vw;
  align-items: center;
  justify-content: space-between;
}
.B3B1_F2 p {
  width: 26.8768115942029vw;
  margin-left: 6.814009661835748vw;
}
.B3B1_F3 p {
  width: 38.4975845410628vw;
  margin-left: 6.814009661835748vw;
}
.B3B1_F4 p {
  width: 42.61594202898551vw;
  margin-left: 6.814009661835748vw;
}
.B3B1_F5 p {
  width: 35.594202898550726vw;
  margin-left: 6.814009661835748vw;
}
.B3B1_F.B3B1_F6 {
  margin-bottom: 0vw;
}
.B3B1_F6 p {
  width: 38.4975845410628vw;
  margin-left: 6.814009661835748vw;
}
.B3B2 img {
  width: 100%;
  height: auto;
}

.B3B1_F .txtc {
  padding-top: 7.813vw;
  padding-bottom: 11.813vw;
  width: 52.403vw;
  font-weight: 400;
}
.B3B1_F .txtc p {
  font-weight: 400;
  font-size: 4.111vw;
  line-height: 5.528vw;
  width: 100%;
}
@media (min-width: 769px) {
  .showDK {
    display: block;
  }
  .showMV {
    display: none;
  }

  .B1 {
    height: 37.56944444444444vw;
    /*background-image: url("../assets/sus/BKDK.png") !important;*/
    background-image: url("../assets/bannersub.jpg") !important;
  }
  p.B1F1 {
    width: fit-content;
    font-size: 3.4722222222222223vw;
    line-height: 3.4722222222222223vw;
    margin-left: 44.861111111111114vw;
    padding-top: 19.4vw;
  }
  p.B1F2 {
    width: fit-content;
    font-size: 1.1111111111111112vw;
    line-height: 1.2444444444444445vw;
    margin-top: 1.3vw;
    margin-left: 44.861111111111114vw;
  }
  .B1F3 p {
    font-size: 0.9722222222222222vw;
    line-height: 1.0888888888888888vw;
    color: var(--color-5);
    letter-spacing: 0.125em;
  }
  .B1F3 {
    width: 13.88888888888889vw;
    height: 3.888888888888889vw;
    background-color: transparent;
    border: 0.1vw solid var(--color-5);
    margin-left: 44.861111111111114vw;
    margin-top: 2.7083333333333335vw;
    cursor: pointer;
  }

  .B2 {
    display: flex;
    margin: 9.791666666666666vw 0vw;
  }

  .B2B1 p {
    width: 15.833333333333332vw;
    font-size: 1.3020833333333335vw;
    line-height: 2.430555555555556vw;
    margin-left: 11.666666666666666vw;
    line-height: 1.6145833333333335vw;

    margin-top: 0vw;
  }
  .B2B1 ul {
    width: 18.88888888888889vw;
    margin-left: 12.858333vw;
    margin-bottom: 0;
  }
  .B2B1 li {
    font-size: 1.1111111111111112vw;
    line-height: 1.7111111111111112vw;
    font-weight: 400;
  }

  .B2B2 {
    margin-left: 10.48611111111111vw;
  }
  .B2B2_F1 {
    margin-bottom: 8.125vw;
    display: flex;
  }
  .B2B2_F1 img {
    width: 2.7777777777777777vw;
    height: 2.7083333333333335vw;
    margin-bottom: 0vw;
    margin-right: 3.0555555555555554vw;
  }
  p.B2T1 {
    width: 13.61111111111111vw;
    font-size: 1.3888888888888888vw;
    line-height: 1.6527777777777777vw;
    margin-bottom: 1.25vw;
  }
  p.B2T2 {
    width: 14.374999999999998vw;
    font-size: 1.1111111111111112vw;
    line-height: 1.3222222222222222vw;
    margin-bottom: 1vw;
  }
  .B2T2 a {
    font-size: 1.1111111111111112vw;
    line-height: 1.3222222222222222vw;
  }

  .B2B2_F2 {
    margin-bottom: 0vw;
    display: flex;
  }
  .B2B2_F2 img {
    width: 3.0555555555555554vw;
    height: 2.7083333333333335vw;
    margin-bottom: 0vw;
    margin-right: 3.0555555555555554vw;
  }

  .B2B3_F1 {
    margin-bottom: 8.125vw;
    display: flex;
  }
  .B2B3 {
    margin-left: 8.61111111111111vw;
  }
  .B2B3_F1 img {
    width: 2.9166666666666665vw;
    height: 2.9166666666666665vw;
    margin-bottom: 0vw;
    margin-right: 3.0555555555555554vw;
  }

  .B2B3_F2 {
    margin-bottom: 0vw;
    display: flex;
  }
  .B2B3_F2 img {
    width: 3.0555555555555554vw;
    height: 3.0555555555555554vw;
    margin-bottom: 0vw;
    margin-right: 3.0555555555555554vw;
  }

  .B2B1_F3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13.88888888888889vw;
    height: 3.888888888888889vw;
    border: 0.1vw solid var(--color-2);
    margin-left: 11.666666666666666vw;
    margin-top: 2.986111111111111vw;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.5s;
  }
  .B2B1_F3 p {
    width: fit-content;
    font-size: 0.9722222222222222vw;
    line-height: 1.0888888888888888vw;
    font-weight: 700;
    color: var(--color-2);
    letter-spacing: 0.125em;
    font-family: "PeaceSans";
    margin: 0vw;
    transition: 0.5s;
  }
  .B2B1_F3:hover {
    background-color: var(--color-2);
  }
  .B2B1_F3:hover p {
    color: white;
  }

  .B3 {
    display: flex;
    justify-content: space-between;
  }
  .B3B1 {
    width: 100%;
    padding-bottom: 0;
    /*padding-bottom: 12.560386473429952vw;*/
  }
  .B3B1_F {
    width: 33.6875vw;
    height: 3.7868055555555555vw;
    margin-bottom: 0.7180555555555556vw;
  }
  .B3B1_F .hdr {
    width: 33.6875vw;
    height: 3.7868055555555555vw;
  }
  p.B3B1T {
    width: fit-content;
    font-size: 2.430555555555556vw !important;
    line-height: 2.430555555555556vw !important;
    margin-bottom: 5.833333333333333vw;
    padding-top: 13.541666666666666vw;
  }
  .B3B1 p {
    font-size: 1.1111111111111112vw;
    line-height: 1.5000000000000002vw;
  }
  .B3B1_F2 p {
    width: fit-content;
    margin-left: 2.545833333333333vw;
  }
  .B3B1_F img {
    width: 0.7833333333333333vw;
    margin-right: 1.5013888888888889vw;
  }
  .B3B1_F3 p {
    width: fit-content;
    margin-left: 2.545833333333333vw;
  }
  .B3B1_F4 p {
    width: fit-content;
    margin-left: 2.545833333333333vw;
  }
  .B3B1_F5 p {
    width: fit-content;
    margin-left: 2.545833333333333vw;
  }
  .B3B1_F6 p {
    width: fit-content;
    margin-left: 2.545833333333333vw;
  }
  .B3B1_F .txtc {
    padding-top: 0;
    padding-bottom: 2.813vw;
    width: 28.403vw;
    font-weight: 400;
  }
  .B3B1_F .txtc p {
    font-weight: 400;
    font-size: 1.111vw;
    line-height: 1.528vw;
  }
  .B3B1_F.ext {
    height: 13.082126vw;
  }
  .B3B1_F.B3B1_F3.ext {
    height: 13.082126vw;
  }
  .B3B1_F.B3B1_F5.ext {
    height: 13.082126vw;
  }
  .B3B2 img {
    width: 44.861111111111114vw;
  }
}
</style>