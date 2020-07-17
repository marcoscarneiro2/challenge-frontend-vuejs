<template>
    <ul class="Menu">
        <li class="Menu-item"><router-link :to="{name: 'Movies'}">Filmes</router-link></li>
        <li class="Menu-item"><router-link :to="{name: 'Shows'}">Séries</router-link></li>
    </ul>
</template>

<script>
export default {
    
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
        display: block;
        padding: 10px;
        a{
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
}
</style>