import executeQuery from "../../components/utilities/db";

export default async(req, res) => {
    if(req.method === 'POST'){
        const body = req.body
        // body.content = body.content.replaceAll("'", "\'")
        const query = `insert into haru_blog.events (title, content, date, active)
                        values ("${body.title}", "${body.content}", '${body.time}', '1');`
        const result = await executeQuery(query)
        console.log(result[0].insertId)
        // process a post request
        //console.log()
        res.status(200).json(result)
    }
    else{
        // handle any other HHTP method
        console.log('NO POST recieved')
        res.status(200).json({word: 'hello world without post'})
    }
    
}