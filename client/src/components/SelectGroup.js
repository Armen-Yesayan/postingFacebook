import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import CreatePost from "./CreatePost";
import {getAllGroups} from "./Function";

const SelectGroup = ({groups, setGroups}) => {

    const [groupId, setGroupId] = useState();

    const [show, setShow] = useState(false);

    useEffect(async () => {
        let gs = await getAllGroups();
        setGroups(gs)
    }, [])

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setGroupId(id);
        setShow(true);
    }

    return (
        <div className='container'>
            <div className='col-lg-6 mx-auto text-center mt-3'>
                <h1>Select Group</h1>
            </div>
            <div className='mt-3'>
                <div className='d-flex'>
                    {groups && groups.map(item => (
                        <div className="card mr-2" key={item.id} style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <Button variant="primary" size='sm' onClick={() => handleShow(item.id)}>
                                    Create Post
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePost id={groupId} handleClose={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SelectGroup;