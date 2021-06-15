<template>
  <div>
    <div class="q-pa-xs">
      <q-input
        v-model.number="postId"
        type="number"
        filled
        style="max-width: 200px"
        label="Search by Post ID"
        class="q-pa-sm"
      />
      <q-input
        v-model="filterSearch"
        filled
        style="max-width: 200px"
        :label="`Search by ${filterBy}`"
        class="q-pa-sm"
      />
      <div class="q-gutter-sm">
        <q-radio v-model="filterBy" val="name" label="name" />
        <q-radio v-model="filterBy" val="email" label="email" />
        <q-radio v-model="filterBy" val="body" label="body" />
      </div>
    </div>
    <q-card v-if="post != null" class="my-card q-pa-sm" bordered padding>
      <q-card-section>
        <div class="text-h6">{{ post.title }}</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        {{ post.body }}
      </q-card-section>

      <!-- <q-separator inset class="q-mb-sm" /> -->
      <div v-if="comment != undefined">
        <q-expansion-item
          v-for="c in comment"
          :key="c.id"
          v-model="expanded"
          :label="`${c.name} (${c.email}) comment:`"
          class="text-subtitle1 bg-grey-2"
        >
          <q-card>
            <q-card-section class="text-body2 text-grey4 bg-grey-1">
              {{ c.body }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from '@vue/composition-api';
import axios from 'axios';

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CommentData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default defineComponent({
  setup() {
    const postId = ref('1');
    const filterSearch = ref('');
    const filterBy = ref('name');

    const post = ref<PostData>();

    const comment = ref<CommentData[]>();

    watch([postId, filterSearch], ([newA, newB], [prevA, prevB]) => {
      loadData();
    });

    watch(filterBy, next => {
      filterSearch.value = '';
    });

    onMounted(() => {
      loadData();
    });

    return {
      postId,
      post,
      comment,
      expanded: ref(true),
      filterSearch,
      filterBy
    };

    function loadData() {
      axios(`https://jsonplaceholder.typicode.com/posts/${postId.value}`)
        .then(response => {
          post.value = response.data as PostData;
        })
        .catch(error => {
          console.error('loadData Error', error);
        });

      axios(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId.value}`
      )
        .then(response => {
          comment.value = response.data as CommentData[];
          switch (filterBy.value) {
            case 'name':
              comment.value = comment.value.filter(x =>
                x.name.toLowerCase().includes(filterSearch.value.toLowerCase())
              );
              break;
            case 'email':
              comment.value = comment.value.filter(x =>
                x.email.toLowerCase().includes(filterSearch.value.toLowerCase())
              );
              break;
            case 'body':
              comment.value = comment.value.filter(x =>
                x.body.toLowerCase().includes(filterSearch.value.toLowerCase())
              );
              break;
          }
        })
        .catch(error => {
          console.error('loadData Error', error);
        });
    }
  }
});
</script>

<style></style>
