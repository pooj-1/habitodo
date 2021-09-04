import React from 'react';
import TextFormField from '../../Components/TextFormField';

import DateField from '../../Components/DateField';
import moment from 'moment'

function FormContainer(props) {

    const [data,setData]=React.useState(props.todo)
    // const priorities = [
    //     { id: '1', name: 'High' },
    //     { id: '2', name: 'Medium' },
    //     { id: '3', name: 'Low' }
    // ];

    // trigger on input change
    const handleChange = (e) => {
        let tempObj = { ...data };
        tempObj[e.target.name] = e.target.value;
        setData(tempObj)

    };

    // reset the form after submission
    const handleReset = (e) => {
props.setMode('create');
setData({name:'',date:moment(),status:'1'})
    };

    // trigger on form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(data)
        handleReset(e);
    };
React.useEffect(()=>{
    setData(props.todo)
},[props.todo])
    return (
        <div className="column border-bottom mb-5">
            <h2 className="is-size-3 has-text-centered">Add Task  <button className="btn btn-block">
                <span
                    onClick={()=>props.setMode('')}
                    role="img"
                    className="is-pulled-right"
                    aria-label="Remove"
                >&#10060;</span></button></h2>

            <form onSubmit={handleSubmit}>

                {/* <TextFormField
                    handleChange={handleChange}
                    inputType="date"
                    name="date"
                    label="Date"
                    value={props.todo.date}
                /> */}

                <TextFormField
                    handleChange={handleChange}
                    inputType="text"
                    name="name"
                    placeholder="Task name"
                    value={data.name}
                    required={true}
                />

                 <DateField inputProps={{placeholder:'Date',onKeyPress:(e)=>e.preventDefault()}} value={data.date} handleChange={handleChange} name="date"/>
                 <div className="field">
                 <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="status" id="inlineRadio1" value="1" checked={data.status==='1'||props.mode==='create'} onChange={handleChange}/>
  <label className="form-check-label" htmlFor="inlineRadio1">To Do</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="status" id="inlineRadio2" value="2" checked={data.status==='2'} onChange={handleChange}/>
  <label className="form-check-label" htmlFor="inlineRadio2">Doing</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="status" id="inlineRadio3" value="3" checked={data.status==='3'} onChange={handleChange}/>
  <label className="form-check-label" htmlFor="inlineRadio3">Done</label>
</div>
</div>
<div>

                {/* <SelectFormField
                    handleChange={handleChange}
                    name="priority"
                    label="Select task priority"
                    options={priorities}
                    value={props.todo.priority}
                /> */}

                <button
                    className="button is-link is-small is-pulled-left"
                    type="submit"
                >{props.mode === 'create' ? 'Save' : 'Save Changes'}  </button>

                <button
                    onClick={handleReset}
                    type="button"
                    className="button is-danger is-light is-small is-pulled-right"
                >Reset Form</button></div>
            </form> <hr></hr>
        </div>
    );
}

export default FormContainer;