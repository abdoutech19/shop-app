import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeartIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width}
      height={props.height}
      {...props}>
      <Path
        data-name="heart"
        d="M15.46 6.65a3.19 3.19 0 00-2.7.63 3.31 3.31 0 00-.76.87 3.31 3.31 0 00-.76-.87 3.19 3.19 0 00-2.7-.63A3.44 3.44 0 006 10.42c.3 3.45 3.73 5.89 5.2 6.79a1.51 1.51 0 00.77.21 1.49 1.49 0 00.77-.21c1.47-.89 4.92-3.34 5.22-6.79a3.44 3.44 0 00-2.5-3.77z"
        fill={props.color ? props.color : '#000014'}
      />
    </Svg>
  );
}

export default HeartIcon;
