import { HalfMalf } from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css';

function Spinner() {
  return (
    <HalfMalf
      // text={'Loading...'}
      // bgColor={'#F0A500'}
      center={false}
      width={'80px'}
      height={'80px'}
    />
  );
}

export default Spinner;
