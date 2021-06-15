<template>
  <div>
    <div v-if="items != undefined" class="q-pa-md">
      <q-infinite-scroll @load="onLoad">
        <q-card v-for="d in items" :key="d.id" class="q-mb-lg">
          <q-card-section>
            <div class="text-h6">{{ d.title }}</div>
            <!-- <div class="text-subtitle2">post id: {{ d.id }}</div> -->
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            {{ d.body }}
          </q-card-section>
        </q-card>
      </q-infinite-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed
} from '@vue/composition-api';
import axios from 'axios';

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  setup() {
    const data = ref<PostData[]>();
    const numPages = ref(1);
    const items = computed(() => data?.value?.slice(0, numPages.value * 10));

    onMounted(() => {
      axios('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          data.value = response.data as PostData[];
        })
        .catch(error => console.log('Error', error));
    });

    return {
      expanded: ref(false),
      data,
      items,
      onLoad
    };

    function onLoad(index: number, done: (arg0: boolean) => void): void {
      numPages.value = index;
      if (data.value != undefined) done(index * 10 >= data.value.length);
    }
  }
});
</script>
