import axios from "axios";
import authHeader from "./auth-header";
import { CROSS_URL, UPLOAD_URL } from "./api";

const API_URL = process.env.REACT_APP_API_URI;

class UserService {
  get(Url) {
    return axios
      .get(API_URL + Url)
      .then((response) => {
      //  console.log('response', response);
        return response.data;
      });
  }

  post(getdata, Url) {
    return axios
      .post(API_URL + Url, getdata)
      .then((response) => {
      //  console.log('response', response);
        return response.data;
      });
  }

  delete(Url) {
    console.log('delete request', Url)
    return axios
      .delete(API_URL + Url)
      .then((response) => {
      //  console.log('response', response);
        return response.data;
      });
  }

  uploadFile(getdata,Url,) {
    return axios.post(API_URL + Url, getdata, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': true,
      }}).then((response) => {
      return response.data;
    });
  }

  async uploadProfile(givenData)
  {
    const { id, parent_id, fname, base64, doctype, token, livenessScore, isLive, catType } = givenData;
    let data = {
      "parent_id": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": doctype,
      catType: catType
    }
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer  " + token);
    // myHeaders.append("content-type", "application/json ");
    // myHeaders.append('Access-Control-Allow-Origin', '*');
    // myHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: JSON.stringify(data),
    //     redirect: 'follow'
    // };
    // const getdata = await fetch("HerokuFileUpload", requestOptions).then((response) => response.json())
    //     .then((response) => {
    //         return response;
    //     });
    const getdata =  await this.post(data, 'heroku_upload');
        console.log("getdata", getdata);
    if (getdata && getdata.Status !== undefined && getdata.Status === "Success") {
          let docData = {
              user_sfid: parent_id,
              document_id: getdata.DocumentId,
              livenessScore: livenessScore,
              isLive: isLive,
          }
        return  await this.post(docData, 'upload_profile');
    } else {
        return { status: "error", message: getdata };
    }
  }

  async uploadDocument(givenData)
  {
    const { parent_id, fname, base64, doctype, token, catType } = givenData;
    
    let data = {
      "parent_id": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": doctype,
      catType: catType
    }
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer  " + token);
    // myHeaders.append("content-type", "application/json ");
    // myHeaders.append('Access-Control-Allow-Origin', '*');
    // myHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: JSON.stringify(data),
    //     redirect: 'follow'
    // };
    // return await fetch("HerokuFileUpload", requestOptions).then((response) => response.json())
    //     .then((response) => {
    //         return response;
    //     });
    return await this.post(data, 'heroku_upload');
  }

  async uploadEduDocuments(getdata)
  {
    const { base64, doctype, catType, basetype, parent_id, id, token, fileType } = getdata;
    
    if(Array.isArray(base64) && Array.isArray(doctype) && base64.length > 0)
    {
      
      await Promise.all(base64.map(async (item, index) =>
        {   
            let type;
            let ext = "jpg";
            if(basetype && basetype[index] !=undefined )
            {
                type = basetype[index];
                const getExt = type.split("/");
                ext = getExt[1];
            }
            const d = new Date()
            const time = d.getTime()
            let data = {
                parent_id: parent_id, 
                fname: `eduvan-${time}.${ext}`, 
                base64: item, 
                catType: catType,
                doctype: fileType[index], 
                token: token
            }
            
            const getData =  await this.uploadDocument(data);
            if(getData && getData.status !== undefined && getData.status === "success")
            {
              const resData = getData && getData.data;
              let objData = {
                document_id: resData && resData.DocumentId?resData.DocumentId:null,
                document_type: doctype[index],
                doc__type: type?type:'',
                id: id
              }
             // await this.post(objData, 'upload_document');
            }
        }));
        return {  status:"success", "message":"Success"}
    }else{
        return {  status:"error", "message":"Invalid Data"}
    }
  }

  getLeadContent() {
    return axios.get(API_URL + "leads");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
