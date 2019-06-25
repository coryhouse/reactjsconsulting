import React, { Component, useRef, useState } from 'react';
import Prism from 'prismjs';
import './App.css';
import './prism.css';
import randomColor from 'randomcolor';
import { 
  simpleRefSnippet,
  simpleCallbackSnippet,
  inlineCallbackSnippet,
  boundCallbackSnippet,
  constructorBoundCallbackSnippet,
  simpleRefForwardingSnippet,
  componentRefSnippet,
  dynamicRefsSnippet,
  dynamicCreateRefSnippet,
  refsWithHooks,
  dynamicRefsWithHooks,
  functionComponentWithRef
} from './snippets';

class SimpleRef extends Component {

  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  onClick() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        <input ref={this.inputRef} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    )
  }
}

class SimpleCallbackRef extends Component {

  onClick() {
    this.inputRef.focus();
  }

  render() {
    return (
      <div>
        <input ref={ref => { this.inputRef = ref; }} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    )
  }
}

class InlineCallbackRefWithReRender extends Component {

  constructor() {
    super();
    this.state = { count: 0 };
  }

  onClick() {
    this.inputRef.focus();
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (
      <div>
        <input ref={ref => { this.inputRef = ref; }} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    );
  }
}

class BoundCallbackRefWithReRender extends Component {

  constructor() {
    super();
    this.state = { count: 0 };
  }

  onClick() {
    this.inputRef.focus();
    this.setState({count: this.state.count + 1});
  }

  onRefMount(ref) {
    this.inputRef = ref;
  }

  render() {
    return (
      <div>
        <input ref={this.onRefMount.bind(this)} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    );
  }
}

class ConstructorBoundCallbackRefWithReRender extends Component {

  constructor() {
    super();
    this.state = { count: 0 };
    this.onRefMount = this.onRefMount.bind(this);
  }

  onClick() {
    this.inputRef.focus();
    this.setState({count: this.state.count + 1})
  }

  onRefMount(ref) {
    this.inputRef = ref;
  }

  render() {
    return (
      <div>
        <input ref={this.onRefMount} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    );
  }
}

const FunctionComponentWithRef = () => {
  const textInput = React.createRef();
  return (
    <div>
      <input ref={textInput} />
      <button onClick={() => textInput.current.focus()}>
        Click to Focus
      </button>
    </div>
  );
};

const CustomInput = React.forwardRef((props, ref) => (
  <input ref={ref} />
));

class SimpleRefForwarding extends Component {

  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  onClick() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        <CustomInput ref={this.inputRef} />
        <button onClick={this.onClick.bind(this)}>
          Click to Focus
        </button>
      </div>
    );
  }
}

class ClassInput extends Component {

  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  // This will be called by the parent component
  focus() {
    this.inputRef.current.focus();
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}

class ComponentRef extends Component {

  constructor() {
    super();
    this.componentRef = React.createRef();
  }

  onClick() {
    this.componentRef.current.focus();
  }

  render() {
    return (
      <div>
        <ClassInput ref={this.componentRef} />
        <button onClick={this.onClick.bind(this)}>
          Click to Focus
        </button>
      </div>
    );
  }
}

class DynamicRefs extends Component {

  constructor() {
    super();
    this.state = {
      tasks: [
        { name: "Task 1", color: "red" },
        { name: "Task 2", color: "green" },
        { name: "Task 3", color: "yellow" },
        { name: "Task 4", color: "gray" }
      ]
    }
    this.refsArray = [];
  }

  render() {
    return (
      <div>
        <div><button onClick={() => {
          const newTasks = this.state.tasks.concat([{
            name: `Task ${this.state.tasks.length + 1}`,
            color: randomColor()
          }]);
          this.setState({tasks: newTasks});
        }}>Add new Task</button></div>
        {this.state.tasks.map((task, i) => (
          <button
            key={i}
            onClick={() => { this.refsArray[i].scrollIntoView(); }}>
            Go to {task.name}
          </button>
        ))}
        {this.state.tasks.map((task, i) => (
          <div 
            key={i}
            ref={ref => { this.refsArray[i] = ref; }} 
            style={{height: "100px", backgroundColor: task.color}}>
            {task.name}
          </div>
        ))}
      </div>
    );
  }
}

class DynamicCreateRef extends Component {

  constructor() {
    super();
    const tasks = [
      { name: "Task 1", color: "red" },
      { name: "Task 2", color: "green" },
      { name: "Task 3", color: "yellow" },
      { name: "Task 4", color: "gray" }
    ];
    this.state = { tasks };
    this.updateRefsArray(tasks);
  }

  updateRefsArray(tasks) {
    this.refsArray = tasks.map(() => React.createRef());
  }

  render() {
    return (
      <div>
        <div><button onClick={() => {
          const newTasks = this.state.tasks.concat([{
            name: `Task ${this.state.tasks.length + 1}`,
            color: randomColor()
          }]);
          this.setState({tasks: newTasks});
          this.updateRefsArray(newTasks);
        }}>Add new Task</button></div>
        {this.state.tasks.map((task, i) => (
          <button
            key={i}
            onClick={() => { this.refsArray[i].current.scrollIntoView(); }}>
            Go to {task.name}
          </button>
        ))}
        {this.state.tasks.map((task, i) => (
          <div 
            key={i}
            ref={this.refsArray[i]} 
            style={{height: "100px", backgroundColor: task.color}}>
            {task.name}
          </div>
        ))}
      </div>
    );
  } 
}

const RefsWithHooks = () => {
  const inputRef = useRef(null);
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Click to Focus</button>
    </div>
  )
};

