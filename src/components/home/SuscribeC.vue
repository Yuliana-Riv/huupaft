<template>
  <div class="SubC">
    <div class="pd">
      <p class="tl">
        SUSCRÍBETE HOY Y RECIBE <span>EL MEJOR CAFÉ DE MÉXICO</span> HASTA TU PUERTA.
      </p>
      <a href="/suscripcion"><p class="btn">CONOCE MÁS AQUÍ</p></a>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.SubC {
  width: 100%;
  background-color: #000000;
  background-image: url("../../assets/bk4.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: top;
}
.SubC a{
  text-decoration-color: transparent;
}
.SubC .pd {
  padding: 99.034vw 14.976vw 15.942vw;
}
.SubC .tl {
  font-family: "PeaceSans";
  font-style: normal;
  font-weight: 400;
  font-size: 7.246vw;
  line-height: 10.145vw;
  text-align: center;
  color: #ffffff;
  width: 90%;
  margin: 0 auto 8.696vw;
}
.SubC .tl span {
  color: #f70017;
}
.SubC .btn {
  width: 100%;
  height: 16.425vw;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "PeaceSans";
  color: #000000; 
  background-color: #D9D9D9;
  margin-top: 6.763vw;
  font-weight: 500;
font-size: 3.865vw;
line-height: 5.314vw;
  letter-spacing: 0.125em;
  transition: 0.5s;
  cursor: pointer;
}
.SubC .btn:hover {
  color: #000000;
  background-color: white;
}
@media (min-width: 768px) {
  .SubC {
    background-image: url("../../assets/bk4pc.png");
    background-position-x: 47.153vw;
    background-size: 48.75vw;
  }
  .SubC .pd {
    padding: 11.25vw 60.764vw 15.942vw 11.875vw;
  }
  .SubC .tl {
    font-size: 2.778vw;
    line-height: 3.889vw;
    text-align: left;
    width: 27.361vw;
    margin: 0 auto 3.125vw;
  }
  .SubC .btn {
    width: 13.889vw;
    height: 3.889vw;
    font-size: 0.972vw;
    line-height: 1.111vw;
    color: white;
    background: transparent;
    border: 0.1vw solid white;
    margin-top: 1.319vw;
  }
}
</style>