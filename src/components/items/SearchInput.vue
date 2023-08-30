<template>
  <div class="Search">
    <input type="text" placeholder="Buscar blog" v-model="busqueda" @keypress.enter="submit(busqueda)"/>
    <img src="../../assets/lupa2.svg" alt="btn" class="btn" @click="submit(busqueda)" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      busqueda: "",
    };
  },
  methods: {
    submit(value) {
      if (value !== "") {
        return window.location.replace("/busqueda-blog/" + value);
      }
    },
  },
};
</script>
<style>
.Search {
  display: flex;
  align-items: center;
  border: 0.1vw solid #303030;
}
.Search input {
  width: 63vw;
  height: 12.802vw;
  border: none;
  text-indent: 5.314vw;
  font-family: "Glory";
  font-style: normal;
  font-weight: 400;
  font-size: 4.831vw;
  line-height: 5.314vw;
  color: #747475;
}
.Search .btn {
  width: 5.797vw;
  cursor: pointer;
}
@media (min-width: 768px) {
  .Search input {
    width: 11.6vw;
    height: 2.083vw;
    text-indent: 0.914vw;
    font-weight: 400;
    font-size: 0.833vw;
    line-height: 0.903vw;
    color: #747475;
  }
  .Search .btn {
    width: 1.181vw;
  }
}
</style>
