import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, makeStyles, CircularProgress } from '@material-ui/core';
import { useParentsChildren } from '../../hooks/children';

const propTypes = {
  setWhoAmI: PropTypes.func.isRequired
};

const WhoAmInterface = ({ setWhoAmI }) => {
  const [children, loading] = useParentsChildren();
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Select your Profile
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={classes.profiles}>
          {children.map(child => (
            <Button
              variant="outlined"
              key={child.id}
              onClick={() => setWhoAmI(child)}
              className={classes.button}
            >
              {child.fName}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

WhoAmInterface.propTypes = propTypes;

const useStyles = makeStyles({
  wrapper: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profiles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  button: {
    margin: 10
  }
});

export default WhoAmInterface;
