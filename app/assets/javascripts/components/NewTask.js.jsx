class NewTask extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      description: '',
      finish_date: ''
    }

    this.newTaskValues = this.newTaskValues.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  newTaskValues(element) {
    if(element.target.id === 'new-task-title') this.setState({title: element.target.value})
    else if(element.target.id === 'new-task-description') this.setState({description: element.target.value})
    else if(element.target.id === 'new-task-date') this.setState({finish_date: element.target.value})
    else console.log('Wrong form element ID')
  }

  submitForm() {
    console.log(this.state);

    let isValid = false;

    if(this.state.title != '' && this.state.description != '' && this.state.finish_date != '') isValid = true;

    if(isValid) {
      this.props.handleTaskCreate(this.state);

      $('#new-task-title, #new-task-description, #new-task-date').val('');

      this.setState({
        title: '',
        description: '',
        finish_date: ''
      })

    } else {
      $('#modal-message').text(`The value(s) can't be blank!`);
      $('#modal').modal('show');
    }
  }

  render() {
    return (
      <div className="row my-3">
        <div className="col">
          <div className="form-group">
            <label htmlFor="new-task-title">Task title:</label>
            <input ref="new-task-title" type="text" className="form-control" id="new-task-title" onChange={this.newTaskValues}/>
          </div>
          <div className="form-group">
            <label htmlFor="new-task-date">Task due date:</label>
            <input ref="new-task-date" type="date" className="form-control" id="new-task-date" onChange={this.newTaskValues}/>
          </div>
          <div className="form-group">
            <label htmlFor="new-task-description">Description:</label>
            <textarea ref="new-task-description" className="form-control" id="new-task-description" onChange={this.newTaskValues}/>
          </div>
          <button onClick={this.submitForm} type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </div>
    )
  }
}
