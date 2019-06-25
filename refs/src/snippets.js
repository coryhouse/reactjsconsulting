export const simpleRefSnippet = `class SimpleRef extends Component {

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
        <button onClick={this.onClick.bind(this)}>
          Click to Focus
        </button>
      </div>
    );
  }
}
`;

export const simpleCallbackSnippet = `class SimpleCallbackRef extends Component {

  onClick() {
    this.inputRef.focus();
  }

  // Notice we don't need to set up anything in the constructor 
  // at the expense of having to add a callback function to the ref
  render() {
    return (
      <div>
        <input ref={ref => { this.inputRef = ref; }} />
        <button onClick={this.onClick.bind(this)}>
          Click to Focus
        </button>
      </div>
    )
  }
}
`;

export const inlineCallbackSnippet = `class InlineCallbackRefWithReRender extends Component {

  constructor() {
    super();
    this.state = { count: 0 };
  }

  onClick() {
    this.inputRef.focus();
    this.setState({count: this.state.count + 1}); // Force a re-render
  }

  render() {
    return (
      <div>
        <input ref={ref => { 
          // Triggers once on render
          // Twice for every re-render: first with ref being null and
          // then with the correct value (input in this case)
          this.inputRef = ref;

          // Following will raise an error on re-render 
          // (ref is null in the 1st call)
          // DON'T DO THAT
          ref.focus();           
        }} />
        <button onClick={this.onClick.bind(this)}>
          Click to Focus
        </button>
      </div>
    );
  }
}
`;

export const boundCallbackSnippet = `class BoundCallbackRefWithReRender extends Component {

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
        {/* Binding on render still re-renders twice */}
        <input ref={this.onRefMount.bind(this)} />
        <button onClick={this.onClick.bind(this)}>
          Click to Focus
        </button>
      </div>
    );
  }
}
`;

export const constructorBoundCallbackSnippet = `class ConstructorBoundCallbackRefWithReRender extends Component {

  constructor() {
    super();
    this.state = { count: 0 };
    // In order to avoid calling the callback twice
    // every re-render you need to bind the context
    // in the constructor. Notice that it becomes pretty
    // similar to the createRef API
    this.onRefMount = this.onRefMount.bind(this);
  }

  onClick() {
    this.inputRef.focus();
    this.setState({count: this.state.count + 1})
  }

  // This is only called on mount - yay!
  onRefMount(ref) {
    this.inputRef = ref;
  }

  render() {
    return (
      <div>
        <input ref={this.onRefMount} />
        <button onClick={this.onClick.bind(this)}>
          Click to Focus
        </button>
      </div>
    );
  }
}
`;

export const simpleRefForwardingSnippet = `// It MUST be a functional component
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

  // Notice that now we assign the ref to a custom component
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
`;

export const componentRefSnippet = `// It MUST be a class component
// Useful if it is strictly necessary to use the state or
// lifecycle hooks. Otherwise, should be discouraged -- too verbose
// and error-prone
class ClassInput extends Component {

  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  // This will be called by the parent component
  customFocusMethod() {
    this.inputRef.current.focus();
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}

class ComponentRef extends Component {

  constructor() {
    super();
    // Notice that two refs are necessary
    this.componentRef = React.createRef();
  }

  onClick() {
    // componentRef refers to a composite component and 
    // therefore we can access its methods
    this.componentRef.current.customFocusMethod();
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
`;

export const dynamicRefsSnippet = `import randomColor from 'randomcolor';

class DynamicRefs extends Component {

  constructor() {
    super();
    this.state = {
      // Here we have a dynamic array
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
            name: "Task " + this.state.tasks.length + 1,
            color: randomColor() // Just assign some random color
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
            ref={ref => { 
              // Callback refs are preferable when 
              // dealing with dynamic refs
              this.refsArray[i] = ref; 
            }} 
            style={{height: "100px", backgroundColor: task.color}}>
            {task.name}
          </div>
        ))}
      </div>
    );
  }
}
`;

export const dynamicCreateRefSnippet = `import randomColor from 'randomcolor';

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
            name: "Task " + this.state.tasks.length + 1,
            color: randomColor()
          }]);
          this.setState({tasks: newTasks});

          // We have to manually update the array
          // Error-prone!
          this.updateRefsArray(newTasks);
        }}>Add new Task</button></div>
        {this.state.tasks.map((task, i) => (
          <button
            key={i}
            onClick={() => { 
              // Notice we need to access the current attribute
              this.refsArray[i].current.scrollIntoView(); 
            }}>
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
`;

export const refsWithHooks = `import React, { useRef } from 'react';

const RefsWithHooks = () => {
  const inputRef = useRef();
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Click to Focus
      </button>
    </div>
  )
};
`;

export const dynamicRefsWithHooks = `import React, { useState } from 'react';
import randomColor from 'randomcolor';

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
          name: "Task " + this.state.tasks.length + 1,
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
`;

export const functionComponentWithRef = `import React from 'react';

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
`;
