import React, { useState, Component } from 'react';
import './App.css';

function Create() {
    const [fields, setFields] = useState([{ nama: '', desc: '', price: '' }]);

    const handleChangeNama = (i, e) => {
        const _nama = [...fields];
        _nama[i].nama = e.target.value;
        setFields(_nama);
    }
    const handleChangeDesc = (i, e) => {
        const _fields = [...fields];
        _fields[i].desc = e.target.value;
        setFields(_fields);
    }

    const handleChangePrice = (i, e) => {
        const _fields = [...fields];
        _fields[i].price = e.target.value;
        setFields(_fields);
    }

    const handleAdd = () => {
        const _fields = [...fields];
        _fields.push({ nama: '', kota: '' });
        setFields(_fields);
    }

    const handleRemove = (i) => {
        const _fields = [...fields];
        _fields.splice(i, 1);
        setFields(_fields);
    }

    const handleSubmit = () => {
        console.log(fields)
    }

    return (
        <div className="app">
            <div className="form-wrapper">
                <h2>Form Input Barang</h2>
                {fields.map((field, i) => {
                    return (
                        <div className="form-input-wrapper" key={i}>
                            <input
                                type="text"
                                value={field.nama}
                                className="form-input"
                                placeholder="Nama"
                                label={field.nama}
                                onChange={e => handleChangeNama(i, e)}
                                autoFocus={true}
                            />
                            <br></br>
                            <input
                                value={field.desc}
                                className="form-input"
                                type="text"
                                placeholder="Desc"
                                label={field.kota}
                                onChange={e => handleChangeDesc(i, e)}
                            />
                            <br></br>
                            <input
                                value={field.price}
                                className="form-input"
                                type="text"
                                placeholder="Price"
                                label={field.price}
                                onChange={e => handleChangePrice(i, e)}
                            />
                            <button type="button" onClick={() => handleRemove(i)} className="btn-remove">x</button>
                        </div>
                    )
                })}
                <div className="btn-wrapper">
                    <button type="button" onClick={handleAdd} className="btn-add">+</button>
                    <button onClick={handleSubmit} className="btn-register">INPUT</button>
                </div>
            </div>
        </div>
    );
}

export default Create;