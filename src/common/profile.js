import { render } from '@testing-library/react';
import React from 'react';
import { getProfileData } from "../actions/user";

export default class Profile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            userData: null
        }
    }

    componentDidMount()
    {
        let data = {
            user_sfid: this.props.sfid
        }
        this.props.dispatch(getProfileData(data)).then((response)=>{
            if(response.status ==="success")
            {
                this.setState({userData: response.accountDet});
            }
        });
    }

    render()
    {
        return (
            <div className="row mt-3">
                <div className="col">
                    Profile
                </div>
                <div className="col">
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            Onboarded on
                            </label>
                            test
                        </div>
                    </div>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            Brand Name
                            </label>
                            Croma
                        </div>
                    </div>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            Website Url
                            </label>
                            www.google.com
                        </div>
                    </div>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            GST
                            </label>
                            Croma
                        </div>
                    </div>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            Region of service
                            </label>
                            Mumbai, Pune
                        </div>
                    </div>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            Communication Address
                            </label>
                            Mumbai, Pune
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            PM Name
                            </label>
                            Mumbai, Pune
                        </div>
                    </div>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            Entity Name
                            </label>
                            Mumbai, Pune
                        </div>
                    </div>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            PAN
                            </label>
                            Mumbai, Pune
                        </div>
                    </div>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            CIN
                            </label>
                            Mumbai, Pune
                        </div>
                    </div>
                </div>
                <div className="col">
                    
                </div>
                <div className="col">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </div>
            </div>
        );
    }

}