import Vue from "vue";
import VueRouter from "vue-router";
import userService from "../services/user.service";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },
  {
    path: "/suscripcion",
    name: "Suscripcion",
    component: () => import("../views/Suscripcion"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },



  {
    path: "/terminos",
    name: "Terminos",
    component: () => import("../views/Terminos"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/politicas",
    name: "Politicas",
    component: () => import("../views/Politicas"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },




  {
    path: "/mayoreo",
    name: "Mayoreo",
    component: () => import("../views/Cotizador"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/catalogo",
    name: "Catalogo",
    component: () => import("../views/Catalogo"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },
  {
    path: "/producto/:url",
    name: "Producto",
    component: () => import("../views/Producto"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },
  {
    path: "/productoshop",
    name: "ProductoShop",
    component: () => import("../views/ProductoShop"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },
  {
    path: "/carrito",
    name: "Carrito",
    component: () => import("../views/carrito/miCarrito"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },
  {
    path: "/busqueda/:result",
    name: "Busqueda",
    component: () => import("../views/Busqueda"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },
  {
    path: "/finalizado",
    name: "finished",
    component: () => import("../views/carrito/Finished"),
    beforeEnter: async (to, from, next) => {
      next();
    },
    meta: {
      log: true,
      admin: false,
      auth: false,
    },
  } /**/,
  {
    path: "/f-prueba",
    name: "prueba",
    component: () => import("../views/carrito/Finished-prueba"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/check-out",
    name: "check-out",
    component: () => import("../views/carrito/checkOut"),
    beforeEnter: async (to, from, next) => {
      if (
        from.path != "/carrito" &&
        from.name != "Producto" &&
        from.name != "login-cuenta" &&
        from.name != "Login"
      ) {
        //solo entrar a esta vista desde mi carrito.
        next("/carrito");
      } else {
        next();
      }
    },
    meta: {
      log: true,
      admin: false,
      auth: false,
    },
  },

  /*{
      path: '/login',
      name: 'login',
      component: () => import('../views/Login'),
      meta :{
        log:false,
        admin : false,
        auth: false,
      }
    },*/

  {
    path: "/login",
    name: "loginreg",
    component: () => import("../views/LoginReg"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/auth",
    name: "autentificacion",
    component: () => import("../views/Autentificacion"),
    meta: {
      log: true,
      admin: true,
      auth: false,
    },
  },
  {
    path: "/administrador",
    name: "Dashboard",
    component: () => import("../views/Dashboard"),
    meta: {
      log: true,
      admin: true,
      auth: true,
    },
  },

  {
    path: "/mi-cuenta/:name",
    name: "MiCuenta",
    component: () => import("../views/micuenta/MiCuenta"),
    meta: {
      log: true,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/mi-cuenta/direccion/:name",
    name: "MiCuentaDireccion",
    component: () => import("../views/micuenta/MiCuenta"),
    meta: {
      log: true,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/blog",
    name: "Blog",
    component: () => import("../views/Blog"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/blog-by-autor/:autor",
    name: "BlogAutores",
    component: () => import("../views/Blog"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/busqueda-blog/:result",
    name: "BlogResults",
    component: () => import("../views/Blog"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },

  {
    path: "/blog/:url",
    name: "Post",
    component: () => import("../views/Post"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },

  {
    path: "*",
    name: "404",
    component: () => import("../views/Error404"),
    meta: {
      log: false,
      admin: false,
      auth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let meta_admin = to.matched.some((record) => record.meta.admin);
  let meta_log = to.matched.some((record) => record.meta.log);
  let meta_auth = to.matched.some((record) => record.meta.auth);

  let tokenexp = await userService.tokenexp();
  let check = false; //comprobar si esta logeado
  let admin = false;
  let type = "";

  if (tokenexp) {
    // ver que el token no este expirado.
    localStorage.removeItem("tkn");
    localStorage.removeItem("ath"); //limpiar el localstorage
    next();
  }

  let response = await userService.getData();

  if (response.status == "error") {
    localStorage.removeItem("tkn");
    localStorage.removeItem("ath");
  }

  if (response.status == "success") {
    //comprobar que sea un login valido.
    check = true;
    let isAdmin = userService.isAdmin(response.result);
    admin = isAdmin.admin;
    type = isAdmin.type;
  }

  let ath = await userService.getAth();

  // borrar el localstorage cada que vayamos a login.

  if (to.path === "/login" && check) {
    localStorage.removeItem("tkn");
    localStorage.removeItem("ath");

    next();
  }

  if (meta_log) {
    if (check) {
      if (meta_admin) {
        if (admin) {
          if (meta_auth) {
            if (ath) {
              next();
            } else {
              localStorage.removeItem("tkn");
              localStorage.removeItem("ath");
              next("/login");
            }
          } else {
            //...proximamente rutas que no requieran autentificacion
            next();
          }
        } else {
          localStorage.removeItem("tkn");
          localStorage.removeItem("ath");
          next("/");
        }
      } else {
        if (admin) {
          //no requiere admin pero es admin
          next();
        } else {
          next();
        }
      }
    } else {
      next("/login");
    }
  } else {
    if (check) {
      if (admin) {
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

const clearLocalStorage = function () {
  localStorage.removeItem("crt");
  localStorage.removeItem("tkn");
  localStorage.removeItem("ath");
};

export default router;
