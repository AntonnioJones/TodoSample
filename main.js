class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      tasks : ["Go for a run","Make Some breakfast"]
    }

    this.addTask = this.addTask.bind(this);
  }

  addTask(item){
    console.log(item);
    this.setState((state,) => ({
      tasks: [...state.tasks , item]
    }));

  }

  clearTask(){
    this.setState(
      tasks : []
    )
  }

  render(){
    return(
      <div id="app">
        <header>
          <h1>ToDo</h1>
        </header>
        <main>
          <InputForm addTask={this.addTask}></InputForm>
          <ListOfTasks tasks={this.state.tasks}></ListOfTasks>
        </main>
      </div>
    )
  }
}

class InputForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inputText: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({inputText: event.target.value})
  }

  handleSubmit(event){
    this.props.addTask(this.state.inputText);
    event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="taskInput">Task: </label>
        <input id="taskInput" name="task" onChange={this.handleChange}></input>
        <input type="submit" value="submit"></input>
      </form>
    )
  }
}

class ListOfTasks extends React.Component {

  constructor(props){
    super(props)

    this.createList = this.createList.bind(this);
    this.items = [];
  }

  createList(){
    this.items = [];
    this.props.tasks.forEach((item, i) => {
        this.items.push(<Task key={i} taskText={item}></Task>);
    });

  }

  render(){
    this.createList();
    return(
      <section id="taskList">
        {this.items}
      </section>
    );
  }
}

class Task extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="task">
        <h4>{this.props.taskText}</h4>
      </div>
    );
  }
}

//Render the App
ReactDOM.render(<App />,document.getElementById('root'));
