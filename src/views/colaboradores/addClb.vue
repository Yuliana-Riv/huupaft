<template >
    <div id="AddClb">
       
        <div class="form-content">
            <form @submit.prevent="
                submit(
                 name , descrp, about, facebook, instagram, twiter, linkedin, email
                )
              ">
    

                    <div class="grup-form dflx">
                        <div class="boxform">
                            <label for="name" class="name">Nombre </label>
                            <input v-model="name" type="text" id="name" name="name" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]{2,254}"   required class="in1">
                        </div>
                         <div class="boxform">
                            <label for="descrp" class="descrp">Descripción </label>
                            <input v-model="descrp" type="text" id="descrp"  name="descrp"  required>
                        </div>
                         <div class="boxform">
                            <label for="facebook" class="facebook">Facebook </label>
                            <input v-model="facebook" type="text" id="facebook"  name="facebook"   >
                        </div>
                        
                        
                    </div>

                    <div class="grup-form dflx">
                        
                         <div class="boxform">
                            <label for="instagram" class="instagram">Instagram </label>
                            <input v-model="instagram" type="text" id="instagram"  name="instagram"   >
                        </div>
                        <div class="boxform">
                            <label for="twiter" class="twiter">Twiter </label>
                            <input v-model="twiter" type="text" id="twiter"  name="twiter"   >
                        </div>

                        <div class="boxform">
                            <label for="linkedin" class="linkedin">Linkedin </label>
                            <input v-model="linkedin" type="text" id="linkedin"  name="linkedin"   >
                        </div>

                       
                        
                        
                    </div>
                    <div class="grup-form dflx">
                         <div class="boxform">
                            <label for="email" class="correo">Correo electrónico </label>
                            <input v-model="email" type="text" id="email"  name="email"   >
                        </div>
                    </div>
                   
                   
                    <label for="about" class="about">About </label>
             <vue-editor 
                 id="editor"
                 class="quill-editor-about"
                :editorToolbar="toolbar()"
                v-model="about"
                >
              </vue-editor> 

                  



                    
                        <div class="dflx">
                               <p @click="wait()" class="btnRegresar">Regresar</p>
                                  <button class="alta" type="submit">Guardar </button>
                        </div>
                     

                        <div v-if="status !=''" class="status_messages">
                            <div v-if="status =='success'" class="msg msg_success">
                                 <p>{{message}}</p>
                            </div>
                            <div  v-if="status =='error'" class="msg msg_error">
                                <p>{{message}}</p>
                            </div>
                        </div>
            </form>
     


        <div v-if="viewModal" class="modal_view">
           
            <div id="modal_add">
                <div class="body dflx">
                     
                           <h3>Colaborador agregado</h3>
                           <img src="../../assets/add.png" alt="icono alerta">
                </div>
           
            <div class="modal_add_btns dflx">
                <p @click="Add()" class="otro">Aceptar</p> <p  @click="toEdit()" class="editar">Editar</p>  <p  @click="back()" class="inicio">Inicio</p>
            </div>
          </div>
        </div> 

        </div>
           
    </div>
</template>
<script>
import {mapActions} from 'vuex';
import { VueEditor } from "vue2-editor";

export default {
    name:'AddClb',
    components: {
         VueEditor,
    },
    data(){
        return{
           status:'',
           message:'',
           name:"" ,
           descrp:"" , 
           about:"", 
           facebook:"", 
           instagram:"", 
           twiter:"", 
           linkedin:"",
          email:"",
           active: false,

           //MODAL

            viewModal:false,



        }
    },
    methods:{
         ...mapActions('colaboradores', ['setAddedClb']),
         ...mapActions('colaboradores', ['setHistoryOptionClb']),
          wait: function(){
            setTimeout(() => this.$router.go(), 200);
        },
        submit: async function( name , descrp, about, facebook, instagram, twiter, linkedin, email){
                 this.status =''
                 this.message =''
               let data ={
                name , descrp, about, facebook, instagram, twiter, linkedin, email
              
                  }

                  

                    let result = await this.$store.dispatch("colaboradores/addItemClb",  {option:'colaboradores', item: data});
                   
                    if(result.status=='error'){
                        this.status='error'
                        this.message= result.message
                    }else{ // success
                         this.setAddedClb(result.added )
                       this.showModal()
                        
                       
                    } 
             

            
    },
closeSelect() {
      this.active = false;
      document.getElementById("select-ch").checked = false;
    },

     showModal: function(){
         this.viewModal=true
     },
    closeModal:function(){
        this.viewModal=false;
        this.setAddedClb('')
        this.setHistoryOptionClb('Default')
    },
    Add:function(){
        this.status='';
           this.message='';
           this.name="" ;
         
        this.viewModal=false;
        this.setAddedClb('');
    },
    toEdit:function(){
        
        
        this.setHistoryOptionClb('Edit')
         this.viewModal=false;
    },
    back:function(){
        setTimeout(() => this.$router.go(), 200);
    },

    toolbar:function(){
             if(this.tipo == 'video'){
                  return  [
                        [  'video' ], 
                    ];
             }else if(this.tipo =='imagen'){
                  return  [
                        [  'image' ], 
                    ];
             }else{
                 return  [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [ 'link'],          // add's image support
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ];
             }
            },
    


   }
}
</script>
<style scoped>


    
    #AddClb label{
        color: var(--color-2);
        font-weight: 700;
        font-size: 0.7291666666666666VW;
        margin-bottom: .3vw;
    }

    #AddClb input, #AddClb select{
        height: 2.5VW;
        width: 14.716666666666668VW;
        border: 0.052083vw solid var(--color-2);
        border-radius: 0vw  1.5vw 1.5vw  0vw ;
        color: var(--color-2);
        font-size: 0.7291666666666666VW;
        font-weight: 500;
        padding-left: 1.09375VW;
    }

   #select-role {
  height: 2.5vw;
  width: 13.716667vw;
  border: 0.052083vw solid var(--color-2);
  border-radius: 0vw 1.5vw 1.5vw 0vw;
  color: var(--color-2);
  font-size: 0.7291666666666666vw;
  font-weight: 500;
  padding-left: 1.09375vw;
  display: flex;
  align-items: center;
  background-image: url("../../assets/blueflecha.svg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 12.6vw;
}
#select-role.rounded {
  border-radius: 0vw 1.5vw 0vw 0vw;
    border-left: 0.052083vw solid var(--color-2);
    border-right: 0.052083vw solid var(--color-2);
    border-top: 0.052083vw solid var(--color-2);
    border-bottom: 0;
}#select-ch:checked ~ .options-cont {
    display: flex;
    position: absolute;
    padding: 0.573vw 1.25vw;
    flex-direction: column;
    background-color: white;
    width: 12.3vw;
    border-left: 0.052083vw solid var(--color-2);
    border-right: 0.052083vw solid var(--color-2);
    border-top: 0;
    border-bottom: 0.052083vw solid var(--color-2);
}









</style>