<template>
  <div class="bottom-0 w-full sm:m-0 sm:mt-5">
    <div class="bg-bgColor flex sm:justify-center">
      <div
        class="flex flex-col sm:flex-row text-center w-full md:w-10/12 justify-center sm:justify-around py-0 sm:py-12"
      >
        <div>
          <div
            class="text-sm tracking-wide mt-2 flex flex-row sm:flex-col justify-center justify-between sm:text-left sm:text-lg px-5 py-2 sm:p-0"
          >
            <div class="tracking-wider font-mono">CUSTOMER CARE</div>
            <div class="ml-3 block sm:hidden" @click="careOpen = !careOpen">
              <button v-if="!careOpen"><i class="fas fa-plus"></i></button>
              <button v-else><i class="fas fa-minus"></i></button>
            </div>
          </div>
          <div class="border-b sm:border-0">
            <ul class="text-xs hidden sm:block sm:text-left sm:mt-3">
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Contact Us</a>
              </li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Track Your Order</a>
              </li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Frequently Asked Questions</a>
              </li>
            </ul>
            <ul
              v-if="careOpen"
              class="text-xs text-left px-5 py-2 tracking-wider"
            >
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Contact Us</a>
              </li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Track Your Order</a>
              </li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div
            class="text-sm tracking-wide mt-2 flex flex-row sm:flex-col justify-center justify-between sm:text-left sm:text-lg px-5 py-2 sm:p-0"
          >
            <div class="tracking-wider font-mono">THE COMPANY</div>

            <div
              class="ml-3 block sm:hidden"
              @click="companyOpen = !companyOpen"
            >
              <button v-if="!companyOpen"><i class="fas fa-plus"></i></button>
              <button v-else><i class="fas fa-minus"></i></button>
            </div>
          </div>
          <div class="border-b sm:border-0">
            <ul class="text-xs hidden sm:block sm:text-left sm:mt-3">
              <li class="py-1 pl-1 hover:underline">
                <a href="#">About Us</a>
              </li>
              <li class="py-1 pl-1 hover:underline"><a href="#">Careers</a></li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Request a Catalog</a>
              </li>
            </ul>
            <ul
              v-if="companyOpen"
              class="text-xs text-left px-5 py-2 tracking-wider"
            >
              <li class="py-1 pl-1 hover:underline">
                <a href="#">About Us</a>
              </li>
              <li class="py-1 pl-1 hover:underline"><a href="#">Careers</a></li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Request a Catalog</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div
            class="text-sm tracking-wide mt-2 flex flex-row sm:flex-col justify-center justify-between sm:text-left sm:text-lg px-5 py-2 sm:p-0"
          >
            <div class="tracking-wider font-mono">DESIGN SHOPS</div>

            <div class="ml-3 block sm:hidden" @click="designOpen = !designOpen">
              <button v-if="!designOpen"><i class="fas fa-plus"></i></button>
              <button v-else><i class="fas fa-minus"></i></button>
            </div>
          </div>
          <div class="border-b sm:border-0">
            <ul class="text-xs hidden sm:block sm:text-left sm:mt-3">
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Tokyo, JP</a>
              </li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Osaka, JP</a>
              </li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Fukuoka,JP</a>
              </li>
            </ul>
            <ul
              v-if="designOpen"
              class="text-xs text-left px-5 py-2 tracking-wider"
            >
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Tokyo, JP</a>
              </li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Osaka, JP</a>
              </li>
              <li class="py-1 pl-1 hover:underline">
                <a href="#">Fukuoka,JP</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div
            class="hidden sm:block tracking-wide mt-2 sm:text-left text-lg sm:pl-2"
          >
            FOLLOW US
          </div>
          <div
            class="flex flex-row sm:justify-center px-3 sm:px-5 py-2 sm:p-0 sm:self-center sm:mt-2"
          >
            <a href="https://instagram.com/" target="_blank" class="mx-3"
              ><i class="fab fa-instagram"></i
            ></a>
            <a href="https://facebook.com/" target="_blank" class="mx-3"
              ><i class="fab fa-facebook"></i
            ></a>
            <a href="https://twitter.com/" target="_blank" class="mx-3"
              ><i class="fab fa-twitter"></i
            ></a>
            <a href="mailto: abc@example.com" class="mx-3"
              ><i class="far fa-envelope"></i
            ></a>
            <a href="tel:+123456789" class="mx-3"
              ><i class="fas fa-phone"></i
            ></a>
          </div>
        </div>
      </div>
    </div>

    <!-- copyright -->
    <div
      class="flex pb-3 pt-4 md:flex-row flex-col-reverse justify-around md:text-right text-center sm:w-10/12 sm:mx-auto md:w-10/12"
    >
      <div class="md:w-5/12 text-xs md:text-left mt-2 md:mt-0 md:pl-8">
        <p>&copy; 2022 Sims-Home developed by cclin</p>
      </div>
      <div class="w-full">
        <ul
          class="flex flex-row md:justify-evenly justify-around text-xs md:text-right sm:text-center"
        >
          <li class="hover:underline">
            <a href="#">Privacy Policy</a>
          </li>
          <li class="hover:underline">
            <a href="#">Terms &amp; Conditions</a>
          </li>
          <li class="hover:underline">
            <a href="#">Cookie Policy</a>
          </li>
          <li class="hover:underline">
            <a href="#">Cookie Settings</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      careOpen: false,
      companyOpen: false,
      designOpen: false,
    };
  },
};
</script>
