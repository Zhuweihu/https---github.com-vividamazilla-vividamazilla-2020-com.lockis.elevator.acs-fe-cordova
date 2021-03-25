<template>
 <div>
     <section ref="print"> 
  　　要打印内容
  <div class="no-print">不要打印我</div> 
 </section>
 <button @click="click">打印</button>
 </div>
  

</template>

<script>
export default {
    created(){
        
    },
    methods:{
        click(){
            this.$print(this.$refs.print)
        }
    }

}
</script>

<style>

</style>