import type {ComponentProps} from 'react';
// Native links keep every exported page directly addressable on static hosting.
export default function Link(props:ComponentProps<'a'>){return <a {...props}/>}
