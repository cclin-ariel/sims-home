<template>
  <div class="bottom-0 w-full sm:m-0 sm:mt-5">
    <div class="bg-bgColor flex sm:justify-center">
      <div
        class="flex flex-col sm:flex-row text-center w-full md:w-10/12 justify-center sm:justify-around py-0 sm:py-12"
      >
        <div class="mt-4 sm:mt-0">
          <div
            class="text-sm tracking-wide mt-2 flex flex-row sm:flex-col justify-center sm:justify-between sm:text-left text-lg"
          >
            CUSTOMER CARE
            <div class="ml-3 block sm:hidden">
              <button v-if="true"><i class="fas fa-plus"></i></button>
              <button v-else><i class="fas fa-minus"></i></button>
            </div>
          </div>
          <div>
            <ul class="text-xs hidden sm:block sm:text-left sm:mt-3">
              <li class="py-1 pl-1"><a href="#">Contact Us</a></li>
              <li class="py-1 pl-1"><a href="#">Track Your Order</a></li>
              <li class="py-1 pl-1">
                <a href="#">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div
            class="text-sm tracking-wide mt-2 flex flex-row sm:flex-col justify-center sm:justify-start sm:text-left text-lg"
          >
            THE COMPANY
            <div class="ml-3 block sm:hidden">
              <button v-if="true"><i class="fas fa-plus"></i></button>
              <button v-else><i class="fas fa-minus"></i></button>
            </div>
          </div>
          <div>
            <ul class="text-xs hidden sm:block sm:text-left sm:mt-3">
              <li class="py-1 pl-1"><a href="#">About Us</a></li>
              <li class="py-1 pl-1"><a href="#">Careers</a></li>
              <li class="py-1 pl-1"><a href="#">Request a Catalog</a></li>
            </ul>
          </div>
        </div>
        <div>
          <div
            class="text-sm tracking-wide mt-2 flex flex-row sm:flex-col justify-center sm:justify-start sm:text-left text-lg"
          >
            DESIGN SHOPS
            <div class="ml-3 block sm:hidden">
              <button v-if="true"><i class="fas fa-plus"></i></button>
              <button v-else><i class="fas fa-minus"></i></button>
            </div>
          </div>
          <div>
            <ul class="text-xs hidden sm:block sm:text-left sm:mt-3">
              <li class="py-1 pl-1"><a href="#">Tokyo, JP</a></li>
              <li class="py-1 pl-1"><a href="#">Osaka, JP</a></li>
              <li class="py-1 pl-1"><a href="#">Fukuoka,JP</a></li>
            </ul>
          </div>
        </div>
        <div>
          <div
            class="hidden sm:block tracking-wide mt-2 sm:text-left text-lg pl-2"
          >
            FOLLOW US
          </div>
          <div class="flex flex-row justify-center py-3 sm:self-center sm:mt-2">
            <a href="https://instagram.com/" target="_blank" class="mx-3"><i class="fab fa-instagram"></i></a>
            <a href="https://facebook.com/" target="_blank" class="mx-3"><i class="fab fa-facebook"></i></a>
            <a href="https://twitter.com/" target="_blank" class="mx-3"><i class="fab fa-twitter"></i></a>
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
      class="flex md:flex-row flex-col-reverse justify-around md:text-right text-center sm:w-10/12 sm:mx-auto md:w-10/12"
    >
      <div class="md:w-5/12 text-xs md:text-left mt-1 md:mt-0 md:pl-8">
        <p>&copy; 2022 Sims-Home developed by cclin</p>
      </div>
      <div class="w-full">
        <ul
          class="flex flex-row md:justify-evenly justify-around text-xs md:text-right sm:text-center"
        >
          <li class="">
            <a href="#" class="">Privacy Policy</a>
          </li>
          <li class="">
            <a href="#" class="">Terms &amp; Conditions</a>
          </li>
          <li class="">
            <a href="#" class="">Cookie Policy</a>
          </li>
          <li class="">
            <a href="#" class="">Cookie Settings</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- <router-link
      to="/login"
      class="btn btn-outline-primary btn-sm border py-1 px-2 border rounded"
      >Admin</router-link
    > -->
  </div>
</template>
