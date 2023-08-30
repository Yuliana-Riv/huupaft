<template>
  <div class="whapp">
    <a href="https://wa.link/ssbxrc" target="_blank" rel="noopener noreferrer">
      <img src="../../assets/wapp.svg" alt="whapp" />
    </a>
  </div>
</template>
<script>
export default {};
</script>
<style>
.whapp {
  position: fixed;
  bottom: 1.250vw;
  right: 2.222vw;
  z-index: 200;
}
.whapp img{
    width: 3.264vw;
    filter: drop-shadow(0px 0px 0.139vw black);
    transition: .5s;
}
.whapp img:hover{
  
  width: 3.764vw;
}
@media (max-width: 768px) {
  .whapp {
    display: none;
  }
}
</style>