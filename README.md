
### Notes

#### firbase操作

##### 確認user及路由設定(index.js)
```js
firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    const { email } = user;
    store.dispatch(logUser(email));
    browserHistory.push("/app");
  } 
  else browserHistory.replace("/signin");
});
```
```js
<Router path="/" history={browserHistory}>
  <Route path="/app" component={App} />
  <Route path="/signin" component={SignIn} />
  <Route path="/signup" component={SignUp} />
</Router>
```
##### reducers/index.js
```js*
export default combineReducers({})
```

##### firebase的`ref`互動
1. 新增目標
```js
// AddGoal.jsx
goalRef.push({ email, title }); 
```
2. 目標完成，從待完成清單移除，轉移到已完成清單
```js
// GoalItem.jsx
goalRef.child(serverKey).remove(); 
completeGoalRef.push({ email, title });
```
3. 已完成清單清空
```js
// CompleteGoalList.jsx
completeGoalRef.set({});
```
4. 從firebase抓下來做render()
```js
// GoalList.jsx
componentDidMount() {
  goalRef.on("value", snap => {
    let goals = [];
    snap.forEach(goal => {
      ...
      ...
      goals.push({ email, title, serverKey });
    });
    this.props.setGoals(goals);
  });
}
```
5. 跟第四步驟一樣
```js
// CompleteGoalList.jsx
componentDidMount() {
  completeGoalRef.on("value", snap => {
    let completeGoals = [];
    snap.forEach(completeGoal => {
      ...
      ...
      completeGoals.push({ email, title });
    });
    this.props.setCompleted(completeGoals);
  });
}
```
##### 登入註冊操作
登入
```js
// SignIn.jsx
signIn() {
  const { email, password } = this.state
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => this.setState({ error: error.message }))
}
```
註冊
```js
// SignUp.jsx
signUp() {
  const { email, password } = this.state
  firebaseApp
    .auth()
    .createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .catch(error => this.setState({ error }))
}
```


#### Bug Fixed

跑了`npm run eject`之後，爆出一堆看不懂的dependencies以及指令

使用`webpack`時得到的錯誤訊息
```
Module build failed: Error: Using `babel-preset-react-app` requires that you specify `NODE_ENV` or `BABEL_ENV` environment variables. 
```
前往`./node_modules/babel-preset-react-app/index.js`加入兩個變數

> I dont know why but it works.

```js
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
```


#### 腳本同步執行的方式

```bash
$ npm i concurrently -D
```
前往`package.json`設定腳本(scripts)
```js
 "watch": "concurrently --killer-others \" node-sass --watch ./src/styling/scss/root.scss ./src/styling/css/root.css\" \"webpack --watch\""
 ```

`node-sass` must go first.
