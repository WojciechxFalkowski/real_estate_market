<template>
  <nav class="pt-5 sticky top-0 z-50 bg-white">
    <div class="flex flex-wrap justify-between items-center mx-auto container">
      <WellRentLogo componentPlacement="Nawigacja"/>
      <!-- Mobile menu button -->
      <Hamburger
        @toggleMobileMenu="toggleMobileMenu"
        :isOpenMenu="isMobileMenuOpen"
        class="lg:hidden"
      />
      <!-- Mobile Menu -->
      <MobileMenuItems
        :menuItems="menuItems"
        :activeItem="activeItem"
        :isMenuOpen="isMobileMenuOpen"
        @closeMenu="closeMobileMenu"
      />
      <!-- Desktop Menu -->
      <DesktopMenuItems :menuItems="menuItems" />

      <!-- Numer telefonu -->
      <div class="hidden lg:flex md:items-center md:w-auto w-full">
        <Instagram class="w-4" />

        <PhoneNumber class="ms-4 py-2" componentPlacement="Nawigacja"/>
      </div>
      <!-- </div> -->
    </div>
  </nav>
</template>

<script setup lang="ts">
import PhoneNumber from "./PhoneNumber.vue";
type MenuItem = {
  name: string;
  href: string;
  isActive?: boolean;
};

const isMobileMenuOpen = ref(false);

const menuItems: MenuItem[] = [
  { name: "O nas", href: "/" },
  { name: "Zarządzanie najmem", href: "/zarzadzanie-najmem" },
  { name: "Mieszkania na wynajem", href: "/mieszkania-na-wynajem" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
];

const route = useRoute();

const activeItem = computed(() => {
  return route.path;
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}
</script>

<style>
.icon {
  width: 100px;
}
</style>
