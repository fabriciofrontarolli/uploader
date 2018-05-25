import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { Uploader, UploadField } from '@navjobs/upload'
import { headers } from './utils/ContactsAPI';

class UploadFile extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    if (this.props.onCreateContact)
      this.props.onCreateContact(values)
  }

  onFilesSelected(files) {
    console.log(files);
  }

  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Close</Link>
        <div className="create-contact-form">
          <Uploader
            request={{
              fileName: 'arquivo',
              url: 'http://localhost:5001/upload',
              method: 'POST',
              headers: {
                ...headers
              },
              // use credentials for cross-site requests
              withCredentials: false,
            }}
            onComplete={({ response, status }) => {
              console.log('Upload Completed');
            }}
            //upload on file selection, otherwise use `startUpload`
            uploadOnSelection={true}
            >
            {({ onFiles, progress, complete }) => (
              <div>
                <UploadField onFiles={onFiles}>
                  <div>
                    Click here to select a file!
                  </div>
                </UploadField>
                {progress ? `Progress: ${progress}` : null}
                {complete ? 'Complete!' : null}
              </div>
            )}
          </Uploader>
        </div>
      </div>
    )
  }
}

export default UploadFile
