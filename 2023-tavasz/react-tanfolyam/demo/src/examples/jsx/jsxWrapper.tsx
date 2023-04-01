import { useEffect } from 'react';

import { renderDemo } from './jsx';

export function JsxWrapper() {
  useEffect(renderDemo, []);
  return <div id='jsx' />;
}
