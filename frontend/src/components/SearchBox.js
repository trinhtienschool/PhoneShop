import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory  } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/search/name/${keyword}`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        // <Form onSubmit={submitHandler} inline>
        //     <Form.Control
        //         type='text'
        //         name='q'
        //         onChange={(e) => setKeyword(e.target.value)}
        //         className='mr-sm-2 ml-sm-5'
        //     ></Form.Control>
        //
        //     {/*<Button*/}
        //     {/*    type='submit'*/}
        //     {/*    variant='outline-success'*/}
        //     {/*    className='p-2'*/}
        //     {/*>*/}
        //     {/*    Submit*/}
        //     {/*</Button>*/}
        // </Form>
        <form className="search" onSubmit={submitHandler}>
      {/*<div className="row">*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    name="q"*/}
      {/*    id="q"*/}
      {/*    onChange={(e) => setKeyword(e.target.value)}*/}
      {/*  ></input>*/}


          <div name="q" id="q" className="md-form active-cyan active-cyan-2" style={{"margin": "0px"}}>
                                    <input className="form-control " type="text" placeholder="Search"
                                           aria-label="Search"
                                     onChange={(e) => setKeyword(e.target.value)}
                                    />
                                </div>
      {/*</div>*/}
    </form>
    )
}

export default SearchBox
