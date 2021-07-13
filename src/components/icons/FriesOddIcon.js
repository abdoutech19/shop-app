import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function FriesOddIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width}
      height={props.height}
      {...props}>
      <G
        data-name="fries-odd"
        fill="none"
        stroke="#000014"
        strokeLinecap="round"
        strokeMiterlimit={10}>
        <Path
          d="M6.5 8.49h4M6.5 15.51h8.53M6.5 12.01h11"
          strokeWidth={props.weight}
        />
      </G>
    </Svg>
  );
}

export default FriesOddIcon;
