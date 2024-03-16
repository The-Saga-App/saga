<template>
  <div class="flex w-100 vh-100 flex-column overflow-y-scroll bg-black white">
    <NuxtPage class="" />
    <Footer/>
  </div>
</template>

<script setup>
const title = ref("Saga");

useHead({
  title: title,
  meta: [{
    name: "viewport",
    content: "width=device-width, initial-scale=1.0",
  }, {
    name: "description",
    content: "",
  }, {
    name: "keywords",
    content: "",
  }, {
    name: "author",
    content: "Jonathan Dupré",
  }],
  script: [{
    src: "https://www.googletagmanager.com/gtag/js?id=GTM-M9CZ2HQL",
    async: true
  }, {
    src: "https://f.convertkit.com/ckjs/ck.5.js",
    async: true
  }],
  link: [{
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
  }, {
    rel: "stylesheet",
    href: "https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"
  }, {
    rel: "stylesheet",
    href: "/css/style.css"
  }]
});
</script>
