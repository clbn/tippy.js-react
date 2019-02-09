import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import tippy from 'tippy.js';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function getNativeTippyProps(props) {
  // eslint-disable-next-line no-unused-vars
  var children = props.children,
      onCreate = props.onCreate,
      isVisible = props.isVisible,
      isEnabled = props.isEnabled,
      nativeProps = _objectWithoutPropertiesLoose(props, ["children", "onCreate", "isVisible", "isEnabled"]);

  return nativeProps;
}
function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function preserveRef(ref, node) {
  if (ref) {
    if (typeof ref === 'function') {
      ref(node);
    }

    if (hasOwnProperty(ref, 'current')) {
      ref.current = node;
    }
  }
}
function ssrSafeCreateDiv() {
  return typeof document !== 'undefined' && document.createElement('div');
}

function TippyGroup(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  var instances = React.useRef([]);
  React.useEffect(function () {
    tippy.group(instances.current, props);
    return function () {
      instances.current = null;
    };
  }, []);
  return React.Children.map(children, function (child) {
    return React.cloneElement(child, {
      onCreate: function onCreate(instance) {
        if (child.props.onCreate) {
          child.props.onCreate(instance);
        }

        instances.current.push(instance);
      }
    });
  });
}
TippyGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

function Tippy(props) {
  var _React$useState = React.useState(false),
      isMounted = _React$useState[0],
      setIsMounted = _React$useState[1];

  var container = React.useRef(ssrSafeCreateDiv());
  var reference = React.useRef();
  var instance = React.useRef();

  var options = _extends({}, getNativeTippyProps(props), {
    content: container.current
  });

  if (hasOwnProperty(props, 'isVisible')) {
    options.trigger = 'manual';
  }

  React.useEffect(function () {
    instance.current = tippy(reference.current, options);
    var onCreate = props.onCreate,
        isEnabled = props.isEnabled,
        isVisible = props.isVisible;

    if (onCreate) {
      onCreate(instance.current);
    }

    if (isEnabled === false) {
      instance.current.disable();
    }

    if (isVisible === true) {
      instance.current.show();
    }

    setIsMounted(true);
    return function () {
      instance.current.destroy();
      instance.current = null;
    };
  }, []);
  React.useEffect(function () {
    if (!isMounted) {
      return;
    }

    instance.current.set(options);
    var isEnabled = props.isEnabled,
        isVisible = props.isVisible;

    if (isEnabled === true) {
      instance.current.enable();
    }

    if (isEnabled === false) {
      instance.current.disable();
    }

    if (isVisible === true) {
      instance.current.show();
    }

    if (isVisible === false) {
      instance.current.hide();
    }
  });
  return React.createElement(React.Fragment, null, React.cloneElement(props.children, {
    ref: function ref(node) {
      reference.current = node;
      preserveRef(props.children.ref, node);
    }
  }), isMounted && ReactDOM.createPortal(props.content, container.current));
}

Tippy.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  children: PropTypes.element.isRequired,
  onCreate: PropTypes.func,
  isVisible: PropTypes.bool,
  isEnabled: PropTypes.bool
};
Tippy.defaultProps = {
  ignoreAttributes: true
};
var Tippy$1 = React.forwardRef(function TippyWrapper(props, _ref) {
  return React.createElement(Tippy, props, React.cloneElement(props.children, {
    ref: function ref(node) {
      preserveRef(_ref, node);
      preserveRef(props.children.ref, node);
    }
  }));
});

export default Tippy$1;
export { TippyGroup };
//# sourceMappingURL=index.js.map
