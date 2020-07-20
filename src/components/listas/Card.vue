<template>
  <div class="card">
    <div class="img-card">
      <slot name="imagem-card"></slot>
    </div>
    <div class="infos">
      <slot name="descricao"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
p {
  margin-left: 10px;
}

.titulo {
  margin-top: 10px;
  overflow: hidden;
  text-align: center;
  margin-bottom: 15px;
  white-space: nowrap;
  text-overflow: "...";
  text-overflow: ellipsis;
}
.card {
  width: 195px;
  margin: auto;
  display: flex;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;
  flex-direction: column;
  background-color: whitesmoke;
  box-shadow: -4px 4px 5px rgba(0, 0, 0, 0.5);
}
.card:hover {
  transform: scale(1.1);
}
.img-card {
  margin: 10px auto;
  border-radius: 4px;
}
</style>