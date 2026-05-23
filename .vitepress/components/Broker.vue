<template>
  <section style="text-align: left; display: block; padding: 20px;">
    <div v-if="loading">IPO 데이터 로딩 중...</div>
    <div v-else-if="error">오류: {{ error }}</div>
    <template v-else-if="ipoList && ipoList.length > 0">
      <ul>
        <li v-for="item in ipoList" :key="item.secuID">
          <p>{{ item.상장이름 }} ({{ item.secuID }})</p>
          <ul>
            <li>
              <span>청약 : {{ formatDate(item.청약최소날짜) }} ~ {{ formatDate(item.청약최대날짜) }}</span>
            </li>
            <li>
              <span>상장 : {{ formatDate(item.상장날짜) }}</span>
            </li>
          </ul>
          <br />
        </li>
      </ul>
    </template>
    <div v-else-if="!loading && !error">
      IPO 데이터를 찾을 수 없습니다.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const ipoList = ref(null);
const loading = ref(true);
const error = ref(null);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return dateString;
};

const fetchBrokerData = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  //console.log(baseUrl);
  if (!baseUrl) {
    error.value = 'API 서버 주소(환경변수)가 설정되지 않았습니다.';
    loading.value = false;
    return;
  }

  const url = `${baseUrl}/api/broker?id=${props.id}`;
  //console.log(url);
  try {
    const response = await fetch(url);
    const json = await response.json();

    if (json.success) {
      ipoList.value = json.data;
    } else {
      error.value = json.error || '데이터 로드에 실패했습니다.';
    }
  } catch (err) {
    error.value = 'API 호출 중 오류가 발생했습니다.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBrokerData();
});
</script>
