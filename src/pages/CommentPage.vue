<template>
  <q-page padding>
    <div class="col-shrink text-h4 q-pr-lg q-py-md">
      Comment
    </div>
    <comment-component></comment-component>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CommentComponent from 'src/components/CommentComponent.vue';

export default defineComponent({
  components: { CommentComponent },
  setup() {
    return {};
  }
});
</script>

<style></style>
