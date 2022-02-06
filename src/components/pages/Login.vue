<template>
  <div >
    <div class="flex items-center justify-center h-screen bg-mainColor">
      <div class="w-full max-w-md">
        <form
          class="bg-bgColor shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          @submit.prevent="signIn"
        >
          <!-- @csrf -->
          <div
            class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
          >
            Please Login
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-normal mb-2"
              
              for="username"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              v-model="user.username"
              type="email"
              required
              autofocus
              placeholder="Email"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-normal mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="user.password"
              type="password"
              placeholder="Password"
              name="password"
              required
              autocomplete="current-password"
            />
          </div>
          <div class="flex items-center justify-between">
                        <a
              class="inline-block align-baseline font-normal text-sm text-blue-400 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
            <button
              class="px-4 py-2 rounded text-white inline-block shadow-lg bg-secondaryColor hover:bg-blue-600 focus:bg-blue-700"
              type="submit"
            >
              Sign In
            </button>

          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      const api = `https://vue-course-api.hexschool.io/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          const { token, expired } = response.data;
          document.cookie = `simsToken=${token}; expires=${new Date(expired)}`;
          vm.$router.push("/admin/products");
        }
      });
    },
  },
};
</script>
