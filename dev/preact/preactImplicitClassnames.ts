import { options } from 'preact';
import classnames from 'classnames';

// store previous hook
const makeVNode = options.vnode;

options.vnode = function (vnode: any) {
  if (vnode?.props?.class) {
    if (Array.isArray(vnode?.props?.class)) {
      vnode.props.class = classnames(...vnode.props.class);
    } else {
      vnode.props.class = classnames(vnode.props.class);
    }
  }

  // call previous hook
  if (makeVNode) makeVNode(vnode);
};
