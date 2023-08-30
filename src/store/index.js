import Vue from 'vue'
import Vuex from 'vuex'

import admin from './modules/admin'
import address from './modules/address'
import atributo from './modules/atributo'
import colors from './modules/colors'
import logo from './modules/logo'
import main from './modules/main'
import profile from './modules/profile'
import usuarios from './modules/usuarios'
import category from './modules/category'
import product  from './modules/product'
import product_cat  from './modules/product_cat'
import product_val  from './modules/product_val'
import stock  from './modules/stock'
import shipment from './modules/shipment'
import mirror from './modules/mirror'
import shopcar from './modules/shopcar'
import global_params from './modules/global_params'
import carrito from './modules/carrito'
import pasarela from './modules/pasarela'
import payment from './modules/payment'
import suscripciones from './modules/suscripciones'
import wishlist from './modules/wishlist'
import blog from './modules/blog'
import blog_category from './modules/blog_category'
import blog_comment from './modules/blog_comment'
import tag from './modules/tag'
import colaboradores from './modules/colaboradores'
import clients_quotes from './modules/clients_quotes'
import sale_points from './modules/sale_points'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin: admin,
    address: address,
    main: main,
    usuarios: usuarios,
    profile:profile,
    colors:colors,
    logo:logo,
    category: category,
    product: product,
    product_cat: product_cat,
    product_val:product_val,
    atributo: atributo,
    stock: stock,
    shipment: shipment,
    mirror: mirror,
    shopcar: shopcar,
    global_params: global_params,
    carrito: carrito,
    pasarela: pasarela,
    payment: payment,
    suscripciones: suscripciones,
    wishlist:wishlist,
    blog:blog,
    blog_category:blog_category,
    tag:tag,
    colaboradores:colaboradores,
    blog_comment:blog_comment,
    clients_quotes:clients_quotes,
    sale_points:sale_points,
  }
})
