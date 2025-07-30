const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');

const app = express();
const PORT = 4000;

// Excel 文件路径（请根据实际情况修改）
const EXCEL_PATH = 'C:\\Users\\Y7000P\\react-vite-project\\体育场馆.xlsx';

app.use(cors());

// 读取 Excel 并返回 JSON 数据
function readVenues() {
  try {
    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return data;
  } catch (err) {
    console.error('读取Excel失败:', err);
    return [];
  }
}

// 全部数据接口
app.get('/api/venues', (req, res) => {
  const data = readVenues();
  res.json(data);
});

// 搜索接口
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  let data = readVenues();
  if (q && q.trim()) {
    const keyword = q.trim().toLowerCase();
    data = data.filter(item =>
      (item['场馆'] && item['场馆'].toLowerCase().includes(keyword)) ||
      (item['活动'] && item['活动'].toLowerCase().includes(keyword))
    );
  }
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`服务已启动: http://localhost:${PORT}`);
  console.log(`Excel路径: ${EXCEL_PATH}`);
});