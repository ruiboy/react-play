import React, { useEffect, useRef, useState } from "react";
import { Hello } from "./Hello";
import { useFetch } from "./useFetch";
import { useForm } from "./useForm";
import { Button, Container } from '@material-ui/core';

function initCount() {
  console.log('initCount')
  return { count: 0, count2: 10 }
}

function Sandbox() {

  // ======== useState

  // set up state objects and functions to modify that state

  // could have single value, rather than object:
  // const [count, setCount] = useState(() => initCount())

  // could instead init value directly without using an initialiser function; but the
  // initialiser gets called only first time component is rendered, instead of every time
  // const [count, setCount] = useState(0)

  // but here is an object with an initialiser; it returns the object and a function to modify it
  const [{ count, count2 }, setCount] = useState(() => initCount())

  // NOTE: an alternative would be to have mulitple useState calls, one for each field.
  // General advice is if updating the state separately, use multiple useStates,
  // if updating the state all at once, use a single one

  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  // but the real value of useState comes when using it in own custom hooks,
  // which can then do extra business logic and are fully decoupled from the rendering,
  // eg we can create a useForm hook: 

  const [formValues, handleChange] = useForm({ firstName: "", lastName: "" })


  // ======== useEffect

  // called every time a component is re-rendered - eg because of state change
  useEffect(() => {
    console.log('useEffectAlways')
  })

  // can restrict for which values this is called by passing a dependency array
  // - a list of values for which to run.  This does shallow comparison of values.
  useEffect(() => {
    console.log('useEffectOnSomeFieldsOnly')
  }, [user, formValues.firstName])

  // can also run cleanup after a field has been rendered using a nested function
  useEffect(() => {
    return () => {
      console.log("useEffect cleanup only for user field")
    }
  }, [user])

  // can run on mount (first render) only, or unmount by passing empty array; test this with show/hide or Hello component
  const [showHello, setShowHello] = useState(true);

  // can use useEffect to trigger actions based on changing state - eg everytime this URL changes, the useFetch custom
  // component will do some stuff
  const { data, loading } = useFetch(`http://numbersapi.com/${count}/trivia`)


  // ======== useRef

  // allows you to store reference to another DOM node, pass it around, do stuff on it...
  // eg set focus in a field (see way below)
  const inputRef = useRef()

  // or can store reference to anything - an integer, a function, anything
  // eg maybe useful for "local vars" when dont want to store as state and hence be tied to re-rendering on value changes
  const intValue = useRef(23)
  // ... such a local var can be used to keep to track if a component is mounted, so as to prevent setting state to an
  // unmounted component eg - https://youtu.be/f687hBjwFcM?t=2463 (30 sec vid)


  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <div>
          <h4>Count</h4>
          <button onClick={() =>
            // with independant operations on an object, 
            // need to spread the currentState object into the new object, then override the count
            setCount(currentState => ({ ...currentState, count: currentState.count + 1 }))
          }
          >
            add
        </button>
          <div>count: {count}</div>
          <div>count2: {count2}</div>
        </div>

        <div>
          <h4>Form</h4>
          User:
          <input name="user" onChange={e => setUser(e.target.value)} value={user} />
          Password:
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} />
          <p>User: {user}, Password: {password}</p>
        </div>

        <div>
          <h4>Form 2</h4>
          firstName:
          <input name="firstName" onChange={handleChange} value={formValues.firstName}
            ref={inputRef}
          />
          lastName:
          <input name="lastName" onChange={handleChange} value={formValues.lastName} />
          <p>firstName: {formValues.firstName}, lastName: {formValues.lastName}</p>
        </div>

        <div>
          <h4>useEffect</h4>
          {showHello && <Hello />}
          <Button onClick={() => setShowHello(!showHello)}>Show/Hide</Button>

          <div>{loading ? "Loading..." : data}</div>
        </div>

        <div>
          <h4>useRef</h4>
          <button onClick={() => {
            inputRef.current.focus()
          }}>Set focus</button>

          <div>{intValue.current}</div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Sandbox;
