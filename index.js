
const async = require('async')
const request = require('request')
const fs = require('fs')
const urls = [
                'http://www.acad.nu.ac.th',
                ''
                ]


let i = 0
const q = async.queue((url, callback) => {
    request(url,(error, response, body) => {
        i = i + 1
        fs.writeFile('web'+i+".html", body, (err) => {
            if(err){
                console.log(err)            
                callback() 
            }                
            console.log('foo',response && response.statusCode)
            callback()                 
        })      

    })
}, 1)  // ddod 1000    

// assign a callback
q.drain = () => {
    console.log('all items have been processed')
}

// add some items to the queue
q.push(urls)

