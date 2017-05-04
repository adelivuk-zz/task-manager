class Tasks extends React.Component {

  constructor() {
    super();

    this.state = {
      tasks: []
    }

    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleTaskCreate = this.handleTaskCreate.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    $.getJSON('/api/v1/tasks.json', (response) => {
      this.setState({ tasks: response })
    })
  }

  handleTaskDelete(task_id) {
    $.ajax({
      url: `/api/v1/tasks/${task_id}`,
      type: 'DELETE',
      success:() => {
        let newTasks = this.state.tasks.filter((task) => {
          return task.id != task_id;
        })

        this.setState({ tasks: newTasks })

        $('#modal-message').text('Task deleted!');
        $('#modal').modal('show');
      }
    })
  }

  handleTaskCreate(newFormObject) {
    $.post('/api/v1/tasks', {task: newFormObject}, (task) => {
      let refreshTasks = [task, ...this.state.tasks];
      this.setState({ tasks: refreshTasks })

      $('#modal-message').text('Task created!');
      $('#modal').modal('show');
    })
  }

  handleTaskUpdate(object) {
    $.ajax({
      url: `/api/v1/tasks/${object.id}`,
      type: 'PUT',
      data: { task: object },
      success: () => {
        let newTasks = this.state.tasks.map(function(task){
          if(task.id == object.id) {
            task.title = object.title;
            task.description = object.description;
            task.finish_date = object.finish_date;
          }

          return task;
        })

        this.setState({tasks: newTasks});

        $('#modal-message').text('Task updated!');
        $('#modal').modal('show');
      }
    })
  }

  render() {

    let tasks = this.state.tasks.map((task) => {
      return(
        <div className="row" key={task.id}>
          <div className="col">
            <Task task={task}
                  handleTaskDelete={this.handleTaskDelete}
                  handleTaskUpdate={this.handleTaskUpdate} />
          </div>
        </div>
      )
    })

    return (
      <div>
        <NewTask handleTaskCreate={this.handleTaskCreate} />
        <hr />
        <div className="list-group">
          { tasks }
        </div>
      </div>
    )
  }
}
