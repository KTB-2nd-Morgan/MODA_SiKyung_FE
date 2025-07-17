// src/api/fortune.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // 실제 백엔드 주소로 변경하세요

export const getDailyFortune = async ({ birthDate, birthTime, gender }) => {
  const response = await axios.get(`${BASE_URL}/daily-fortune`, {
    params: {
      birthDate,
      birthTime,
      gender
    }
  });
  return response.data.data;
};