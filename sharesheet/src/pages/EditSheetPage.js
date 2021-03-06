import React, { useState } from 'react';
import { Row, Col, Container, Form, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { SheetSearchBox } from './SheetSearchBox';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";


export function EditSheetPage({setActive}) {

    const [sheetList, setSheetList] = useState([]);
    const [refresh, setRefresh] = useState()

    let sheetTable = []

    sheetList.forEach(sheet => {
        sheetTable.push(
            <Row className='mt-5 p-4'>
                <Col>
                    {sheet.cover.original}
                </Col>


            </Row>
        )
    });

    const fillTable = () => {

        
        
        let tableRowsToShow = []

        if (sheetList === 0) {
            return tableRowsToShow
        }

        sheetList.map((sheet, index) => {
            
            tableRowsToShow.push(
                <tr key={sheet._id}>
                    {/* <td style ={{padding:'2%'}}>{index+1}</td> */}
                    <td>{sheet.original.songName}</td>
                    <td>{sheet.animaeRelated.animaeName}</td>
                    <td>{sheet.cover.cost.$numberDecimal}</td>
                    <td>{sheet.cover.difficulty}</td>
                    <td><div className="text-center">
                        <button type="button" className="btn btn-sm btn-outline-dark"
                            onClick={() => loadDetailPage(sheet._id)}
                        >Details</button>
                    </div>
                    </td>
                    <td><Button size='sm' onClick={() => loadUpdateSheet(sheet._id)}><FaPencilAlt /></Button></td>
                    <td><Button size='sm' variant='danger' onClick={() => handleDelete(sheet._id)}><FaTrashAlt /></Button></td>
                </tr>
            )
        });


        return (
            tableRowsToShow
        )

    }

    const loadDetailPage = (_id) => {
        setActive('DetailPage', _id)
    }

    const loadUpdateSheet = (_id) => {
        setActive('UpdateSheet', _id)
    }

    const handleDelete = async (_id) => {
        let userAnswer = window.confirm('Confirm delete?');
        if (!userAnswer) {
            return
        }

        let result = await axios.post("https://anqi-tgc18-project-2.herokuapp.com/deletesheet",
            { id: _id })

        if (result.data.acknowledged) {
            setRefresh(refresh + 1)
            alert(result.data.deletedCount + " sheet deleted")
        } else {
            alert('unsucessful please try again')
        }
    }

    return (
        <React.Fragment>
            <Row className='mb-3 md-3'>
                <Col md={10} className='mx-auto md-3 ' style={{ backgroundColor: 'white' }}>
                    <Row className='mt-5 mb-3'>
                        <SheetSearchBox outputResult={setSheetList} />
                    </Row>

                    <Row className='md-5 sm-12 mx-3'>
                        <Table striped bordered hover responsive >
                            <thead>
                                <tr className='result-bar'>
                                    {/* <th style={{padding:'0%',fontSize:'2vw'}}>#</th> */}
                                    <th>Song Name</th>
                                    <th>Anime Name</th>
                                    <th >Cost</th>
                                    <th >Difficulty</th>
                                    <th>Details</th>
                                    <th >Edit</th>
                                    <th >Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fillTable()}
                            </tbody>
                        </Table>

                    </Row>
                </Col>
            </Row>

        </React.Fragment>
    )
}
