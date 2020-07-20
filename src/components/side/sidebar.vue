<template>
    <ul class="Menu">
        <li class="Menu-item" :class="{'active': active == 'Movies' || active == 'Index'}">
            <router-link :to="{name: 'Movies'}">
                <font-awesome-icon icon="video" />
                Filmes
            </router-link>
        </li>
        <li class="Menu-item" :class="{'active': active == 'Shows'}">
            <router-link :to="{name: 'Shows'}">
                <font-awesome-icon icon="tv" />
                Séries
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    computed:{
        active(){
            return this.$route.name;
        }
    }
}
</script>

<style lang="scss" scoped>
.Menu{
    background: #fff;
    border-right: 1px #ddd solid;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;

    .Menu-item{
        
        svg{
            margin: 0 5px;
        }

        a{
            display: block;
            padding: 10px;
            color: #444;
        }

        &:hover{
            background: $base-color;
            cursor: pointer;
            a{
                color: #fff;
                text-decoration: none;
            }
        }
    }

    .active{
        background: $base-color;
        a{
            color: #fff;
        }
    }
}
</style>