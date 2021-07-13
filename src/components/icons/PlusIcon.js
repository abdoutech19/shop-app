import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function PlusIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width}
      height={props.height}
      {...props}>
      <G
        data-name="plus"
        fill="none"
        stroke={props.color ? props.color : '#000'}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={props.weight}>
        <Path d="M12 6.5v11M6.5 12h11" />
      </G>
    </Svg>
  );
}

export default PlusIcon;
