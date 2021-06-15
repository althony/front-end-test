<template>
  <q-page padding>
    <div class="col-shrink text-h4 ">
      Posts
    </div>
    <post> </post>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Post from 'components/Post.vue';

export default defineComponent({
  components: { Post },
  setup() {
    return {};
  }
});
</script>
