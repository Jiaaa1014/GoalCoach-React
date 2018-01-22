# Steps
1. Download ZIP and unzip it
2. Open cmd 
```bash
> cd GoalCoach-React
> npm install
> npm start
```
###### or
2. Right click and choose the `Git Bash` at the project directory

## Notes
###### firebase.js
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
###### reducers/index.js
```js*
export default combineReducers({})
```

###### goalRef applied
1. Add a goal
```js
// AddGoal.jsx
goalRef.push({ email, title }); 
```
2. If goal done, remove from goalRef, and add to completedGoalRef
```js
// GoalItem.jsx
goalRef.child(serverKey).remove(); 
completeGoalRef.push({ email, title });
```
3. Clean all goals
```js
// CompleteGoalList.jsx
completeGoalRef.set({});
```
4. Pull the goal items from firebase
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
5. if completed things, do the same way as pre step. 
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


## Bug Fixed

After `npm run eject`, there's bunch of dependencies show up. 

When using `webpack` I got the error about 
```
Module build failed: Error: Using `babel-preset-react-app` requires that you specify `NODE_ENV` or `BABEL_ENV` environment variables. 
```
Go to the \node_modules\babel-preset-react-app\index.js"
and add these two variables
```js
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
```
