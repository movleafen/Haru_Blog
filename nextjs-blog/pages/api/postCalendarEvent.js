import executeQuery from "../../components/utilities/db";

export default async(req, res) => {
    if(req.method === 'POST'){
        
        // process a post request
        console.log('POST recieved')
        res.status(200).json({word: 'hello world'})
    }
    else{
        // handle any other HHTP method
        console.log('NO POST recieved')
        res.status(200).json({word: 'hello world without post'})
    }
    
}