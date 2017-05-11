import weexHttp from 'weex-http'
const stream = weex.requireModule('stream')
const baseURL = 'https://www.chcit.com.cn/elink_scm_purchase'

export function fetch (path,obj) {
  return new Promise((resolve, reject) => {

    weexHttp.get(`${baseURL}/${path}.do`, {user:'zxy', password:123},{
        headers: {'CHeader': 'foobar'},
        transformRequest :[function(r) {
            console.log("transformRequest: ",r);
            console.log("transformRequest: ");
        }],
        transformHeaders :[function(r) {
            console.log("transformHeaders: ",r);
            console.log("transformHeaders: ");
        }],
        transformResponse :[function(r) {
            console.log("transformResponse: ",r);
            console.log("transformResponse: ");
        }]
    })
    .then(function (response) {
        if (response.status == 200) {
          let data = JSON.parse(response.data)
          resolve(data)
        }
        else {
          console.log(response);
          reject(response)
        }
    })
    .catch(function (error) {
        reject(error)
    })
  })
}

export function fetchIdsByType (type) {
  return fetch(`mCenterAction/webLogin`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
