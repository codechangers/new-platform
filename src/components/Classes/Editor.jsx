import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Checkbox,
  InputAdornment,
  Button,
  FormControlLabel,
  MenuItem
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { getUserData, validateFields, getErrorStatus, getDateFromTimestamp } from '../../helpers';
import { weekDays } from '../../globals';
import autoBind from '../../autoBind';
import '../../assets/css/Teacher.css';

const allFields = [
  'name',
  'programType',
  'price',
  'description',
  'locationName',
  'locationAddress',
  'daysOfWeek',
  'startDate',
  'endDate',
  'startTime',
  'endTime',
  'startAge',
  'endAge',
  'minStudents',
  'maxStudents',
  'privacyCode'
];
const dontConvert = [
  'name',
  'programType',
  'description',
  'locationName',
  'locationAddress',
  'daysOfWeek',
  'isPrivate',
  'privacyCode'
];
const convertToNumber = ['startAge', 'endAge', 'price', 'minStudents', 'maxStudents'];
const convertToDate = ['startDate', 'endDate', 'startTime', 'endTime'];

class ClassEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      programType: '',
      description: '',
      locationName: '',
      locationAddress: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      daysOfWeek: [],
      startAge: '',
      endAge: '',
      price: '',
      minStudents: '',
      maxStudents: '',
      isPrivate: false,
      privacyCode: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  componentDidMount() {
    const { cls } = this.props;
    const newState = {};
    Object.keys(cls).forEach(attr => {
      if (dontConvert.includes(attr)) {
        newState[attr] = cls[attr];
      } else if (convertToNumber.includes(attr)) {
        newState[attr] = Number(cls[attr]);
      } else if (convertToDate.includes(attr)) {
        newState[attr] = getDateFromTimestamp(cls[attr]);
      }
    });
    this.setState(newState);
  }

  setDate(date, dateType) {
    const newState = {};
    newState[dateType] = date;
    this.setState(newState);
  }

  getWeekDay(day) {
    return (
      <Checkbox
        checked={this.state.daysOfWeek.includes(day)}
        onChange={() => this.toggleWeekDay(day)}
        color="primary"
        value={day}
      />
    );
  }

  toggleWeekDay(day) {
    const { daysOfWeek } = this.state;
    const i = daysOfWeek.indexOf(day);
    if (i !== -1) {
      daysOfWeek.splice(i, 1);
    } else {
      daysOfWeek.push(day);
    }
    this.setState({ daysOfWeek });
  }

  handleInput(e) {
    const { id, name, value } = e.target;
    const newState = {};
    newState[id || name] = value;
    this.setState(newState);
  }

  handleSubmit() {
    let fields = allFields;
    if (!this.state.isPrivate) {
      fields.filter(a => a !== 'privacyCode');
    }
    if (this.validateFields(fields)) {
      const data = { ...this.state };
      delete data.errors;
      if (!this.state.isPrivate) {
        data.privacyCode = '';
      }
      this.props.submit(data);
    }
  }

  render() {
    return (
      <Paper className="class-editor">
        <h4>{this.props.title}</h4>
        <TextField
          id="name"
          className="input most"
          type="text"
          label="Name of Class"
          variant="outlined"
          value={this.state.name}
          onChange={this.handleInput}
          error={getErrorStatus(this.state.errors.name)}
          helperText={this.state.errors.name}
        />
        <TextField
          id="description"
          className="input wide"
          type="text"
          multiline
          rows="4"
          label="Description of Class"
          variant="outlined"
          value={this.state.description}
          onChange={this.handleInput}
          error={getErrorStatus(this.state.errors.description)}
          helperText={this.state.errors.description}
        />
        <div className="inliner">
          <TextField
            id="price"
            className="input most"
            type="text"
            label="Price Per Student"
            variant="outlined"
            value={this.state.price}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.price)}
            helperText={this.state.errors.price}
            InputProps={{
              startAdornment: (
                <InputAdornment className="bold-icon" position="start">
                  $
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="programType"
            name="programType"
            className="input"
            type="text"
            label="Type of Program"
            variant="outlined"
            value={this.state.programType}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.programType)}
            helperText={this.state.errors.programType}
            select
          >
            <MenuItem value="camp">Camp</MenuItem>
            <MenuItem value="after-school">After School Program</MenuItem>
            <MenuItem value="special-event">Special Event</MenuItem>
          </TextField>
        </div>
        {this.state.errors.daysOfWeek ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{this.state.errors.daysOfWeek}</p>
        ) : null}
        <div className="days-of-week">
          {weekDays.map(day => (
            <FormControlLabel
              value="top"
              key={`week-day-${day}`}
              control={this.getWeekDay(day)}
              label={day}
              labelPlacement="top"
            />
          ))}
        </div>
        <div className="inliner">
          <KeyboardDatePicker
            clearable
            className="input"
            value={this.state.startDate}
            placeholder="10/10/2010"
            onChange={date => this.setDate(date, 'startDate')}
            label={this.state.errors.startDate ? this.state.errors.startDate : 'Start Date'}
            error={getErrorStatus(this.state.errors.startDate)}
            format="MM/dd/yyyy"
          />
          <KeyboardDatePicker
            clearable
            className="input"
            value={this.state.endDate}
            placeholder="11/11/2011"
            onChange={date => this.setDate(date, 'endDate')}
            label={this.state.errors.endDate ? this.state.errors.endDate : 'End Date'}
            error={getErrorStatus(this.state.errors.endDate)}
            format="MM/dd/yyyy"
          />
        </div>
        <div className="inliner">
          <KeyboardTimePicker
            label={this.state.errors.startTime ? this.state.errors.startTime : 'Start Time'}
            error={getErrorStatus(this.state.errors.startTime)}
            className="input"
            placeholder="8:00 AM"
            mask="__:__ _M"
            keyboardIcon={<QueryBuilderIcon />}
            value={this.state.startTime}
            onChange={time => this.setDate(time, 'startTime')}
          />
          <KeyboardTimePicker
            label={this.state.errors.endTime ? this.state.errors.endTime : 'End Time'}
            error={getErrorStatus(this.state.errors.endTime)}
            className="input"
            placeholder="2:00 PM"
            mask="__:__ _M"
            keyboardIcon={<QueryBuilderIcon />}
            value={this.state.endTime}
            onChange={time => this.setDate(time, 'endTime')}
          />
        </div>
        <TextField
          id="locationName"
          className="input most"
          type="text"
          label="Location Name"
          variant="outlined"
          value={this.state.locationName}
          onChange={this.handleInput}
          error={getErrorStatus(this.state.errors.locationName)}
          helperText={this.state.errors.locationName}
        />
        <TextField
          id="locationAddress"
          className="input most"
          type="text"
          label="Location Address"
          variant="outlined"
          value={this.state.locationAddress}
          onChange={this.handleInput}
          error={getErrorStatus(this.state.errors.locationAddress)}
          helperText={this.state.errors.locationAddress}
        />
        <div className="inliner">
          <TextField
            id="startAge"
            className="input"
            type="text"
            label="Minimum Age"
            variant="outlined"
            value={this.state.startAge}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.startAge)}
            helperText={this.state.errors.startAge}
            InputProps={{
              endAdornment: (
                <InputAdornment className="bold" position="end">
                  years
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="endAge"
            className="input"
            type="text"
            label="Maximum Age"
            variant="outlined"
            value={this.state.endAge}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.endAge)}
            helperText={this.state.errors.endAge}
            InputProps={{
              endAdornment: (
                <InputAdornment className="bold" position="end">
                  years
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className="inliner">
          <TextField
            id="minStudents"
            className="input"
            type="text"
            label="Min Students"
            variant="outlined"
            value={this.state.minStudents}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.minStudents)}
            helperText={this.state.errors.minStudents}
            InputProps={{
              endAdornment: (
                <InputAdornment className="bold" position="end">
                  students
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="maxStudents"
            className="input"
            type="text"
            label="Max Students"
            variant="outlined"
            value={this.state.maxStudents}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.maxStudents)}
            helperText={this.state.errors.maxStudents}
            InputProps={{
              endAdornment: (
                <InputAdornment className="bold" position="end">
                  students
                </InputAdornment>
              )
            }}
          />
        </div>
        <FormControlLabel
          value="top"
          control={
            <Checkbox
              checked={this.state.isPrivate}
              onChange={() => this.setState({ isPrivate: !this.state.isPrivate })}
              color="primary"
              value={this.state.isPrivate}
            />
          }
          label="This Class is Private"
          labelPlacement="end"
          style={{ flexGrow: 'grow' }}
        />
        {this.state.isPrivate && (
          <TextField
            id="privacyCode"
            className="input most"
            style={{ width: '70%' }}
            type="text"
            label="Private Registration Code"
            variant="outlined"
            value={this.state.privacyCode}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.privacyCode)}
            helperText={this.state.errors.privacyCode}
            disabled={!this.state.isPrivate}
          />
        )}
        <div className="options">
          <Button onClick={this.props.close}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>
            {this.props.submitText}
          </Button>
        </div>
      </Paper>
    );
  }
}

ClassEditor.propTypes = {
  submit: PropTypes.func.isRequired,
  title: PropTypes.string,
  submitText: PropTypes.string,
  cls: PropTypes.object,
  close: PropTypes.func
};

ClassEditor.defaultProps = {
  title: 'Create a Class',
  submitText: 'Create Class',
  cls: {},
  close: () => console.log('closing...')
};

export default ClassEditor;
