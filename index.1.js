
const async = require('async')
const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')

const items =[
                    {
                        name:'a',
                        url:'http://www.acad.nu.ac.th'
                    },
                    {
                        name:'b',
                        url:'http://www.reg.nu.ac.th'
                    }  
            ]

const q = async.queue((task, callback) => {

    request(task.url, (error, response, body) => {
        const $ = cheerio.load(body)        
        //console.log($('#ID').text())        
        const txt = $('#ID p').text()

        fs.writeFile(task.name + ".html", txt, (err) => {
            if(err){
                console.log(err)            
                callback() 
            }                
            console.log('foo')
            callback()     
                        
        })       

    })
}, 1)  // ddod 1000    

// assign a callback
q.drain = () => {
    console.log('all items have been processed')
}

// add some items to the queue
q.push(items)

