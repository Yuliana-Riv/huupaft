<template >
  <div class="routeCont">
    <div class="route-dir" v-if="this.$route.path == '/carrito/products'">
      <a href="">Home</a> > <a href="/tienda">Tienda</a> >
      <a href="" class="real">Carrito</a>
    </div>
    <div class="route-dir" v-if="this.$route.path == '/carrito/empty'">
      <a href="">Home</a> > <a href="/tienda">Tienda</a> >
      <a href="" class="real">Carrito</a>
    </div>
    <div class="route-dir" v-else-if="this.$route.path == '/check-out'">
      <a href="">Home</a> > <a href="/tienda">Tienda</a> >
      <a href="">Carrito</a> > <a href="" class="real">Check out</a>
    </div>
    <div class="route-dir" v-else-if="this.$route.path == '/finished'">
      <a href="">Home</a> > <a href="/tienda">Tienda</a> >
      <a href="">Carrito</a> > <a href="">Check out</a> > <a href="" class="real">Finalizado</a>
    </div>
  </div>
</template>
<script>
export default {

};
</script>
<style >
.routeCont{
  padding-top: 29.236vw;
    margin: 0 11.667vw 0;
}
.route-dir {
    font-weight: 400;
    font-size: 0.938vw;
    line-height: 194.5%;
    color: #BEBEBE;
}
.route-dir a {
    text-decoration-color: transparent;
    color: #BEBEBE;
}
a.real {
    color: #3EBDB1;
    text-decoration-color: #3EBDB1;
    font-weight: 600;
}
@media (max-width:768px) {
.route-dir {
    font-size: 4.206vw;
    line-height: 194.5%;
}
}
</style>