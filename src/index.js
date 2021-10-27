import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// can use all sorts of java functions, objects etc to build JSX
// which is passed to the ReactDom.render method

// function formatName(user) {
//   return user.firstName + ' ' + user.lastName;
// }

// const user = {
//   firstName: 'Harperff',
//   lastName: 'Perez'
// };

// function getGreeting(user) {
//   if (user) {
//     return <h1>Hello, {formatName(user)}!</h1>;  }
//   return <h1>Hello, Stranger.</h1>;}

// ReactDOM.render(
//   getGreeting(user),
//   document.getElementById('root')
// );



// can call render repeatedly to update the display

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, Bill!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));}

//   setInterval(tick, 1000);



// components

// can create function components that take props (object containing whatever is passed when rendered)
// function Welcome(props) {  
//   return <h1>Hello, {props.name}</h1>;
// }

// ... or can create class components ... they still take the props
// class Welcome extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }

// const element = <Welcome name="SaraD" />;
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );



// managing state ... in the clock from earlier

// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { date: new Date() };
//   }

//   // after the component has been mounted (rendered), set up the timer
//   componentDidMount() {
//     this.timerID = setInterval(() => this.tick(), 1000);
//   }

//   // tear downt he timer again
//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({ date: new Date() });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>)
//   }
// }

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );



// events ... need to bind "this"

// class Toggle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { isToggleOn: true };

//     // This binding is necessary to make `this` work in the callback 
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() { this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn })); }

//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         {this.state.isToggleOn ? 'ON' : 'OFF'}
//       </button>
//     );
//   }
// }

// ReactDOM.render(
//   <Toggle />,
//   document.getElementById('root')
// );



// rendering from a list

// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) =>
//     // the key is used to track identiy as elements add/change/remove 
//     // ... react DOM can compare the keys in the rendered DOM and the new one by key to save creating new elements if it can
//     // ... its best to use a stable object id (cf the object index) to get best performance benefits.
//     <li key={number.toString()}>      {number}
//     </li>
//   );
//   return (
//     <ul>{listItems}</ul>
//   );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//   <NumberList numbers={numbers} />,
//   document.getElementById('root')
// );



// forms - with "controlled components" where input element state is controlled by react

// class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {    this.setState({value: event.target.value});  }
//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>        <label>
//           Name:
//           <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//   <NameForm numbers={numbers} />,
//   document.getElementById('root')
// );



// lifting state up - share state by lifting to the closest common ancestor
// here the Calculator component owns the temperature and scale state, and others read or set it using passed change functions

// function BoilingVerdict(props) {
//   if (props.celsius >= 100) {
//     return <p>The water would boil.</p>;
//   }
//   return <p>The water would not boil.</p>;
// }

// const scaleNames = { c: 'Celsius', f: 'Fahrenheit' };

// function toCelsius(fahrenheit) {
//   return (fahrenheit - 32) * 5 / 9;
// }

// function toFahrenheit(celsius) {
//   return (celsius * 9 / 5) + 32;
// }

// function tryConvert(temperature, convert) {
//   const input = parseFloat(temperature);
//   if (Number.isNaN(input)) {
//     return '';
//   }
//   const output = convert(input);
//   const rounded = Math.round(output * 1000) / 1000;
//   return rounded.toString();
// }

// class TemperatureInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     this.props.onTemperatureChange(e.target.value);
//   }

//   render() {
//     const temperature = this.props.temperature; const scale = this.props.scale;
//     return (
//       <fieldset>
//         <legend>Enter temperature in {scaleNames[scale]}:</legend>
//         <input value={temperature}
//           onChange={this.handleChange} />
//       </fieldset>
//     );
//   }
// }

// class Calculator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
//     this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
//     this.state = { temperature: '', scale: 'c' };
//   }

//   handleCelsiusChange(temperature) {
//     this.setState({ scale: 'c', temperature });
//   }

//   handleFahrenheitChange(temperature) {
//     this.setState({ scale: 'f', temperature });
//   }

//   render() {
//     const scale = this.state.scale;
//     const temperature = this.state.temperature;
//     const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
//     const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
//     return (
//       <div>
//         <TemperatureInput
//           scale="c"
//           temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
//         <TemperatureInput
//           scale="f"
//           temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
//         <BoilingVerdict
//           celsius={parseFloat(celsius)} />
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Calculator />,
//   document.getElementById('root')
// );



// composition (favour this over ingheritance)

// function FancyBorder(props) {
//   return (
//     <div className={'FancyBorder FancyBorder-' + props.color}
//     style={{'border': 'thin solid ' + props.color}}
//     >
//       {props.children}    </div>
//   );
// }

// function Dialog(props) {
//   return (
//     <FancyBorder color="blue">
//       <h1 className="Dialog-title">
//         {props.title}
//       </h1>
//       <p className="Dialog-message">
//         {props.message}
//       </p>
//       {props.children}    </FancyBorder>
//   );
// }

// class SignUpDialog extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSignUp = this.handleSignUp.bind(this);
//     this.state = {login: ''};
//   }

//   render() {
//     return (
//       <Dialog title="Mars Exploration Program"
//               message="How should we refer to you?">
//         <input value={this.state.login}               onChange={this.handleChange} />        <button onClick={this.handleSignUp}>          Sign Me Up!        </button>      </Dialog>
//     );
//   }

//   handleChange(e) {
//     this.setState({login: e.target.value});
//   }

//   handleSignUp() {
//     alert(`Welcome aboard, ${this.state.login}!`);
//   }
// }

// ReactDOM.render(
//   <SignUpDialog />,
//   document.getElementById('root')
// );



// Refs - using a created Ref to force input focus

// class CustomTextInput extends React.Component {
//   constructor(props) {
//     super(props);
//     // create a ref to store the textInput DOM element
//     this.textInput = React.createRef();
//     this.focusTextInput = this.focusTextInput.bind(this);
//   }

//   focusTextInput() {
//     // Explicitly focus the text input using the raw DOM API
//     // Note: we're accessing "current" to get the DOM node
//     this.textInput.current.focus();
//   }

//   render() {
//     // tell React that we want to associate the <input> ref
//     // with the `textInput` that we created in the constructor
//     return (
//       <div>
//         <input
//           type="text"
//           ref={this.textInput} />
//         <input
//           type="button"
//           value="Focus the text input"
//           onClick={this.focusTextInput}
//         />
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <CustomTextInput />,
//   document.getElementById('root')
// );



// Refs again - this time using a callback to create the ref rather than calling React.createRef

// class CustomTextInput extends React.Component {
//   constructor(props) {
//     super(props);

//     this.textInput = null;
//     this.setTextInputRef = element => { this.textInput = element; };
//     this.focusTextInput = () => {      // Focus the text input using the raw DOM API    
//       if (this.textInput) this.textInput.focus();
//     };
//   }

//   componentDidMount() {
//     // autofocus the input on mount
//     this.focusTextInput();
//   }

//   render() {
//     // Use the `ref` callback to store a reference to the text input DOM
//     // element in an instance field (for example, this.textInput).
//     return (
//       <div>
//         <input
//           type="text"
//           ref={this.setTextInputRef} />
//         <input
//           type="button"
//           value="Focus the text input"
//           onClick={this.focusTextInput} />
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <CustomTextInput />,
//   document.getElementById('root')
// );


ReactDOM.render(
  <App />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
