<template>
  <div class="sec-3">
    <div class="pd">
      <section>
        <p class="tl">¿POR QUÉ <span>TOSTAR</span> A LA LEÑA?</p>
        <p class="dscr">
          Nuestro tostador arde con pura leña, somos únicos en todo México y uno
          de los pocos en el mundo con este tipo de tostador hecho y diseñado
          por nosotros.
        </p>
        <a href="/catalogo"><p class="btn">CONOCE MÁS AQUÍ</p></a>
      </section>

      <img src="../../assets/hup1mo.png" alt="img" class="img-1 mo" />
      <img src="../../assets/hup1.png" alt="img" class="img-1 pc" />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.sec-3 {
  width: 100%;
  background-image: url("../../assets/bk3.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.sec-3 .pd {
  padding: 19.565vw 11.111vw 11.836vw;
}
.sec-3 .tl {
  font-family: "PeaceSans";
  font-weight: 400;
  font-size: 9.662vw;
  line-height: 10.87vw;
  text-align: center;
  color: #ffffff;
  margin: 0 0 4.106vw;
}
.sec-3 .tl span {
  color: #0340c6;
}
.sec-3 .dscr {
  width: 90%;
  margin: 0 auto;
  font-weight: 500;
  font-size: 4.831vw;
  line-height: 5.314vw;
  text-align: center;
  font-family: "Glory";
  color: white;
}
.sec-3 .btn {
  width: 100%;
  height: 16.425vw;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "PeaceSans";
  color: #000000;
  background-color: #d9d9d9;
  margin-top: 6.763vw;
  font-weight: 500;
  font-size: 3.865vw;
  line-height: 5.314vw;
  letter-spacing: 0.125em;
  transition: 0.5s;
  cursor: pointer;
}
.sec-3 .btn:hover {
  color: #000000;
  background-color: white;
}
.sec-3 .img-1 {
  width: 100%;
  margin-top: 10.87vw;
}
.sec-3 .img-1.pc {
  display: none;
}
.sec-3 .img-1.mo {
  display: block;
}
.sec-3 a {
  text-decoration-color: transparent;
}
@media (min-width: 768px) {
  .sec-3 {
    background-image: url("../../assets/bk3pc.png");
    background-size: cover;
  }
  .sec-3 .img-1.mo {
    display: none;
  }
  .sec-3 .img-1.pc {
    display: block;
  }
  .sec-3 .pd {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    padding: 2.083vw 7.222vw 0 5.556vw;
  }
  .sec-3 .tl {
    font-size: 2.778vw;
    line-height: 3.889vw;
    margin: 0 0 1.458vw;
    text-align: left;
    width: 28vw;
  }
  .sec-3 section {
    margin-top: 7.708vw;
  }
  .sec-3 .dscr {
    font-size: 1.389vw;
    line-height: 119%;
    width: 28.123vw;
    text-align: left;
  }
  .sec-3 .btn {
    width: 13.889vw;
    height: 3.889vw;
    font-size: 0.972vw;
    line-height: 1.111vw;
    color: white;
    background: transparent;
    border: 0.1vw solid white;
    margin-top: 1.319vw;
  }
  .sec-3 .img-1 {
    margin-top: 0;
    width: 48.264vw;
  }
}
</style>
