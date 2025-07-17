import React, { useState } from 'react';
import { getDailyFortune } from '../api/fortune';

import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import koCustom from '../utils/koCustomLocale';

const earthlyBranches = [
  { label: '子(자) 23:30 ~ 01:29', code: '23:30' },
  { label: '丑(축) 01:30 ~ 03:29', code: '01:30' },
  { label: '寅(인) 03:30 ~ 05:29', code: '03:30' },
  { label: '卯(묘) 05:30 ~ 07:29', code: '05:30' },
  { label: '辰(진) 07:30 ~ 09:29', code: '07:30' },
  { label: '巳(사) 09:30 ~ 11:29', code: '09:30' },
  { label: '午(오) 11:30 ~ 13:29', code: '11:30' },
  { label: '未(미) 13:30 ~ 15:29', code: '13:30' },
  { label: '申(신) 15:30 ~ 17:29', code: '15:30' },
  { label: '酉(유) 17:30 ~ 19:29', code: '17:30' },
  { label: '戌(술) 19:30 ~ 21:29', code: '19:30' },
  { label: '亥(해) 21:30 ~ 23:29', code: '21:30' },
];

const DailyFortuneForm = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!birthDate || !birthTime || !gender) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    const formattedDate = birthDate.toLocaleDateString('sv-SE'); // YYYY-MM-DD
    const selectedBranch = earthlyBranches.find(branch => branch.code === birthTime);
    const formattedTime = selectedBranch?.label || birthTime;

    try {
      const data = await getDailyFortune({
        birthDate: formattedDate,
        birthTime: formattedTime,
        gender,
      });
      setResult(data);
      setError('');
    } catch (err) {
      setError('운세를 불러오는 중 오류가 발생했습니다.');
      setResult(null);
    }
  };

  return (
    <Box
      maxWidth={400}
      width="100%"
      p={4}
      component={Paper}
      elevation={4}
      borderRadius={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
        오늘의 운세
      </Typography>

      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={koCustom}>
          <DatePicker
            label="생년월일"
            value={birthDate}
            onChange={(newValue) => setBirthDate(newValue)}
            openTo="year"
            views={['year', 'month', 'day']}
            renderInput={(params) => <TextField {...params} required fullWidth />}
          />
        </LocalizationProvider>

        <FormControl fullWidth required>
          <InputLabel id="birth-time-label">출생 시각</InputLabel>
          <Select
            labelId="birth-time-label"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            label="출생 시각"
          >
            {earthlyBranches.map((item) => (
              <MenuItem key={item.code} value={item.code}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="성별"
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          fullWidth
        >
          <MenuItem value="">선택</MenuItem>
          <MenuItem value="MALE">남성</MenuItem>
          <MenuItem value="FEMALE">여성</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 600, py: 1.2 }}
        >
          운세 보기
        </Button>
      </Box>

      {result && (
        <Box mt={4} textAlign="center" p={2} bgcolor="#f4f4f4" borderRadius={2}>
          <Typography variant="subtitle1" fontWeight={500}>
            {result.date} 운세 요약
          </Typography>
          <Typography variant="body1" mt={1}>
            {result.fortuneSummary}
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default DailyFortuneForm;