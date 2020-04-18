import "./styles.css";
import DatePicker from "./DatePicker";
import DatePickerESOld from './DatePicker.old'

document.getElementById("app").innerHTML = `
<h1>Date Pickers</h1>
`;

const datePicker = new DatePicker("#date-picker");

//Static declaration
DatePicker.config("#date-picker-2");

//Invalid Date
DatePicker.config("#date-picker-invalid");

//with costum date
const datePicker3 = new DatePicker("#date-picker-3");

//No target
DatePicker.config();

//No target, and with onDateChange callback
DatePicker.config(null, (date) => {
  alert(date.toDateString());
});

//No target, From DatePickerESOld
DatePickerESOld.config(null, (date)=>{
  alert(`From DatePickerESOld: ${date.getTime()}`)
});
