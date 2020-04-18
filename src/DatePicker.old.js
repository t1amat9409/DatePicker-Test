import moment from "moment";
import jQuery from "jquery";
import { chunk } from "lodash";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July ",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DatePickerESOld = function(elem, onDateChange) {
  this.elem = document.querySelector(elem);
  if (!this.elem) {
    this.elem = document.createElement("div");
    document.body.appendChild(this.elem);
  }
  this.elem.tabIndex = 1;
  if (onDateChange && typeof onDateChange === "function") {
    this.onDateChange = onDateChange;
  }
  this.id = btoa(String(elem))
    .split("=")
    .join("");
  if (this.elem.dataset["date"]) {
    this.date = new Date(this.elem.dataset["date"]);
    if (this.date.toDateString() === "Invalid Date") {
      this.date = new Date();
    }
  } else {
    this.date = new Date();
  }

  console.log(moment()._d);
  this.currentMonth = this.date.getMonth();
  this.prevMonth = this.date.getMonth() - 1 < 0 ? 11 : this.date.getMonth() - 1;
  this.currentDate = this.date.toDateString();
  this.init();
  this.isShown = false;
};

DatePickerESOld.prototype = {
  constructor: DatePickerESOld,
  init() {
    if (this.elem) {
      if (this.isShown) {
        this.elem.innerHTML = `
          <div id="${this.id}" class="cal-holder ${
          this.id
        }" data-date="${this.date.getTime()}">
            <div class="cal-trigger-btn" onclick="">${this.currentDate}</div>
            <div class="cal-content" tabindex="1">
              ${this.renderHeader()}
              ${this.renderBody()}
            </div>
          </div>
        `;
        document.querySelector(`.${this.id} .cal-content`).focus();
      } else {
        this.elem.innerHTML = `
          <div id="${this.id}" class="cal-holder ${
          this.id
        }" data-date="${this.date.getTime()}">
            <div class="cal-trigger-btn" onclick="">${this.currentDate}</div>
          </div>
        `;
      }
      this.event();
    }
  },
  genDays() {
    const year = this.date.getFullYear(),
      month = this.date.getMonth();
    var date = new Date(year, month + 1, 0);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    var firstDay = new Date(year, month, 1);

    firstDay.setMinutes(firstDay.getMinutes() - firstDay.getTimezoneOffset());
    var startDay = firstDay.getDay();
    const arr = [];
    for (let i = 0; i < date.getDate() + startDay; i++) {
      const startsOnSun = Boolean(startDay === 0) && i;
      if (i < startDay) {
        arr.push({
          id: null,
          value: i,
          year: year,
          month: month
        });
      } else {
        arr.push({
          id: i,
          value: startsOnSun ? i + 1 : i - startDay + 1,
          year: year,
          month: month
        });
      }
    }
    return arr;
  },
  getLastDay() {
    var year = this.date.getFullYear();
    var date = new Date(year, this.date.getMonth() + 1, 0);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.getDate();
  },
  weeks() {
    const year = this.date.getFullYear();
    const month_number = this.date.getMonth();
    const firstOfMonth = new Date(year, month_number - 1, 1);
    const lastOfMonth = new Date(year, month_number, 0);
    var used = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil(used / 7);
  },
  prev() {
    const date = moment(this.date).subtract(1, "months");
    this.date = new Date(date._d);
    this.init();
  },
  next() {
    const date = moment(this.date).add(1, "months");
    this.date = new Date(date._d);
    this.init();
  },
  toggleDatePicker() {
    this.isShown = !this.isShown;
    //this.date = new Date();
    //this.currentDate = this.date.toDateString()
    this.init();
  },
  renderHeader() {
    return `
      <div class="cal-header">
        <span>prev</span>
        <div>
          ${months[this.date.getMonth()]} ${this.date.getFullYear()}
          
        </div>
        <span>next</span>
      </div>
    `;
  },
  renderBodyDateRow() {
    const chunks = chunk(this.genDays(), 7);
    const rows = [];
    for (let index = 0; index < chunks.length; index++) {
      const _dates = chunks[index];
      let rem = _dates.length % 7;
      rem =
        rem === 1
          ? 6
          : rem === 6
          ? 1
          : rem === 4
          ? 3
          : rem === 5
          ? 2
          : rem === 2
          ? 5
          : rem === 3
          ? 4
          : rem;

      const dates = _dates.map((item, i) => {
        if (item.id === null) return `<div></div>`;
        const _date = this.date;
        _date.setDate(item.value);
        const isToday =
          moment().format("YYYY MM DD") === moment(_date).format("YYYY MM DD");
        return `<div data-date="${_date.toDateString()}" class="${
          this.currentDate === _date.toDateString() ? "active" : ""
        } ${isToday ? "today" : ""}">${item.value}</div>`;
      }); //.reverse();

      for (var i = 0; i < rem; i++) {
        dates.push(`<div></div>`);
      }
      rows.push(`
        <div class="cal-body-dates-row">
          ${dates.join("")}
        </div>
      `);
    }
    return rows.join("");
  },
  renderBody() {
    return `
      <div class="cal-body">
        <div class="cal-body-days">
          ${days
            .map(day => {
              return `<div>${day}</div>`;
            })
            .join("")}
        </div>
        <div class="cal-body-dates">
          ${this.renderBodyDateRow()}
        </div>
      </div>
    `;
  },
  event() {
    const _that = this;
    this.click(
      `.${this.id} .cal-trigger-btn`,
      this.toggleDatePicker.bind(this)
    );

    if (document.querySelector(`.${_that.id} .cal-content`)) {
      document.querySelector(`.${_that.id} .cal-content`).onblur = () => {
        _that.isShown = false;
        _that.init();
      };
    }

    /*
    this.click(
      `.${this.id} .cal-content > .cal-header > span:nth-child(1)`,
      this.prev.bind(this)
    );*/

    this.click(
      `.${this.id} .cal-content > .cal-header > span:nth-child(3)`,
      this.next.bind(this)
    );

    jQuery(`.${this.id} .cal-content > .cal-header > span:nth-child(1)`).click(
      () => {
        _that.prev();
      }
    );

    const dates = document.querySelectorAll(
      `.${
        this.id
      } .cal-content > .cal-body > .cal-body-dates > .cal-body-dates-row > div`
    );

    dates.forEach((el, i) => {
      el.addEventListener("click", () => {
        if (el.dataset["date"]) {
          this.currentDate = el.dataset["date"];
          if (this.onDateChange && typeof this.onDateChange === "function") {
            this.onDateChange(new Date(el.dataset["date"]));
          }
          this.toggleDatePicker();
        }
      });
    });
  },
  click(elem, fun) {
    if (document.querySelector(elem))
      document.querySelector(elem).addEventListener("click", fun);
  }
};

DatePickerESOld.config = (elm, onDateChange) => {
  const d = new DatePickerESOld(elm, onDateChange);
  return d;
};

window.DatePickerESOld = DatePickerESOld;
export default DatePickerESOld;
