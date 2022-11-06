<template>
  <header
    class="
      w-full
      bg-mainColor
      p-4
      flex
      justify-between
      items-center
      border-b-2 border-secondaryColor
    "
  >
    <nav class="flex items-center">
      <div class="text-bgColor p-1 text-xl rounded cursor-pointer">
        Sims Home
      </div>
    </nav>
    <div class="w-30 h-8 cursor-pointer">
      <div
        class="
          flex
          p-2
          text-white
          bg-secondaryColor
          rounded
          hover:bg-yellow-600
          text-center text-sm
        "
      >
        <button
          class="rounded inline-flex items-center"
          @click.prevent="signout"
        >
          <!-- <svg
            class="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg> -->
          <span class="font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    signout() {
      const api = `https://vue-course-api.hexschool.io/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    },
  },
};
</script>
