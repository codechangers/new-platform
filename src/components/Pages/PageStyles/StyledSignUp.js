import styled from '@emotion/styled';

export const SignupFormWrapper = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#50769a',
  '& .MuiPaper-root': {
    width: '100%',
    maxWidth: 600
  }
});

export const ModalContent = styled.div({
  width: '100%',
  minHeight: '100vh',
  boxSizing: 'border-box',
  backgroundColor: '#f4f4f4',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '30px 64px'
});

export const AccountSelectionSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#f4f4f4'
});

export const Title = styled.h2({
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: 40,
  letterSpacing: -0.5
});

export const AccountSelectionCards = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: 650,
  '& .MuiCard-root': {
    margin: 15
  },
  '& .MuiCardContent-root': {
    padding: '0 16px 16px'
  }
});

export const SignUpButton = styled.button({
  border: 'none',
  margin: 0,
  padding: 10,
  width: '100%',
  backgroundColor: '#8EC63F',
  color: 'white',
  font: 'inherit',
  fontSize: 14,
  textTransform: 'uppercase',
  borderRadius: 4,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'darken(#8EC637, 50%)'
  }
});

export const LinkButtonWrapper = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});

export const LinkButton = styled.button({
  maxWidth: 'fit-content',
  border: 'none',
  outline: 'none',
  margin: 0,
  padding: 0,
  width: 'auto',
  overflow: 'visible',
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  fontSize: 14,
  textTransform: 'uppercase',
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline'
  }
});

export const FormFieldsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

export const FormFeildsRow = styled.div(
  {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    '@media (min-width: 600px)': {
      flexDirection: 'row'
    }
  },
  ({ firstRow }) => ({
    '& .MuiFormControl-root': {
      width: '100%',
      margin: '6px 0',
      '@media (min-width: 600px)': {
        margin: firstRow ? '0 5px 12px' : '0 5px'
      }
    }
  })
);

export const CheckboxRow = styled.div({
  margin: 0,
  '@media (min-width: 600px)': {
    margin: 5
  }
});

export const FormFeildsOptions = styled.div({
  marginTop: 20,
  display: 'flex',
  flexDirection: 'column'
});