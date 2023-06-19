<template>
    <div class="home">
      <h1>Memory Cards</h1>
      <input v-model="username" placeholder="Introduce tu nombre" class="main-input"/>
      <button @click="startGame" class="main-button">Iniciar juego</button>
    </div>
</template>
  
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { useStore } from '../store/store';

    const store = useStore()
    const router = useRouter()
    const username = ref('')

    const startGame = () => {
        if (username.value.trim() !== "") {
            store.updateName(username.value);
            router.push("/game");
        } else {
            alert("Por favor, introduce un nombre válido.");
        }
    }
</script>
  
<style>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    max-width: 500px;
}
</style>