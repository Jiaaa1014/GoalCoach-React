### Steps
1. Download ZIP and unzip it
2. Open cmd 
```bash
> cd GoalCoach-React
> npm install
> npm start
```
###### or
2. Right click and choose the `Git Bash` at the project directory

### Notes
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


Completed
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
