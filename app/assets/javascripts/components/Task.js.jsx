class Task extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      id: this.props.task.id,
      title: this.props.task.title,
      description: this.props.task.description,
      finish_date: this.props.task.finish_date
    }

    this.deleteTask = this.deleteTask.bind(this);
    this.toggleUpdateState = this.toggleUpdateState.bind(this);
    this.updatedTaskValues = this.updatedTaskValues.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  deleteTask() {
    //const {id} = event.target;
    this.props.handleTaskDelete(this.state.id);
  }

  toggleUpdateState(){
    this.setState({ editable: !this.state.editable })
  }

  updatedTaskValues(element) {
    if(element.target.id === 'update-task-title') this.setState({title: element.target.value})
    else if(element.target.id === 'update-task-description') this.setState({description: element.target.value})
    else if(element.target.id === 'update-task-date') this.setState({finish_date: element.target.value})
    else console.log('Wrong form element ID')
  }

  updateTask() {

    let isValid = false;

    if(this.state.title != '' && this.state.description != '' && this.state.finish_date != '') isValid = true;

    if(isValid) {
      let obj = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        finish_date: this.state.finish_date
      }

      this.props.handleTaskUpdate(obj);

      this.setState({ editable: false })

    } else {
      $('#modal-message').text(`The value(s) can't be blank!`);
      $('#modal').modal('show');
    }

  }

  render() {

    let editFormLogic;

    if(this.state.editable) {
      editFormLogic =
        <div className="my-3">
          <div className="form-group">
            <label htmlFor="update-task-title">Task title:</label>
            <input type="text" className="form-control" id="update-task-title" onChange={this.updatedTaskValues} value={this.state.title} />
          </div>
          <div className="form-group">
            <label htmlFor="update-task-date">Task due date:</label>
            <input type="date" className="form-control" id="update-task-date" onChange={this.updatedTaskValues} value={this.state.finish_date} />
          </div>
          <div className="form-group">
            <label htmlFor="update-task-description">Description:</label>
            <textarea className="form-control" id="update-task-description" onChange={this.updatedTaskValues} value={this.state.description} />
          </div>
          <div id="test"></div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={this.toggleUpdateState} className="btn btn-warning">Cancle Edit</button>
            <button onClick={this.updateTask} className="btn btn-info">Update</button>
          </div>
        </div>
    } else {
      editFormLogic =
        <div className="list-group-item mb-3">
          <div className="w-100">
            <h3>{this.props.task.title}</h3>
            <p>{this.props.task.description}</p>
            <p><strong>Due date - {this.props.task.finish_date}</strong></p>
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={this.deleteTask} className="btn btn-danger">Delete</button>
            <button onClick={this.toggleUpdateState} className="btn btn-success">Edit</button>
          </div>
        </div>
    }

    return (
      <div>
        { editFormLogic }
      </div>
    )
  }
}
