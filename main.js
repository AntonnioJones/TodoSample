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

  //used to create unique value for each task
  id = 0;

  //create the task section with the premade tasks
  componentDidMount(){
    this.addTaskSection();
  }

  //delete each task using a unique id
  deleteTask(id){
    this.setState( (state) => ({
      taskSections: state.taskSections.filter( (value) => {
        return value.props.id != id;
      })
    }));
  }

  //adds the task section using premade names
  addTaskSection(){
    this.state.taskNames.forEach((item, i) => {
      this.setState((state) => ({
        taskSections: [...state.taskSections, <Task
              key={this.id++} taskText={item}
              id={this.id} deleteTask={this.deleteTask}>
            </Task>
          ]
      }));

    });

  }

  //add individual tasks
  addTask(item){
    this.setState((state) => ({
      taskSections: [...state.taskSections,<Task key={this.id++} taskText={item}
                      id={this.id} deleteTask={this.deleteTask}></Task>]
    }));
  }

  //removes all the tasks and premade tasks
  clearTask(){
    this.setState({
      taskSections : [],
      taskNames : []
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

  //controls the input field
  handleChange(event){
    this.setState({inputText: event.target.value})
  }

  //called when the add task button is clicked
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

    this.state ={
      editing: false,
      previousName: "",
      taskName: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.deleteThisTask = this.deleteThisTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }


    componentDidMount(){
      this.setState((state) => ({
        taskName: this.props.taskText
      }))
    }

  //controls the input field
  handleChange(event){
    this.setState({taskName: event.target.value})
  }

  //start editing tasks
  editTask(event){
    if(this.state.editing && this.state.taskName === ""){
      this.setState( (state) => ({
        taskName: state.previousName,
        editing: !state.editing
      }))
    }else{
      this.setState( (state) => ({
        previousName: state.taskName,
        editing: !state.editing
      }))
    }

    event.preventDefault();
  }

  //Called when the delete button is clicked
  deleteThisTask(){
    this.props.deleteTask(this.props.id);
  }

  render(){
    let label;
    if(!this.state.editing){
      label = <label htmlFor="selecter">{this.state.taskName}</label>
    }else{
      label = <form onSubmit={this.editTask}>
                <input id="taskEdit" size="40" placeholder={this.state.previousName} maxLength="30" autoFocus="autofocus" onChange={this.handleChange}></input>
                <button className="btn btn-danger" onClick={this.editTask}><i className="fa fa-times"></i></button>
                <button type="submit" value={this.state.taskName} className="btn btn-primary"><i className="fa fa-check"></i></button>
              </form>
    }
    return(
      <div className="task">
        <div>
          <input type="checkbox" id="selecter" name="selecter" value="selected"></input>
          {label}
        </div>
        <div id="taskButtons">
          <button  className="btn btn-secondary" onClick={this.editTask}><i className="fa fa-edit"></i></button>
          <button className="btn btn-danger" onClick={this.deleteThisTask}><i className="fa fa-trash"></i></button>
        </div>
      </div>
    );
  }
}

//Render the App
ReactDOM.render(<App />,document.getElementById('root'));
