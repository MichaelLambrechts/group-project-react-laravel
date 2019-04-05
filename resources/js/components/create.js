import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
/*import CalendarDemo from './calendar'*/
import { Calendar } from 'primereact/calendar';
import Button from 'react-bootstrap/Button'
import { appAddEvent } from './helpers';
import date from 'date-and-time';
import { convertDate } from './helpers';

export default class Create extends Component {

  constructor(props) {
    super(props);
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);
    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateTemplate = this.dateTemplate.bind(this);
    this.state = {
      name: "",
      description: "",
      date_event: today,
      reminder: null,
      minDate: minDate,
      maxDate: maxDate,
      invalidDates: [today],
      boxReminder: false
    };
  }//\end constructor

  validateForm() {
    return this.state.name.length > 0 && this.state.description.length > 0;
  }//\end fct validateForm

  handleChange(event) {
      //this.setState({ [event.target.name]: event.target.value });
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({[name]: value});
  }//\end fct handleChange

  /*handlecheckBoxChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
    console.log(this.state.boxReminder);
  }*/

  handleSubmit() {
    let convertedDate = convertDate (this.state.date_event);
    let convertedReminder ="";
    let datetest  = new Date();
    //check if box reminder is checked and not empty
    if (this.state.boxReminder && this.state.reminder !== null){
      convertedReminder = convertDate (this.state.reminder);
    }
    else{
      convertedReminder = "";
    }
    let myJSON = { "name": this.state.name, "date_event": convertedDate , "description": this.state.description, "reminder": convertedReminder }
    //console.log(myJSON);
    event.preventDefault()
    appAddEvent(myJSON);
  }//\end fct handleSubmit

  dateTemplate(date) {
      if (date.day > 10 && date.day < 15) {
          return (
              <div style={{ backgroundColor: '#1dcbb3', color: '#ffffff', fontWeight: 'bold', borderRadius: '50%', width: '2em', height: '2em', lineHeight: '2em', padding: 0 }}>{date.day}</div>
          );
      }
      else {
          return date.day;
      }
  }

  render() {
    return (

      <Form onSubmit={this.handleSubmit} className="m-5">
        <h1>Create new Event</h1>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
          name="name"
          type="text"
          placeholder="your event title"
          onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
          name="description"
          as="textarea" rows="10"
          onChange={this.handleChange}
          />
        </Form.Group>
        <div className="p-col-12 mt-3">
            <p>Date of event:</p>
            <Calendar dateFormat="yy/mm/dd" value={this.state.date_event} onChange={(e) => this.setState({ date_event: e.value })} showTime={true} timeOnly={false} hourFormat="24" showIcon={true}   showSeconds={true} />
        </div>
        <div className="p-col-12 mt-3">
          <label>
            Send me a reminder:
            <input
              name="boxReminder"
              type="checkbox"
              checked={this.state.boxReminder}
              onChange={this.handleChange} />
          </label>
          <div>
            <Calendar dateFormat="yy/mm/dd" value={this.state.reminder} onChange={(e) => this.setState({ reminder: e.value })} showTime={true} timeOnly={false} hourFormat="24" showIcon={true}  showSeconds={true} />
          </div>
        </div>

        <Button disabled={!this.validateForm()} className="my-3" type="submit">Submit</Button>
      </Form>
    )
  }
}
