import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import Banner from '../../UI/Banner';
import ClassInfoCard from '../../Classes/InfoCard';
import ClassEditor from '../../Classes/Editor';
import DeleteCard from '../../UI/DeleteCard';
import autoBind from '../../../autoBind';
import '../../../assets/css/Teacher.css';

const getName = user => `${user.data().fName} ${user.data().lName}`;

let teacherSub = () => null;

class ApprovedTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      selected: null,
      showCreate: false
    };
    autoBind(this);
  }

  componentDidMount() {
    teacherSub = this.props.accounts.teachers.ref.onSnapshot(teacher => {
      this.fetchClasses(teacher);
    });
  }

  componentWillUnmount() {
    teacherSub();
    teacherSub = () => null;
  }

  getCrudModal() {
    if (this.state.showCreate) {
      return (
        <Modal
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          open={this.state.showCreate}
          onClose={() => this.setState({ showCreate: false })}
          disableAutoFocus
        >
          <ClassEditor
            submit={this.createClass}
            submitText="Submit"
            close={() => this.setState({ showCreate: false })}
          />
        </Modal>
      );
    }
    return (
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        open={this.state.selected !== null}
        onClose={() => this.setState({ selected: null })}
        disableAutoFocus
      >
        {this.state.selected.shouldEdit ? (
          <ClassEditor
            submit={classData => {
              this.updateClass(this.state.selected.cls.id, classData);
              this.setState({ selected: null });
            }}
            title="Edit Class Details"
            submitText="Submit"
            cls={this.state.selected.cls}
            close={() => this.setState({ selected: null })}
          />
        ) : (
          <DeleteCard
            prompt={`Are you sure you want to delete ${this.state.selected.cls.name}?`}
            warning="This will remove the class and all signed up students permanently"
            onCancel={() => this.setState({ selected: null })}
            onDelete={() => {
              this.deleteClass(this.state.selected.cls.id);
              this.setState({ selected: null });
            }}
          />
        )}
      </Modal>
    );
  }

  fetchClasses(teacher) {
    const classRefs = teacher.data().classes || [];
    const classes = [];
    classRefs.forEach(classRef => {
      classRef.get().then(classDoc => {
        const classData = { ...classDoc.data(), id: classDoc.id };
        classes.push(classData);
        if (classes.length === classRefs.length) {
          this.setState({ classes });
        }
      });
    });
  }

  createClass(classData) {
    const { teachers } = this.props.accounts;
    this.props.db
      .collection('classes')
      .add({ ...classData, children: [] })
      .then(classObj => {
        const classes = teachers.data().classes || [];
        classes.push(classObj);
        teachers.ref.update({ classes });
      });
    this.setState({ showCreate: false });
  }

  updateClass(classId, classData) {
    this.props.db
      .collection('classes')
      .doc(classId)
      .update(classData)
      .then(() => {
        this.fetchClasses(this.props.accounts.teachers, classId);
      });
  }

  deleteClass(classId) {
    const { teachers } = this.props.accounts;
    this.props.db
      .collection('classes')
      .doc(classId)
      .delete()
      .then(() => {
        let classes = teachers.data().classes || [];
        classes = classes.filter(cls => cls.id !== classId);
        teachers.ref.update({ classes });
      });
  }

  render() {
    return (
      <div className="page-content">
        <Banner
          name={
            this.props.accounts.parents ? getName(this.props.accounts.parents) : 'Hello Teacher'
          }
          buttonText="ADD A NEW CLASS"
          onClick={() => this.setState({ showCreate: true })}
        />
        {this.state.classes.map(cls => (
          <ClassInfoCard
            cls={cls}
            key={cls.id}
            openUpdate={() => this.setState({ selected: { cls, shouldEdit: true } })}
            openDelete={() => this.setState({ selected: { cls, shouldEdit: false } })}
          />
        ))}
        {this.state.selected !== null || this.state.showCreate ? this.getCrudModal() : null}
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

export default withRouter(ApprovedTeacher);
