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
