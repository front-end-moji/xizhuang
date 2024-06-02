<template>11</template>

<script>
import { getSchoolList } from "@/api/school";
export default {
  data() {
    return {};
  },
  onLoad() {
    getSchoolList().then((res) => {
      console.log(res);
    });
  },
  methods: {},
};
</script>

<style></style>
