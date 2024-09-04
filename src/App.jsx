import { useEffect, useState } from 'react'
import { EmployeeData } from './Employee';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [fullname, setFullName] = useState('');
  const [mobile, setMobile] = useState(0);
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setData(EmployeeData)
  }, []);

  const handleSave = (e) => {
    let error ='';
    if(fullname == '')
      error +='Fullname is Required!,';
    if(mobile == '')
      error +='Mobile is Required!,';
    if(age == '')
      error +='Age is Required!,';

    if(error == ''){
      e.preventDefault();
      const details = [...data];
      const newObjects = {
        id:EmployeeData.length + 1,
        fullname:fullname,
        mobile:mobile,
        age:age
      }
      details.push(newObjects);
      setData(details);
      handleClear();
    }else{
      alert(error);
    }

  };

  ////Clear-Input Field Functionality here
  const handleClear = () => {
    setId(0);
    setFullName('');
    setMobile('');
    setAge('')
    setIsUpdate(false)
  };

  ////Update Functionality here
  const handleUpdate = () => {
    const itemIndex = data.map((items) => {
      return items.id
    }).indexOf(id);

    const dt = [...data];
    dt[itemIndex].fullname = fullname;
    dt[itemIndex].mobile = mobile;
    dt[itemIndex].age = age;
    setData(dt);
    handleClear();
  };

  ////Edit Functionality here
  const handleEdit = (id) => {
    const edit = data.filter(item => item.id === id);
    if (edit !== undefined) {
      setIsUpdate(true)
      setId(id);
      setFullName(edit[0].fullname);
      setMobile(edit[0].mobile);
      setAge(edit[0].age)
    }
  };

  ////Delete Functionality
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are You Sure to Delete this items?")) {
        const dtData = data.filter(val => val.id !== id);
        setData(dtData);
      }
    }
  }

  return (
    <div className='App'>
      <h1 className='header-form'>React Form</h1>
      <div className='register-form' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className=''>
          <label className='form-control'>Fullname
            <input type='text' className='form-control' placeholder='Enter fullname' onChange={(v) => setFullName(v.target.value)} value={fullname} />
          </label>
        </div>
        <div className=''>
          <label className='form-control'>Mobile no
            <input type='number' className='form-control' placeholder='Enter Mobile no' onChange={(v) => setMobile(v.target.value)} value={mobile} />
          </label>
        </div>
        <div className=''>
          <label className='form-control'>age
            <input type='number' className='form-control' placeholder='Enter age' onChange={(v) => setAge(v.target.value)} value={age} />
          </label>
        </div>
        <div className='' style={{ paddingRight: '142px', paddingTop: '17px' }}>
          {
            !isUpdate ?
              <button type="button" class="btn btn-success" onClick={(el) => handleSave(el)}>Save</button>
              :
              <button type="button" class="btn btn-success" onClick={() => handleUpdate()}>Update</button>
          }
          <button type="button" class="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={() => handleClear()}>Clear</button>

        </div>
      </div>
      <table className='table'>
        <thead className='thead-dark'>
          <tr className='table'>
            <th>Sr.no</th>
            <th>Id</th>
            <th>Fullname</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((items, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items.id}</td>
                  <td>{items.fullname}</td>
                  <td>{items.mobile}</td>
                  <td>{items.age}</td>
                  <td className='action'>
                    <button type="button" class="btn btn-primary" onClick={() => handleEdit(items.id)}>Edit</button>&nbsp;
                    <button type="button" class="btn btn-danger" onClick={() => handleDelete(items.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
