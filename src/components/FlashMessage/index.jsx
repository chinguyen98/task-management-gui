import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

FlashMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  close: PropTypes.func,
}

FlashMessage.defaultProps = {
  message: '',
  type: '',
  close: null,
}

function FlashMessage({ message, type, close }) {
  if (message) {
    return (
      <div className={`flashMessage alert alert-${type}`}>
        <Button className='close' onClick={close}>
          <span>&times;</span>
        </Button>
        {message}
      </div>
    )
  }

  return null;
}

export default FlashMessage;