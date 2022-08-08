import executeQuery from "../../components/utilities/db";

export default async(req, res) => {
    if(req.method === 'POST'){
        const body = req.body
        // body.content = body.content.replaceAll("'", "\'")
        const query = `update haru_blog.events set active = 0 where eventid = ${body.eventid}`
        await executeQuery(query)
        

        
        // process a post request
        res.status(200).json("okay!")
    }
    else{
        // handle any other HHTP method
        console.log('NO POST recieved')
        res.status(200).json({word: 'hello world without post'})
    }
    
}