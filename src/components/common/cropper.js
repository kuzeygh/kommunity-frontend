import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { Button } from '@/components/ui';
import 'react-image-crop/dist/ReactCrop.css';

class Cropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: {},
      imgSrc: null,
      pixelCrop: {},
    };

    this.fileSelector = React.createRef();
  }

  fileTrigger = () => {
    this.fileSelector.current.click();
  };

  cancelCrop = () => {
    this.setState({
      crop: {},
      imgSrc: null,
      pixelCrop: {},
    });
  };

  handleInputChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({
          imgSrc: reader.result,
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onChange = (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop });
  };

  onImageLoaded = image => {
    const ratio = image.width / image.height;

    let dimensions;
    if (ratio > 1) {
      dimensions = { aspect: 1, height: 90, width: 90 / ratio, x: (100 - 90 / ratio) / 2, y: 5 };
    } else {
      dimensions = { aspect: 1, height: 90 * ratio, width: 90, x: 5, y: (100 - 90 * ratio) / 2 };
    }
    const crop = makeAspectCrop(dimensions, ratio);

    const pixelCrop = {
      height: Math.round(image.naturalHeight * (crop.height / 100)),
      width: Math.round(image.naturalWidth * (crop.width / 100)),
      x: Math.round(image.naturalWidth * (crop.x / 100)),
      y: Math.round(image.naturalHeight * (crop.y / 100)),
    };

    this.setState({ crop, pixelCrop });
  };

  // for passing the crop data to parent component
  getValues = () => {
    const { imgSrc, pixelCrop } = this.state;
    const { onSave } = this.props;

    onSave({ imgSrc, pixelCrop });
  };

  render() {
    const { crop, imgSrc } = this.state;
    const { placeHolder } = this.props;

    return (
      <div>
        {imgSrc ? (
          <div>
            <ReactCrop
              src={imgSrc}
              crop={crop}
              onChange={this.onChange}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onComplete}
            />
            <div className="flex">
              <Button
                extraClassName="my-2 w-32"
                size="small"
                styleType="outline"
                label="Cancel"
                onClick={this.cancelCrop}
              />
              <Button
                extraClassName="ml-2 my-2 w-32 flex-grow"
                size="small"
                styleType="primary"
                label="Save"
                onClick={this.getValues}
              />
            </div>
          </div>
        ) : (
          <div>
            {placeHolder}
            <Button
              extraClassName="my-2 w-32"
              size="small"
              styleType="outline"
              label="Change"
              onClick={this.fileTrigger}
            />
            <input
              className="hidden"
              name="newImage"
              ref={this.fileSelector}
              type="file"
              onChange={this.handleInputChange}
              accept="image/jpeg, image/png"
            />
          </div>
        )}
      </div>
    );
  }
}

Cropper.propTypes = {
  onSave: PropTypes.func.isRequired,
  placeHolder: PropTypes.node,
};

export default Cropper;
