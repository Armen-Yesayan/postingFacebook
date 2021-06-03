import React, {useEffect, useState} from 'react';
import {createPost} from "./Function";

const CreatePost = () => {
    const [value, setValue] = useState('')
    const [status, setStatus] = useState('')
    const [alert, setAlert] = useState(false)
    const [img, setImg] = useState()

    useEffect(() => {
        setTimeout(() => {
            setStatus('')
            setAlert(false)
        }, 4000)
    }, [status])

    const change = (e) => {
        setValue(e.target.value)
    }

    const imgUpload = e => {
        const image = URL.createObjectURL(e.target.files[0]);

        setImg(image);
    }

    const submit = async () => {
        const st = await createPost(value);

        if(st) {
            setValue('')
            setAlert(true)
            setStatus(st)
        }
    }

    console.log(img)

    return (
        <div className='container'>
            <div className='col-lg-6 mx-auto text-center mt-3'>
                <h1>Create Post</h1>
            </div>
            {
                alert && <div className='col-lg-6 mx-auto mt-3'>
                    <div className="alert alert-success" role="alert">
                        {status}
                    </div>
                </div>
            }
            <div className='col-lg-6 mx-auto mt-3'>
                <input type="file" onChange={imgUpload}/>
                <img src={img} alt=""/>
                <textarea className='form-control' value={value} onChange={change}/>
                <div className='mt-2 d-flex justify-content-end'>
                    <button className='btn btn-success' onClick={submit}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;