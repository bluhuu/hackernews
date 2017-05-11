import weexHttp from 'weex-http'
const stream = weex.requireModule('stream')
const baseURL = 'https://hacker-news.firebaseio.com/v0'

export function fetch (path,obj) {
  return new Promise((resolve, reject) => {

    weexHttp.get(`${baseURL}/${path}.json`, {xx:"xx",yy:"yy"},{
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
  return fetch(`${type}stories`)
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
