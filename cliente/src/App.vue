<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      temporary
    >
      <v-list dense >
        
         <v-btn 
         text center
            style="text-decoration:none;"
            v-for="items in navItens"
            :key="items.title"
            :to="items.routerLinks"
            class="mb-2"
            >
             <v-col>
                <v-list-item-title class="ml-12" v-text="items.title"/>
              </v-col>
            </v-btn>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Filmes e Séries</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
        
<v-main>
        <router-view/>
    </v-main>

        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span>Desafio Vue &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
    name:"NavBar",
    data() {
      return {
        drawer:false,
        navItens:[
          {  title: 'Filmes', routerLinks: '/Filmes' },
          {  title: 'Series', routerLinks: '/Series' },

         
        ]
      }
    },
     created () {
      this.$vuetify.theme.dark = true
    },
}
</script>