import axios from "./request"
import { message } from "antd";
import {notification} from "antd";


class CommonConfig {

    /***开发***/
    serverIP = 'http://localhost:8989'
    // serverIP = 'http://splashstem.org'
    // serverIP = ''

    /**
     * 对接后端接口get方法（无返回值）
     * @param api 接口url
     */
    getInterface = (api) => {
        return axios.get(this.serverIP + api).then((response) => {
            // console.log("get请求方式响应值：",response.data)
            if (response.status === 200) {
                return Promise.resolve(response.data)
                // setTimeout(() => {
                //     window.location.reload();//强制刷新
                // }, 100);
            } else {
                notification['error']({
                    message: response.data.respMsg
                });
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

    /**
     * 上传文件的post方法
     * @param api
     * @param file
     */
    /*  postInterfaceFile = (api, file) => {
          let formData = new FormData();
          formData.append("file", file);
          let config = {
              headers: {
                  'Content-type': 'multipart/form-data'
              }
          }
          // post(api,formData,config)
          axios.post(this.serverIP + api, formData, config).then((response) => {
              // console.log("get接口返回值：",response.status)
              if (response.status === 200) {
                  message.success("上传成功")
              } else {
                  message.error("上传失败")
              }
          }).catch(function (error) {
              console.log(error)
          })
      }*/


    /**
     * 一般post请求（无返回值）
     * @param api
     * @param data
     */
    postMethod = (api, data) => {
        return axios.post(this.serverIP + api, data).then((response) => {
            if (response.data.respCode === "1") {
                response.data.respMsg && message.success(response.data.respMsg)
                // setTimeout(() => {
                //     window.location.reload();//强制刷新
                // }, 100);
                return Promise.resolve(response.data)

            } else {
                message.error(response.data.respMsg)
            }

        }).catch(function (error) {
            console.log(error)
        })
    }

    /**
     * 有返回值的post方法
     * @param api
     * @param data
     */
    postMethodRes = (api, data) => {
        // console.log("postMethodRes请求参数：",data)
        return axios.post(this.serverIP + api, data).then((response) => {
            if (response.status === 200) {
                return response.data
            } else {
                message.error("错误")
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

    /**
     * get方式，有返回值
     * @param api
     * @returns {Promise<AxiosResponse<any>>}
     */
    getMethod = (api) => {
        return axios.get(this.serverIP + api).then((response) => {
            //    console.log("get请求方式响应值：", api)
            if (response.status === 200) {
                // if (response.data.respData !== undefined){
                //     return response.data.respData
                // }
                return response.data
            } else {
                // message.error("错误")
                // return ""
            }
        }).catch(function (error) {
            console.log(error)
        })
    }
}

export default new CommonConfig();