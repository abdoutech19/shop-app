import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeartOutlineIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width}
      height={props.height}
      {...props}>
      <Path
        data-name="heart-o"
        d="M6.51 10.85c.29 3.25 3.66 5.61 5 6.41a1 1 0 001 0c1.31-.8 4.7-3.16 5-6.41a2.93 2.93 0 00-2.14-3.23A2.78 2.78 0 0012 10.41h0a2.78 2.78 0 00-3.35-2.79 2.94 2.94 0 00-2.14 3.23z"
        fill="none"
        stroke={props.color ? props.color : '#000014'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props.weight}
      />
    </Svg>
  );
}

export default HeartOutlineIcon;
