<script setup lang="ts">
const levels = [
  {id: 0, title: 'hello world', style: 'Quest', difficulty: 'easy', published_on: '2024-03-05'}
];
</script>

<template>
  <div class="card bg-white black pa3">
    <div class="w-100 tc"><h1>rooksight.com</h1></div>
    <div class="w-100 flex flex-row justify-around pa1 mv5">
      <div class="tc pa3">
        <p class="f1 b mv0">4.5</p>
        <span class="f5">Metric A</span>
      </div>
      <div class="tc pa3">
        <p class="f1 b mv0">321</p>
        <span class="f5">Metric B</span>

      </div>
      <div class="tc pa3">
        <p class="f1 b mv0">0.3</p>
        <span class="f5">Metric C</span>

      </div>
    </div>
    <!-- <table class="table lh-copy f4 is-striped w-100 mv1">
      <thead>
        <tr class="tl">
          <th>Title</th>
          <th class="w4">Style</th>
          <th class="w4">Difficulty</th>
          <th class="w4">Clear Rate</th>
          <th class="w4">Created On</th>
          <th class="w2">
            <Emoji>⭐️</Emoji>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="level in levels"
          :key="level.id">
          <td>
            <router-link
              :to="`/levels/${level.id}`"
              class="white">
              <span>{{ level.title }}</span>
            </router-link>
          </td>
          <td>{{ level.style }}</td>
          <td>{{ level.difficulty }}</td>
          <td>80%</td>
          <td>{{ level.published_on }}</td>
          <td class="tc">0</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>
