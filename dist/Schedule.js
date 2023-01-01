"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

require("./App.css");

require("primereact/resources/themes/nova-light/theme.css");

require("primereact/resources/primereact.min.css");

require("primeicons/primeicons.css");

var _users = require("./components/js/users.js");

var _BaseListBox = require("./components/connected/BaseListBox");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Schedule = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Schedule, _Component);

  var _super = _createSuper(Schedule);

  function Schedule(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Schedule);
    _this = _super.call(this, props);
    _this.state = {
      activeUser: "1",
      groups: _users.uGroups,
      viewMode: "user"
    };
    return _this;
  }

  (0, _createClass2["default"])(Schedule, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          groups = _this$props.groups,
          activeGroup = _this$props.activeGroup,
          viewMode = _this$props.viewMode;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "Schedule"
      }, /*#__PURE__*/_react["default"].createElement("header", {
        className: "Schedule-header"
      }, /*#__PURE__*/_react["default"].createElement("div", null, "Schedule")), /*#__PURE__*/_react["default"].createElement(_BaseListBox.ConnectedBaseListBox, null));
    }
  }]);
  return Schedule;
}(_react.Component);

exports["default"] = Schedule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TY2hlZHVsZS50c3giXSwibmFtZXMiOlsiU2NoZWR1bGUiLCJwcm9wcyIsInN0YXRlIiwiYWN0aXZlVXNlciIsImdyb3VwcyIsInVHcm91cHMiLCJ2aWV3TW9kZSIsImFjdGl2ZUdyb3VwIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztJQVNxQkEsUTs7Ozs7QUFDbkIsb0JBQVlDLEtBQVosRUFBNkI7QUFBQTs7QUFBQTtBQUMzQiw4QkFBTUEsS0FBTjtBQUVBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxVQUFVLEVBQUUsR0FERDtBQUVYQyxNQUFBQSxNQUFNLEVBQUVDLGNBRkc7QUFHWEMsTUFBQUEsUUFBUSxFQUFFO0FBSEMsS0FBYjtBQUgyQjtBQVE1Qjs7Ozs2QkFFUTtBQUFBLHdCQUNtQyxLQUFLTCxLQUR4QztBQUFBLFVBQ0NHLE1BREQsZUFDQ0EsTUFERDtBQUFBLFVBQ1NHLFdBRFQsZUFDU0EsV0FEVDtBQUFBLFVBQ3NCRCxRQUR0QixlQUNzQkEsUUFEdEI7QUFHUCwwQkFDRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBUSxRQUFBLFNBQVMsRUFBQztBQUFsQixzQkFDRSx3REFERixDQURGLGVBSUUsZ0NBQUMsaUNBQUQsT0FKRixDQURGO0FBUUQ7OztFQXRCbUNFLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAnLi9BcHAuY3NzJztcbmltcG9ydCBcInByaW1lcmVhY3QvcmVzb3VyY2VzL3RoZW1lcy9ub3ZhLWxpZ2h0L3RoZW1lLmNzc1wiXG5pbXBvcnQgXCJwcmltZXJlYWN0L3Jlc291cmNlcy9wcmltZXJlYWN0Lm1pbi5jc3NcIjtcblxuaW1wb3J0IFwicHJpbWVpY29ucy9wcmltZWljb25zLmNzc1wiO1xuaW1wb3J0IHsgdUdyb3VwcyB9IGZyb20gXCIuL2NvbXBvbmVudHMvanMvdXNlcnMuanNcIjtcbmltcG9ydCB7IENvbm5lY3RlZEJhc2VMaXN0Qm94IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jb25uZWN0ZWQvQmFzZUxpc3RCb3hcIjtcbmltcG9ydCB7IGpHcm91cHMgfSBmcm9tIFwiLi9jb21wb25lbnRzL2pzL2pvYnMuanNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBPd25Qcm9wcyB7XG4gIGFjdGl2ZUdyb3VwOiBzdHJpbmc7XG4gIGdyb3VwczogW3t9XTtcbiAgdmlld01vZGU6IFwidXNlclwiIHwgXCJqb2JcIjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NoZWR1bGUgZXh0ZW5kcyBDb21wb25lbnQ8T3duUHJvcHMsIHt9PiB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBPd25Qcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVVc2VyOiBcIjFcIixcbiAgICAgIGdyb3VwczogdUdyb3VwcyxcbiAgICAgIHZpZXdNb2RlOiBcInVzZXJcIlxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGdyb3VwcywgYWN0aXZlR3JvdXAsIHZpZXdNb2RlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU2NoZWR1bGVcIj5cbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJTY2hlZHVsZS1oZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2PlNjaGVkdWxlPC9kaXY+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgICAgICA8Q29ubmVjdGVkQmFzZUxpc3RCb3ggLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuIl19