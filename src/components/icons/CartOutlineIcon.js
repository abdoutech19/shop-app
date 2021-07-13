import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function CartOutlineIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width}
      height={props.height}
      {...props}>
      <G data-name="cart-o">
        <Circle
          cx={10.1}
          cy={16.98}
          r={1}
          fill={props.color ? props.color : '#000014'}
        />
        <Circle
          cx={14.59}
          cy={16.99}
          r={1}
          fill={props.color ? props.color : '#000014'}
        />
        <Path
          d="M8.39 11.63l.16 1.13a2 2 0 002 1.72H16"
          fill="none"
          stroke={props.color ? props.color : '#000014'}
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={props.weight}
        />
        <Path
          d="M16.93 9.19l-.22 1.58a2 2 0 01-2 1.72H9.38a1 1 0 01-1-.86L8 8.62a1 1 0 011-1.14h6.48a1.5 1.5 0 011.45 1.71z"
          fill="none"
          stroke={props.color ? props.color : '#000014'}
          strokeLinecap="round"
          strokeWidth={props.weight}
          strokeMiterlimit={10}
        />
        <Path
          fill="none"
          stroke={props.color ? props.color : '#000014'}
          strokeLinecap="round"
          strokeWidth={props.weight}
          strokeLinejoin="round"
          d="M7.97 8.62l-.3-2.11v.01H6.15"
        />
      </G>
    </Svg>
  );
}

export default CartOutlineIcon;
