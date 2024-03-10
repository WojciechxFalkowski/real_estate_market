<template>
  <RouterLink to="/kontakt" class="btn btn-1">
    <svg>
      <rect x="0" y="0" fill="none" width="100%" height="100%" />
    </svg>

    <span class="py-2 px-4">Skontaktuj się z nami</span>
  </RouterLink>
</template>

<style lang="scss">
.btn {
  color: black;
  cursor: pointer;
  line-height: 45px;
  position: relative;
  text-decoration: none;
  width: 195px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
  }
}

.btn-1 {
  svg {
    height: 45px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  rect {
    fill: none;
    stroke: #ffc444;
    stroke-width: 4;
    stroke-dasharray: 360, 0;
    transition: all 0.35s linear;
  }
}

.btn-1:hover {
  rect {
    stroke-width: 4;
    stroke-dasharray: 190, 390;
    stroke-dashoffset: 340;
    transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  }
}
</style>
