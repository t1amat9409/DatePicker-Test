# DatePicker-Test
Created with CodeSandbox

# Usage
```typescript
    import "./styles.css";
    import DatePicker from "./DatePicker";

    const datePicker = new DatePicker("#date-picker");

    //Static declaration
    DatePicker.config("#date-picker-2");

    //Invalid Date
    DatePicker.config("#date-picker-invalid");

    //with costum date
    const datePicker3 = new DatePicker("#date-picker-3");

    //No target
    DatePicker.config();
    
    //With an onDateChange(date: Date):void callback
    DatePicker.config(null /* or element to attach to*/, (date) => {})
```
[![Edit vanilla](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/t1amat9409/DatePicker-Test/tree/master/?fontsize=14&hidenavigation=1&theme=dark)
