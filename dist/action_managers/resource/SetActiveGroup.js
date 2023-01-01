"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setActiveGroup = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ReducibleActionManagerBase = _interopRequireDefault(require("duckies/dist/action_managers/base/ReducibleActionManagerBase"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var setActiveGroup = "SET_ACTIVE_GROUP";
exports.setActiveGroup = setActiveGroup;

/**
 * Sets active group.
 */
var SetActiveGroup = /*#__PURE__*/function (_ReducibleActionManag) {
  (0, _inherits2["default"])(SetActiveGroup, _ReducibleActionManag);

  var _super = _createSuper(SetActiveGroup);

  /* istanbul ignore next */
  function SetActiveGroup() {
    var _this;

    (0, _classCallCheck2["default"])(this, SetActiveGroup);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "defaultState", {
      activeGroup: ""
    });
    return _this;
  }

  (0, _createClass2["default"])(SetActiveGroup, [{
    key: "getType",
    value: function getType() {
      return setActiveGroup;
    }
  }, {
    key: "create",
    value: function create(payload, tags) {
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(SetActiveGroup.prototype), "create", this).call(this, payload, tags);
    }
  }, {
    key: "handle",
    value: function handle(state, action) {
      var activeGroup = action.payload.activeGroup;
      state.activeGroup = activeGroup;
    }
  }]);
  return SetActiveGroup;
}(_ReducibleActionManagerBase["default"]);

exports["default"] = SetActiveGroup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hY3Rpb25fbWFuYWdlcnMvcmVzb3VyY2UvU2V0QWN0aXZlR3JvdXAudHMiXSwibmFtZXMiOlsic2V0QWN0aXZlR3JvdXAiLCJTZXRBY3RpdmVHcm91cCIsImFjdGl2ZUdyb3VwIiwicGF5bG9hZCIsInRhZ3MiLCJzdGF0ZSIsImFjdGlvbiIsIlJlZHVjaWJsZUFjdGlvbk1hbmFnZXJCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFJTyxJQUFNQSxjQUFjLEdBQUcsa0JBQXZCOzs7QUFXUDs7O0lBR3FCQyxjOzs7OztBQU9uQjtBQUNBLDRCQUFjO0FBQUE7O0FBQUE7QUFDWjtBQURZLHFHQUxDO0FBQ2JDLE1BQUFBLFdBQVcsRUFBRTtBQURBLEtBS0Q7QUFBQTtBQUViOzs7OzhCQUVpQjtBQUNoQixhQUFPRixjQUFQO0FBQ0Q7OzsyQkFFTUcsTyxFQUFjQyxJLEVBQXVDO0FBQzFELDBIQUFvQkQsT0FBcEIsRUFBNkJDLElBQTdCO0FBQ0Q7OzsyQkFFTUMsSyxFQUFZQyxNLEVBQW9DO0FBQUEsVUFDN0NKLFdBRDZDLEdBQzdCSSxNQUFNLENBQUNILE9BRHNCLENBQzdDRCxXQUQ2QztBQUdyREcsTUFBQUEsS0FBSyxDQUFDSCxXQUFOLEdBQW9CQSxXQUFwQjtBQUNEOzs7RUF4QnlDSyxzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWR1Y2libGVBY3Rpb25NYW5hZ2VyQmFzZSwge1xuICBSZWR1Y2libGVBY3Rpb25NYW5hZ2VySW50ZXJmYWNlXG59IGZyb20gXCJkdWNraWVzL2Rpc3QvYWN0aW9uX21hbmFnZXJzL2Jhc2UvUmVkdWNpYmxlQWN0aW9uTWFuYWdlckJhc2VcIjtcblxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZUdyb3VwID0gXCJTRVRfQUNUSVZFX0dST1VQXCI7XG5cbmV4cG9ydCB0eXBlIFBheWxvYWQgPSB7XG4gIGFjdGl2ZUdyb3VwOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBTZXRBY3RpdmVHcm91cEFjdGlvbiA9IHtcbiAgdHlwZTogXCJTRVRfQUNUSVZFX0dST1VQXCI7XG4gIHBheWxvYWQ6IFBheWxvYWQ7XG59O1xuXG4vKipcbiAqIFNldHMgYWN0aXZlIGdyb3VwLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXRBY3RpdmVHcm91cCBleHRlbmRzIFJlZHVjaWJsZUFjdGlvbk1hbmFnZXJCYXNlXG4gIGltcGxlbWVudHMgUmVkdWNpYmxlQWN0aW9uTWFuYWdlckludGVyZmFjZTxQYXlsb2FkLCBTZXRBY3RpdmVHcm91cEFjdGlvbj4ge1xuXG4gIGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBhY3RpdmVHcm91cDogXCJcIlxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc2V0QWN0aXZlR3JvdXA7XG4gIH1cblxuICBjcmVhdGUocGF5bG9hZDogYW55LCB0YWdzPzogc3RyaW5nW10pOiBTZXRBY3RpdmVHcm91cEFjdGlvbiB7XG4gICAgcmV0dXJuIHN1cGVyLmNyZWF0ZShwYXlsb2FkLCB0YWdzKSBhcyBTZXRBY3RpdmVHcm91cEFjdGlvbjtcbiAgfVxuXG4gIGhhbmRsZShzdGF0ZTogYW55LCBhY3Rpb246IFNldEFjdGl2ZUdyb3VwQWN0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgeyBhY3RpdmVHcm91cCB9ID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICBzdGF0ZS5hY3RpdmVHcm91cCA9IGFjdGl2ZUdyb3VwO1xuICB9XG59XG4iXX0=