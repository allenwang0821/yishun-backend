const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let users = [{ id: 1, username: 'test', password: '123456' }];
let diaries = [];

app.post('/api/user/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, userId: user.id });
  } else {
    res.status(401).json({ success: false, message: '登录失败，账号或密码错误。' });
  }
});

app.post('/api/diary/create', (req, res) => {
  const { userId, content, mood } = req.body;
  const diary = { id: diaries.length + 1, userId, content, mood, date: new Date() };
  diaries.push(diary);
  res.json({ success: true, diary });
});

app.get('/api/diary/list', (req, res) => {
  const { userId } = req.query;
  const userDiaries = diaries.filter(diary => diary.userId == userId);
  res.json({ success: true, diaries: userDiaries });
});

app.get('/', (req, res) => {
  res.send('后端服务已成功部署！');
});

app.listen(PORT, () => {
  console.log(`后端服务已启动，监听端口：${PORT}`);
});
