<template>
  <div class="sec-2">
    <div class="pd">
      <section>
        <p class="tl">TOSTADOR <span>ÚNICO</span></p>
        <p class="dscr">
          Nuestro tostador arde con pura leña, somos únicos en todo México y uno
          de los pocos en el mundo con este tipo de tostador hecho y diseñado por
          nosotros.
        </p>
        <a href="/catalogo"> 
          <p class="btn">VER CATÁLOGO</p>    
        </a>    
      </section>

      <img src="../../assets/cat1pc.png" alt="img" class="img-1 pc" />
      <img src="../../assets/cat1.png" alt="img" class="img-1 mo" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.sec-2 {
  width: 100%;
  background-image: url("../../assets/bk2.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.sec-2 a{
  text-decoration-color: transparent;
}
.sec-2 .pd {
  padding: 19.565vw 11.111vw 11.836vw;
}
.sec-2 .tl {
  font-family: "PeaceSans";
  font-weight: 400;
  font-size: 12.077vw;
  line-height: 12.077vw;
  text-align: left;
  color: white;
  margin: 0 0 4.106vw;
}
.sec-2 .tl span {
  color: #f70017;
}
.sec-2 .dscr {
  margin: 0;
  font-weight: 500;
  font-size: 4.831vw;
  line-height: 5.314vw;
  text-align: left;
  font-family: "Glory";
  color: white;
}
.sec-2 .btn {
  width: 58.696vw;
  height: 16.425vw;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "PeaceSans";
  color: #000000;
  background-color: white;
  margin-top: 6.763vw;
  font-weight: 500;
  font-size: 3.865vw;
  line-height: 5.314vw;
  letter-spacing: 0.125em;
  transition: .5s;
  cursor: pointer;
}
.sec-2 .btn:hover{
  color: #000000;
  background-color: white; 
}
.sec-2 .img-1 {
  width: 100%;
  margin-top: 10.87vw;
}
.sec-2 .img-1.pc {
  display: none;
}
.sec-2 .img-1.mo {
  display: block;
}
@media (min-width: 768px) {
.sec-2 { 
  background-image: url("../../assets/bk2pc.png"); 
}
  .sec-2 .pd {
    padding: 3.75vw 2.986vw 5.625vw 8.958vw;
    display: flex;
  }
  .sec-2 .tl {
    font-size: 2.778vw;
    line-height: 4.028vw;
    margin: 0 0 1.389vw;
  }
  .sec-2 .dscr {
    font-weight: 400;
    font-size: 1.389vw;
    line-height: 119%;
  }
  .sec-2 .btn {
    width: 13.889vw;
    height: 3.889vw;
    font-size: 0.972vw;
    line-height: 1.111vw;
    color: white;
    background: transparent;
    border: 0.1vw solid white;
    margin-top: 1.319vw;
  }
  .sec-2 .img-1 {
    width: 47.361vw;
    margin-top: 0;
  }
  .sec-2 .pd section {
    width: 31.597vw;
    margin-top: 13.264vw;
    margin-right: 9.097vw;
}
.sec-2 .img-1.mo {
  display: none;
}
.sec-2 .img-1.pc {
  display: block;
}
}
</style>