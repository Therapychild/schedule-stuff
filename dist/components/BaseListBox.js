"use strict";

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

var _react = _interopRequireDefault(require("react"));

var _listbox = require("primereact/listbox");

var _UserListItem = require("./UserListItem");

var _JobListItem = require("./JobListItem");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BaseListBox = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(BaseListBox, _React$Component);

  var _super = _createSuper(BaseListBox);

  function BaseListBox() {
    (0, _classCallCheck2["default"])(this, BaseListBox);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(BaseListBox, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          activeGroup = _this$props.activeGroup,
          groups = _this$props.groups,
          viewMode = _this$props.viewMode;
      var itemTemplate = viewMode === "user" ? _UserListItem.UserListItem.listItemTemplate : _JobListItem.JobListItem.listItemTemplate;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Groups"), /*#__PURE__*/_react["default"].createElement(_listbox.ListBox, {
        value: activeGroup,
        filter: true,
        options: groups,
        onChange: function onChange(e) {
          return _this.setState({
            activeGroup: e.value
          });
        },
        itemTemplate: itemTemplate
      }));
    }
  }]);
  return BaseListBox;
}(_react["default"].Component);

exports["default"] = BaseListBox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0Jhc2VMaXN0Qm94LnRzeCJdLCJuYW1lcyI6WyJCYXNlTGlzdEJveCIsInByb3BzIiwiYWN0aXZlR3JvdXAiLCJncm91cHMiLCJ2aWV3TW9kZSIsIml0ZW1UZW1wbGF0ZSIsIlVzZXJMaXN0SXRlbSIsImxpc3RJdGVtVGVtcGxhdGUiLCJKb2JMaXN0SXRlbSIsImUiLCJzZXRTdGF0ZSIsInZhbHVlIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztJQWNxQkEsVzs7Ozs7Ozs7Ozs7OzZCQUNPO0FBQUE7O0FBQUEsd0JBQ2tCLEtBQUtDLEtBRHZCO0FBQUEsVUFDaEJDLFdBRGdCLGVBQ2hCQSxXQURnQjtBQUFBLFVBQ0hDLE1BREcsZUFDSEEsTUFERztBQUFBLFVBQ0tDLFFBREwsZUFDS0EsUUFETDtBQUV4QixVQUFNQyxZQUFZLEdBQUdELFFBQVEsS0FBSyxNQUFiLEdBQXNCRSwyQkFBYUMsZ0JBQW5DLEdBQXNEQyx5QkFBWUQsZ0JBQXZGO0FBRUEsMEJBQ0UsMERBQ0UscURBREYsZUFFRSxnQ0FBQyxnQkFBRDtBQUNFLFFBQUEsS0FBSyxFQUFFTCxXQURUO0FBRUUsUUFBQSxNQUFNLEVBQUUsSUFGVjtBQUdFLFFBQUEsT0FBTyxFQUFFQyxNQUhYO0FBSUUsUUFBQSxRQUFRLEVBQUUsa0JBQUNNLENBQUQ7QUFBQSxpQkFBTyxLQUFJLENBQUNDLFFBQUwsQ0FBYztBQUFDUixZQUFBQSxXQUFXLEVBQUVPLENBQUMsQ0FBQ0U7QUFBaEIsV0FBZCxDQUFQO0FBQUEsU0FKWjtBQUtFLFFBQUEsWUFBWSxFQUFFTjtBQUxoQixRQUZGLENBREY7QUFZRDs7O0VBakJzQ08sa0JBQU1DLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGlzdEJveCB9IGZyb20gJ3ByaW1lcmVhY3QvbGlzdGJveCc7XG5pbXBvcnQgeyBVc2VyTGlzdEl0ZW0gfSBmcm9tIFwiLi9Vc2VyTGlzdEl0ZW1cIjtcbmltcG9ydCB7IEpvYkxpc3RJdGVtIH0gZnJvbSBcIi4vSm9iTGlzdEl0ZW1cIjtcblxuZXhwb3J0IGludGVyZmFjZSBEaXNwYXRjaFByb3BzIHtcbiAgc2V0QWN0aXZlR3JvdXA6IChhY3RpdmVHcm91cDogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlUHJvcHMge1xuICBhY3RpdmVHcm91cDogc3RyaW5nO1xuICBncm91cHM6IGFueTtcbiAgdmlld01vZGU6IFwidXNlclwiIHwgXCJqb2JcIjtcbn1cblxudHlwZSBQcm9wcyA9IFN0YXRlUHJvcHMgJiBEaXNwYXRjaFByb3BzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlTGlzdEJveCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcywge30+IHtcbiAgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgY29uc3QgeyBhY3RpdmVHcm91cCwgZ3JvdXBzLCB2aWV3TW9kZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpdGVtVGVtcGxhdGUgPSB2aWV3TW9kZSA9PT0gXCJ1c2VyXCIgPyBVc2VyTGlzdEl0ZW0ubGlzdEl0ZW1UZW1wbGF0ZSA6IEpvYkxpc3RJdGVtLmxpc3RJdGVtVGVtcGxhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgzPkdyb3VwczwvaDM+XG4gICAgICAgIDxMaXN0Qm94XG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUdyb3VwfVxuICAgICAgICAgIGZpbHRlcj17dHJ1ZX1cbiAgICAgICAgICBvcHRpb25zPXtncm91cHN9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHthY3RpdmVHcm91cDogZS52YWx1ZX0pfVxuICAgICAgICAgIGl0ZW1UZW1wbGF0ZT17aXRlbVRlbXBsYXRlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19