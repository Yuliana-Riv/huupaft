<template >
  <div class="Home">
    <Navigator />
    <SlideHome />
    <SectionTwo />
    <CoffeeItems />
    <SectionThree />
    <ClientsQuotes /> 
    <SuscribeC />
    <SalePoints />
    <Recetas />
    <Whatsapp />
    <Footer />
  </div>
</template>
<script>

import {url} from '../global/index'; 
import Navigator from '../components/items/Navigator.vue'; 
import SlideHome from '../components/home/SlideHome.vue'; 
import SectionTwo from '../components/home/SectionTwo.vue'; 
import CoffeeItems from '../components/home/CoffeeItems.vue'; 
import SectionThree from '../components/home/SectionThree.vue'; 
import ClientsQuotes from '../components/home/ClientsQuotes.vue'; 
import SuscribeC from '../components/home/SuscribeC.vue'; 
import SalePoints from '../components/home/SalePoints.vue'; 
import Recetas from '../components/home/Recetas.vue'; 
import Whatsapp from '../components/items/Whatsapp.vue'; 
import Footer from '../components/items/Footer.vue'; 

export default {
  name:'HOME',
  components:{
    Navigator,SlideHome,SectionTwo,CoffeeItems,SectionThree,ClientsQuotes,SuscribeC,SalePoints,Recetas,Whatsapp,Footer
  },
  data(){
    return{
      url
    }
  },
  metaInfo() {
    return {
      title: "Take the experience",
      titleTemplate: "%s | Huupa",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content:
            "...",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    };
  },
  created(){
    
  }

  
}
</script>
<style >
.Home {
    width: 100%;
    overflow: hidden;
}
</style>
