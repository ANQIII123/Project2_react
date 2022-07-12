import React, { Fragment } from "react";
import axios from "axios";


class AllSheet extends React.Component {

    state = {
        sheets: []
    }

    componentDidMount() {
        axios.get(`https://3000-anqiii123-project2-0ihp2gei4ny.ws-us53.gitpod.io/get_all_sheet`)
            .then(res => {
                const sheets = res.data;
                this.setState({ sheets });
            })
    }


    render() {

        return (
            <React.Fragment>



                <div className="row mt-2">
                    {
                        this.state.sheets
                            .map(sheet =>
                                <div className="col-6 col-lg-4" key={sheet._id}>

                                    <div className=' sheetBox mx-auto'>
                                        <div className='sheetPictureBox mx-auto '>
                                        <img src={sheet.cover.image_url} style={{maxWidth:'100%' ,maxHeight:'100%'}}/>
                                        </div>

                                        <div className='desc_container'>
                                            <h5>Song Name: {sheet.original.songName}</h5>
                                            <p>Composer: {sheet.original.Composer}</p>
                                            <p>Pages: {sheet.cover.numberOfPages}</p>
                                            <p>Price: {sheet.cover.cost}</p>
                                        </div>

                                    </div>

                                </div>

                            )
                    }

                </div>

            </React.Fragment>
        )
    }

}

export default AllSheet