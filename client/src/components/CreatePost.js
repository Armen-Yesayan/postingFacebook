import React, {useEffect, useState} from 'react';
import {createGroupPost, createPost} from "./Function";

const CreatePost = ({id, handleClose}) => {
    const [value, setValue] = useState('')
    const [status, setStatus] = useState('')
    const [alert, setAlert] = useState(false)
    const [img, setImg] = useState({
        preview: '',
        file: ''
    })

    useEffect(() => {
        if(status !== '') {
            setTimeout(() => {
                setStatus('')
                setAlert(false)
                handleClose();
                setValue('')
                setImg({
                    preview: '',
                    file: ''
                });
            }, 2000)
        }
    }, [status])

    const change = (e) => {
        setValue(e.target.value)
    }

    const imgUpload = e => {
        const file = e.target.files[0];
        const image = URL.createObjectURL(e.target.files[0]);

        setImg({
            preview: image,
            file
        });
    }

    const submit = async () => {
        const st = await createGroupPost(id, value, img.file);

        if(st) {
            setAlert(true)
            setStatus(st)
        }
    }

    return (
        <div className='container'>
            {
                alert && <div className='mt-3'>
                    <div className="alert alert-success" role="alert">
                        {status}
                    </div>
                </div>
            }
            <div className='mt-3'>
                <input type="file" onChange={imgUpload} />
                <img src={img.preview} alt="" width='100%' className='mt-2 mb-2'/>
                <textarea className='form-control' value={value} onChange={change}/>
                <div className='mt-2 d-flex justify-content-end'>
                    <button className='btn btn-success' onClick={submit}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;