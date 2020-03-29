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
    if(this.state.inputText != ""){
      this.props.addTask(this.state.inputText);
    }
    this.setState({
      inputText: ""
    })
    event.preventDefault();

  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}  className="d-flex justify-content-between" id="taskForm">
        <input id="taskInput" size="40" name="task" placeholder="Task" maxLength="30" onChange={this.handleChange}></input>
        <input type="submit" value="Add Task" className="btn btn-primary"></input>
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
        <div id="taskButtons">
          <button  className="btn btn-secondary"><i className="fa fa-edit"></i></button>
          <button className="btn btn-danger"><i className="fa fa-trash"></i></button>
        </div>
      </div>
    );
  }
}

//Render the App
ReactDOM.render(<App />,document.getElementById('root'));
