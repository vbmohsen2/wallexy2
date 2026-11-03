<template>
  <container className="h-full">
    <row class="justify-center items-center h-full">
      <div>
        <w>
          <icon :name="icon" size="64"/>
        </w>
        <w class="mt-12">
          <h1>
             مشکلی پیش آمده است, لطفا بعدا تلاش کنید
          </h1>
        </w>
        <w class="mt-8">
          <inertia-link href="/">
            <row class="justify-center">
              <btn class="bg-neutral-600 rounded-sm text-white">
                صفحه اصلی
              </btn>
            </row>
          </inertia-link>
        </w>
      </div>
    </row>
  </container>
  <inertia-head>
    <title>خطای 500</title>
  </inertia-head>
</template>
<script>
import {mdiAlertBoxOutline} from "@mdi/js";

export default {
  data() {
    return {
      icon: mdiAlertBoxOutline,
    }
  }
}
</script>
