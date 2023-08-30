<template>
  <div class="Nav" :class="{ adjust: scrollP > 0, semode : (search_it == true) && (scrollP > 0), navbk:((this.$route.name == 'Carrito') || (this.$route.name == 'check-out') || (this.$route.name == 'prueba') || (this.$route.name == 'loginreg') || (this.$route.name == 'MiCuenta')) && (scrollP == 0) }">
    <div class="up-n">
      <div class="pd">
        <div class="sm-c pc">
          <a href="https://www.facebook.com/huupa.coffee" target="_blank" rel="noopener noreferrer"
            ><img src="../../assets/fb2.svg" alt="fb"
          /></a>
          <a
            href="https://www.instagram.com/coffee.huupa/?igshid=YmMyMTA2M2Y%3D"
            target="_blank"
            rel="noopener noreferrer"
            ><img src="../../assets/ig2.svg" alt="ig"
          /></a>
          <a href="https://www.youtube.com/@huupacoffee521" target="_blank" rel="noopener noreferrer"
            ><img src="../../assets/yt2.svg" alt="yt"
          /></a>
        </div>
        <p class="tl">¡Bienvenidos a una tienda bien Sonorense!</p>
        <div class="snt pc">
          <img src="../../assets/truck2.svg" alt="truck" />
          <p>Envío GRATIS a todo México a partir de $500MXN</p>
        </div>
      </div>
    </div>
    <div class="hd-n">
      <div class="col1">
        <div class="msec">
          <a href="/carrito" class="carrito mo"
            ><img src="../../assets/cart1.svg" alt="cart"
          /></a>
          <a href="/" class="logo">
            <img src="../../assets/logo1.svg" alt="logo" />
          </a>
          <img
            src="../../assets/menu1.svg"
            alt="logo"
            class="btnmenu"
            @click="menu_it = true"
          />
        </div>

        <div class="menu-nav" :class="{ active: menu_it == true }">
          <div class="twoitems">
            <a href="/administrador" class="user mo" v-if="(identity.role == 'legrafica')||(identity.role == 'admin')"
              ><img src="../../assets/user1.svg" alt="user"
            /></a>
            <a href="/mi-cuenta/escritorio" class="user mo" v-else-if="(identity.role == 'cliente')"
              ><img src="../../assets/user1.svg" alt="user"
            /> </a>
            <a href="/login" class="user mo" v-else 
              ><img src="../../assets/user1.svg" alt="user"
            /> </a>
            <img
              src="../../assets/menu2.svg"
              alt="logo"
              class="btnmenu"
              @click="menu_it = false"
            />
          </div>

          <div class="menu-items-l">
            <a href="/" :class="{ act: $route.name == 'Home' }">INICIO</a>
            <a href="/catalogo" :class="{ act: $route.name == 'Catalogo' }"
              >TIENDA</a
            >
            <!--<a href="">SOBRE NOSOTROS</a>-->
            <a
              href="/suscripcion"
              :class="{ act: $route.name == 'Suscripcion' }"
              >SUSCRIPCIÓN</a
            >
            <a
              href="/mayoreo"
              :class="{ act: $route.name == 'Mayoreo' }"
              >MAYOREO</a
            >
            <a href="/blog"
              :class="{ act: $route.name == 'Blog' }">BLOG</a>
            <a href="#Contacto">CONTACTO</a>
          </div>
          <div class="search mo">
            <input type="text" name="" id="" 
            v-model="search_val"
            @keypress.enter="submit(search_val)"/>
            <img src="../../assets/lupa1.svg" alt="lupa" class="lupa" 
            @click="submit(search_val)"/>
          </div>
          <div class="sm-c mo">
            <a href="https://www.facebook.com/huupa.coffee" target="_blank" rel="noopener noreferrer"
              ><img src="../../assets/fb1.svg" alt="fb"
            /></a>
            <a href="https://www.instagram.com/coffee.huupa/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer"
              ><img src="../../assets/ig1.svg" alt="ig"
            /></a>
            <a href="https://www.youtube.com/@huupacoffee521" target="_blank" rel="noopener noreferrer"
              ><img src="../../assets/yt1.svg" alt="yt"
            /></a>
          </div>
          <div class="snt mo">
            <img src="../../assets/truck.svg" alt="truck" />
            <p>Envío GRATIS a todo México a partir de $500MXN</p>
          </div>
        </div>
      </div>
      <div class="col2">
        <div class="search pc">
          <input
            type="text"
            name=""
            id=""
            placeholder="Buscar productos..."
            v-model="search_val"
            v-if="search_it == true"
            @keypress.enter="submit(search_val)"
          />
          <img
            :src="search_it == true ? ( search_val == '' ? require('../../assets/menu2.svg') : require('../../assets/lupa1.svg')) : require('../../assets/lupa1.svg')"
            alt="lupa"
            class="lupa"
            :class="{'scross':(search_it == true)&&(search_val == '')}"
            @click="
              search_val == '' ? (search_it == true ? (search_it = false) : (search_it = true)) : (submit(search_val))
            "
          />
        </div>
        <a href="/administrador" class="user pc" v-if="(identity.role == 'legrafica')||(identity.role == 'admin')"
          ><img src="../../assets/user1.svg" alt="user"
        /></a>
        <a href="/mi-cuenta/escritorio" class="user pc" v-else-if="identity.role == 'cliente'"
          ><img src="../../assets/user1.svg" alt="user"
        /></a>
        <a href="/login" class="user pc" v-else
          ><img src="../../assets/user1.svg" alt="user"
        /></a>
        <a href="/carrito" class="carrito pc"
          ><img src="../../assets/cart1.svg" alt="cart"
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //menu_it: false,
      menu_it: false,
      search_it: false,
      search_val:'',
      scrollP: localStorage.getItem("scroll"),
    };
  },
  async created() {
    await this.getIdentity();
 
  },
  computed:{
    identity() {
      return this.$store.getters["admin/getIdentity"];
    },

  },
  methods: {
    getIdentity: async function () {
      let response = await this.$store.dispatch("admin/getData");
      return response;
    },

    
    submit(value) {
      if(value !== ''){
        return window.location.replace("/busqueda/" + value);        
      } 
    },

    scroll(event) {
      let number = event.target.documentElement.scrollTop;
      let offset = number * 1;
      localStorage.setItem("scroll", offset);
      this.scrollP = localStorage.getItem("scroll");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
};
</script>
<style>
/*blacknav */
.Nav.navbk .carrito img,
.Nav.navbk .logo img,
.Nav.navbk .msec {
    filter: brightness(0);
} 
/*fin blacknav */
.Nav {
  position: fixed;
  z-index: 2000;
}
.Nav .up-n {
  background: #000000;
  color: white;
}
.Nav .up-n .tl {
  margin: 0;
  padding: 4.348vw 9.903vw;
  text-align: center;
  font-size: 4.348vw;
  line-height: 4.831vw;
  font-family: "Glory";
  letter-spacing: 0.05em;
  font-weight: 600;
}
.Nav .hd-n {
  background: transparent;
}
.Nav .msec {
  display: flex;
  padding: 3.140vw 7.729vw;
  justify-content: space-between;
  align-items: center;
}
.Nav .logo img {
  width: 41.304vw;
  position: relative;
  z-index: 122;
}
.Nav .btnmenu {
  width: 10.266vw;
  cursor: pointer;
}
.Nav .menu-nav {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
  padding: 8.213vw 3.382vw 3.382vw;
}
.Nav .sm-c.pc {
  display: none;
}
.Nav .sm-c.mo {
  display: flex;
  padding: 4.589vw 12.923vw;
  justify-content: space-between;
}
.Nav .sm-c.mo img {
  width: 12.635vw;
}
.Nav .snt.pc {
  display: none;
}
.Nav .snt.mo {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f70017;
  padding: 3.382vw 12.319vw;
}
.Nav .twoitems {
  display: flex;
  justify-content: space-between;
  width: 75vw;
  margin: 0 auto;
}
.Nav .snt .menu-items {
  display: flex;
  padding: 14.01vw 0 7.729vw;
}
.Nav .menu-items-l {
  flex-direction: column;
  align-items: flex-end;
  display: flex;
  margin: 13.285vw 3.382vw;
}
.Nav .menu-items-l a {
  font-family: "PeaceSans";
  font-weight: 400;
  font-size: 6.522vw;
  line-height: 6.522vw;
  text-decoration-color: transparent;
  color: white;
  margin-bottom: 9.42vw;
  transition: 0.45s;
}
.Nav .menu-items-l a:hover,
.Nav .menu-items-l a.act {
  color: #f70017;
}
.Nav .snt img {
  width: 6.28vw;
  margin-bottom: 2.174vw;
}
.Nav .snt p {
  font-family: "Glory";
  font-weight: 500;
  font-size: 4.348vw;
  line-height: 4.831vw;
  letter-spacing: 0.05em;
  text-align: center;
  color: white;
  margin: 0;
}
.Nav .search.pc {
  display: none;
}
.Nav .search.mo {
  display: flex;
  width: 71.739vw;
  height: 16.908vw;
  border: 0.1vw solid white;
  border-radius: 2vw;
  margin: 0 auto;
}
.Nav .search.mo input {
  width: 58.696vw;
  background-color: transparent;
  border: none;
    color: white;
    font-size: 6vw;
    text-indent: 3.2vw;
}
.Nav .search.mo .lupa {
  width: 8.744vw;
  height: auto;
}
.Nav .carrito.pc {
  display: none;
}
.Nav .carrito.mo {
  display: flex;
}
.Nav .carrito img {
  width: 8.213vw;
}
.Nav .user.pc {
  display: none;
}
.Nav .user.mo {
  display: flex;
}
@media (min-width:768px) {
/*blacknav */
 .Nav.navbk .lupa, .Nav.navbk .user img,.Nav.navbk .msec {
    filter: brightness(0);
}  
.Nav.navbk .menu-items-l a{
  color: black;
}
/*fin blacknav */
}
@media (max-width: 767px) {
  .Nav .menu-nav {
    width: 80.024vw;
    left: 100vw;
    pointer-events: none;
    transition: 0.5s;
    height: 100vh;
    z-index: 222;
  }
  .Nav .menu-nav.active {
    left: 14vw;
    pointer-events: all;
  }
  .Nav .hd-n {
    transition: 0.5s;
  }
  .Nav.adjust .hd-n {
    background: black;
  }
}
@media (min-width: 768px) {
  .Nav.adjust  {
    background: black;
  }
  .Nav {
    width: 100%;
    transition: .5s;
  }
  .Nav .up-n .tl {
    padding: 0;
    margin-right: 5.694vw;
  }
  .Nav .sm-c.pc {
    display: flex;
    margin-right: 27.396vw;
  }
  .Nav .sm-c.mo {
    display: none;
  }
  .Nav .snt.pc {
    display: flex;
  }
  .Nav .snt.mo {
    display: none;
  }
  .Nav .search.pc {
    display: flex;
    cursor: pointer;
    height: 1.750vw;
  }
  .Nav .search.mo {
    display: none;
  }
  .Nav .carrito.pc {
    display: flex;
  }
  .Nav .carrito.mo {
    display: none;
  }
  .Nav .user.pc {
    display: flex;
  }
  .Nav .user.mo {
    display: none;
  }
  .Nav .twoitems {
    display: none;
  }
  .Nav .menu-nav {
    position: relative;
  }
  .Nav .btnmenu {
    display: none;
  }
  .Nav .up-n .tl,
  .Nav .snt p {
    font-size: 1.111vw;
    line-height: 1.25vw;
  }
  .Nav .snt img {
    width: 1.354vw;
    margin-bottom: 0;
  }
  .Nav .up-n .pd {
    display: flex;
    /*justify-content: space-between;*/
    align-items: center;
    padding: 1.094vw 2.708vw;
  }
  .Nav .sm-c.pc img {
    width: auto;
    height: 0.804vw;
  }
  .Nav .sm-c.pc a {
    margin-right: 1.76vw;
  }
  .Nav .sm-c.pc a:last-child {
    margin-right: 0;
  }
  .Nav .snt img {
    width: 1.354vw;
    height: auto;
    margin-right: 0.938vw;
  }
  .Nav .logo img {
    width: 14.323vw;
    transition: 0.5s;
  }
  .Nav .msec {
    padding: 4.097vw 7.729vw 2.547vw 40.417vw; 
    transition: 0.5s;
  }
  .Nav .hd-n {
    display: flex;
    transition: 0.5s;
    height: 12.5vw;
  }
  .Nav .hd-n .col1 {
    width: 78.715vw;
  }
  .Nav .menu-items-l {
    flex-direction: row;
    align-items: flex-start;
    display: flex;
    margin: 0 0 0 28.91vw;
    /*
    margin: 0 0 0 21.910vw;
    width: 56.806vw;*/
    width: 42.806vw;
    justify-content: space-between;
    transition: 0.5s;
  }
  .Nav .menu-items-l a {
    font-size: 0.972vw;
    line-height: 0.972vw;
    margin-bottom: 0;
  }
  .Nav .menu-nav {
    position: relative;
    background-color: transparent;
    padding: 0;
  }
  .Nav .col2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10vw;
  }
  .Nav .lupa,
  .Nav .user img,
  .Nav .carrito img {
    width: 1.389vw;
    transition: .5s;
  }
  .Nav .lupa.scross {
    width: 0.79vw; 
}
  .Nav .lupa.scross:hover{
    width: 0.79vw;
  }
  /**.Nav .lupa:hover,
  .Nav .user img:hover,
  .Nav .carrito img:hover {
    width: 1.589vw;
  } */
  .Nav .search.pc input {
    position: absolute;
    /*margin-top: 2vw;*/
    margin-top: 0; 
    margin-left: -11vw;
    width: 10vw;
    height: 1.5vw;
    background-color: transparent;
    border: none;
    border-bottom: 0.1vw solid white;
    color: white;
    font-size: 0.92vw;
    transition: 0.5s;
  }
.Nav.navbk .search.pc input{
    border-bottom: 0.1vw solid black;
}
  .Nav.adjust .logo img {
    width: 10.083vw !important;
  }
  .Nav.adjust .msec {
    padding: 0 7.729vw 0 4.444vw;
  }
  .Nav.adjust .menu-items-l {
    position: relative;
    /*margin: -2.62vw  0 0 19vw;*/
    margin:-1.82vw 0 0 27vw;
  }
  .Nav.adjust .hd-n {
    height: 4.5vw;
    background: black;
  }
  .Nav.adjust .search.pc input { 
    color:  white;
  }
  .Nav.adjust.semode .menu-items-l {
    margin: -1.82vw 0 0 21vw;
}
}
</style>