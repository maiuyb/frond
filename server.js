const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// 假设的用户数据，实际项目应使用数据库
const users = [
  { userId: 1, username: 'admin', password: 'admin' }
];

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    res.json({
      message: '登录成功',
      userId: user.userId
    });
  } else {
    res.status(401).json({
      message: '登陆失败',
    });
  }
});


app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.some(u => u.username === username)) {
    res.status(409).json({ message: '用户名已存在' });
    return;
  }
  const userId = users.length + 1;
  users.push({ userId, username, password });
  res.json({ message: '注册成功', userId });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});