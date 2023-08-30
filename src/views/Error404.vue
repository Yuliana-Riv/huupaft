 <template >
  <div class="error-404">
    <Navigator />
      <div class="e404c"> 
        <section>
          <p class="title">Coffee <br> Not Found</p>
          <p class="subt">La página que estas buscando no existe.</p>
          <p class="subt">Utiliza el siguiente enlace para encontrar 
          <a href="/">
            el café más fregon de Sonora. 
          </a></p>
        </section>
      </div> 
  </div>
</template>
<script>
import Navigator from '../components/items/Navigator.vue'; 
import Footer from '../components/items/Footer.vue'; 

export default {
  name: "Error404",
  components:{
    Navigator,
    Footer
  },
  data() {
    return {
      status: "error",
      message: "",
    };
  }, 
  metaInfo() {
    return {
      title: "Error 404",
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
};
</script>
<style scoped>
.error-404 {
  background-color: black;
  width: 100%; 
}
.error-404 p {
  margin: 0;
  color: #f5f5f5;
}
.error-404 p.title {
  font-family: "PeaceSans";
  font-style: normal;
  color:#E42828;
}
.error-404 p.subt {
  font-family: "Glory";
  font-style: normal;
}
.error-404 .btn-404 {
  font-family: "Glory";
  font-style: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error-404 a { 
  color: #FFB800;
}
@media (max-width: 768px) {
  .error-404 {
    background-image:url('../assets/404bkmo.png');
    background-size: 100%;
    background-repeat: no-repeat; 
  }
  .e404c {
    padding-top: 113.768vw;
    margin: auto;
    width: 72.222vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .error-404 .c404i {
    width: 43.478vw;
    margin-bottom: 9.179vw;
  }
  .error-404 p.title {
    font-weight: 400;
    font-size: 13.285vw;
    line-height: 90.5%;
    text-align: center; 
    margin-bottom: 7.488vw;
  }
  .error-404 p.subt {
    font-weight: 400;
    font-size: 5.314vw;
    line-height: 115.5%;
    text-align: center;
    width: 67vw; 
    margin: 0 auto 5.314vw;
  }
  .error-404 .btn-404 {
    width: 47.585vw;
    height: 13.043vw;
    border: 0.121vw solid #FFFFFF;
    border-radius: 7.246vw;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 3.382vw;
    line-height: 4.348vw;
  }
}
@media (min-width: 768px) {
  .error-404 {
    background-image:url('../assets/404bkpc.png');
    background-size: 100%;
    background-repeat: no-repeat; 
  }
  .e404c {
    padding: 51.667vw 0 10vw 33.819vw;
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
  }
  .error-404 section {
    margin-right: 3.125vw;
  }
  .error-404 p.title { 
    margin-bottom: 1.597vw;
    font-weight: 400;
    font-size: 3.438vw;
    line-height: 4.323vw;
  }
  .error-404 p.title br{
    display:none;
  }
  .error-404 p.subt {
    font-weight: 400;
    font-size: 1.042vw;
    line-height: 1.719vw;
    margin-bottom: 0.92vw;
    text-align:center;
  }
  .error-404 section a {
 
  }
  .error-404 .btn-404 {
    width: 10.26vw;
    height: 2.813vw;
    border: 0.026vw solid #FFFFFF;
    border-radius: 1.563vw;
    color: #FFFFFF;
  }
  .error-404 .c404i {
    width: 16.458vw;
  }
}
</style>