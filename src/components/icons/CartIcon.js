import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.height}
      height={props.width}
      {...props}>
      <G data-name="cart" fill={props.color ? props.color : '#000014'}>
        <Circle cx={9.75} cy={16.99} r={1} />
        <Circle cx={14.25} cy={16.99} r={1} />
        <Path d="M16.54 7.67A2 2 0 0015 7H8.54a1.51 1.51 0 00-.69.18l-.1-.72v-.14a.36.36 0 00-.07-.1.34.34 0 00-.12-.09L7.28 6H5.74a.5.5 0 000 1h1.08l.24 1.67.42 3 .16 1.13a2.51 2.51 0 002.47 2.2h5.52a.5.5 0 00.5-.5.51.51 0 00-.5-.5h-5.52a1.49 1.49 0 01-1.4-1A2.38 2.38 0 009 13h5.35a2.51 2.51 0 002.47-2.16L17 9.26a2 2 0 00-.46-1.59z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
