import React from 'react';
import Svg, {Path} from 'react-native-svg';

const LeftIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.width}
    height={props.height}
    {...props}>
    <Path
      data-name="left"
      d="M13.78 7.5l-4.42 3.78a1 1 0 000 1.49l4.46 3.73"
      fill="none"
      stroke={props.color ? props.color : '#000'}
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={props.weight}
    />
  </Svg>
);

export default LeftIcon;
