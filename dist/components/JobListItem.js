"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobListItem = void 0;

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var JobListItem = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(JobListItem, _React$Component);

  var _super = _createSuper(JobListItem);

  function JobListItem() {
    (0, _classCallCheck2["default"])(this, JobListItem);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(JobListItem, [{
    key: "render",
    value: function render() {
      var label = this.props.label;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "p-clearfix"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          fontSize: '1em',
          "float": 'right',
          margin: '1em .5em 0 0'
        }
      }, label));
    }
  }], [{
    key: "listItemTemplate",
    value: function listItemTemplate(item) {
      item = new this(item);
      return item.render();
    }
  }]);
  return JobListItem;
}(_react["default"].Component);

exports.JobListItem = JobListItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0pvYkxpc3RJdGVtLnRzeCJdLCJuYW1lcyI6WyJKb2JMaXN0SXRlbSIsImxhYmVsIiwicHJvcHMiLCJmb250U2l6ZSIsIm1hcmdpbiIsIml0ZW0iLCJyZW5kZXIiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBUWFBLFc7Ozs7Ozs7Ozs7Ozs2QkFNZTtBQUFBLFVBQ2hCQyxLQURnQixHQUNOLEtBQUtDLEtBREMsQ0FDaEJELEtBRGdCO0FBRXhCLDBCQUNFO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixzQkFDRTtBQUFNLFFBQUEsS0FBSyxFQUFFO0FBQUNFLFVBQUFBLFFBQVEsRUFBQyxLQUFWO0FBQWdCLG1CQUFNLE9BQXRCO0FBQThCQyxVQUFBQSxNQUFNLEVBQUM7QUFBckM7QUFBYixTQUFvRUgsS0FBcEUsQ0FERixDQURGO0FBS0Q7OztxQ0FadUJJLEksRUFBVztBQUNqQ0EsTUFBQUEsSUFBSSxHQUFHLElBQUksSUFBSixDQUFTQSxJQUFULENBQVA7QUFDQSxhQUFPQSxJQUFJLENBQUNDLE1BQUwsRUFBUDtBQUNEOzs7RUFKOEJDLGtCQUFNQyxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE93blByb3BzIHtcbiAgbGFiZWw6IHN0cmluZ1xufVxuXG50eXBlIFByb3BzID0gT3duUHJvcHM7XG5cbmV4cG9ydCBjbGFzcyBKb2JMaXN0SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcywge30+IHtcbiAgc3RhdGljIGxpc3RJdGVtVGVtcGxhdGUoaXRlbTogYW55KSB7XG4gICAgaXRlbSA9IG5ldyB0aGlzKGl0ZW0pO1xuICAgIHJldHVybiBpdGVtLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgY29uc3QgeyBsYWJlbCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLWNsZWFyZml4XCI+XG4gICAgICAgIDxzcGFuIHN0eWxlPXt7Zm9udFNpemU6JzFlbScsZmxvYXQ6J3JpZ2h0JyxtYXJnaW46JzFlbSAuNWVtIDAgMCd9fT57bGFiZWx9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19