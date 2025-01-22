<template>
  <n-button
    text
    tag="a"
    href="javascript:void(0)"
    @click="clearServiceWorkersAndCaches"
  >
    <template #icon>
      <n-icon>
        <ArrowRotateClockwise16Regular />
      </n-icon>
    </template>
    Refresh
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { ArrowRotateClockwise16Regular } from "@vicons/fluent";

// 强制删除所有 Service Worker、缓存、SessionStorage 和 LocalStorage，并刷新页面
async function clearServiceWorkersAndCaches() {
  try {
    // 注销所有 Service Worker
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log("Service Worker 已注销:", registration);
      }
    } else {
      console.warn("当前浏览器不支持 Service Worker");
    }

    // 清除所有缓存
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
        console.log("缓存已删除:", cacheName);
      }
    } else {
      console.warn("当前浏览器不支持缓存 API");
    }

    // 清除 SessionStorage
    if (window.sessionStorage) {
      sessionStorage.clear();
      console.log("SessionStorage 已清除");
    } else {
      console.warn("当前浏览器不支持 SessionStorage");
    }

    // 清除 LocalStorage
    if (window.localStorage) {
      localStorage.clear();
      console.log("LocalStorage 已清除");
    } else {
      console.warn("当前浏览器不支持 LocalStorage");
    }

    // 刷新页面
    window.location.reload();
  } catch (error) {
    console.error(
      "清理 Service Worker、缓存、SessionStorage 和 LocalStorage 时出错:",
      error
    );
  }
}
</script>
