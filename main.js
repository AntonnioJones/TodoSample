class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      taskNames : ["Go for a run","Make Some breakfast"],
      taskSections: []
    }

    this.addTask = this.addTask.bind(this);
    this.addTaskSection = this.addTaskSection.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }




  componentDidMount(){
    this.addTaskSection();
  }

  deleteTask(index){
    this.setState( (state) => ({
      taskNames: state.taskNames.splice(index,1) ,
      taskSections: state.taskSections.splice(index,1)
    }));
  }

  addTaskSection(){
    this.state.taskNames.forEach((item, i) => {
      this.setState((state) => ({
        taskSections: [...state.taskSections, <Task
              key={i} taskText={item}
              index={i} deleteTask={this.deleteTask}>
            </Task>
          ]
      }));
    });

  }

  addTask(item){
    this.setState((state) => ({
      taskNames: [item,...state.taskNames],
      taskSections: [...state.taskSections,<Task key={state.taskSections.length} taskText={item}
                      index={state.taskSections.length} deleteTask={this.deleteTask}></Task>]
    }));
  }

  clearTask(){
    this.setState({
      taskSections : []
      }
    )
  }



  render(){
    console.log(this.state.taskSections)
    return(
      <div id="app">
        <header>
          <h1>ToDo</h1>
        </header>
        <main>
          <InputForm addTask={this.addTask}></InputForm>
          <section id="taskList">
            {this.state.taskSections}
          </section>
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

class Task extends React.Component{
  constructor(props){
    super(props)

    this.deleteThisTask = this.deleteThisTask.bind(this);
  }

  deleteThisTask(){
    this.props.deleteTask(this.props.index);
  }

  render(){
    return(
      <div className="task">
        <div>
          <input type="checkbox" id="selecter" name="selecter" value="selected"></input>
          <label htmlFor="selecter">{this.props.taskText}</label>
        </div>
        <div id="taskButtons">
          <button  className="btn btn-secondary"><i className="fa fa-edit"></i></button>
          <button className="btn btn-danger" onClick={this.deleteThisTask}><i className="fa fa-trash"></i></button>
        </div>
      </div>
    );
  }
}

//Render the App
ReactDOM.render(<App />,document.getElementById('root'));
