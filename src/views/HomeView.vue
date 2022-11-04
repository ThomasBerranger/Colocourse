<template>
  <div class="home">
    <h2>Inscription</h2>
    <RegisterView />
    <h2>Connexion</h2>
    <LoginView />
  </div>
</template>

<script>
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';

export default {
  name: 'HomeView',
  components: {
    RegisterView,
    LoginView
  }
}
</script>