const DynamicRefsWithHooks = () => {
  const initialTasks = [
    { name: "Task 1", color: "red" },
    { name: "Task 2", color: "green" },
    { name: "Task 3", color: "yellow" },
    { name: "Task 4", color: "gray" }
  ];
  const [tasks, setTasks] = useState(initialTasks);
  const refsArray = [];
  return (
    <div>
      <div><button onClick={() => {
        const newTasks = tasks.concat([{
          name: `Task ${tasks.length + 1}`,
          color: randomColor()
        }]);
        setTasks(newTasks);
      }}>Add new Task</button></div>
      {tasks.map((task, i) => (
        <button
          key={i}
          onClick={() => { refsArray[i].scrollIntoView(); }}>
          Go to {task.name}
        </button>
      ))}
      {tasks.map((task, i) => (
        <div 
          key={i}
          ref={ref => { refsArray[i] = ref; }} 
          style={{height: "100px", backgroundColor: task.color}}>
          {task.name}
        </div>
      ))}
    </div>
  );
};

class App extends Component {

  componentDidMount() {
    Prism.highlightAll();
  }

  renderSnippet(snippet) {
    return (
      <pre>
        <code className="language-javascript">          
          {snippet}   
        </code>
      </pre>
    );
  }

  render() {
    return (
      <>
      <header>
        <h1>React Refs Cheat Sheet</h1>
      </header>
      <main>
        <h2 id="simple">Simple Cases</h2>
        <p>
          When you need a reference to a native DOM element in the
          same React component.
        </p>
        <div>
          <h3 id="simple-createref">1. Using <code>createRef</code></h3>
          <SimpleRef />
          {this.renderSnippet(simpleRefSnippet)}
        </div>
        <div>
          <h3 id="simple-callback">2. Using callback</h3>
          <SimpleCallbackRef />
          {this.renderSnippet(simpleCallbackSnippet)}
        </div>
        <div>
          <h3 id="callback-rerender">2. Using callback (with re-render)</h3>
          <InlineCallbackRefWithReRender />
          {this.renderSnippet(inlineCallbackSnippet)}
        </div>
        <div>
          <h3 id="callback-inline-binding">3. Binding the callback</h3>
          <BoundCallbackRefWithReRender />
          {this.renderSnippet(boundCallbackSnippet)}
        </div>
        <div>
          <h3 id="callback-constructor-binding">4. Binding the callback in the constructor</h3>
          <ConstructorBoundCallbackRefWithReRender />
          {this.renderSnippet(constructorBoundCallbackSnippet)}
        </div>
        <div>
          <h3 id="function-component-with-ref">5. Using a Function Component</h3>
          <FunctionComponentWithRef />
          {this.renderSnippet(functionComponentWithRef)}
        </div>
        <h2 id="ref-forwarding">Ref Forwarding</h2>
        <p>
          When you need a reference to a a child element.
        </p>
        <div>
          <h3 id="simple-ref-forwarding">1. Refs to functional components</h3>
          <SimpleRefForwarding />
          {this.renderSnippet(simpleRefForwardingSnippet)}
        </div>
        <div>
          <h3 id="forwarding-to-custom-components">2. Refs to custom components</h3>
          <ComponentRef />
          {this.renderSnippet(componentRefSnippet)}
        </div>
        <h2 id="dynamic-refs">Dynamic Refs</h2>
        <p>
          When you need references to elements which are created
          dynamically.
        </p>
        <div>
          <h3 id="dynamic-refs-callback">1. Using Callbacks</h3>
          <DynamicRefs />
          {this.renderSnippet(dynamicRefsSnippet)}
        </div>
        <div>
          <h3 id="dynamic-refs-createref">2. Using <code>createRef</code></h3>
          <DynamicCreateRef />
          {this.renderSnippet(dynamicCreateRefSnippet)}
        </div>
        <h2 id="using-hooks">Using Hooks</h2>
        <p>
          As of <a href="https://reactjs.org/blog/2019/02/06/react-v16.8.0.html">React 16.8</a>, Hooks are available.
          {' '}
          Hooks are for function components <i>only</i>.
        </p>
        <div>
          <h3 id="hooks-simple-ref">1. Simple</h3>
          <RefsWithHooks />
          {this.renderSnippet(refsWithHooks)}
        </div>
        <div>
          <h3 id="dynamic-refs-hooks">2. Dynamic</h3>
          <DynamicRefsWithHooks />
          {this.renderSnippet(dynamicRefsWithHooks)}
        </div>
      </main>
      <footer>
        Created by
        &nbsp;
        <a href="https://rafaelquintanilha.com">Rafael Quintanilha</a>
        &nbsp;
        @
        {' '}
        {(new Date()).getFullYear()}
      </footer>
      </>
    );
  }
}

export default App;
